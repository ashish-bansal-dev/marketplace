import { defineMiddlewares } from "../utils/define-middlewares"
import { adminApiKeyRoutesMiddlewares } from "./vendor/api-keys/middlewares"
import { adminCampaignRoutesMiddlewares } from "./vendor/campaigns/middlewares"
import { adminClaimRoutesMiddlewares } from "./vendor/claims/middlewares"
import { adminCollectionRoutesMiddlewares } from "./vendor/collections/middlewares"
import { adminCurrencyRoutesMiddlewares } from "./vendor/currencies/middlewares"
import { adminCustomerGroupRoutesMiddlewares } from "./vendor/customer-groups/middlewares"
import { adminCustomerRoutesMiddlewares } from "./vendor/customers/middlewares"
import { adminDraftOrderRoutesMiddlewares } from "./vendor/draft-orders/middlewares"
import { adminExchangeRoutesMiddlewares } from "./vendor/exchanges/middlewares"
import { adminFulfillmentProvidersRoutesMiddlewares } from "./vendor/fulfillment-providers/middlewares"
import { adminFulfillmentSetsRoutesMiddlewares } from "./vendor/fulfillment-sets/middlewares"
import { adminFulfillmentsRoutesMiddlewares } from "./vendor/fulfillments/middlewares"
import { adminInventoryRoutesMiddlewares } from "./vendor/inventory-items/middlewares"
import { adminInviteRoutesMiddlewares } from "./vendor/invites/middlewares"
import { adminNotificationRoutesMiddlewares } from "./vendor/notifications/middlewares"
import { adminOrderEditRoutesMiddlewares } from "./vendor/order-edits/middlewares"
import { adminOrderRoutesMiddlewares } from "./vendor/orders/middlewares"
import { adminPaymentCollectionsMiddlewares } from "./vendor/payment-collections/middlewares"
import { adminPaymentRoutesMiddlewares } from "./vendor/payments/middlewares"
import { adminPriceListsRoutesMiddlewares } from "./vendor/price-lists/middlewares"
import { adminPricePreferencesRoutesMiddlewares } from "./vendor/price-preferences/middlewares"
import { adminProductCategoryRoutesMiddlewares } from "./vendor/product-categories/middlewares"
import { adminProductTagRoutesMiddlewares } from "./vendor/product-tags/middlewares"
import { adminProductTypeRoutesMiddlewares } from "./vendor/product-types/middlewares"
import { adminProductVariantRoutesMiddlewares } from "./vendor/product-variants/middlewares"
import { adminProductRoutesMiddlewares } from "./vendor/products/middlewares"
import { adminPromotionRoutesMiddlewares } from "./vendor/promotions/middlewares"
import { adminRefundReasonsRoutesMiddlewares } from "./vendor/refund-reasons/middlewares"
import { adminRegionRoutesMiddlewares } from "./vendor/regions/middlewares"
import { adminReservationRoutesMiddlewares } from "./vendor/reservations/middlewares"
import { adminReturnReasonRoutesMiddlewares } from "./vendor/return-reasons/middlewares"
import { adminReturnRoutesMiddlewares } from "./vendor/returns/middlewares"
import { adminSalesChannelRoutesMiddlewares } from "./vendor/sales-channels/middlewares"
import { adminShippingOptionRoutesMiddlewares } from "./vendor/shipping-options/middlewares"
import { adminShippingProfilesMiddlewares } from "./vendor/shipping-profiles/middlewares"
import { adminStockLocationRoutesMiddlewares } from "./vendor/stock-locations/middlewares"
import { adminStoreRoutesMiddlewares } from "./vendor/stores/middlewares"
import { adminTaxRateRoutesMiddlewares } from "./vendor/tax-rates/middlewares"
import { adminTaxRegionRoutesMiddlewares } from "./vendor/tax-regions/middlewares"
import { adminTaxProviderRoutesMiddlewares } from "./vendor/tax-providers/middlewares"
import { adminUploadRoutesMiddlewares } from "./vendor/uploads/middlewares"
import { adminUserRoutesMiddlewares } from "./vendor/users/middlewares"
import { adminWorkflowsExecutionsMiddlewares } from "./vendor/workflows-executions/middlewares"


export default defineMiddlewares([
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
])
