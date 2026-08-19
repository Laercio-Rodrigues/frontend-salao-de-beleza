import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../context/useAuth'
import { Button, TextField, Alert } from '../components/ui'
import {
  Page,
  Brand,
  BrandContent,
  Eyebrow,
  BrandTitle,
  Flourish,
  BrandText,
  FormArea,
  Card,
  FormTitle,
  FormSubtitle,
} from './Login.styles'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      login(response.data.token, response.data.user)
      navigate('/')
    } catch {
      setError('E-mail ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Page>
      <Brand>
        <BrandContent>
          <Eyebrow>Gestão de salão</Eyebrow>
          <BrandTitle>
            Salão
            <Flourish viewBox="0 0 160 20" aria-hidden="true">
              <path
                d="M2 14C30 2 60 18 80 8C100 -2 130 16 158 6"
                stroke="var(--color-gold)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </Flourish>
          </BrandTitle>
          <BrandText>
            Clientes, profissionais e agenda em um só lugar.
          </BrandText>
        </BrandContent>
      </Brand>

      <FormArea>
        <Card onSubmit={handleSubmit}>
          <FormTitle>Entrar</FormTitle>
          <FormSubtitle>Acesse sua conta para continuar.</FormSubtitle>

          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
            placeholder="voce@salao.com"
          />

          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="••••••••"
          />

          {error && <Alert role="alert">{error}</Alert>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Card>
      </FormArea>
    </Page>
  )
}