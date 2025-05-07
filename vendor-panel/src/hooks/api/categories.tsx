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
import { productsQueryKeys } from "./products"

const CATEGORIES_QUERY_KEY = "categories" as const
export const categoriesQueryKeys = queryKeysFactory(CATEGORIES_QUERY_KEY)

export const useProductCategory = (
  id: string,
  query?: HttpTypes.AdminProductCategoryParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductCategoryResponse,
      FetchError,
      HttpTypes.AdminProductCategoryResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: categoriesQueryKeys.detail(id, query),
    queryFn: () =>
      sdk.client.fetch(`/vendor/product-categories/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminProductCategoryResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useProductCategories = (
  query?: HttpTypes.AdminProductCategoryListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminProductCategoryListResponse,
      FetchError,
      HttpTypes.AdminProductCategoryListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: categoriesQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch("/vendor/product-categories", {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminProductCategoryListResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateProductCategory = (
  options?: UseMutationOptions<
    HttpTypes.AdminProductCategoryResponse,
    FetchError,
    HttpTypes.AdminCreateProductCategory
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/vendor/product-categories", {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminProductCategoryResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateProductCategory = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductCategoryResponse,
    FetchError,
    HttpTypes.AdminUpdateProductCategory
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/product-categories/${id}`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminProductCategoryResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteProductCategory = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductCategoryDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/product-categories/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminProductCategoryDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateProductCategoryProducts = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminProductCategoryResponse,
    FetchError,
    HttpTypes.AdminUpdateProductCategoryProducts
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/product-categories/${id}/products`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminProductCategoryResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: categoriesQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.details(),
      })
      /**
       * Invalidate products list query to ensure that the products collections are updated.
       */
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.details(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
