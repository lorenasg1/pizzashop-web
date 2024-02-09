import { api } from '@/lib/axios'

export interface DispatchOrder {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrder) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
