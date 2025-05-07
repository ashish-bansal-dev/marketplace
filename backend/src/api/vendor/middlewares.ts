import { authenticate, MiddlewareRoute } from "@medusajs/framework/http";
import { vendorCors } from "./cors";
import { vendorApiKeyRoutesMiddlewares } from "./api-keys/middlewares";
import { vendorSellersMiddlewares } from "./sellers/middlewares";
import { vendorStoreRoutesMiddlewares } from "./stores/middlewares";
import { vendorProductRoutesMiddlewares } from "./products/middlewares";
import { vendorProductTagRoutesMiddlewares } from "./product-tags/middlewares";
import { vendorProductTypeRoutesMiddlewares } from "./product-types/middlewares";
import { vendorProductCategoryRoutesMiddlewares } from "./product-categories/middlewares";
import { vendorCollectionRoutesMiddlewares } from "./collections/middlewares";
import { vendorFulfillmentSetsRoutesMiddlewares } from "./fulfillment-sets/middlewares";
import { vendorClaimRoutesMiddlewares } from "./claims/middlewares";
import { vendorMembersMiddlewares } from "./members/middlewares";
import { vendorMeMiddlewares } from "./me/middlewares";
import { vendorPaymentRoutesMiddlewares } from "./payments/middlewares";
import { vendorOrderRoutesMiddlewares } from "./orders/middlewares";
import { vendorPricePreferencesRoutesMiddlewares } from "./price-preferences/middlewares";
import { vendorPriceListsRoutesMiddlewares } from "./price-lists/middlewares";
import { vendorReservationRoutesMiddlewares } from "./reservations/middlewares";
import { vendorRequestsMiddlewares } from "./requests/middlewares";
import { vendorSalesChannelRoutesMiddlewares } from "./sales-channels/middlewares";
import { vendorShippingOptionRoutesMiddlewares } from "./shipping-options/middlewares";
import { vendorShippingProfilesMiddlewares } from "./shipping-profiles/middlewares";
import { vendorUploadRoutesMiddlewares } from "./uploads/middlewares";
import { vendorUserRoutesMiddlewares } from "./users/middlewares";
import { vendorWorkflowsExecutionsMiddlewares } from "./workflows-executions/middlewares";
import { vendorTaxRegionRoutesMiddlewares } from "./tax-regions/middlewares";
import { vendorTaxRateRoutesMiddlewares } from "./tax-rates/middlewares";
import { vendorRefundReasonsRoutesMiddlewares } from "./refund-reasons/middlewares";
import { vendorStockLocationRoutesMiddlewares } from "./stock-locations/middlewares";
import { vendorReturnReasonRoutesMiddlewares } from "./return-reasons/middlewares";
import { vendorReturnRoutesMiddlewares } from "./returns/middlewares";
import { vendorProductVariantRoutesMiddlewares } from "./product-variants/middlewares";
import { vendorPromotionRoutesMiddlewares } from "./promotions/middlewares";
import { vendorRegionRoutesMiddlewares } from "./regions/middlewares";
import { vendorOrderEditRoutesMiddlewares } from "./order-edits/middlewares";
import { vendorPaymentCollectionsMiddlewares } from "./payment-collections/middlewares";
import { vendorNotificationRoutesMiddlewares } from "./notifications/middlewares";
import { vendorCurrencyRoutesMiddlewares } from "./currencies/middlewares";
import { vendorExchangeRoutesMiddlewares } from "./exchanges/middlewares";
import { vendorDraftOrderRoutesMiddlewares } from "./draft-orders/middlewares";
import { vendorInventoryRoutesMiddlewares } from "./inventory-items/middlewares";
import { vendorFulfillmentsRoutesMiddlewares } from "./fulfillments/middlewares";
import { vendorCustomerGroupRoutesMiddlewares } from "./customer-groups/middlewares";
import { vendorCustomerRoutesMiddlewares } from "./customers/middlewares";
import { vendorCampaignRoutesMiddlewares } from "./campaigns/middlewares";
import { vendorFulfillmentProvidersRoutesMiddlewares } from "./fulfillment-providers/middlewares";

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
    ...vendorSellersMiddlewares,
    ...vendorStoreRoutesMiddlewares,
    ...vendorProductRoutesMiddlewares,
    ...vendorProductTagRoutesMiddlewares,
    ...vendorProductTypeRoutesMiddlewares,
    ...vendorProductCategoryRoutesMiddlewares,
    ...vendorCollectionRoutesMiddlewares,
    ...vendorFulfillmentSetsRoutesMiddlewares,
    ...vendorClaimRoutesMiddlewares,
    ...vendorMembersMiddlewares,
    ...vendorMeMiddlewares,
    ...vendorPaymentRoutesMiddlewares,
    ...vendorOrderRoutesMiddlewares,
    ...vendorPricePreferencesRoutesMiddlewares,
    ...vendorPriceListsRoutesMiddlewares,
    ...vendorReservationRoutesMiddlewares,
    ...vendorRequestsMiddlewares,
    ...vendorSalesChannelRoutesMiddlewares,
    ...vendorShippingOptionRoutesMiddlewares,
    ...vendorShippingProfilesMiddlewares,
    ...vendorUploadRoutesMiddlewares,
    ...vendorUserRoutesMiddlewares,
    ...vendorWorkflowsExecutionsMiddlewares,
    ...vendorTaxRegionRoutesMiddlewares,
    ...vendorTaxRateRoutesMiddlewares,
    ...vendorRefundReasonsRoutesMiddlewares,
    ...vendorStockLocationRoutesMiddlewares,
    ...vendorReturnReasonRoutesMiddlewares,
    ...vendorReturnRoutesMiddlewares,
    ...vendorProductVariantRoutesMiddlewares,
    ...vendorPromotionRoutesMiddlewares,
    ...vendorRegionRoutesMiddlewares,
    ...vendorOrderEditRoutesMiddlewares,
    ...vendorPaymentCollectionsMiddlewares,
    ...vendorNotificationRoutesMiddlewares,
    ...vendorCurrencyRoutesMiddlewares,
    ...vendorExchangeRoutesMiddlewares,
    ...vendorDraftOrderRoutesMiddlewares,
    ...vendorInventoryRoutesMiddlewares,
    ...vendorFulfillmentsRoutesMiddlewares,
    ...vendorCustomerGroupRoutesMiddlewares,
    ...vendorCustomerRoutesMiddlewares,
    ...vendorCampaignRoutesMiddlewares,
    ...vendorFulfillmentProvidersRoutesMiddlewares,
]
