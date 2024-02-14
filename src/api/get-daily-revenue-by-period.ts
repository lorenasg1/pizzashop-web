import { api } from '@/lib/axios'

export type GetDailyRevenueByPeriod = {
  from?: Date
  to?: Date
}

export type GetDailyRevenueByPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueByPeriod({
  from,
  to,
}: GetDailyRevenueByPeriod) {
  const response = await api.get<GetDailyRevenueByPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    { params: { from, to } },
  )

  return response.data
}
