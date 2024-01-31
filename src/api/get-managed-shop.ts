import { api } from '@/lib/axios'

interface GetManagedShop {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedShop() {
  const response = await api.get<GetManagedShop>('/managed-restaurant')

  return response.data
}
