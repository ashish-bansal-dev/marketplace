import { MiddlewareRoute } from "@medusajs/framework/http";
import { vendorCors } from "./cors";

export const vendorMiddlewares: MiddlewareRoute[] = [
    {
        matcher: "/vendor*",
        middlewares: [vendorCors],
    },
]
