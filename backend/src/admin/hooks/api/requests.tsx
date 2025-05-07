import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";


import { api } from "../../lib/client";
import { queryKeysFactory } from "../../lib/query-keys-factory";

export const requestsQueryKeys = queryKeysFactory("requests");

export const useVendorRequests = (
  query: any,
  options?: any,
) => {
  const { data, ...other } = useQuery({
    queryKey: requestsQueryKeys.list(query),
    queryFn: () => api.client.fetch("admin/requests", {
      method: "GET",
      query,
    }),
    ...options,
  })
  return { ...data, ...other };
};

export const useVendorRequest = (
  id: string,
  options?: Omit<
    UseQueryOptions<unknown, Error, { request?: any }, QueryKey>,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...other } = useQuery({
    queryKey: requestsQueryKeys.detail(id),
    queryFn: () => api.client.fetch(`admin/requests/${id}`, {
      method: "GET",
    }).then((res) => res.data),
    ...options,
  });

  return { ...data, ...other };
};

export const useReviewRequest = (
  options: UseMutationOptions<
    { id?: string; status?: string },
    Error,
    { id: string; payload: any }
  >,
) => {
  return useMutation({
    mutationFn: ({ id, payload }) =>
      api.client.fetch(`admin/requests/${id}`, {
        method: "POST",
        body: payload,
      }).then((res) => res.data),
    ...options,
  });
};
