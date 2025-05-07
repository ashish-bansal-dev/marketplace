import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query"
import { HttpTypes } from "@medusajs/types"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import {
  inventoryItemLevelsQueryKeys,
  inventoryItemsQueryKeys,
} from "./inventory.tsx"
import { FetchError } from "@medusajs/js-sdk"

const RESERVATION_ITEMS_QUERY_KEY = "reservation_items" as const
export const reservationItemsQueryKeys = queryKeysFactory(
  RESERVATION_ITEMS_QUERY_KEY
)

export const useReservationItem = (
  id: string,
  query?: HttpTypes.AdminReservationParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminReservationResponse,
      FetchError,
      HttpTypes.AdminReservationResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: reservationItemsQueryKeys.detail(id),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/reservations/${id}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminReservationResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useReservationItems = (
  query?: HttpTypes.AdminGetReservationsParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminGetReservationsParams,
      FetchError,
      HttpTypes.AdminReservationListResponse,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/reservations`, {
        query,
      }) as Promise<HttpTypes.AdminReservationListResponse>,
    queryKey: reservationItemsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useUpdateReservationItem = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminReservationResponse,
    FetchError,
    HttpTypes.AdminUpdateReservation
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminUpdateReservation) =>
      sdk.client.fetch(`/vendor/reservations/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminReservationResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: reservationItemsQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: reservationItemsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemsQueryKeys.details(),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemLevelsQueryKeys.details(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreateReservationItem = (
  options?: UseMutationOptions<
    HttpTypes.AdminReservationResponse,
    FetchError,
    HttpTypes.AdminCreateReservation
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminCreateReservation) =>
      sdk.client.fetch(`/vendor/reservations`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminReservationResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: reservationItemsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemsQueryKeys.details(),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemLevelsQueryKeys.details(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteReservationItem = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminReservationDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/reservations/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminReservationDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: reservationItemsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: reservationItemsQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemsQueryKeys.details(),
      })
      queryClient.invalidateQueries({
        queryKey: inventoryItemLevelsQueryKeys.details(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
