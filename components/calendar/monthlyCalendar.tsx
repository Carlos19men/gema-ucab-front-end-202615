'use client';
import { useState } from "react";
import {
    FileCog
} from "lucide-react";
import DropdownFilter from "../ui/dropdownFilter";
import DateNavigator from "../ui/dateNavigator";
import { useMantenimientosFiltros } from "@/hooks/mantenimientos/useMantenimientosFiltros";

/*Dias de la semana */
const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/*Nombres de los meses */
const MONTH_NAMES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface CalendarDay {
    dia: number;
    actual: boolean;
    date: Date;
}

// Función para generar los días del calendario dinámicamente
const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Primer día del mes y qué día de la semana es (0 = domingo)
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();

    // Días en el mes actual
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Días en el mes anterior
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: CalendarDay[] = [];

    // Días del mes anterior (para completar la primera semana)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        days.push({
            dia: day,
            actual: false,
            date: new Date(year, month - 1, day)
        });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
        days.push({
            dia: day,
            actual: true,
            date: new Date(year, month, day)
        });
    }

    // Días del mes siguiente (para completar la última semana)
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remainingCells = totalCells - days.length;

    for (let day = 1; day <= remainingCells; day++) {
        days.push({
            dia: day,
            actual: false,
            date: new Date(year, month + 1, day)
        });
    }

    return days;
};

interface MonthlyCalendarProps {
    onDayClick?: (date: Date) => void;
}

const MonthlyCalendar = ({ onDayClick }: MonthlyCalendarProps) => {
    // Este estado controla qué iconos se ven en TODO el calendario
    const [filtroActivo, setFiltroActivo] = useState('todos');

    // Estado para la fecha actual (mes y año)
    const [currentDate, setCurrentDate] = useState(new Date());

    // Formatear fecha para el hook (YYYY-MM-DD)
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Fetch de mantenimientos
    const { data: mantenimientos } = useMantenimientosFiltros(formattedDate, "mensual");

    // Generar días del calendario basándose en la fecha actual
    const diasCalendario = generateCalendarDays(currentDate);

    // Función para manejar el click en un día
    const handleDayClick = (dayItem: CalendarDay, index: number) => {
        if (!dayItem.actual || !onDayClick) return;
        onDayClick(dayItem.date);
    };

    // Lógica específica del MES: sumar/restar el mes
    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    // Formateo para la etiqueta
    const labelHeader = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Helper para verificar si hay mantenimiento en una fecha
    const hasMaintenance = (date: Date) => {
        if (!mantenimientos) return false;
        const dateStr = date.toISOString().split('T')[0];
        return mantenimientos.some((m: any) => m.fechaLimite === dateStr);
    };

    return (
        <div>
            {/*--- CABECERA DEL CALENDARIO ---*/}
            <div className="flex flex-col md:flex-row md:justify-between items-start">
                <h2 className="text-xl font-semibold mb-4">{labelHeader}</h2>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    {/* Boton de filtro dinamico */}
                    <DropdownFilter
                        filtroActual={filtroActivo}
                        onFiltroChange={setFiltroActivo}
                    />
                    {/* Navegación de Meses */}
                    <DateNavigator label='Mes' onPrev={handlePrevMonth} onNext={handleNextMonth}></DateNavigator>
                </div>
            </div>

            {/*--- CUADRÍCULA DEL CALENDARIO ---*/}
            <div className="p-6 w-full max-w-5xl mx-auto">
                {/* --- CABECERA DE DÍAS (LUN, MAR...) --- */}
                <div className="hidden md:grid grid-cols-7 gap-2 mb-2 text-center">
                    {diasSemana.map((dia) => (
                        <span key={dia} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            {dia}
                        </span>
                    ))}
                </div>

                {/* --- CUADRÍCULA DEL CALENDARIO (GRID) --- */}
                <div className="hidden md:grid grid-cols-7 gap-2 auto-rows-fr justify-center">
                    {diasCalendario.map((item, index) => {
                        const showIcon = hasMaintenance(item.date);

                        return (
                            <div
                                key={index}
                                onClick={() => handleDayClick(item, index)}
                                className={`
                                        relative min-h-30 max-w-full p-2 rounded-lg flex flex-col gap-2 transition-all hover:ring-2 hover:ring-blue-100 cursor-pointer 
                                        ${item.actual ? 'bg-gema-lightgrey hover:bg-gray-50' : 'bg-gema-darkgrey cursor-default'}
                                    `}
                            >
                                {/* Número del día */}
                                <span className={`text-sm font-bold text-gema-grey-text`}>
                                    {item.dia < 10 ? `0${item.dia}` : item.dia}
                                </span>

                                {/* Iconos de contenido */}
                                <div className="flex gap-1">
                                    {showIcon && (
                                        <FileCog className="w-7 h-7 text-blue-600" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export { MonthlyCalendar };