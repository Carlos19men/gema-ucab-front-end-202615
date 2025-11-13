// lib/api/auth.ts
import { LoginRequest, AuthResponse, User } from '@/types/auth'
import { apiClient } from './client'

export const authAPI = {
  // Login
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    return response; 
  },

  // Verificar token
  async verifyToken(token: string): Promise<User> {
    const response = await apiClient.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response;
  },

  // Logout (opcional)
  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  // Refresh token (si tu backend lo tiene)
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh', {
      refreshToken
    })
    return response;
  }
}