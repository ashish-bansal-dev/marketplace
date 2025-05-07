import { HttpTypes } from "@medusajs/types"
import { FetchError } from "@medusajs/js-sdk"
import {
  MutationOptions,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { salesChannelsQueryKeys } from "./sales-channels"

const API_KEYS_QUERY_KEY = "api_keys" as const
export const apiKeysQueryKeys = queryKeysFactory(API_KEYS_QUERY_KEY)

export const useApiKey = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminApiKeyResponse,
      FetchError,
      HttpTypes.AdminApiKeyResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/api-keys/${id}`, {
        method: "GET",
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    queryKey: apiKeysQueryKeys.detail(id),
    ...options,
  })

  return { ...data, ...rest }
}

export const useApiKeys = (
  query?: HttpTypes.AdminGetApiKeysParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminGetApiKeysParams,
      FetchError,
      HttpTypes.AdminApiKeyListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.client.fetch("/vendor/api-keys", {
      method: "GET",
      query,
    }) as Promise<HttpTypes.AdminApiKeyListResponse>,
    queryKey: apiKeysQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateApiKey = (
  options?: UseMutationOptions<
    HttpTypes.AdminApiKeyResponse,
    FetchError,
    HttpTypes.AdminCreateApiKey
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/vendor/api-keys", {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateApiKey = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminApiKeyResponse,
    FetchError,
    HttpTypes.AdminUpdateApiKey
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/api-keys/${id}`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.detail(id) })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useRevokeApiKey = (
  id: string,
  options?: UseMutationOptions<HttpTypes.AdminApiKeyResponse, FetchError, void>
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/api-keys/${id}/revoke`, {
        method: "POST",
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.detail(id) })

      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useDeleteApiKey = (
  id: string,
  options?: MutationOptions<
    HttpTypes.AdminApiKeyDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/api-keys/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminApiKeyDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.detail(id) })

      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useBatchRemoveSalesChannelsFromApiKey = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminApiKeyResponse,
    FetchError,
    HttpTypes.AdminBatchLink["remove"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/api-keys/${id}/sales-channels`, {
        method: "POST",
        body: { remove: payload },
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.detail(id) })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useBatchAddSalesChannelsToApiKey = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminApiKeyResponse,
    FetchError,
    HttpTypes.AdminBatchLink["add"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/api-keys/${id}/sales-channels`, {
        method: "POST",
        body: { add: payload },
      }) as Promise<HttpTypes.AdminApiKeyResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.detail(id) })
      queryClient.invalidateQueries({
        queryKey: salesChannelsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
