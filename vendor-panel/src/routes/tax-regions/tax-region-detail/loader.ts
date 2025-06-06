import { LoaderFunctionArgs } from "react-router-dom";
import { taxRegionsQueryKeys } from "../../../hooks/api/tax-regions";
import { sdk } from "../../../lib/client";
import { queryClient } from "../../../lib/query-client";

const taxRegionDetailQuery = (id: string) => ({
  queryKey: taxRegionsQueryKeys.detail(id),
  queryFn: async () => sdk.vendor.taxRegion.retrieve(id),
});

export const taxRegionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const query = taxRegionDetailQuery(id!);

  return queryClient.ensureQueryData(query);
};
