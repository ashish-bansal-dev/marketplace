import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"

import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { stockLocationsQueryKeys } from "./stock-locations"

const SHIPPING_OPTIONS_QUERY_KEY = "shipping_options" as const
export const shippingOptionsQueryKeys = queryKeysFactory(
  SHIPPING_OPTIONS_QUERY_KEY
)

export const useShippingOption = (
  id: string,
  query?: Record<string, any>,
  options?: UseQueryOptions<
    HttpTypes.AdminShippingOptionResponse,
    Error,
    HttpTypes.AdminShippingOptionResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/shipping-options/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminShippingOptionResponse>,
    queryKey: shippingOptionsQueryKeys.detail(id),
    ...options,
  })

  return { ...data, ...rest }
}

export const useShippingOptions = (
  query?: HttpTypes.AdminShippingOptionListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminShippingOptionListResponse,
      FetchError,
      HttpTypes.AdminShippingOptionListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/shipping-options`, {
        query,
      }) as Promise<HttpTypes.AdminShippingOptionListResponse>,
    queryKey: shippingOptionsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateShippingOptions = (
  options?: UseMutationOptions<
    HttpTypes.AdminShippingOptionResponse,
    FetchError,
    HttpTypes.AdminCreateShippingOption
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/shipping-options`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminShippingOptionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: shippingOptionsQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateShippingOptions = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminShippingOptionResponse,
    FetchError,
    HttpTypes.AdminUpdateShippingOption
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/shipping-options/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminShippingOptionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: shippingOptionsQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteShippingOption = (
  optionId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminShippingOptionDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/shipping-options/${optionId}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminShippingOptionDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.all,
      })
      queryClient.invalidateQueries({
        queryKey: shippingOptionsQueryKeys.all,
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
