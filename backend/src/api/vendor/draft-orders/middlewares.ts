import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import { MiddlewareRoute } from "@medusajs/framework/http"
import * as QueryConfig from "./query-config"
import {
  AdminAddDraftOrderItems,
  AdminAddDraftOrderPromotions,
  AdminAddDraftOrderShippingMethod,
  AdminCreateDraftOrder,
  AdminGetDraftOrderParams,
  AdminGetDraftOrdersParams,
  AdminRemoveDraftOrderPromotions,
  AdminUpdateDraftOrder,
  AdminUpdateDraftOrderActionItem,
  AdminUpdateDraftOrderActionShippingMethod,
  AdminUpdateDraftOrderItem,
  AdminUpdateDraftOrderShippingMethod,
} from "./validators"

export const adminDraftOrderRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/draft-orders",
    middlewares: [
      validateAndTransformQuery(
        AdminGetDraftOrdersParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/draft-orders/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetDraftOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders",
    middlewares: [
      validateAndTransformBody(AdminCreateDraftOrder),
      validateAndTransformQuery(
        AdminGetDraftOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateDraftOrder),
      validateAndTransformQuery(
        AdminGetDraftOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/convert-to-order",
    middlewares: [
      validateAndTransformQuery(
        AdminGetDraftOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/items",
    middlewares: [validateAndTransformBody(AdminAddDraftOrderItems)],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/items/item/:item_id",
    middlewares: [validateAndTransformBody(AdminUpdateDraftOrderItem)],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/items/:action_id",
    middlewares: [validateAndTransformBody(AdminUpdateDraftOrderActionItem)],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/promotions",
    middlewares: [validateAndTransformBody(AdminAddDraftOrderPromotions)],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/draft-orders/:id/edit/promotions",
    middlewares: [validateAndTransformBody(AdminRemoveDraftOrderPromotions)],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/shipping-methods",
    middlewares: [validateAndTransformBody(AdminAddDraftOrderShippingMethod)],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/shipping-methods/method/:method_id",
    middlewares: [
      validateAndTransformBody(AdminUpdateDraftOrderShippingMethod),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/draft-orders/:id/edit/shipping-methods/:action_id",
    middlewares: [
      validateAndTransformBody(AdminUpdateDraftOrderActionShippingMethod),
    ],
  },
]
