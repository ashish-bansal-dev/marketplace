import * as QueryConfig from "./query-config"

import {
  AdminCreateInvite,
  AdminGetInviteAcceptParams,
  AdminGetInviteParams,
  AdminGetInvitesParams,
  AdminInviteAccept,
} from "./validators"

import { authenticate, MiddlewareRoute } from "@medusajs/framework/http"
import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"

// TODO: Due to issues with our routing (and using router.use for applying middlewares), we have to opt-out of global auth in all routes, and then reapply it here.
// See https://medusacorp.slack.com/archives/C025KMS13SA/p1716455350491879 for details.
export const adminInviteRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/invites",
    middlewares: [
      authenticate("user", ["session", "bearer", "api-key"]),
      validateAndTransformQuery(
        AdminGetInvitesParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/invites",
    middlewares: [
      authenticate("user", ["session", "bearer", "api-key"]),
      validateAndTransformBody(AdminCreateInvite),
      validateAndTransformQuery(
        AdminGetInviteParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: "POST",
    matcher: "/vendor/invites/accept",
    middlewares: [
      authenticate("user", ["session", "bearer"], {
        allowUnregistered: true,
      }),
      validateAndTransformBody(AdminInviteAccept),
      validateAndTransformQuery(
        AdminGetInviteAcceptParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/invites/:id",
    middlewares: [
      authenticate("user", ["session", "bearer", "api-key"]),
      validateAndTransformQuery(
        AdminGetInviteParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/invites/:id",
    middlewares: [authenticate("user", ["session", "bearer", "api-key"])],
  },
  {
    method: "POST",
    matcher: "/vendor/invites/:id/resend",
    middlewares: [
      authenticate("user", ["session", "bearer", "api-key"]),
      validateAndTransformQuery(
        AdminGetInviteParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
