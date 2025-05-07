import { z } from "zod"
import { createFindParams, createSelectParams } from "@medusajs/medusa/api/utils/validators"
import { applyAndAndOrOperators } from "@medusajs/medusa/api/utils/common-validators/index"

export const AdminGetCurrencyParams = createSelectParams()

export const AdminGetCurrenciesParamsFields = z.object({
  q: z.string().optional(),
  code: z.union([z.string(), z.array(z.string())]).optional(),
})

export type AdminGetCurrenciesParamsType = z.infer<
  typeof AdminGetCurrenciesParams
>
export const AdminGetCurrenciesParams = createFindParams({
  offset: 0,
  limit: 200,
})
  .merge(AdminGetCurrenciesParamsFields)
  .merge(applyAndAndOrOperators(AdminGetCurrenciesParamsFields))
