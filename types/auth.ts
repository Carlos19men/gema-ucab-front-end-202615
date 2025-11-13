// Usuario que viene del backend
export interface User {
  id: string;
  email: string;
  nombre: string;
  rol: string;
}

// Datos para login
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta del endpoint de login
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Estado de autenticación
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}