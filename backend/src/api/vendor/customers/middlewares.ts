import * as QueryConfig from "./query-config"

import {
  AdminCreateCustomer,
  AdminCreateCustomerAddress,
  AdminCustomerAddressesParams,
  AdminCustomerAddressParams,
  AdminCustomerParams,
  AdminCustomersParams,
  AdminUpdateCustomer,
  AdminUpdateCustomerAddress,
} from "./validators"

import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import { MiddlewareRoute } from "@medusajs/framework/http"
import { createLinkBody } from "../../utils/validators"

export const adminCustomerRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/customers",
    middlewares: [
      validateAndTransformQuery(
        AdminCustomersParams,
        QueryConfig.listTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/customers",
    middlewares: [
      validateAndTransformBody(AdminCreateCustomer),
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/customers/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/customers/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateCustomer),
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/customers/:id/addresses",
    middlewares: [
      validateAndTransformBody(AdminCreateCustomerAddress),
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/customers/:id/addresses/:address_id",
    middlewares: [
      validateAndTransformQuery(
        AdminCustomerAddressParams,
        QueryConfig.retrieveAddressTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/customers/:id/addresses/:address_id",
    middlewares: [
      validateAndTransformBody(AdminUpdateCustomerAddress),
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/customers/:id/addresses/:address_id",
    middlewares: [
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/customers/:id/addresses",
    middlewares: [
      validateAndTransformQuery(
        AdminCustomerAddressesParams,
        QueryConfig.listAddressesTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/customers/:id/customer-groups",
    middlewares: [
      validateAndTransformBody(createLinkBody()),
      validateAndTransformQuery(
        AdminCustomerParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
