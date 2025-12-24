'use client';

import { Button } from "@/components/ui/button";
import DateNavigator from "@/components/ui/dateNavigator";
import DropdownFilter from "@/components/ui/dropdownFilter";
import Card from "@/components/resumen/card";
import { 
    Calendar, 
    Upload
} from "lucide-react";
import { useState } from "react";

// DATA SIMULADA
const tasks = [
    {
      id: 1,
      title: "Mantenimiento de Aire Acondicionado",
      location: " M1-P01 Módulo 1 Piso 1",
      date: "Martes 4 de Noviembre de 2025",
      type: "Mantenimiento",
      status: "No empezado"
    },
    {
      id: 2,
      title: "Instalación de Circuito Eléctrico",
      location: " M2-P2 Módulo 2 Piso 2",
      date: "Miercoles 5 de Noviembre de 2025",
      status: "Reprogramado",
      type: "Inspección"
    },
     {
      id: 3,
      title: "Mantenimiento Preventivo HVAC",
      location: " M2-P2 Módulo 2 Piso 1",
      date: "Jueves 6 de Noviembre de 2025",
      status: "En ejecucion",
      type: "Mantenimiento"
    }, 
    {
      id: 4,
      title: "Inspección de Sistemas de Seguridad",
      location: " M1-P01 Módulo 1 Piso 3",
      date: "Viernes 7 de Noviembre de 2025",
      status: "Culminado",
      type: "Inspección"
    } 
];

/*Nombres de los meses */
const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

/*Opciones del filtro */
const opcionesFiltro = [
    { id: 'todos', label: 'Todos', color: null},
    { id: 'no-empezado', label: 'No empezado', color: 'bg-gema-darkgrey' },
    { id: 'reprogramado', label: 'Reprogramado', color: 'bg-gema-yellow' },
    { id: 'en-ejecucion', label: 'En ejecucion', color: 'bg-gema-blue' },
    { id: 'culminado', label: 'Culminado', color: 'bg-gema-green' },
];

const resumen = () => {
    //Vista Actual (Mensual o Semanal) por defecto es mensual
    const [vistaActual, setVistaActual] = useState('mensual');

    // Estado para la fecha actual (mes y año)
    const [currentDate, setCurrentDate] = useState(new Date());

    // Este estado controla qué se mostrara en el resumen
    const [filtroActivo, setFiltroActivo] = useState('todos');

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
    
    // Función para alternar (toggle)
    const alternarVista = () => {
        if (vistaActual === 'mensual') {
            setVistaActual('semanal');
        } else {
            setVistaActual('mensual');
        }
    };

    //logica de filtrado
    const filteredTasks = tasks.filter((task) => {
        if (filtroActivo === 'todos') return true;

        // Normalizar: minúsculas y reemplazamos espacios por guiones
        const statusNormalizado = task.status.toLowerCase().replace(/\s+/g, '-');
        
        return statusNormalizado === filtroActivo;
    });

    return(
        <div className="p-6 max-w-7.5xl">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-6">
                <div className="items-center gap-1">
                    <h1 className="text-2xl font-bold">Resumen de Mantenimientos e Inspecciones</h1>
                    <h2 className="text-lg text-gray-500">{labelHeader}</h2>
                </div>
                <Button className="bg-sidebar-border text-black hover:bg-gray-300">
                    <Upload className="mr-2 h-4 w-4" />
                    Exportar
                </Button>
            </div>
            <div className="w-full flex justify-end items-center gap-4 mb-4">
                {/* Navegación de Meses */}
                <DateNavigator label='Mes' onPrev={handlePrevMonth} onNext={handleNextMonth}></DateNavigator>
                {/* Boton de filtro dinamico */}
                <DropdownFilter 
                    opciones={opcionesFiltro}
                    filtroActual={filtroActivo} 
                    onFiltroChange={setFiltroActivo} 
                />
                <Button onClick={alternarVista} className="bg-sidebar-border text-black hover:bg-gray-300">
                    <Calendar className="mr-2 h-4 w-4" />
                    {vistaActual === 'mensual' ? 'Vista Semanal' : 'Vista Mensual'}
                </Button>
                <span className="text-gema-green font-semibold flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {vistaActual === 'mensual' ? 'Vista Mensual' : 'Vista Semanal'}
                </span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
                {/*CARDS CON LOS DATOS */}
                <div className="flex flex-col gap-2">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <Card
                                key={task.id}
                                title={task.title}
                                location={task.location}
                                date={task.date}
                                status={task.status as any}
                                type={task.type as any}
                            />
                        ))
                    ) : (
                        // Mensaje opcional cuando no hay resultados
                        <div className="text-center py-10 text-gray-400">
                            No hay tareas con el estado "{opcionesFiltro.find(o => o.id === filtroActivo)?.label}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default resumen;