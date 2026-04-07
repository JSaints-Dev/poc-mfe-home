import { setToken } from '@app/utils/auth'
import { useNavigate } from 'react-router'
import { Button } from '@app/components/ui/button'
import { Input } from '@app/components/ui/input'
import { Label } from '@app/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@app/components/ui/card'

export function LoginPage() {
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Token fake: qualquer credencial é aceita
    setToken(`fake-token-${Date.now()}`)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full mt-2">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
