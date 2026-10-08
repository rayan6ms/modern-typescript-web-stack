import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode, useEffect, useState } from "react";

// Managed deployments only. A URL is public configuration, never proof of access.
function deploymentUrl(value: string | undefined): string | undefined {
  if (!value) {
    return;
  }
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" &&
      url.hostname.endsWith(".convex.cloud") &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
    ) {
      return url.origin;
    }
  } catch {
    // Missing or invalid configuration leaves the independent shell available.
  }
}

const url = deploymentUrl(import.meta.env.VITE_CONVEX_URL);

export function OptionalConvexProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ConvexReactClient>();

  useEffect(() => {
    if (!url) {
      return;
    }
    // No SSR client/cache, credentials, subscriptions, or shared request state.
    const nextClient = new ConvexReactClient(url);
    setClient(nextClient);
    return () => {
      nextClient.close().catch(() => {
        console.error("Backend client cleanup failed.");
      });
    };
  }, []);

  return client ? (
    <ConvexProvider client={client}>{children}</ConvexProvider>
  ) : (
    children
  );
}
