import { defineMiddlewares } from "@medusajs/medusa";
import { vendorMiddlewares } from "./vendor/middlewares";
import { storeMiddlewares } from "./store/middlewares";
import { adminMiddlewares } from "./admin/middlewares";
import { hooksMiddlewares } from "./hooks/middlewares";

export default defineMiddlewares([
  ...vendorMiddlewares,
  ...storeMiddlewares,
  ...adminMiddlewares,
  ...hooksMiddlewares,
]);
