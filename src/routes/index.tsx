import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { pageHead, pages } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => pageHead(pages.home),
});
