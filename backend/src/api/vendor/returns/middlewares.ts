import { MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import * as QueryConfig from "./query-config"
import {
  AdminGetOrdersOrderParams,
  AdminGetOrdersParams,
  AdminPostCancelReturnReqSchema,
  AdminPostReceiveReturnItemsReqSchema,
  AdminPostReceiveReturnsReqSchema,
  AdminPostReturnsConfirmRequestReqSchema,
  AdminPostReturnsReqSchema,
  AdminPostReturnsRequestItemsActionReqSchema,
  AdminPostReturnsRequestItemsReqSchema,
  AdminPostReturnsReturnReqSchema,
  AdminPostReturnsShippingActionReqSchema,
  AdminPostReturnsShippingReqSchema,
} from "./validators"

export const adminReturnRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/returns",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/returns/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsReturnReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/request-items",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsRequestItemsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/request-items/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsRequestItemsActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/request-items/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/shipping-method",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsShippingReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/shipping-method/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsShippingActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/shipping-method/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/request",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsConfirmRequestReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/cancel",
    middlewares: [
      validateAndTransformBody(AdminPostCancelReturnReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/request",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/receive",
    middlewares: [
      validateAndTransformBody(AdminPostReceiveReturnsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/receive",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/receive/confirm",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsConfirmRequestReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/receive-items",
    middlewares: [
      validateAndTransformBody(AdminPostReceiveReturnItemsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/receive-items/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsRequestItemsActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/receive-items/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/dismiss-items",
    middlewares: [
      validateAndTransformBody(AdminPostReceiveReturnItemsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/returns/:id/dismiss-items/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostReturnsRequestItemsActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/returns/:id/dismiss-items/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
