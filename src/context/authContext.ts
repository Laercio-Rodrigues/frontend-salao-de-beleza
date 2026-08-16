import { createContext } from 'react'

export interface AuthUser {
  id: string
  name: string
  role: 'ADMIN' | 'ATTENDANT'
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)