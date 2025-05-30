import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

import { ALGOLIA_MODULE } from '../modules/algolia'
import AlgoliaModuleService from '../modules/algolia/service'
import { AlgoliaEvents, IndexType } from '../modules/algolia/types'
import {
  filterProductsByStatus,
  findAndTransformAlgoliaProducts
} from '../modules/algolia/utils'

export default async function productsChangedHandler({
  event,
  container
}: SubscriberArgs<{ ids: string[] }>) {
  const algolia = container.resolve<AlgoliaModuleService>(ALGOLIA_MODULE)

  const { published, other } = await filterProductsByStatus(
    container,
    event.data.ids
  )

  const productsToInsert = published.length
    ? await findAndTransformAlgoliaProducts(container, published)
    : []

  await algolia.batch(IndexType.PRODUCT, productsToInsert, other)
}

export const config: SubscriberConfig = {
  event: AlgoliaEvents.PRODUCTS_CHANGED,
  context: {
    subscriberId: 'algolia-products-changed-handler'
  }
}
