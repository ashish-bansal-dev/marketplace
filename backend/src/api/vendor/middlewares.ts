import { authenticate, MiddlewareRoute } from "@medusajs/framework/http";
import { vendorApiKeyRoutesMiddlewares } from "./api-keys/middlewares";
import { vendorCampaignRoutesMiddlewares } from "./campaigns/middlewares";
import { vendorClaimRoutesMiddlewares } from "./claims/middlewares";
import { vendorCollectionRoutesMiddlewares } from "./collections/middlewares";
import { vendorCors } from "./cors";
import { vendorCurrencyRoutesMiddlewares } from "./currencies/middlewares";
import { vendorCustomerGroupRoutesMiddlewares } from "./customer-groups/middlewares";
import { vendorCustomerRoutesMiddlewares } from "./customers/middlewares";
import { vendorDraftOrderRoutesMiddlewares } from "./draft-orders/middlewares";
import { vendorExchangeRoutesMiddlewares } from "./exchanges/middlewares";
import { vendorFulfillmentProvidersRoutesMiddlewares } from "./fulfillment-providers/middlewares";
import { vendorFulfillmentSetsRoutesMiddlewares } from "./fulfillment-sets/middlewares";
import { vendorFulfillmentsRoutesMiddlewares } from "./fulfillments/middlewares";
import { vendorInventoryRoutesMiddlewares } from "./inventory-items/middlewares";
import { vendorMeMiddlewares } from "./me/middlewares";
import { vendorMembersMiddlewares } from "./members/middlewares";
import { vendorNotificationRoutesMiddlewares } from "./notifications/middlewares";
import { vendorOrderEditRoutesMiddlewares } from "./order-edits/middlewares";
import { vendorOrderRoutesMiddlewares } from "./orders/middlewares";
import { vendorPaymentCollectionsMiddlewares } from "./payment-collections/middlewares";
import { vendorPaymentRoutesMiddlewares } from "./payments/middlewares";
import { vendorPriceListsRoutesMiddlewares } from "./price-lists/middlewares";
import { vendorPricePreferencesRoutesMiddlewares } from "./price-preferences/middlewares";
import { vendorProductCategoryRoutesMiddlewares } from "./product-categories/middlewares";
import { vendorProductRoutesMiddlewares } from "./products/middlewares";
import { vendorProductTagRoutesMiddlewares } from "./product-tags/middlewares";
import { vendorProductTypeRoutesMiddlewares } from "./product-types/middlewares";
import { vendorProductVariantRoutesMiddlewares } from "./product-variants/middlewares";
import { vendorPromotionRoutesMiddlewares } from "./promotions/middlewares";
import { vendorRefundReasonsRoutesMiddlewares } from "./refund-reasons/middlewares";
import { vendorRegionRoutesMiddlewares } from "./regions/middlewares";
import { vendorRequestsMiddlewares } from "./requests/middlewares";
import { vendorReservationRoutesMiddlewares } from "./reservations/middlewares";
import { vendorReturnReasonRoutesMiddlewares } from "./return-reasons/middlewares";
import { vendorReturnRoutesMiddlewares } from "./returns/middlewares";
import { vendorSalesChannelRoutesMiddlewares } from "./sales-channels/middlewares";
import { vendorSellersMiddlewares } from "./sellers/middlewares";
import { vendorShippingOptionRoutesMiddlewares } from "./shipping-options/middlewares";
import { vendorShippingProfilesMiddlewares } from "./shipping-profiles/middlewares";
import { vendorStockLocationRoutesMiddlewares } from "./stock-locations/middlewares";
import { vendorStoreRoutesMiddlewares } from "./stores/middlewares";
import { vendorTaxRateRoutesMiddlewares } from "./tax-rates/middlewares";
import { vendorTaxRegionRoutesMiddlewares } from "./tax-regions/middlewares";
import { vendorUploadRoutesMiddlewares } from "./uploads/middlewares";
import { vendorUserRoutesMiddlewares } from "./users/middlewares";
import { vendorWorkflowsExecutionsMiddlewares } from "./workflows-executions/middlewares";

export const vendorMiddlewares: MiddlewareRoute[] = [
    {
        matcher: "/vendor*",
        middlewares: [vendorCors],
    },
    {
        matcher: "/vendor*",
        middlewares: [authenticate("seller", ["session", "bearer"])],
    },
    ...vendorApiKeyRoutesMiddlewares,
    ...vendorCampaignRoutesMiddlewares,
    ...vendorClaimRoutesMiddlewares,
    ...vendorCollectionRoutesMiddlewares,
    ...vendorCurrencyRoutesMiddlewares,
    ...vendorCustomerGroupRoutesMiddlewares,
    ...vendorCustomerRoutesMiddlewares,
    ...vendorDraftOrderRoutesMiddlewares,
    ...vendorExchangeRoutesMiddlewares,
    ...vendorFulfillmentProvidersRoutesMiddlewares,
    ...vendorFulfillmentSetsRoutesMiddlewares,
    ...vendorFulfillmentsRoutesMiddlewares,
    ...vendorInventoryRoutesMiddlewares,
    ...vendorMeMiddlewares,
    ...vendorMembersMiddlewares,
    ...vendorNotificationRoutesMiddlewares,
    ...vendorOrderEditRoutesMiddlewares,
    ...vendorOrderRoutesMiddlewares,
    ...vendorPaymentCollectionsMiddlewares,
    ...vendorPaymentRoutesMiddlewares,
    ...vendorPriceListsRoutesMiddlewares,
    ...vendorPricePreferencesRoutesMiddlewares,
    ...vendorProductCategoryRoutesMiddlewares,
    ...vendorProductRoutesMiddlewares,
    ...vendorProductTagRoutesMiddlewares,
    ...vendorProductTypeRoutesMiddlewares,
    ...vendorProductVariantRoutesMiddlewares,
    ...vendorPromotionRoutesMiddlewares,
    ...vendorRefundReasonsRoutesMiddlewares,
    ...vendorRegionRoutesMiddlewares,
    ...vendorRequestsMiddlewares,
    ...vendorReservationRoutesMiddlewares,
    ...vendorReturnReasonRoutesMiddlewares,
    ...vendorReturnRoutesMiddlewares,
    ...vendorSalesChannelRoutesMiddlewares,
    ...vendorSellersMiddlewares,
    ...vendorShippingOptionRoutesMiddlewares,
    ...vendorShippingProfilesMiddlewares,
    ...vendorStockLocationRoutesMiddlewares,
    ...vendorStoreRoutesMiddlewares,
    ...vendorTaxRateRoutesMiddlewares,
    ...vendorTaxRegionRoutesMiddlewares,
    ...vendorUploadRoutesMiddlewares,
    ...vendorUserRoutesMiddlewares,
    ...vendorWorkflowsExecutionsMiddlewares,
]
