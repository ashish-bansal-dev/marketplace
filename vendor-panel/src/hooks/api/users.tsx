import { FetchError } from '@medusajs/js-sdk'
import { HttpTypes } from '@medusajs/types'
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { sdk } from '../../lib/client'
import { queryClient } from '../../lib/query-client'
import { queryKeysFactory } from '../../lib/query-key-factory'

const USERS_QUERY_KEY = 'users' as const
const usersQueryKeys = {
  ...queryKeysFactory(USERS_QUERY_KEY),
  me: () => [USERS_QUERY_KEY, 'me'],
}

export const useMe = (
  options?: UseQueryOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    HttpTypes.AdminUserResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch('/vendor/sellers/me', {
        method: 'GET',
        query: {
          fields:
            'id,name,description,phone,photo,email,media,address_line,postal_code,country_code,city,region,metadata,gstin',
        },
      }) as Promise<HttpTypes.AdminUserResponse>,
    queryKey: usersQueryKeys.me(),
    ...options,
  })

  return {
    user: data?.seller,
    ...rest,
  }
}

export const useUser = (
  id: string,
  query?: HttpTypes.AdminUserParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminUserResponse,
      FetchError,
      HttpTypes.AdminUserResponse & {
        member: any
      },
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch(`/vendor/members/${id}`, {
        method: 'GET',
        query,
      }) as Promise<HttpTypes.AdminUserResponse>,
    queryKey: usersQueryKeys.detail(id),
    ...options,
  })

  return { ...data, ...rest }
}

export const useUsers = (
  query?: HttpTypes.AdminUserListParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminUserListResponse,
      FetchError,
      HttpTypes.AdminUserListResponse & { members: any[] },
      QueryKey
    >,
    'queryFn' | 'queryKey'
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch('/vendor/members', {
        method: 'GET',
        query,
      }) as Promise<HttpTypes.AdminUserListResponse>,
    queryKey: usersQueryKeys.list(query),
    ...options,
  })

  return { ...data, ...rest }
}

export const useCreateUser = (
  query?: HttpTypes.AdminUserParams,
  options?: UseMutationOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    HttpTypes.AdminCreateUser,
    QueryKey
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.admin.user.create(payload, query),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdateUser = (
  id: string,
  query?: HttpTypes.AdminUserParams,
  options?: UseMutationOptions<
    HttpTypes.AdminUserResponse,
    FetchError,
    HttpTypes.AdminUpdateUser,
    QueryKey
  >
) => {
  return useMutation({
    mutationFn: (payload) => sdk.admin.user.update(id, payload, query),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })

      // We invalidate the me query in case the user updates their own profile
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.me() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useDeleteUser = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminUserDeleteResponse,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () => sdk.admin.user.delete(id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })

      // We invalidate the me query in case the user updates their own profile
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.me() })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
