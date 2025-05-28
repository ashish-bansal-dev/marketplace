import Medusa from "@ashishbansaldev/js-sdk";

export const backendUrl = __BACKEND_URL__ ?? "/";

export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: process.env.NODE_ENV === "development" ? "jwt" : "session",
  },
});

// useful when you want to call the BE from the console and try things out quickly
if (typeof window !== "undefined") {
  (window as any).__sdk = sdk;
}
