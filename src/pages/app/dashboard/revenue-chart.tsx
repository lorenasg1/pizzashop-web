import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { LineChartIcon, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueByPeriod } from '@/api/get-daily-revenue-by-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueByPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-by-period', 'dateRange'],
    queryFn: () =>
      getDailyRevenueByPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueByPeriod?.map((item) => ({
      date: item.date,
      receipt: item.receipt / 100,
    }))
  }, [dailyRevenueByPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>
        <LineChartIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
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
                dataKey="receipt"
                stroke={colors.rose[500]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
