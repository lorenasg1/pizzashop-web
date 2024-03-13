import { http, HttpResponse } from 'msw'

import { GetManagedShop } from '../get-managed-shop'

export const getManagedShopMock = http.get<
  never,
  never,
  GetManagedShop
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    description: 'Custom restaurant description.',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})