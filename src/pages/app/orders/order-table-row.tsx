import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-order'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

import { OrderDetails } from './order-details'

type OrderTableRowProps = {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const orderedAt = formatDistanceToNow(order.createdAt, {
    addSuffix: true,
    locale: ptBR,
  })

  const orderTotal = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  }).format(order.total / 100)

  const isCancelDisabled = !['pending', 'processing'].includes(order.status)

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return
        }

        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }

            return order
          }),
        })
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs" title="Detalhes do pedido">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">{orderedAt}</TableCell>
      <TableCell className="flex items-center gap-2">
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{orderTotal}</TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={isCancelDisabled}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
