import { MiddlewareRoute } from "@medusajs/framework/http";
import { vendorCors } from "./cors";
import { adminApiKeyRoutesMiddlewares } from "./api-keys/middlewares";
import { vendorSellersMiddlewares } from "./sellers/middlewares";

export const vendorMiddlewares: MiddlewareRoute[] = [
    {
        matcher: "/vendor*",
        middlewares: [vendorCors],
    },
    ...adminApiKeyRoutesMiddlewares,
    ...vendorSellersMiddlewares,
]
