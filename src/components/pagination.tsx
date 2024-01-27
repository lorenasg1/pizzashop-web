import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'

type PaginationProps = {
  pageIndex: number
  totalCount: number
  perpage: number
}

export function Pagination({
  pageIndex,
  perpage,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perpage)

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} {totalCount === 1 ? 'pedido' : 'pedidos'}
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Primeira página"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Próxima página"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Última página"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
