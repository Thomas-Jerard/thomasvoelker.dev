/**
 * Deployed-app (Nitro) half of the platform PWA chrome. Auto-registered as
 * global h3 middleware because vite.config.ts sets `serverDir: "./server"` —
 * without that option Nitro v3 never scans this directory.
 *
 * - `?install=1&platform=ios` on a document path → the Home Screen tutorial,
 *   bundled into the server build via `?raw` (the public/ directory is CDN
 *   static output on Vercel and not readable from the function).
 * - `/__grok/manifest.webmanifest` → per-app-named manifest (kept out of
 *   public/ so this dynamic response is the only one).
 * - Other HTML documents → stream-inject PWA + OG head tags at `</head>`.
 *   OG identity is baked via `virtual:grok-og-identity` at `vite build`
 *   (this function cannot read `src/lib/og/site.json` or `public/og.jpg`).
 *   This must be a middleware transforming `next()`: h3 discards the `response`
 *   runtime hook's return value, and `render:html` does not exist in Nitro v3.
 */
import installPageTemplate from "../../scripts/install-page.html?raw";
import { grokOgIdentity } from "virtual:grok-og-identity";
import {
  acceptsHtml,
  createHeadInjector,
  isDocumentPath,
  isInstallQuery,
  renderInstallPageHtml,
  renderWebManifest,
} from "../../scripts/grok-pwa-shared.mjs";

interface GrokPwaEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

function requestHost(event: GrokPwaEvent): string {
  return (
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host") ?? event.url.host
  );
}

const NOT_FOUND_TITLE = "Page not found — Thomas Voelker";

/** 404 documents: never index, and don't reuse the homepage title/description. */
function markNotFound(chunk: Uint8Array): Uint8Array {
  const html = new TextDecoder().decode(chunk);
  if (!/<\/head>/i.test(html)) return chunk;
  const out = html
    .replace(/<title\b[^>]*>[^<]*<\/title>/i, `<title>${NOT_FOUND_TITLE}</title>`)
    .replace(/(<meta\b[^>]*\b(?:property|name)\s*=\s*["'](?:og|twitter):title["'][^>]*\bcontent\s*=\s*["'])[^"']*/gi, `$1${NOT_FOUND_TITLE}`)
    .replace(/<meta\b[^>]*\bname\s*=\s*["']robots["'][^>]*>/gi, "")
    .replace(/<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*>/gi, "")
    .replace(/<\/head>/i, `<meta name="robots" content="noindex, follow"></head>`);
  return new TextEncoder().encode(out);
}

/**
 * The platform injector rewrites share metas site-wide (title/description come
 * from the page). Restore og:url (from the page canonical) and og:type, which
 * it strips but never re-adds.
 */
function addShareUrl(chunk: Uint8Array): Uint8Array {
  const html = new TextDecoder().decode(chunk);
  if (!/<\/head>/i.test(html)) return chunk;
  const canonical = html.match(/<link\b[^>]*\brel\s*=\s*["']canonical["'][^>]*\bhref\s*=\s*["']([^"']+)["']/i);
  const tags: string[] = [];
  if (!/property\s*=\s*["']og:type["']/i.test(html)) tags.push(`<meta property="og:type" content="website">`);
  if (canonical && !/property\s*=\s*["']og:url["']/i.test(html)) {
    tags.push(`<meta property="og:url" content="${canonical[1]}">`);
  }
  if (tags.length === 0) return chunk;
  return new TextEncoder().encode(html.replace(/<\/head>/i, `${tags.join("")}</head>`));
}

function injectHeadStreaming(response: Response, host: string): Response {
  const notFound = response.status === 404;
  let headDone = false;
  const injector = createHeadInjector({
    host,
    site: grokOgIdentity.site,
  });
  const transformed = response.body!.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        for (const out of injector.push(chunk)) {
          if (notFound && !headDone) {
            headDone = true;
            controller.enqueue(markNotFound(addShareUrl(out)));
          } else if (!headDone) {
            headDone = true;
            controller.enqueue(addShareUrl(out));
          } else controller.enqueue(out);
        }
      },
      flush(controller) {
        for (const out of injector.flush()) {
          if (notFound && !headDone) {
            headDone = true;
            controller.enqueue(markNotFound(addShareUrl(out)));
          } else if (!headDone) {
            headDone = true;
            controller.enqueue(addShareUrl(out));
          } else controller.enqueue(out);
        }
      },
    }),
  );
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default async function grokPwaMiddleware(
  event: GrokPwaEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET") return next();

  const path = event.url.pathname;
  const urlWithQuery = path + event.url.search;

  if (path === "/__grok/manifest.webmanifest" || path === "/__grok/manifest.json") {
    return new Response(renderWebManifest(requestHost(event)), {
      headers: {
        "content-type": "application/manifest+json; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  }

  if (
    isInstallQuery(urlWithQuery) &&
    isDocumentPath(path) &&
    acceptsHtml(event.req.headers.get("accept"))
  ) {
    const html = renderInstallPageHtml(installPageTemplate, {
      host: requestHost(event),
      url: urlWithQuery,
    });
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-cache",
      },
    });
  }

  if (!isDocumentPath(path)) return next();

  const result = await next();
  if (
    result instanceof Response &&
    result.body &&
    String(result.headers.get("content-type") ?? "").includes("text/html") &&
    !result.headers.get("content-encoding")
  ) {
    return injectHeadStreaming(result, requestHost(event));
  }
  return result;
}
