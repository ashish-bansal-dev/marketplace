import {
  getOrderDetailWorkflow,
  updateDraftOrderWorkflow,
} from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { AdminUpdateDraftOrderType } from "../validators"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<HttpTypes.AdminDraftOrderResponse>
) => {
  const workflow = getOrderDetailWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.queryConfig.fields,
      order_id: req.params.id,
      version: req.validatedQuery.version as number,
      filters: {
        is_draft_order: true,
      },
    },
  })

  res.status(200).json({ draft_order: result as HttpTypes.AdminDraftOrder })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateDraftOrderType>,
  res: MedusaResponse<HttpTypes.AdminDraftOrderResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  await updateDraftOrderWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      user_id: req.auth_context.actor_id,
      id: req.params.id,
    },
  })

  const result = await query.graph({
    entity: "order",
    filters: { id: req.params.id },
    fields: req.queryConfig.fields,
  })

  res
    .status(200)
    .json({ draft_order: result.data[0] as HttpTypes.AdminDraftOrder })
}
