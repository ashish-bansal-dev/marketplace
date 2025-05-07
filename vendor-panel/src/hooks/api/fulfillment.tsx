import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { queryKeysFactory } from "../../lib/query-key-factory"

import { HttpTypes } from "@medusajs/types"
import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { ordersQueryKeys } from "./orders"
import { FetchError } from "@medusajs/js-sdk"

const FULFILLMENTS_QUERY_KEY = "fulfillments" as const
export const fulfillmentsQueryKeys = queryKeysFactory(FULFILLMENTS_QUERY_KEY)

export const useCreateFulfillment = (
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: (payload: any) =>
      sdk.client.fetch("/vendor/fulfillments", {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminFulfillmentResponse>,
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: fulfillmentsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCancelFulfillment = (
  id: string,
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/fulfillments/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminFulfillmentResponse>,
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: fulfillmentsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreateFulfillmentShipment = (
  fulfillmentId: string,
  options?: UseMutationOptions<
    { fulfillment: HttpTypes.AdminFulfillment },
    FetchError,
    HttpTypes.AdminCreateFulfillmentShipment
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminCreateFulfillmentShipment) =>
      sdk.client.fetch(`/vendor/fulfillments/${fulfillmentId}/shipments`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminFulfillmentResponse>,
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.all,
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
