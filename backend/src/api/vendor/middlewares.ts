import { authenticate, MiddlewareRoute } from "@medusajs/framework/http";
import { adminApiKeyRoutesMiddlewares } from "./api-keys/middlewares";
import { adminCampaignRoutesMiddlewares } from "./campaigns/middlewares";
import { adminClaimRoutesMiddlewares } from "./claims/middlewares";
import { adminCollectionRoutesMiddlewares } from "./collections/middlewares";
import { adminCurrencyRoutesMiddlewares } from "./currencies/middlewares";
import { adminCustomerGroupRoutesMiddlewares } from "./customer-groups/middlewares";
import { adminCustomerRoutesMiddlewares } from "./customers/middlewares";
import { adminDraftOrderRoutesMiddlewares } from "./draft-orders/middlewares";
import { adminExchangeRoutesMiddlewares } from "./exchanges/middlewares";
import { adminFulfillmentProvidersRoutesMiddlewares } from "./fulfillment-providers/middlewares";
import { adminFulfillmentSetsRoutesMiddlewares } from "./fulfillment-sets/middlewares";
import { adminFulfillmentsRoutesMiddlewares } from "./fulfillments/middlewares";
import { adminInventoryRoutesMiddlewares } from "./inventory-items/middlewares";
import { adminInviteRoutesMiddlewares } from "./invites/middlewares";
import { adminNotificationRoutesMiddlewares } from "./notifications/middlewares";
import { adminOrderEditRoutesMiddlewares } from "./order-edits/middlewares";
import { adminOrderRoutesMiddlewares } from "./orders/middlewares";
import { adminPaymentCollectionsMiddlewares } from "./payment-collections/middlewares";
import { adminPaymentRoutesMiddlewares } from "./payments/middlewares";
import { adminPriceListsRoutesMiddlewares } from "./price-lists/middlewares";
import { adminPricePreferencesRoutesMiddlewares } from "./price-preferences/middlewares";
import { adminProductCategoryRoutesMiddlewares } from "./product-categories/middlewares";
import { adminProductTagRoutesMiddlewares } from "./product-tags/middlewares";
import { adminProductTypeRoutesMiddlewares } from "./product-types/middlewares";
import { adminProductVariantRoutesMiddlewares } from "./product-variants/middlewares";
import { adminProductRoutesMiddlewares } from "./products/middlewares";
import { adminPromotionRoutesMiddlewares } from "./promotions/middlewares";
import { adminRefundReasonsRoutesMiddlewares } from "./refund-reasons/middlewares";
import { adminRegionRoutesMiddlewares } from "./regions/middlewares";
import { adminReservationRoutesMiddlewares } from "./reservations/middlewares";
import { adminReturnReasonRoutesMiddlewares } from "./return-reasons/middlewares";
import { adminReturnRoutesMiddlewares } from "./returns/middlewares";
import { adminSalesChannelRoutesMiddlewares } from "./sales-channels/middlewares";
import { adminShippingOptionRoutesMiddlewares } from "./shipping-options/middlewares";
import { adminShippingProfilesMiddlewares } from "./shipping-profiles/middlewares";
import { adminStockLocationRoutesMiddlewares } from "./stock-locations/middlewares";
import { adminStoreRoutesMiddlewares } from "./stores/middlewares";
import { adminTaxRateRoutesMiddlewares } from "./tax-rates/middlewares";
import { adminTaxRegionRoutesMiddlewares } from "./tax-regions/middlewares";
import { adminTaxProviderRoutesMiddlewares } from "./tax-providers/middlewares";
import { adminUploadRoutesMiddlewares } from "./uploads/middlewares";
import { adminUserRoutesMiddlewares } from "./users/middlewares";
import { adminWorkflowsExecutionsMiddlewares } from "./workflows-executions/middlewares";
import { vendorCors } from "./cors";

import { vendorSellersMiddlewares } from "./sellers/middlewares";
import { unlessBaseUrl } from "#/shared/infra/http/utils/unless-base-url";
import { checkSellerActive } from "#/shared/infra/http/middlewares/check-seller-active";

export const vendorMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/vendor*",
    middlewares: [vendorCors],
  },
  {
    matcher: "/vendor/sellers",
    middlewares: [
      authenticate("seller", ["bearer", "session"], {
        allowUnregistered: true,
      }),
    ],
  },
  {
    matcher: '/vendor/*',
    middlewares: [
      // unlessBaseUrl(
      //   /^\/vendor\/(sellers|invites\/accept)$/,
      //   checkSellerActive(['bearer', 'session'])
      // ),
      unlessBaseUrl(
        /^\/vendor\/(sellers|invites\/accept)$/,
        authenticate('seller', ['bearer', 'session'], {
          allowUnregistered: false
        })
      )
    ]
  },
  ...adminCustomerGroupRoutesMiddlewares,
  ...adminCustomerRoutesMiddlewares,
  ...adminPromotionRoutesMiddlewares,
  ...adminCampaignRoutesMiddlewares,

  ...adminWorkflowsExecutionsMiddlewares,
  ...adminReturnRoutesMiddlewares,

  ...adminRegionRoutesMiddlewares,
  ...adminReturnRoutesMiddlewares,
  ...adminUserRoutesMiddlewares,
  ...adminInviteRoutesMiddlewares,
  ...adminTaxRateRoutesMiddlewares,
  ...adminTaxRegionRoutesMiddlewares,
  ...adminApiKeyRoutesMiddlewares,

  ...adminStoreRoutesMiddlewares,
  ...adminCurrencyRoutesMiddlewares,
  ...adminProductRoutesMiddlewares,
  ...adminPaymentRoutesMiddlewares,
  ...adminPriceListsRoutesMiddlewares,
  ...adminPricePreferencesRoutesMiddlewares,
  ...adminInventoryRoutesMiddlewares,
  ...adminCollectionRoutesMiddlewares,
  ...adminShippingOptionRoutesMiddlewares,
  ...adminDraftOrderRoutesMiddlewares,
  ...adminSalesChannelRoutesMiddlewares,
  ...adminStockLocationRoutesMiddlewares,
  ...adminProductTypeRoutesMiddlewares,
  ...adminProductTagRoutesMiddlewares,
  ...adminUploadRoutesMiddlewares,
  ...adminFulfillmentSetsRoutesMiddlewares,
  ...adminNotificationRoutesMiddlewares,
  ...adminOrderRoutesMiddlewares,
  ...adminReservationRoutesMiddlewares,
  ...adminProductCategoryRoutesMiddlewares,
  ...adminShippingProfilesMiddlewares,
  ...adminFulfillmentsRoutesMiddlewares,
  ...adminFulfillmentProvidersRoutesMiddlewares,

  ...adminReturnReasonRoutesMiddlewares,
  ...adminClaimRoutesMiddlewares,
  ...adminRefundReasonsRoutesMiddlewares,
  ...adminExchangeRoutesMiddlewares,
  ...adminProductVariantRoutesMiddlewares,
  ...adminTaxProviderRoutesMiddlewares,
  ...adminOrderEditRoutesMiddlewares,
  ...adminPaymentCollectionsMiddlewares,

  ...vendorSellersMiddlewares,
];
