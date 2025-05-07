import { FetchError } from "@medusajs/js-sdk"
import { FindParams, HttpTypes, PaginatedResponse } from "@medusajs/types"
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

const COLLECTION_QUERY_KEY = "collections" as const
export const collectionsQueryKeys = queryKeysFactory(COLLECTION_QUERY_KEY)

export const useCollection = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      { collection: HttpTypes.AdminCollection },
      FetchError,
      { collection: HttpTypes.AdminCollection },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: collectionsQueryKeys.detail(id),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/collections`, {
        method: "GET",
        query: {
          id,
        },
      }) as Promise<HttpTypes.AdminCollection>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useCollections = (
  query?: FindParams & HttpTypes.AdminCollectionListParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedResponse<{ collections: HttpTypes.AdminCollection[] }>,
      FetchError,
      PaginatedResponse<{ collections: HttpTypes.AdminCollection[] }>,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: collectionsQueryKeys.list(query),
    queryFn: async () =>
      sdk.client.fetch("/vendor/collections", {
        method: "GET",
        query,
      }) as Promise<PaginatedResponse<{ collections: HttpTypes.AdminCollection[] }>>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useUpdateCollection = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCollectionResponse,
    FetchError,
    HttpTypes.AdminUpdateCollection
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/collections/`, {
        method: "POST",
        body: payload,
        query: {
          id,
        },
      }) as Promise<HttpTypes.AdminCollectionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: collectionsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: collectionsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateCollectionProducts = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCollectionResponse,
    FetchError,
    HttpTypes.AdminUpdateCollectionProducts
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/collections/${id}/products`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminCollectionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: collectionsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: collectionsQueryKeys.detail(id),
      })
      /**
       * Invalidate products list query to ensure that the products collections are updated.
       */
      queryClient.invalidateQueries({
        queryKey: productsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreateCollection = (
  options?: UseMutationOptions<
    HttpTypes.AdminCollectionResponse,
    FetchError,
    HttpTypes.AdminCreateCollection
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/vendor/collections", {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminCollectionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: collectionsQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteCollection = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCollectionDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/collections/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminCollectionDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: collectionsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: collectionsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
