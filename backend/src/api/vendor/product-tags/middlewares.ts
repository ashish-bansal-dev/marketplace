import * as QueryConfig from "./query-config"
import { MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import {
  AdminCreateProductTag,
  AdminGetProductTagParams,
  AdminGetProductTagsParams,
  AdminUpdateProductTag,
} from "./validators"

export const adminProductTagRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/product-tags",
    middlewares: [
      validateAndTransformQuery(
        AdminGetProductTagsParams,
        QueryConfig.listProductTagsTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/product-tags/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetProductTagParams,
        QueryConfig.retrieveProductTagTransformQueryConfig
      ),
    ],
  },
  // Create/update/delete methods are new in v2
  {
    method: ["POST"],
    matcher: "/vendor/product-tags",
    middlewares: [
      validateAndTransformBody(AdminCreateProductTag),
      validateAndTransformQuery(
        AdminGetProductTagParams,
        QueryConfig.retrieveProductTagTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/product-tags/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateProductTag),
      validateAndTransformQuery(
        AdminGetProductTagParams,
        QueryConfig.retrieveProductTagTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/product-tags/:id",
    middlewares: [],
  },
]
