import { createOrderCreditLinesWorkflow } from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { AdminCreateOrderCreditLinesType } from "../../validators"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminCreateOrderCreditLinesType>,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { id } = req.params

  await createOrderCreditLinesWorkflow(req.scope).run({
    input: { credit_lines: [req.validatedBody], id },
  })

  const {
    data: [order],
  } = await query.graph(
    {
      entity: "orders",
      fields: req.queryConfig.fields,
      filters: { id },
    },
    { throwIfKeyNotFound: true }
  )

  res.status(200).json({ order })
}
