import { MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import * as QueryConfig from "./query-config"
import {
  AdminGetOrdersOrderParams,
  AdminGetOrdersParams,
  AdminPostCancelExchangeReqSchema,
  AdminPostExchangesAddItemsReqSchema,
  AdminPostExchangesItemsActionReqSchema,
  AdminPostExchangesRequestItemsReturnActionReqSchema,
  AdminPostExchangesReturnRequestItemsReqSchema,
  AdminPostExchangesShippingActionReqSchema,
  AdminPostExchangesShippingReqSchema,
  AdminPostOrderExchangesReqSchema,
} from "./validators"

export const adminExchangeRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/exchanges",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/exchanges/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges",
    middlewares: [
      validateAndTransformBody(AdminPostOrderExchangesReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/inbound/items",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesReturnRequestItemsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/inbound/items/:action_id",
    middlewares: [
      validateAndTransformBody(
        AdminPostExchangesRequestItemsReturnActionReqSchema
      ),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id/inbound/items/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/inbound/shipping-method",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesShippingReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/inbound/shipping-method/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesShippingActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id/inbound/shipping-method/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },

  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/outbound/items",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesAddItemsReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/outbound/items/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesItemsActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id/outbound/items/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/outbound/shipping-method",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesShippingReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/outbound/shipping-method/:action_id",
    middlewares: [
      validateAndTransformBody(AdminPostExchangesShippingActionReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id/outbound/shipping-method/:action_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/request",
    middlewares: [
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id/request",
    middlewares: [],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/exchanges/:id",
    middlewares: [],
  },
  {
    method: ["POST"],
    matcher: "/vendor/exchanges/:id/cancel",
    middlewares: [
      validateAndTransformBody(AdminPostCancelExchangeReqSchema),
      validateAndTransformQuery(
        AdminGetOrdersOrderParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
