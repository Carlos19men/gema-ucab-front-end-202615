// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar si el usuario está autenticado
  const token = request.cookies.get('auth-token')?.value
  
  // Si no hay token y está intentando acceder a rutas protegidas
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
  }

  // Si ya está autenticado y va a login, redirigir al dashboard
  if (token && request.nextUrl.pathname === '/iniciar-sesion') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login'
  ]
}