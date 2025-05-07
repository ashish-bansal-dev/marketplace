import { HttpTypes } from "@medusajs/types"
import { FetchError } from "@medusajs/js-sdk"
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
import { campaignsQueryKeys } from "./campaigns"

const PROMOTIONS_QUERY_KEY = "promotions" as const
export const promotionsQueryKeys = {
  ...queryKeysFactory(PROMOTIONS_QUERY_KEY),
  // TODO: handle invalidations properly
  listRules: (
    id: string | null,
    ruleType: string,
    query?: HttpTypes.AdminGetPromotionRuleParams
  ) => [PROMOTIONS_QUERY_KEY, id, ruleType, query],
  listRuleAttributes: (ruleType: string, promotionType?: string) => [
    PROMOTIONS_QUERY_KEY,
    ruleType,
    promotionType,
  ],
  listRuleValues: (
    ruleType: string,
    ruleValue: string,
    query: HttpTypes.AdminGetPromotionsRuleValueParams
  ) => [PROMOTIONS_QUERY_KEY, ruleType, ruleValue, query],
}

export const usePromotion = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminPromotionResponse,
      FetchError,
      HttpTypes.AdminPromotionResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: promotionsQueryKeys.detail(id),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/promotions/${id}`, {
        method: "GET",
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const usePromotionRules = (
  id: string | null,
  ruleType: string,
  query?: HttpTypes.AdminGetPromotionRuleParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminGetPromotionRuleParams,
      FetchError,
      HttpTypes.AdminPromotionRuleListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: promotionsQueryKeys.listRules(id, ruleType, query),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/promotions/${id}/${ruleType}`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminPromotionRuleListResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const usePromotions = (
  query?: HttpTypes.AdminGetPromotionsParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminPromotionListResponse,
      FetchError,
      HttpTypes.AdminPromotionListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: promotionsQueryKeys.list(query),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/promotions`, {
        method: "GET",
        query,
      }) as Promise<HttpTypes.AdminPromotionListResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const usePromotionRuleAttributes = (
  ruleType: string,
  promotionType?: string,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminRuleAttributeOptionsListResponse,
      FetchError,
      HttpTypes.AdminRuleAttributeOptionsListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: promotionsQueryKeys.listRuleAttributes(ruleType, promotionType),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/promotions/rule-attributes`, {
        method: "GET",
        query: { ruleType, promotionType },
      }) as Promise<HttpTypes.AdminRuleAttributeOptionsListResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const usePromotionRuleValues = (
  ruleType: string,
  ruleValue: string,
  query?: HttpTypes.AdminGetPromotionsRuleValueParams,
  options?: Omit<
    UseQueryOptions<
      HttpTypes.AdminRuleValueOptionsListResponse,
      FetchError,
      HttpTypes.AdminRuleValueOptionsListResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryKey: promotionsQueryKeys.listRuleValues(
      ruleType,
      ruleValue,
      query || {}
    ),
    queryFn: async () =>
      sdk.client.fetch(`/vendor/promotions/rule-values`, {
        method: "GET",
        query: { ruleType, ruleValue },
      }) as Promise<HttpTypes.AdminRuleValueOptionsListResponse>,
    ...options,
  })

  return { ...data, ...rest }
}

export const useDeletePromotion = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.DeleteResponse<"promotion">,
    FetchError,
    void
  >
) => {
  return useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/vendor/promotions/${id}`, {
        method: "DELETE",
      }) as Promise<HttpTypes.DeleteResponse<"promotion">>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: promotionsQueryKeys.detail(id),
      })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useCreatePromotion = (
  options?: UseMutationOptions<
    HttpTypes.AdminPromotionResponse,
    FetchError,
    HttpTypes.AdminCreatePromotion
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/promotions`, {
        method: "POST",
        body: payload,
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.lists() })
      queryClient.invalidateQueries({ queryKey: campaignsQueryKeys.lists() })
      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const useUpdatePromotion = (
  id: string,
  options?: UseMutationOptions<
    HttpTypes.AdminPromotionResponse,
    FetchError,
    HttpTypes.AdminUpdatePromotion
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/promotions/${id}`, {
        method: "PUT",
        body: payload,
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.all })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const usePromotionAddRules = (
  id: string,
  ruleType: string,
  options?: UseMutationOptions<
    HttpTypes.AdminPromotionResponse,
    FetchError,
    HttpTypes.BatchAddPromotionRulesReq
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/promotions/${id}/${ruleType}/batch`, {
        method: "POST",
        body: { create: payload.rules },
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.all })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const usePromotionRemoveRules = (
  id: string,
  ruleType: string,
  options?: UseMutationOptions<
    HttpTypes.AdminPromotionResponse,
    FetchError,
    HttpTypes.BatchRemovePromotionRulesReq
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/promotions/${id}/${ruleType}/batch`, {
        method: "POST",
        body: { delete: payload.rule_ids },
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.all })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}

export const usePromotionUpdateRules = (
  id: string,
  ruleType: string,
  options?: UseMutationOptions<
    HttpTypes.AdminPromotionResponse,
    FetchError,
    HttpTypes.BatchUpdatePromotionRulesReq
  >
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/vendor/promotions/${id}/${ruleType}/batch`, {
        method: "POST",
        body: { update: payload.rules },
      }) as Promise<HttpTypes.AdminPromotionResponse>,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: promotionsQueryKeys.all })

      options?.onSuccess?.(data, variables, context)
    },
    ...options,
  })
}
