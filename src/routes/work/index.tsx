import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/work/")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "work" });
  },
  component: () => <Navigate to="/" hash="work" />,
});
