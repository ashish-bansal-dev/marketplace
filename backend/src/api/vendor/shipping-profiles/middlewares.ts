import { MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import {
  listTransformQueryConfig,
  retrieveTransformQueryConfig,
} from "./query-config"
import {
  AdminCreateShippingProfile,
  AdminGetShippingProfileParams,
  AdminGetShippingProfilesParams,
  AdminUpdateShippingProfile,
} from "./validators"

export const adminShippingProfilesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/vendor/shipping-profiles",
    middlewares: [
      validateAndTransformBody(AdminCreateShippingProfile),
      validateAndTransformQuery(
        AdminGetShippingProfilesParams,
        retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/shipping-profiles",
    middlewares: [
      validateAndTransformQuery(
        AdminGetShippingProfilesParams,
        listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/shipping-profiles/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateShippingProfile),
      validateAndTransformQuery(
        AdminGetShippingProfileParams,
        retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/shipping-profiles/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetShippingProfileParams,
        retrieveTransformQueryConfig
      ),
    ],
  },
]
