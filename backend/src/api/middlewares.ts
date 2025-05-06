import { defineMiddlewares } from "@medusajs/framework/http";
import { vendorMiddlewares } from "./vendor/middlewares";


export default defineMiddlewares({
    routes: [
        ...vendorMiddlewares,

    ]
})






