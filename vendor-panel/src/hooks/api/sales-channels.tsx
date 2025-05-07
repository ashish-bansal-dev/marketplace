import { FetchError } from "@medusajs/js-sdk"
import {
  AdminSalesChannelListResponse,
  AdminSalesChannelResponse,
  HttpTypes,
} from "@medusajs/types"
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { productsQueryKeys } from "./products"

const SALES_CHANNELS_QUERY_KEY = "sales-channels" as const
export const salesChannelsQueryKeys = queryKeysFactory(SALES_CHANNELS_QUERY_KEY)

export const useSalesChannel = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      AdminSalesChannelResponse,
      FetchError,
      AdminSalesChannelResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: salesChannelsQueryKeys.detail(id),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/sales-channels/${id}`, {
        method: "GET",
      }) as Promise<HttpTypes.AdminSalesChannelResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useSalesChannels = (
  query?: HttpTypes.AdminSalesChannelListParams,
  options?: Omit<
    UseQueryOptions<
      AdminSalesChannelListResponse,
      FetchError,
      AdminSalesChannelListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/sales-channels`, {
        query,
      }) as Promise<HttpTypes.AdminSalesChannelListResponse>,
    queryKey: salesChannelsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateSalesChannel = (
  options?: UseMutationOptions<
    AdminSalesChannelResponse,
    FetchError,
    HttpTypes.AdminCreateSalesChannel
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/sales-channels`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminSalesChannelResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateSalesChannel = (
  id: string,
  options?: UseMutationOptions<
    AdminSalesChannelResponse,
    FetchError,
    HttpTypes.AdminUpdateSalesChannel
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/sales-channels/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminSalesChannelResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteSalesChannel = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminSalesChannelDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/sales-channels/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminSalesChannelDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.detail(id),
      })

      // Invalidate all products to ensure they are updated if they were linked to the sales channel
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.all,
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteSalesChannelLazy = (
  options?: UseMutationOptions<
    HttpTypes.AdminSalesChannelDeleteResponse,
    FetchError,
    string
  >
) => {
  return useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/vendor/sales-channels/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminSalesChannelDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.detail(variables),
      })

      // Invalidate all products to ensure they are updated if they were linked to the sales channel
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.all,
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useSalesChannelRemoveProducts = (
  id: string,
  options?: UseMutationOptions<
    AdminSalesChannelResponse,
    FetchError,
    HttpTypes.AdminBatchLink["remove"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/sales-channels/${id}/products/batch`, {
        method: "POST",
        body: { remove: payload },
      }) as Promise<HttpTypes.AdminSalesChannelResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.detail(id),
      })

      // Invalidate the products that were removed
      for (const product of variables || []) {
        queryClient.invalidateQueries({
          queryKey: productsQueryKeys.detail(product),
        })
      }

      // Invalidate the products list query
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useSalesChannelAddProducts = (
  id: string,
  options?: UseMutationOptions<
    AdminSalesChannelResponse,
    FetchError,
    HttpTypes.AdminBatchLink["add"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/sales-channels/${id}/products/batch`, {
        method: "POST",
        body: { add: payload },
      }) as Promise<HttpTypes.AdminSalesChannelResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.detail(id),
      })

      // Invalidate the products that were removed
      for (const product of variables || []) {
        queryClient.invalidateQueries({
          queryKey: productsQueryKeys.detail(product),
        })
      }

      // Invalidate the products list query
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
