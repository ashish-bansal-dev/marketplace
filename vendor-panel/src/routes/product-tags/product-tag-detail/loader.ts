import { LoaderFunctionArgs } from "react-router-dom";

import { productTagsQueryKeys } from "../../../hooks/api";
import { sdk } from "../../../lib/client";
import { queryClient } from "../../../lib/query-client";

const productTagDetailQuery = (id: string) => ({
  queryKey: productTagsQueryKeys.detail(id),
  queryFn: async () => sdk.vendor.productTag.retrieve(id),
});

export const productTagLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const query = productTagDetailQuery(id!);

  return queryClient.ensureQueryData(query);
};
