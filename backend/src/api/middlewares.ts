import { defineMiddlewares } from "@medusajs/framework/http";
import { vendorMiddlewares } from "./vendor/middlewares";
import { adminMiddlewares } from "./admin/middlewares";

export default defineMiddlewares({
    routes: [
        ...adminMiddlewares,
        ...vendorMiddlewares,

    ]
})






