import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query"

import { sdk } from "../../lib/client"
import { queryClient } from "../../lib/query-client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { ordersQueryKeys } from "./orders"
import { returnsQueryKeys } from "./returns"

const CLAIMS_QUERY_KEY = "claims" as const
export const claimsQueryKeys = queryKeysFactory(CLAIMS_QUERY_KEY)

export const useClaim = (
  id: string,
  query?: HttpTypes.AdminClaimListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminClaimResponse,
      FetchError,
      HttpTypes.AdminClaimResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: async () => sdk.vendor.claim.retrieve(id, query),
    queryKey: claimsQueryKeys.detail(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useClaims = (
  query?: HttpTypes.AdminClaimListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminClaimListParams,
      FetchError,
      HttpTypes.AdminClaimListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: async () => sdk.vendor.claim.list(query),
    queryKey: claimsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateClaim = (
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminCreateClaim
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminCreateClaim) =>
      sdk.vendor.claim.create(payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCancelClaim = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError>
) => {
  return useMutation({
    mutationFn: () => sdk.vendor.claim.cancel(id),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddClaimItems = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminAddClaimItems
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminAddClaimItems) =>
      sdk.vendor.claim.addItems(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateClaimItems = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminUpdateClaimItem & { actionId: string }
  >
) => {
  return useMutation({
    mutationFn: ({
      actionId,
      ...payload
    }: HttpTypes.AdminUpdateClaimItem & { actionId: string }) => {
      return sdk.vendor.claim.updateItem(id, actionId, payload)
    },
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useRemoveClaimItem = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminReturnResponse,
    FetchError,
    string
  >
) => {
  return useMutation({
    mutationFn: (actionId: string) =>
      sdk.vendor.return.removeReturnItem(id, actionId),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddClaimInboundItems = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimReturnPreviewResponse,
    FetchError,
    HttpTypes.AdminAddClaimInboundItems
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.vendor.claim.addInboundItems(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateClaimInboundItem = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminUpdateClaimInboundItem & { actionId: string }
  >
) => {
  return useMutation({
    mutationFn: ({
      actionId,
      ...payload
    }: HttpTypes.AdminUpdateClaimInboundItem & { actionId: string }) => {
      return sdk.vendor.claim.updateInboundItem(id, actionId, payload)
    },
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useRemoveClaimInboundItem = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError, string>
) => {
  return useMutation({
    mutationFn: (actionId: string) =>
      sdk.vendor.claim.removeInboundItem(id, actionId),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      queryClient.invalidateQueries({
        queryKey: returnsQueryKeys.details(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddClaimInboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminClaimAddInboundShipping
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminClaimAddInboundShipping) =>
      sdk.vendor.claim.addInboundShipping(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateClaimInboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminClaimUpdateInboundShipping
  >
) => {
  return useMutation({
    mutationFn: ({
      actionId,
      ...payload
    }: HttpTypes.AdminClaimUpdateInboundShipping & { actionId: string }) =>
      sdk.vendor.claim.updateInboundShipping(id, actionId, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteClaimInboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError, string>
) => {
  return useMutation({
    mutationFn: (actionId: string) =>
      sdk.vendor.claim.deleteInboundShipping(id, actionId),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddClaimOutboundItems = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminAddClaimOutboundItems
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminAddClaimOutboundItems) =>
      sdk.vendor.claim.addOutboundItems(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateClaimOutboundItems = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminUpdateClaimOutboundItem & { actionId: string }
  >
) => {
  return useMutation({
    mutationFn: ({
      actionId,
      ...payload
    }: HttpTypes.AdminUpdateClaimOutboundItem & { actionId: string }) => {
      return sdk.vendor.claim.updateOutboundItem(id, actionId, payload)
    },
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useRemoveClaimOutboundItem = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError, string>
) => {
  return useMutation({
    mutationFn: (actionId: string) =>
      sdk.vendor.claim.removeOutboundItem(id, actionId),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddClaimOutboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminClaimAddOutboundShipping
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminClaimAddOutboundShipping) =>
      sdk.vendor.claim.addOutboundShipping(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateClaimOutboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminClaimUpdateOutboundShipping
  >
) => {
  return useMutation({
    mutationFn: ({
      actionId,
      ...payload
    }: HttpTypes.AdminClaimUpdateOutboundShipping & { actionId: string }) =>
      sdk.vendor.claim.updateOutboundShipping(id, actionId, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteClaimOutboundShipping = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError, string>
) => {
  return useMutation({
    mutationFn: (actionId: string) =>
      sdk.vendor.claim.deleteOutboundShipping(id, actionId),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useClaimConfirmRequest = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<
    HttpTypes.AdminClaimResponse,
    FetchError,
    HttpTypes.AdminRequestClaim
  >
) => {
  return useMutation({
    mutationFn: (payload: HttpTypes.AdminRequestClaim) =>
      sdk.vendor.claim.request(id, payload),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: returnsQueryKeys.all,
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCancelClaimRequest = (
  id: string,
  orderId: string,
  options?: UseMutationOptions<HttpTypes.AdminClaimResponse, FetchError>
) => {
  return useMutation({
    mutationFn: () => sdk.vendor.claim.cancelRequest(id),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details(),
      })

      queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.preview(orderId),
      })

      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.details(),
      })
      queryClient.invalidateQueries({
        queryKey: claimsQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
