import { useState, useEffect } from "react";
import DateNavigator from "../ui/dateNavigator";
import DropdownFilter from "../ui/dropdownFilter";
import { MaintenanceSummaryModal } from "@/components/forms/mantenimientos/MaintenanceSummaryModal";
import { InspectionSummaryModal } from "@/components/forms/inspecciones/InspectionSummaryModal";

/*Nombres de los meses */
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Nombres de los días de la semana
const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

// Función para generar los datos de la semana dinámicamente (sin datos mockeados)
const generateWeekData = (currentDate: Date) => {
  // Calcular el inicio de la semana (lunes)
  const startOfWeek = new Date(currentDate);
  const currentDay = currentDate.getDay();
  const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
  startOfWeek.setDate(currentDate.getDate() - diffToMonday);
  
  const weekData = [];
  
  // Generar datos para cada día de la semana (Lun-Dom)
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + i);
    
    // Ajustar el orden para que empiece en Lunes
    const dayIndex = (i + 1) % 7; // 1,2,3,4,5,6,0 -> Lun,Mar,Mié,Jue,Vie,Sáb,Dom
    const dayName = dayIndex === 0 ? "Dom" : DAYS_OF_WEEK[dayIndex];
    
    weekData.push({
      dia: dayName,
      fecha: dayDate.getDate(),
      tareas: [] // Vacío hasta que tengamos datos del API
    });
  }
  
  return weekData;
};

//Tipos de colores para las tarjetas
const cardColors = {
  grey: "border-l-gema-darkgrey bg-gema-darkgrey/20",
  blue: "border-l-gema-blue bg-gema-blue/20",
  yellow: "border-l-gema-yellow bg-gema-yellow/20",
  green: "border-l-gema-green bg-gema-green/20",
};

interface WeeklyCalendarProps {
    initialDate?: Date | null;
}

