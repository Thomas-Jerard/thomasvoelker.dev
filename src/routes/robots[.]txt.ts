import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(
          "User-agent: *\nAllow: /\nSitemap: https://thomasvoelker.dev/sitemap.xml\n",
          { headers: { "Content-Type": "text/plain" } },
        ),
    },
  },
});
