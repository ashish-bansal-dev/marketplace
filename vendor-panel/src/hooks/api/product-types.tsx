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

const PRODUCT_TYPES_QUERY_KEY = "product_types" as const
export const productTypesQueryKeys = queryKeysFactory(PRODUCT_TYPES_QUERY_KEY)

export const useProductType = (
  id: string,
  query?: HttpTypes.AdminProductTypeParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductTypeResponse,
      FetchError,
      HttpTypes.AdminProductTypeResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/product-types/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminProductTypeResponse>,
    queryKey: productTypesQueryKeys.detail(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useProductTypes = (
  query?: HttpTypes.AdminProductTypeListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductTypeListResponse,
      FetchError,
      HttpTypes.AdminProductTypeListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/product-types`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminProductTypeListResponse>,
    queryKey: productTypesQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateProductType = (
  options?: UseMutationOptions<
    HttpTypes.AdminProductTypeResponse,
    FetchError,
    HttpTypes.AdminCreateProductType
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/product-types`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminProductTypeResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: productTypesQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateProductType = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductTypeResponse,
    FetchError,
    HttpTypes.AdminUpdateProductType
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/product-types/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminProductTypeResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productTypesQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({ queryKey: productTypesQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteProductType = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductTypeDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/product-types/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminProductTypeDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: productTypesQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({ queryKey: productTypesQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
