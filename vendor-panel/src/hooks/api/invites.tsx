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

const INVITES_QUERY_KEY = "invites" as const
const invitesQueryKeys = queryKeysFactory(INVITES_QUERY_KEY)

export const useInvite = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminInviteResponse,
      FetchError,
      HttpTypes.AdminInviteResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: invitesQueryKeys.detail(id),
    queryFn: async () => sdk.admin.invite.retrieve(id),
    ...options,
  })

  return { ...data, ...rest }
}

export const useInvites = (
  query?: Record<string, any>,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminInviteListResponse,
      FetchError,
      HttpTypes.AdminInviteListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch("/vendor/invites", {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminInviteListResponse>,
    queryKey: invitesQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateInvite = (
  options?: UseMutationOptions<
    HttpTypes.AdminInviteResponse,
    FetchError,
    HttpTypes.AdminCreateInvite
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/vendor/invites", {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminInviteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: invitesQueryKeys.lists() })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useResendInvite = (
  id: string,
  options?: UseMutationOptions<HttpTypes.AdminInviteResponse, FetchError, void>
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/invites/${id}/resend`, {
        method: "POST",
      }) as Promise<HttpTypes.AdminInviteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: invitesQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: invitesQueryKeys.detail(id) })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteInvite = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminInviteDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/invites/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.AdminInviteDeleteResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: invitesQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: invitesQueryKeys.detail(id) })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useAcceptInvite = (
  inviteToken: string,
  options?: UseMutationOptions<
    HttpTypes.AdminAcceptInviteResponse,
    FetchError,
    HttpTypes.AdminAcceptInvite & { auth_token: string }
  >
) => {
  return useMutation({
    mutationFn: (payload) => {
      const { auth_token, ...rest } = payload

      return sdk.client.fetch(`/vendor/invites/${inviteToken}/accept`, {
        method: "POST",
        body: rest,
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }) as Promise<HttpTypes.AdminAcceptInviteResponse>
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
