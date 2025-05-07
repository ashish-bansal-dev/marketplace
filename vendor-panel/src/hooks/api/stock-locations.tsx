import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query"

import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { fulfillmentProvidersQueryKeys } from "./fulfillment-providers"

const STOCK_LOCATIONS_QUERY_KEY = "stock_locations" as const
export const stockLocationsQueryKeys = queryKeysFactory(
  STOCK_LOCATIONS_QUERY_KEY
)

export const useStockLocation = (
  id: string,
  query?: HttpTypes.SelectParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminStockLocationResponse,
      FetchError,
      HttpTypes.AdminStockLocationResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/stock-locations/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminStockLocationResponse>,
    queryKey: stockLocationsQueryKeys.detail(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useStockLocations = (
  query?: HttpTypes.AdminStockLocationListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminStockLocationListResponse,
      FetchError,
      HttpTypes.AdminStockLocationListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/stock-locations`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminStockLocationListResponse>,
    queryKey: stockLocationsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateStockLocation = (
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationResponse,
    FetchError,
    HttpTypes.AdminCreateStockLocation
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/stock-locations`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminStockLocationResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateStockLocation = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationResponse,
    FetchError,
    HttpTypes.AdminUpdateStockLocation
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/stock-locations/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminStockLocationResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.details(),
      })
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateStockLocationSalesChannels = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationResponse,
    FetchError,
    HttpTypes.AdminUpdateStockLocationSalesChannels
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/stock-locations/${id}/sales-channels`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminStockLocationResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.details(),
      })
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteStockLocation = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/stock-locations/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminStockLocationDeleteResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.lists(),
      })
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreateStockLocationFulfillmentSet = (
  locationId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationResponse,
    FetchError,
    HttpTypes.AdminCreateStockLocationFulfillmentSet
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/stock-locations/${locationId}/fulfillment-sets`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminStockLocationResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.all,
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateStockLocationFulfillmentProviders = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminStockLocationResponse,
    FetchError,
    HttpTypes.AdminBatchLink
  >
) => {
  return useMutation({
    mutationFn: async (payload) =>
      sdk.client.fetch(
        `/vendor/stock-locations/${id}/fulfillment-providers`,
        {
          method: "PUT",
          body: payload,
        }
      ) as Promise<HttpTypes.AdminStockLocationResponse>,
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: stockLocationsQueryKeys.details(),
      })
      await queryClient.invalidateQueries({
        queryKey: fulfillmentProvidersQueryKeys.all,
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
