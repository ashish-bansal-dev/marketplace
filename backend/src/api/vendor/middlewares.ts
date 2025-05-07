import { authenticate, MiddlewareRoute } from "@medusajs/framework/http";
import { vendorCors } from "./cors";
import { adminApiKeyRoutesMiddlewares } from "./api-keys/middlewares";
import { vendorSellersMiddlewares } from "./sellers/middlewares";


export const vendorMiddlewares: MiddlewareRoute[] = [
    {
        matcher: "/vendor*",
        middlewares: [vendorCors],
    },
    {
        matcher: "/vendor*",
        middlewares: [authenticate("seller", ["session", "bearer"])],
    },
    ...adminApiKeyRoutesMiddlewares,
    ...vendorSellersMiddlewares,
]
