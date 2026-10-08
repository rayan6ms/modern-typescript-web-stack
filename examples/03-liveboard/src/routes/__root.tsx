import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { OptionalConvexProvider } from "../convex-provider";
import styles from "../styles.css?url";

export const Route = createRootRoute({
  component: Root,
  head: () => ({
    links: [{ href: styles, rel: "stylesheet" }],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
      { title: "LiveBoard — Plan together" },
      {
        content:
          "A shared planning space for small teams. Collaboration is awaiting setup.",
        name: "description",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="p-8">
      <h1>Page not found</h1>
      <a href="/">Return to LiveBoard</a>
    </main>
  ),
});

function Root() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <OptionalConvexProvider>
          <Outlet />
        </OptionalConvexProvider>
        <Scripts />
      </body>
    </html>
  );
}
