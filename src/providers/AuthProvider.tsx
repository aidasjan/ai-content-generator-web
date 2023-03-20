import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser } from 'api/auth'
import { useToast } from '@chakra-ui/react'
import { type AuthUser } from 'types/auth'

interface AuthInfo {
  user: AuthUser | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

interface Props {
  children: any
}

const initialValue = {
  user: null,
  login: async () => {},
  logout: () => {}
}

const AuthContext = createContext<AuthInfo>(initialValue)

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }: Props) => {
  const toast = useToast()
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = async (email: string, password: string) => {
    const loginResponse = await loginUser(email, password).catch(() => null)
    if (loginResponse) {
      localStorage.setItem('user', JSON.stringify(loginResponse))
      setUser(loginResponse)
    } else {
      toast({ status: 'error', title: 'The login information is incorrect' })
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    window.location.replace('/')
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
