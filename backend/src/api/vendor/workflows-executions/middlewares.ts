import * as QueryConfig from "./query-config"

import {
  AdminCreateWorkflowsAsyncResponse,
  AdminCreateWorkflowsRun,
  AdminGetWorkflowExecutionDetailsParams,
  AdminGetWorkflowExecutionsParams,
} from "./validators"

import { MiddlewareRoute } from "@medusajs/framework/http"
import { validateAndTransformQuery } from "@medusajs/framework"
import { validateAndTransformBody } from "@medusajs/framework"

export const adminWorkflowsExecutionsMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/workflows-executions",
    middlewares: [
      validateAndTransformQuery(
        AdminGetWorkflowExecutionsParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/workflows-executions/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetWorkflowExecutionDetailsParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/workflows-executions/:workflow_id/:transaction_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetWorkflowExecutionDetailsParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/workflows-executions/:workflow_id/run",
    middlewares: [validateAndTransformBody(AdminCreateWorkflowsRun)],
  },
  {
    method: ["POST"],

    matcher: "/vendor/workflows-executions/:workflow_id/steps/success",
    middlewares: [validateAndTransformBody(AdminCreateWorkflowsAsyncResponse)],
  },
  {
    method: ["POST"],
    matcher: "/vendor/workflows-executions/:workflow_id/steps/failure",
    middlewares: [validateAndTransformBody(AdminCreateWorkflowsAsyncResponse)],
  },
]
