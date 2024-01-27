import { LineChartIcon } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 1500 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 900 },
  { date: '15/12', revenue: 2030 },
  { date: '16/12', revenue: 1010 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
        <LineChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />

            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) =>
                Intl.NumberFormat('br', {
                  currency: 'BRL',
                  style: 'currency',
                }).format(value)
              }
            />
            <CartesianGrid className="stroke-muted" vertical={false} />

            <Line
              type="linear"
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.rose[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
