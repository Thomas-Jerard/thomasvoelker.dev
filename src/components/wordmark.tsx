import { Link } from "@tanstack/react-router";
import { LoopVideo } from "@/components/loop-video";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 no-underline", className)}>
      <span className="portrait-mark">
        <LoopVideo src="/videos/header-portrait.mp4?v=2" poster="/videos/header-portrait.jpg?v=2" />
      </span>
      <span className="hidden text-sm font-medium text-fg sm:inline">{site.name}</span>
    </Link>
  );
}
