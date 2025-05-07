import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
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

const PRICE_PREFERENCES_QUERY_KEY = "price-preferences" as const
export const pricePreferencesQueryKeys = queryKeysFactory(
  PRICE_PREFERENCES_QUERY_KEY
)

export const usePricePreference = (
  id: string,
  query?: HttpTypes.AdminPricePreferenceParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminPricePreferenceResponse,
      FetchError,
      HttpTypes.AdminPricePreferenceResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/price-preferences/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminPricePreferenceResponse>,
    queryKey: pricePreferencesQueryKeys.detail(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const usePricePreferences = (
  query?: HttpTypes.AdminPricePreferenceListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminPricePreferenceListResponse,
      FetchError,
      HttpTypes.AdminPricePreferenceListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/price-preferences`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminPricePreferenceListResponse>,
    queryKey: pricePreferencesQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useUpsertPricePreference = (
  id?: string | undefined,
  query?: HttpTypes.AdminPricePreferenceParams,
  options?: UseMutationOptions<
    HttpTypes.AdminPricePreferenceResponse,
    FetchError,
    HttpTypes.AdminUpdatePricePreference | HttpTypes.AdminCreatePricePreference
  >
) => {
  return useMutation({
    mutationFn: (payload) => {
      if (id) {
        return sdk.client.fetch(`/vendor/price-preferences/${id}`, {
          method: "PUT",
          body: payload,
          query,
        }) as Promise<HttpTypes.AdminPricePreferenceResponse>
      }
      return sdk.client.fetch(`/vendor/price-preferences`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminPricePreferenceResponse>
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: pricePreferencesQueryKeys.list(),
      })
      if (id) {
        queryClient.invalidateQueries({
          queryKey: pricePreferencesQueryKeys.detail(id),
        })
      }

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeletePricePreference = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminPricePreferenceDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/price-preferences/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminPricePreferenceDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: pricePreferencesQueryKeys.list(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
