import React from "react";
import {
    CirclePlus,
    CornerDownRight,
    Eye,
    EyeOff,
    Pencil,
    Trash,
    MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import type { UbicacionTecnica } from "@/types/models/ubicacionesTecnicas.types";

interface UbicacionRowProps {
    ubicacion: UbicacionTecnica;
    isViewing: boolean;
    onViewDetails: (detalle: UbicacionTecnica | null) => void;
    onCreateFrom: (codigo: string) => void;
    onEdit: (detalle: UbicacionTecnica) => void;
    onDelete: (detalle: UbicacionTecnica) => void;
}

export const UbicacionRow: React.FC<UbicacionRowProps> = ({
    ubicacion,
    isViewing,
    onViewDetails,
    onCreateFrom,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="flex px-4 py-2 bg-white hover:bg-gray-50 items-center">
            <div className="flex-1 flex flex-row items-center gap-2">
                <div style={{ paddingLeft: `${(ubicacion.nivel - 1) * 20}px` }}>
                    {ubicacion.nivel > 1 && (
                        <CornerDownRight size={18} className="text-gray-400" />
                    )}
                </div>
                <div>
                    <p className="font-mono font-semibold text-sm">
                        {ubicacion.codigo_Identificacion}
                    </p>
                    <p className="text-sm text-gray-700">{ubicacion.descripcion}</p>
                </div>
            </div>
            <div className="flex items-center justify-end gap-1 ml-4 sticky right-0 bg-white md:shadow-none md:static">
                {/* Desktop View */}
                <div className="hidden md:flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-blue-600 !px-2"
                                aria-label={isViewing ? "Cerrar detalles" : "Ver detalles"}
                                onClick={() => onViewDetails(isViewing ? null : ubicacion)}
                            >
                                {isViewing ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>{isViewing ? "Cerrar detalles" : "Ver detalles"}</span>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-gray-500 !px-2"
                                aria-label="Crear ubicación desde esta"
                                onClick={() => onCreateFrom(ubicacion.codigo_Identificacion)}
                            >
                                <CirclePlus size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Crear ubicación a partir de esta</span>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-yellow-600 !px-2 hover:text-yellow-700"
                                aria-label="Editar descripción"
                                onClick={() => onEdit(ubicacion)}
                            >
                                <Pencil size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Editar descripción</span>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                className="text-red-500 !px-2 hover:text-red-600"
                                aria-label="Eliminar ubicación"
                                onClick={() => onDelete(ubicacion)}
                            >
                                <Trash size={16} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Eliminar ubicación</span>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-55 p-1" align="end">
                            <div className="flex flex-col gap-1">
                                <Button
                                    variant="ghost"
                                    className="justify-start h-9 px-2 text-sm font-normal"
                                    onClick={() => onViewDetails(isViewing ? null : ubicacion)}
                                >
                                    {isViewing ? <EyeOff className="mr-2 h-4 w-4 text-blue-600" /> : <Eye className="mr-2 h-4 w-4 text-blue-600" />}
                                    {isViewing ? "Cerrar detalles" : "Ver detalles"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-9 px-2 text-sm font-normal"
                                    onClick={() => onCreateFrom(ubicacion.codigo_Identificacion)}
                                >
                                    <CirclePlus className="mr-2 h-4 w-4 text-gray-500" />
                                    Crear sub-ubicación
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-9 px-2 text-sm font-normal"
                                    onClick={() => onEdit(ubicacion)}
                                >
                                    <Pencil className="mr-2 h-4 w-4 text-yellow-600" />
                                    Editar
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="justify-start h-9 px-2 text-sm font-normal text-red-600 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => onDelete(ubicacion)}
                                >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Eliminar
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    );
};
