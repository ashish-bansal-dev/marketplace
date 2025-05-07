import {
  MutationOptions,
  QueryKey,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query"

import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { pricePreferencesQueryKeys } from "./price-preferences"

const STORE_QUERY_KEY = "store" as const
export const storeQueryKeys = queryKeysFactory(STORE_QUERY_KEY)

/**
 * Workaround to keep the V1 version of retrieving the store.
 */
export async function retrieveActiveStore(
  query?: HttpTypes.AdminStoreParams
): Promise<{ store: HttpTypes.AdminStoreResponse }> {
  const response = await sdk.client.fetch("/vendor/stores", {
    method: "GET",
    query,
  }) as { stores: HttpTypes.AdminStoreResponse[] }

  const activeStore = response?.stores?.[0]

  if (!activeStore) {
    throw new FetchError("No active store found", "Not Found", 404)
  }

  return { store: activeStore }
}

export const useStore = (
  query?: HttpTypes.SelectParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminStoreResponse,
      FetchError,
      HttpTypes.AdminStoreResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/stores`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminStoreResponse>,
    queryKey: storeQueryKeys.details(),
    ...options,
  })

  return {
    ...data,
    ...rest,
  }
}

export const useUpdateStore = (
  id: string,
  options?: MutationOptions<
    HttpTypes.AdminStoreResponse,
    FetchError,
    HttpTypes.AdminUpdateStore
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/stores/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminStoreResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: pricePreferencesQueryKeys.list(),
      })
      queryClient.invalidateQueries({
        queryKey: pricePreferencesQueryKeys.details(),
      })
      queryClient.invalidateQueries({ queryKey: storeQueryKeys.details() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
