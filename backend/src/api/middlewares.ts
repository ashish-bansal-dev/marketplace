import { defineMiddlewares } from "../utils/define-middlewares"
import { vendorMiddlewares } from "./vendor/middlewares"


export default defineMiddlewares([
    ...vendorMiddlewares
])
