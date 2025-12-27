'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
    LabelList,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
} from 'recharts'

// Datos de ejemplo para "Mantenimientos activos por área encargada"
const dataActivos = [
    { name: 'Refrigeración', value: 15, color: '#3b82f6' },
    { name: 'Electricidad', value: 8, color: '#eab308' },
    { name: 'Áreas Verdes', value: 11, color: '#22c55e' },
    { name: 'Plomería', value: 4, color: '#ef4444' },
]

// Datos de ejemplo para "Mantenimientos Reabiertos por área encargada"
const dataReabiertos = [
    { name: 'Refrigeración', value: 3, color: '#3b82f6' },
    { name: 'Electricidad', value: 10, color: '#eab308' },
    { name: 'Áreas Verdes', value: 1, color: '#22c55e' },
    { name: 'Plomería', value: 6, color: '#ef4444' },
]

// Datos de ejemplo para radial chart
const dataFinalizados = [
    { name: 'Finalizados', value: 75, fill: 'url(#greenGradient)' },
]

//EstadisticasPage muestra estadísticas de mantenimientos
// Utiliza Recharts para los gráficos
//Nota: Todos los valores mostrados (20, 60, 75%) son datos de ejemplo
export default function EstadisticasPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Estadísticas Generales</h1>
                <p className="text-gray-500">visualiza las distintas estadísticas generadas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tarjeta: Cantidad de Mantenimientos Reabiertos este Mes */}
                <div className="bg-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[240px]">
                    <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
                        Cantidad de Mantenimientos Reabiertos<br />este Mes
                    </h2>
                    <p className="text-8xl font-bold text-gray-900">20</p>
                </div>

                {/* Gráfico de barras: Mantenimientos activos por área encargada */}
                <div className="bg-gray-200 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Mantenimientos activos por área encargada
                    </h2>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={dataActivos} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                            <defs>
                                {/* Refrigeración*/}
                                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#1d4ed8" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>
                                {/* Electricidad*/}
                                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ca8a04" />
                                    <stop offset="100%" stopColor="#fde047" />
                                </linearGradient>
                                {/* Áreas Verdes*/}
                                <linearGradient id="greenBarGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#15803d" />
                                    <stop offset="100%" stopColor="#86efac" />
                                </linearGradient>
                                {/* Plomería */}
                                <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#b91c1c" />
                                    <stop offset="100%" stopColor="#fca5a5" />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fill: '#374151' }}
                                axisLine={{ stroke: '#000000', strokeWidth: 1 }}
                                tickLine={false}
                            />
                            <YAxis
                                axisLine={{ stroke: '#000000', strokeWidth: 1 }}
                                tickLine={false}
                                tick={false}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                <Cell fill="url(#blueGradient)" />
                                <Cell fill="url(#yellowGradient)" />
                                <Cell fill="url(#greenBarGradient)" />
                                <Cell fill="url(#redGradient)" />
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    style={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico de barras: Mantenimientos Reabiertos por área encargada */}
                <div className="bg-gray-200 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Mantenimientos Reabiertos por área encargada
                    </h2>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={dataReabiertos} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fill: '#374151' }}
                                axisLine={{ stroke: '#000000', strokeWidth: 1 }}
                                tickLine={false}
                            />
                            <YAxis
                                axisLine={{ stroke: '#000000', strokeWidth: 1 }}
                                tickLine={false}
                                tick={false}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                <Cell fill="url(#blueGradient)" />
                                <Cell fill="url(#yellowGradient)" />
                                <Cell fill="url(#greenBarGradient)" />
                                <Cell fill="url(#redGradient)" />
                                <LabelList
                                    dataKey="value"
                                    position="top"
                                    style={{ fontSize: 12, fontWeight: 600, fill: '#374151' }}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Gráfico radial: Mantenimientos Finalizados por Mes */}
                <div className="bg-gray-200 rounded-2xl p-8 flex items-center justify-center min-h-[240px]">
                    <div className="flex items-center justify-center gap-10 w-full">
                        <div className="relative w-48 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    barSize={12}
                                    data={[{ name: 'Finalizados', value: 75, fill: '#22c55e' }]}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <PolarAngleAxis
                                        type="number"
                                        domain={[0, 100]}
                                        angleAxisId={0}
                                        tick={false}
                                    />
                                    <RadialBar
                                        background={{ fill: '#e5e7eb' }}
                                        dataKey="value"
                                        cornerRadius={10}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            {/* Texto central con porcentaje (dato de ejemplo)*/}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold text-green-600">75%</span>
                            </div>
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Mantenimientos<br />Finalizados por Mes
                            </h2>
                            <p className="text-4xl font-semibold text-gray-700 mt-3">60</p>
                            <p className="text-lg text-gray-600">mantenimientos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
