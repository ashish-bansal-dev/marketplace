import { MiddlewareRoute } from "@medusajs/framework/http"
import { validateAndTransformBody } from "@medusajs/framework"
import {
  AdminPostOrderEditsAddItemsReqSchema,
  AdminPostOrderEditsItemsActionReqSchema,
  AdminPostOrderEditsReqSchema,
  AdminPostOrderEditsShippingActionReqSchema,
  AdminPostOrderEditsShippingReqSchema,
  AdminPostOrderEditsUpdateItemQuantityReqSchema,
} from "./validators"

export const adminOrderEditRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/order-edits/:id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits",
    middlewares: [validateAndTransformBody(AdminPostOrderEditsReqSchema)],
  },

  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/items",
    middlewares: [
      validateAndTransformBody(AdminPostOrderEditsAddItemsReqSchema),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/items/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostOrderEditsItemsActionReqSchema),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/items/item/:item_id",
    middlewares: [
      validateAndTransformBody(AdminPostOrderEditsUpdateItemQuantityReqSchema),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/order-edits/:id/items/:action_id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/shipping-method",
    middlewares: [
      validateAndTransformBody(AdminPostOrderEditsShippingReqSchema),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/shipping-method/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostOrderEditsShippingActionReqSchema),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/order-edits/:id/shipping-method/:action_id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/confirm",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/order-edits/:id/request",
    middlewares: [],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/order-edits/:id",
    middlewares: [],
  },
]
