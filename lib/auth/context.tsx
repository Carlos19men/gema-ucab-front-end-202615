// lib/auth/context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api/auth'
import { LoginRequest, User } from '@/types/auth'

interface AuthContextType {
  user: User | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  clearError: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await authAPI.login(credentials)

      // Normalizar datos del usuario para evitar errores de mayúsculas/minúsculas
      const rawUser: any = response.data.usuario;
      const normalizedUser: User = {
          id: rawUser.id || rawUser.Id,
          nombre: rawUser.nombre || rawUser.Nombre,
          correo: rawUser.correo || rawUser.Correo,
          tipo: rawUser.tipo || rawUser.Tipo
      };

      // Guardar usuario en estado y localStorage
      setUser(normalizedUser);
      localStorage.setItem('gema_user', JSON.stringify(normalizedUser));

      router.push('/calendario')
    } catch (err: any) {
      const errorMessage = err.message || 'Error en el inicio de sesión'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    // 1. Prioridad UX: Limpiar estado y redirigir inmediatamente
    setUser(null);
    localStorage.removeItem('gema_user');
    router.push('/login');

    // 2. Notificar al backend en segundo plano (Fire & Forget)
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Error al notificar logout al backend", error);
    }
  };

  const checkAuth = async () => {
    try {
      const userData = await authAPI.getCurrentUser()
      setUser(userData)
      localStorage.setItem('gema_user', JSON.stringify(userData));
    } catch (error) {
      setUser(null)
      localStorage.removeItem('gema_user');
    }
  }

  // Verificar autenticación al cargar
  useEffect(() => {
    const initializeAuth = async () => {
      // Intentar recuperar del localStorage primero
      const storedUser = localStorage.getItem('gema_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('gema_user');
        }
      }
      
      // Opcional: validar con backend si existe endpoint /me
      // await checkAuth()
      
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated,
    error,
    clearError: () => setError(null),
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}