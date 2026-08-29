import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyEmail({ className }: { className?: string }) {
  return (
    <Button asChild className={cn(className)}>
      <a href={`mailto:${site.email}`}>
        <Mail />
        Email Me
      </a>
    </Button>
  );
}
