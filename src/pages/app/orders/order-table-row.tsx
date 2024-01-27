import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

type OrderTableRowProps = {
  key: string | number
}

export function OrderTableRow({ key }: OrderTableRowProps) {
  return (
    <TableRow key={key}>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs" title="Detalhes do pedido">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        q78wey9273e26gr
      </TableCell>
      <TableCell className="text-muted-foreground">há 15 minutos</TableCell>
      <TableCell className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-slate-400" />
        <span className="font-medium text-muted-foreground">Pendente</span>
      </TableCell>
      <TableCell className="font-medium">Lorena Guedes</TableCell>
      <TableCell className="font-medium">R$ 60,45</TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
