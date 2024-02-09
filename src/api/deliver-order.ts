import { api } from '@/lib/axios'

export interface DeliverOrder {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrder) {
  await api.patch(`/orders/${orderId}/deliver`)
}
