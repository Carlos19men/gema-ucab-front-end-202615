'use client'

import { useMantenimientosConInspeccion } from "@/hooks/mantenimientos-por-inspeccion/useMantenimientosConInspeccion";
import { LoaderCircle, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { useEffect } from "react";

const MantenimientosInspeccion = () => {

  const { user, isLoading: isLoadingAuth } = useAuth();
  const router = useRouter();

  // Proteger ruta: Solo DIRECTOR y COORDINADOR
  useEffect(() => {
    if (!isLoadingAuth && user) {
        const role = user.tipo?.toUpperCase();
        if (role !== 'DIRECTOR' && role !== 'COORDINADOR') {
            router.push('/calendario');
        }
    }
  }, [user, isLoadingAuth, router]);

  const { data, isLoading, error } = useMantenimientosConInspeccion();

  const isLoadingTotal = isLoading || isLoadingAuth;

  if (isLoadingTotal) {
    return (
      <div className="p-6 text-center">
        <LoaderCircle className="animate-spin h-5 w-5 mx-auto" />
      </div>
    );
  }

  // Bloquear renderizado si no tiene permisos
  if (user?.tipo?.toUpperCase() !== 'DIRECTOR' && user?.tipo?.toUpperCase() !== 'COORDINADOR') {
      return null;
  }

  const mantenimientos = data ?? [];

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold">Mantenimientos por Inspección</h1>

      </div>

      {/* Tabla para desktop */}
      <div className="overflow-x-auto">
        <table className="hidden md:table min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mantenimiento generado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Inspección asociada
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mantenimientos.length > 0 ? (
              mantenimientos.map((mantenimiento) => (
                <tr key={mantenimiento.idMantenimiento} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <div className="flex flex-col border-2 rounded-lg px-3 py-2 border-gray-300 bg-sky-50">
                      <div className="font-medium">{mantenimiento.nombre}</div>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-700">
                        <MapPin className="w-4 h-4" />
                        <span>{mantenimiento.uTabreviacion + " - " + mantenimiento.uTDescripcion}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex flex-col border-2 border-gray-300 rounded-lg px-3 py-2">
                      <div className="font-medium">{mantenimiento.trabajo}</div>
                      <div className="text-xs text-gray-700 mt-2">
                        {mantenimiento.inspeccionObservacion}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay mantenimientos por inspección registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="md:hidden space-y-4">
        {mantenimientos.length > 0 ? (
          mantenimientos.map((mantenimiento) => (
            <div key={mantenimiento.idMantenimiento} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Mantenimiento generado</p>
                  <div className="flex flex-col border-2 rounded-lg px-3 py-2 mt-1 border-gray-300 bg-sky-50">
                    <p className="font-medium text-gray-900">{mantenimiento.nombre}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{mantenimiento.uTabreviacion + " - " + mantenimiento.uTDescripcion}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Inspección asociada</p>
                  <div className="flex flex-col border-2 border-gray-300 rounded-lg px-3 py-2 mt-1">
                    <p className="text-sm font-medium text-gray-900">{mantenimiento.trabajo}</p>
                    <p className="text-xs text-gray-700 mt-2">
                      {mantenimiento.inspeccionObservacion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center text-sm text-gray-500">
            No hay mantenimientos por inspección registrados
          </div>
        )}
      </div>
    </div>
  )
}

export default MantenimientosInspeccion

