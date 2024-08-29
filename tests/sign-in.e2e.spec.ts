import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('test@test.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  await page.waitForTimeout(5000)

  const toast = page.getByText(
    'Enviamos um link de autenticação para o seu email!',
  )

  expect(toast).toBeVisible()
})

test('sign with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('E-mail').fill('wrong@test.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Credenciais inválidas.')

  expect(toast).toBeVisible()

  await page.waitForTimeout(2000)
})

test('navigate to sign-up page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')

  await page.waitForTimeout(2000)
})
