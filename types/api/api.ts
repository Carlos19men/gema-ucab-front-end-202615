// types/api.ts

// Respuesta estándar de la API
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status?: number;
}

// Respuesta paginada
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Configuración de peticiones
export interface RequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  requiresAuth?: boolean;
}

// Error estándar de la API
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Interfaz del API Client
export interface ApiClient {
  get<T = any>(url: string, config?: RequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: RequestConfig): Promise<T>;
}