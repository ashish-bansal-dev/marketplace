import { LoaderFunctionArgs } from "react-router-dom";
import { promotionsQueryKeys } from "../../../hooks/api/promotions";
import { sdk } from "../../../lib/client";
import { queryClient } from "../../../lib/query-client";

const promotionDetailQuery = (id: string) => ({
  queryKey: promotionsQueryKeys.detail(id),
  queryFn: async () => sdk.vendor.promotion.retrieve(id),
});

export const promotionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const query = promotionDetailQuery(id!);

  return queryClient.ensureQueryData(query);
};