const WeeklyCalendar = ({ initialDate }: WeeklyCalendarProps) => {
    // Estado para la fecha actual (usar initialDate si se proporciona)
    const [currentDate, setCurrentDate] = useState(() => {
        return initialDate || new Date();
    });

    // Estado para el filtro activo
    const [filtroActivo, setFiltroActivo] = useState('todos');

    // Estados para el modal de resumen de mantenimiento
    const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
    const [selectedMaintenanceData, setSelectedMaintenanceData] = useState<any>(null);

    // Estados para el modal de resumen de inspección
    const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
    const [selectedInspectionData, setSelectedInspectionData] = useState<any>(null);

    // Actualizar currentDate cuando cambie initialDate
    useEffect(() => {
        if (initialDate) {
            setCurrentDate(initialDate);
        }
    }, [initialDate]);

    // Generar datos de la semana basándose en la fecha actual
    const semanaData = generateWeekData(currentDate);

    // Función para filtrar tareas según el filtro activo
    const filtrarTareas = (tareas: any[]) => {
        if (filtroActivo === 'todos') return tareas;
        if (filtroActivo === 'mantenimientos') {
            return tareas.filter(tarea => tarea.tipo === 'mantenimiento');
        }
        if (filtroActivo === 'inspecciones') {
            return tareas.filter(tarea => tarea.tipo === 'inspeccion');
        }
        return tareas;
    };

    // Función para manejar el click en una tarea
    const handleTaskClick = (tarea: any, fecha: Date) => {
        if (tarea.tipo === 'mantenimiento') {
            // TODO: Generar datos reales del mantenimiento desde el API
            const maintenanceData = {
                estado: 'Programado',
                prioridad: 'Alta',
                frecuencia: 'Mensual',
                repeticion: 'Sí',
                ubicacion: tarea.area || 'Ubicación por definir',
                fechaLimite: fecha.toLocaleDateString('es-ES')
            };
            setSelectedMaintenanceData(maintenanceData);
            setIsMaintenanceModalOpen(true);
        } else if (tarea.tipo === 'inspeccion') {
            // TODO: Generar datos reales de la inspección desde el API
            const inspectionData = {
                estado: 'Programado',
                supervisor: 'Por asignar',
                area: 'Por definir',
                frecuencia: 'Mensual',
                ubicacion: tarea.area || 'Ubicación por definir',
                observacion: 'Sin observaciones'
            };
            setSelectedInspectionData(inspectionData);
            setIsInspectionModalOpen(true);
        }
    };

    // Lógica específica de la SEMANA: sumar/restar 7 días
    const handlePrevWeek = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    };

    // Formateo para mostrar rango de semana (simplificado)
    const startOfWeek = new Date(currentDate);
    
    // Asumiendo LUNES como inicio de semana
    const currentDay = currentDate.getDay(); // 0 es Domingo, 1 es Lunes...
    // Si es domingo (0), queremos restar 6 días para llegar al lunes anterior.
    // Si es cualquier otro día, restamos (día - 1).
    const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
    
    startOfWeek.setDate(currentDate.getDate() - diffToMonday);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sumamos 6 días para llegar al domingo

    const label = `Semana ${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${MONTH_NAMES[endOfWeek.getMonth()]}`;

    return(
        <div>
            {/*--- CABECERA DEL CALENDARIO SEMANAL ---*/}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-xl font-bold text-gray-900">{label}</h2>
                
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Filtro de mantenimientos e inspecciones */}
                    <DropdownFilter 
                        filtroActual={filtroActivo} 
                        onFiltroChange={setFiltroActivo} 
                    />
                    {/* Navegación de Semanas */}
                    <DateNavigator label='Semana' onPrev={handlePrevWeek} onNext={handleNextWeek}></DateNavigator>
                </div>
            </div>

            {/* --- GRID DE LA SEMANA --- */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-w-[1000px] md:min-w-0 overflow-x-auto">
              {semanaData.map((diaItem, index) => {
                // Filtrar las tareas según el filtro activo
                const tareasFiltradas = filtrarTareas(diaItem.tareas);
                
                // Calcular la fecha exacta del día
                const dayDate = new Date(currentDate);
                const currentDay = currentDate.getDay();
                const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - diffToMonday);
                const exactDate = new Date(startOfWeek);
                exactDate.setDate(startOfWeek.getDate() + index);
                
                return (
                  <div key={index} className="flex flex-col h-full">
                    {/* Cabecera de la Columna (Día y Número) */}
                    <div className="text-center mb-4">
                      <span className="block text-sm font-bold text-gray-400 uppercase tracking-wide">
                        {diaItem.dia}
                      </span>
                      <span className="block text-3xl font-bold text-gray-900 mt-1">
                        {diaItem.fecha}
                      </span>
                    </div>

                    {/* Cuerpo de la Columna (El contenedor largo) */}
                    <div className="flex-1 border border-gray-200 rounded-2xl min-h-[500px] bg-white flex flex-col gap-3 overflow-hidden">
                      {/* Pill de Conteo (Encabezado gris dentro de la columna) */}
                      <div className="bg-gray-200 py-2 text-center relative overflow-hidden">
                        {/* Simulación del degradado superior en días con múltiples tareas */}
                        {tareasFiltradas.length > 2 && (
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-gema-yellow via-gema-blue to-gema-green" />
                        )}
                        <span className="text-xs font-bold text-gray-700">
                          {filtroActivo === 'todos' ? 'Mantenimientos' : 
                           filtroActivo === 'mantenimientos' ? 'Mantenimientos' : 'Inspecciones'} - {tareasFiltradas.length}
                        </span>
                      </div>

                      {/* Lista de Tarjetas */}
                      <div className="flex flex-col gap-3 p-1">
                        {tareasFiltradas.length === 0 ? (
                          <div className="text-center text-gray-400 text-sm py-8">
                            Sin actividades programadas
                          </div>
                        ) : (
                          tareasFiltradas.map((tarea) => (
                            <div
                              key={tarea.id}
                              onClick={() => handleTaskClick(tarea, exactDate)}
                              className={`
                                relative p-3 rounded-r-xl rounded-l-sm border-l-[6px] shadow-sm cursor-pointer hover:opacity-90 transition-opacity
                                ${tarea.tipo === 'mantenimiento' || tarea.tipo === 'inspeccion' ? 'hover:shadow-md hover:scale-[1.02] transition-all' : ''}
                                ${cardColors[tarea.color as keyof typeof cardColors]}
                              `}
                            >
                              <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                                {tarea.titulo}
                              </h4>
                              {tarea.area && (
                                <p className="text-xs text-gray-600 font-medium">
                                  {tarea.area}
                                </p>
                              )}
                              {/* Indicador visual para tareas clickeables */}
                              {tarea.tipo === 'mantenimiento' && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
                              )}
                              {tarea.tipo === 'inspeccion' && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full opacity-60"></div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6 w-full">
      
      {/* Título */}
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Estados de Mantenimientos e Inspecciones
      </h3>

      {/* Contenedor de los items (Fila flexible) */}
      <div className="flex flex-wrap items-center gap-6">
        {/* Item 1: No empezado (Gris) */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gema-darkgrey" />
          <span className="text-sm font-medium text-gray-700">No empezado</span>
        </div>

        {/* Item 2: En ejecución (Azul) */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gema-blue" /> 
          <span className="text-sm font-medium text-gray-700">En ejecución</span>
        </div>

        {/* Item 3: Reprogramado (Amarillo/Ámbar) */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gema-yellow" /> {/* O usa bg-gema-yellow */}
          <span className="text-sm font-medium text-gray-700">Reprogramado</span>
        </div>

        {/* Item 4: Culminado (Verde) */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-gema-green" /> {/* O usa bg-gema-green */}
          <span className="text-sm font-medium text-gray-700">Culminado</span>
        </div>

      </div>
    </div>

    {/* Modal de Resumen de Mantenimiento */}
    <MaintenanceSummaryModal
      open={isMaintenanceModalOpen}
      onClose={() => setIsMaintenanceModalOpen(false)}
      data={selectedMaintenanceData}
    />

    {/* Modal de Resumen de Inspección */}
    <InspectionSummaryModal
      open={isInspectionModalOpen}
      onClose={() => setIsInspectionModalOpen(false)}
      data={selectedInspectionData}
    />
    </div>
  )
};

export { WeeklyCalendar };