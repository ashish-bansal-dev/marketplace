import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework"
import { maybeApplyLinkFilter, MiddlewareRoute } from "@medusajs/framework/http"
import { DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT } from "../../utils/middlewares"
import * as QueryConfig from "./query-config"
import {
  AdminBatchInventoryItemLevels,
  AdminBatchInventoryItemLocationsLevel,
  AdminCreateInventoryItem,
  AdminCreateInventoryLocationLevel,
  AdminGetInventoryItemParams,
  AdminGetInventoryItemsParams,
  AdminGetInventoryLocationLevelParams,
  AdminGetInventoryLocationLevelsParams,
  AdminUpdateInventoryItem,
  AdminUpdateInventoryLocationLevel,
} from "./validators"
import { filterBySellerId } from "#/shared/infra/http/middlewares/filter-by-seller-id";
import sellerInventoryItemLink from "../../../links/seller-inventory-item";

export const adminInventoryRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/vendor/inventory-items",
    middlewares: [
      validateAndTransformQuery(
        AdminGetInventoryItemsParams,
        QueryConfig.listTransformQueryConfig
      ),
      filterBySellerId(),
      maybeApplyLinkFilter({
        entryPoint: sellerInventoryItemLink.entryPoint,
        resourceId: "inventory_item_id",
        filterableField: "seller_id",
      }),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/inventory-items/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items",
    middlewares: [
      validateAndTransformBody(AdminCreateInventoryItem),
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/batch",
    bodyParser: {
      sizeLimit: DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
    },
    middlewares: [validateAndTransformBody(AdminBatchInventoryItemLevels)],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/location-levels/batch",
    bodyParser: {
      sizeLimit: DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
    },
    middlewares: [validateAndTransformBody(AdminBatchInventoryItemLevels)],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/:id",
    middlewares: [
      validateAndTransformBody(AdminUpdateInventoryItem),
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/vendor/inventory-items/:id/location-levels",
    middlewares: [
      validateAndTransformQuery(
        AdminGetInventoryLocationLevelsParams,
        QueryConfig.listLocationLevelsTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/:id/location-levels",
    middlewares: [
      validateAndTransformBody(AdminCreateInventoryLocationLevel),
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/:id/location-levels/batch",
    bodyParser: {
      sizeLimit: DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
    },
    middlewares: [
      validateAndTransformBody(AdminBatchInventoryItemLocationsLevel),
      validateAndTransformQuery(
        AdminGetInventoryLocationLevelParams,
        QueryConfig.retrieveLocationLevelsTransformQueryConfig
      ),
    ],
  },
  {
    method: ["DELETE"],
    matcher: "/vendor/inventory-items/:id/location-levels/:location_id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/vendor/inventory-items/:id/location-levels/:location_id",
    middlewares: [
      validateAndTransformBody(AdminUpdateInventoryLocationLevel),
      validateAndTransformQuery(
        AdminGetInventoryItemParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
]
