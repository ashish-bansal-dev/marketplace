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

const SHIPPING_PROFILE_QUERY_KEY = "shipping_profile" as const
export const shippingProfileQueryKeys = queryKeysFactory(
  SHIPPING_PROFILE_QUERY_KEY
)

export const useCreateShippingProfile = (
  options?: UseMutationOptions<
    HttpTypes.AdminShippingProfileResponse,
    FetchError,
    HttpTypes.AdminCreateShippingProfile
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/shipping-profiles`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminShippingProfileResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: shippingProfileQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useShippingProfile = (
  id: string,
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminShippingProfileResponse,
      FetchError,
      HttpTypes.AdminShippingProfileResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/shipping-profiles/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminShippingProfileResponse>,
    queryKey: shippingProfileQueryKeys.detail(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useShippingProfiles = (
  query?: HttpTypes.AdminShippingProfileListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminShippingProfileListResponse,
      FetchError,
      HttpTypes.AdminShippingProfileListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/shipping-profiles`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminShippingProfileListResponse>,
    queryKey: shippingProfileQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useUpdateShippingProfile = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminShippingProfileResponse,
    FetchError,
    HttpTypes.AdminUpdateShippingProfile
  >
) => {
  const { data, ...rest } = useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/shipping-profiles/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminShippingProfileResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: shippingProfileQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: shippingProfileQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })

  return { ...data, ...rest }
}

export const useDeleteShippingProfile = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminShippingProfileDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/shipping-profiles/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminShippingProfileDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: shippingProfileQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: shippingProfileQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
