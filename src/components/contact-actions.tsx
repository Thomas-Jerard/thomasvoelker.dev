import { Mail, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Button asChild>
        <a href={`mailto:${site.email}`}>
          <Mail />
          Email Me
        </a>
      </Button>
      <Button asChild variant="outline">
        <a href={`tel:${site.agent.phone}`}>
          <Phone />
          Call Sara {site.agent.display}
        </a>
      </Button>
    </div>
  );
}
