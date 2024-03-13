import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { approveOrderMock } from './approve-oder-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount'
import { getManagedShopMock } from './get-managed-shop-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount'
import { getMonthOrdersAmountMock } from './get-month-orders-amount'
import { getMonthRevenueMock } from './get-month-revenue'
import { getOrdersMock } from './get-oders-mock'
import { getOrderDetailsMock } from './get-order-details-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { registerShopMock } from './register-shop-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'


export const worker = setupWorker(
  signInMock,
  registerShopMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedShopMock,
  updateProfileMock,
  getOrdersMock,
  getOrderDetailsMock,
  cancelOrderMock,
  approveOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
