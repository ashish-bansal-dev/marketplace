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
import { customersQueryKeys } from "./customers"

const CUSTOMER_GROUPS_QUERY_KEY = "customer_groups" as const
export const customerGroupsQueryKeys = queryKeysFactory(
  CUSTOMER_GROUPS_QUERY_KEY
)

export const useCustomerGroup = (
  id: string,
  query?: HttpTypes.AdminGetCustomerGroupParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminCustomerGroupResponse,
      FetchError,
      HttpTypes.AdminCustomerGroupResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: customerGroupsQueryKeys.detail(id, query),
    queryFn: async () => sdk.vendor.customerGroup.retrieve(id, query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCustomerGroups = (
  query?: HttpTypes.AdminGetCustomerGroupsParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminGetCustomerGroupsParams,
      FetchError,
      HttpTypes.AdminCustomerGroupListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () => sdk.vendor.customerGroup.list(query),
    queryKey: customerGroupsQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateCustomerGroup = (
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupResponse,
    FetchError,
    HttpTypes.AdminCreateCustomerGroup
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.vendor.customerGroup.create(payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateCustomerGroup = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupResponse,
    FetchError,
    HttpTypes.AdminUpdateCustomerGroup
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.vendor.customerGroup.update(id, payload),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteCustomerGroup = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () => sdk.vendor.customerGroup.delete(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteCustomerGroupLazy = (
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupDeleteResponse,
    FetchError,
    { id: string }
  >
) => {
  return useMutation({
    mutationFn: ({ id }) => sdk.vendor.customerGroup.delete(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.detail(variables.id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAddCustomersToGroup = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupResponse,
    FetchError,
    HttpTypes.AdminBatchLink["add"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.vendor.customerGroup.batchCustomers(id, { add: payload }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: customersQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useRemoveCustomersFromGroup = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminCustomerGroupResponse,
    FetchError,
    HttpTypes.AdminBatchLink["remove"]
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.vendor.customerGroup.batchCustomers(id, { remove: payload }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.lists(),
      })
      queryClient.invalidateQueries({
        queryKey: customerGroupsQueryKeys.detail(id),
      })
      queryClient.invalidateQueries({
        queryKey: customersQueryKeys.lists(),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
