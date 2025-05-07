import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  AdminOrderReturnRequest,
  AdminUpdateOrderReturnRequest,
  OrderReturnRequest,
} from "@mercurjs/http-client";

import { api } from "../../lib/client";
import { queryKeysFactory } from "../../lib/query-keys-factory";

export const configurationQueryKeys = queryKeysFactory("retunr-requests");

export const useReturnRequests = (
  query?: any,
  options?: Omit<
    UseQueryOptions<
      any,
      Error,
      { order_return_request: AdminOrderReturnRequest[]; count?: number },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...other } = useQuery({
    queryKey: configurationQueryKeys.list(query),
    queryFn: () =>
      api.client.fetch("admin/return-request", {
        method: "GET",
        query,
      }),
    ...options,
  });

  return { ...data, ...other };
};

export const useReviewReturnRequest = (
  options: UseMutationOptions<
    { orderReturnRequest?: OrderReturnRequest },
    Error,
    { id: string; payload: AdminUpdateOrderReturnRequest }
  >,
) => {
  return useMutation({
    mutationFn: ({ id, payload }) =>
      api.admin
        .adminUpdateOrderReturnRequestById(id, payload)
        .then((res) => res.data),
    ...options,
  });
};
