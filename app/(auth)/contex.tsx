// lib/auth/context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { User, LoginRequest, AuthResponse } from '@/types/auth'
import { AuthContextType } from '@/types/context'
import { authAPI } from '@/lib/api/auth'


const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Proveedor del contexto
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Verificar si está autenticado
  const isAuthenticated = !!user && !!token;

  // Login
  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null) 
      const response: AuthResponse = await authAPI.login(credentials)
      
      // Guardar token y usuario
      setToken(response.token)
      setUser(response.user)
      
      // Guardar en localStorage o cookies si necesitas persistencia
      localStorage.setItem('auth-token', response.token)
      if (response.refreshToken) {
        localStorage.setItem('refresh-token', response.refreshToken)
      }

    } catch (err: any) {
      setError(err.message || 'Error during login')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')
    // Opcional: llamar al endpoint de logout del backend
  }

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem('auth-token')
        if (savedToken) {
          // Verificar con el backend si el token es válido
          const userData = await authAPI.verifyToken(savedToken)
          setUser(userData)
          setToken(savedToken)
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        logout() // Limpiar si hay error
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
    error,
    clearError: () => setError(null),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}