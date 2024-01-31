import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpSchema = z.object({
  shopName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type signUpFormData = z.infer<typeof signUpSchema>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      shopName: '',
      managerName: '',
      phone: '',
      email: '',
    },
  })

  const navigate = useNavigate()

  const { mutateAsync: registerShop } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: signUpFormData) {
    try {
      console.log(data)
      await registerShop({
        restaurantName: data.shopName,
        managerName: data.managerName,
        phone: data.phone,
        email: data.email,
      })

      toast.success('Estabelecimento cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => {
            toast.dismiss()
            navigate(`/sign-in?email=${data.email}`)
          },
        },
      })
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar o link de autenticação!')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e inicie suas vendas!
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Nome do estabelecimento</Label>
              <Input
                id="shopName"
                type="text"
                autoComplete="off"
                {...register('shopName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                autoComplete="given-name"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register('phone')}
              />
            </div>

            <p className="p-6 text-start text-sm leading-relaxed text-muted-foreground">
              Ao continuar você concorda com os nossos{' '}
              <a href="#" className="underline underline-offset-4">
                termos de serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-4">
                política de privacidade
              </a>
              .
            </p>

            <Button type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
