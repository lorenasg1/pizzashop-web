import { http, HttpResponse } from 'msw'

import { SignUpBody } from '../sign-up'

export const registerShopMock = http.post<never, SignUpBody>(
  '/restaurants',
  async ({ request }) => {
    const { restaurantName } = await request.json()

    if (restaurantName === 'Pizza Shop') {
      return new HttpResponse(null, { status: 201 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)