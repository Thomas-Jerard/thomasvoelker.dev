import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 no-underline", className)}>
      <span className="portrait-mark size-9 overflow-hidden rounded-full">
        <img src={site.portrait.square} alt="" />
      </span>
      <span className="text-sm font-medium text-fg">{site.name}</span>
    </Link>
  );
}
