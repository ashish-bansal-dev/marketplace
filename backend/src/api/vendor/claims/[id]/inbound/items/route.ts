import { orderClaimRequestItemReturnWorkflow } from "@medusajs/core-flows"
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"

import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import { defaultAdminDetailsReturnFields } from "../../../../returns/query-config"
import { AdminPostReturnsRequestItemsReqSchemaType } from "../../../../returns/validators"

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminPostReturnsRequestItemsReqSchemaType>,
  res: MedusaResponse<HttpTypes.AdminClaimReturnPreviewResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const [claim] = await remoteQuery(
    remoteQueryObjectFromString({
      entryPoint: "order_claim",
      variables: {
        id,
      },
      fields: ["id", "return_id"],
    }),
    {
      throwIfKeyNotFound: true,
    }
  )

  const { result } = await orderClaimRequestItemReturnWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      return_id: claim.return_id,
      claim_id: id,
    },
  })

  const returnId = result.order_change.return_id
  const queryObject = remoteQueryObjectFromString({
    entryPoint: "return",
    variables: {
      id: returnId,
    },
    fields: defaultAdminDetailsReturnFields,
  })

  const [orderReturn] = await remoteQuery(queryObject)

  res.json({
    order_preview: result as unknown as HttpTypes.AdminOrderPreview,
    return: orderReturn,
  })
}
