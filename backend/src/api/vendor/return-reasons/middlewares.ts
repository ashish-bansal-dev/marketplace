import { MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import * as QueryConfig from "./query-config"
import {
  AdminCreateReturnReason,
  AdminGetReturnReasonsParams,
  AdminGetReturnReasonsReturnReasonParams,
  AdminUpdateReturnReason,
} from "./validators"

export const adminReturnReasonRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/return-reasons",
    middlewares: [
      validateAndTransformQuery(
        AdminGetReturnReasonsParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/return-reasons/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetReturnReasonsReturnReasonParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/return-reasons",
    middlewares: [
      validateAndTransformBody(AdminCreateReturnReason),
      validateAndTransformQuery(
        AdminGetReturnReasonsReturnReasonParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/return-reasons/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateReturnReason),
      validateAndTransformQuery(
        AdminGetReturnReasonsReturnReasonParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/return-reasons/:id",
  },
]
