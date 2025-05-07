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

const TAX_REGIONS_QUERY_KEY = "tax_regions" as const
export const taxRegionsQueryKeys = queryKeysFactory(TAX_REGIONS_QUERY_KEY)

export const useTaxRegion = (
  id: string,
  query?: HttpTypes.AdminTaxRegionParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminTaxRegionResponse,
      FetchError,
      HttpTypes.AdminTaxRegionResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: taxRegionsQueryKeys.detail(id),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/tax-regions/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminTaxRegionResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useTaxRegions = (
  query?: HttpTypes.AdminTaxRegionListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminTaxRegionListResponse,
      FetchError,
      HttpTypes.AdminTaxRegionListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/tax-regions`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminTaxRegionListResponse>,
    queryKey: taxRegionsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateTaxRegion = (
  options?: UseMutationOptions<
    HttpTypes.AdminTaxRegionResponse,
    FetchError,
    HttpTypes.AdminCreateTaxRegion
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/tax-regions`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminTaxRegionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: taxRegionsQueryKeys.all })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteTaxRegion = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminTaxRegionDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/tax-regions/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminTaxRegionDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: taxRegionsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: taxRegionsQueryKeys.detail(id),
      })

      // Invalidate all detail queries, as the deleted tax region may have been a sublevel region
      queryClient.invalidateQueries({ queryKey: taxRegionsQueryKeys.details() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
