import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { mantenimientoSchema } from "@/lib/validations/mantenimientoSchema";
import { useCreateMantenimiento } from "@/hooks/mantenimientos/useCreateMantenimientos";
import { CreateMantenimientoRequest } from "@/lib/api/mantenimientos";
import { useUbicacionesLista } from "@/hooks/ubicaciones-tecnicas/useUbicaciones";
import { Combobox } from "@/components/ui/combobox";
import { useSupervisores } from "@/hooks/usuarios/useUsuarios";
import { useGrupos } from "@/hooks/grupos-trabajo/useGrupoTrabajo";

const AREA_OPTIONS = ["Electricidad", "Infraestructura", "Mecanica", "Refrigeracion", "Logistica"] as const;

type MantenimientoFormData = z.infer<typeof mantenimientoSchema>;

interface MaintenanceFormContentProps {
    initialValues?: Partial<MantenimientoFormData>;
    onClose?: () => void;
    onSuccess?: () => void;
}

export const MaintenanceFormContent: React.FC<MaintenanceFormContentProps> = ({
    initialValues,
    onClose,
    onSuccess
}) => {
    const createMantenimientoMutation = useCreateMantenimiento();
    const { data: ubicaciones, isLoading: isLoadingUbicaciones } = useUbicacionesLista();
    const { supervisores } = useSupervisores();
    const { data: grupos } = useGrupos();

    const form = useForm<MantenimientoFormData>({
        resolver: zodResolver(mantenimientoSchema),
        defaultValues: {
            nombre: initialValues?.nombre || '',
            prioridad: (initialValues?.prioridad as any) || 'MEDIA',
            estado: initialValues?.estado || 'no_empezado',
            supervisor: initialValues?.supervisor || '',
            fechaCreacion: initialValues?.fechaCreacion || '',
            fechaLimite: initialValues?.fechaLimite || '',
            tipo: initialValues?.tipo || 'Periodico',
            frecuencia: initialValues?.frecuencia,
            idUbicacionTecnica: initialValues?.idUbicacionTecnica || 0, // 0 as empty/initial
            idGrupo: initialValues?.idGrupo || 1,
            areaEncargada: initialValues?.areaEncargada || (initialValues as any)?.AreaEncargada || '',
            resumen: initialValues?.resumen || ''
        }
    });

    const tipo = form.watch("tipo");

    // eliminar array de encargados hardcoded

    const onSubmit = (data: MantenimientoFormData) => {
        // Validar que la fecha de finalización sea posterior a la de inicio
        if (data.fechaCreacion && data.fechaLimite) {
            const inicio = new Date(data.fechaCreacion);
            const fin = new Date(data.fechaLimite);
            if (fin <= inicio) {
                form.setError("fechaLimite", {
                    type: "manual",
                    message: "La fecha de finalización debe ser posterior a la fecha de inicio",
                });
                return;
            }
        }

        // Mapear los datos del formulario al formato que espera el backend
        const mantenimientoData: CreateMantenimientoRequest = {
            tipoTrabajo: "Mantenimiento",
            nombre: data.nombre,
            fechaCreacion: new Date(data.fechaCreacion).toISOString(),
            idUbicacionTecnica: data.idUbicacionTecnica,
            idGrupo: data.idGrupo,
            // supervisorId is not in CreateMantenimientoRequest? Check interface again. 
            // The interface I saw earlier had: tipoTrabajo, nombre, prioridad, fechaCreacion, fechaLimite, tipo, frecuencia, idUbicacionTecnica, idGrupo, resumen
            // It did NOT have supervisorId, areaEncargada, repeticion, estado.
            // Wait, let's check CreateMantenimientoRequest again.
            prioridad: data.prioridad,
            fechaLimite: new Date(data.fechaLimite).toISOString(),
            frecuencia: data.frecuencia,
            tipo: data.tipo,
            resumen: data.resumen
        };

        createMantenimientoMutation.mutate(mantenimientoData, {
            onSuccess: () => {
                form.reset();
                onSuccess?.();
                onClose?.();
            },
            onError: (error) => {
                console.error("Error en la mutación:", error);
            }
        });
    };

    const onError = (errors: any) => {
        console.log("Errores de validación del formulario:", errors);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4 text-left">
                {/* Nombre del mantenimiento */}
                <div className="col-span-2">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del mantenimiento</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: Mantenimiento preventivo de aires acondicionados" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Ubicación Técnica */}
                <div className="col-span-2">
                    <FormField
                        control={form.control}
                        name="idUbicacionTecnica"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ubicación Técnica</FormLabel>
                                <FormControl>
                                    <Combobox
                                        data={ubicaciones?.map(u => ({
                                            value: u.idUbicacion,
                                            label: `${u.codigo_Identificacion} - ${u.descripcion}`
                                        })) || []}
                                        value={field.value || null}
                                        onValueChange={(value) => field.onChange(value || 0)}
                                        placeholder={isLoadingUbicaciones ? "Cargando ubicaciones..." : "Seleccionar ubicación técnica"}
                                        searchPlaceholder="Buscar ubicación..."
                                        triggerClassName="w-full !border-gray-200 overflow-hidden text-ellipsis"
                                        contentClassName="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6 my-2">
                    {/* Prioridad */}
                    <FormField
                        control={form.control}
                        name="prioridad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prioridad</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar prioridad" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="BAJA">Baja</SelectItem>
                                        <SelectItem value="MEDIA">Media</SelectItem>
                                        <SelectItem value="ALTA">Alta</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Área encargada */}
                    <FormField
                        control={form.control}
                        name="areaEncargada"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Área encargada</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar área encargada" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {AREA_OPTIONS.map((area) => (
                                            <SelectItem key={area} value={area}>
                                                {area}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    {/* Grupo de Trabajo */}
                    <FormField
                        control={form.control}
                        name="idGrupo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Grupo de Trabajo</FormLabel>
                                <Select
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    defaultValue={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full overflow-hidden text-ellipsis">
                                            <SelectValue placeholder="Seleccionar grupo" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {grupos?.map((grupo: any) => (
                                            <SelectItem key={grupo.id} value={grupo.id.toString()}>
                                                {grupo.nombre} ({grupo.codigo})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Supervisor */}
                    <FormField
                        control={form.control}
                        name="supervisor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Supervisor Asignado</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar supervisor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {supervisores?.map((supervisor: any) => (
                                            <SelectItem key={supervisor.Id} value={supervisor.Nombre}>
                                                {supervisor.Nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Fecha de inicio */}
                    <FormField
                        control={form.control}
                        name="fechaCreacion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de inicio</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Fecha de finalización */}
                    <FormField
                        control={form.control}
                        name="fechaLimite"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fecha de finalización</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Tipo de mantenimiento */}
                    <FormField
                        control={form.control}
                        name="tipo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de mantenimiento</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tipo de mantenimiento" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Periodico">Periódico</SelectItem>
                                        <SelectItem value="Condicion">Por Condición</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Frecuencia (solo si es periódico) */}
                    {tipo === "Periodico" && (
                        <FormField
                            control={form.control}
                            name="frecuencia"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frecuencia</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar frecuencia" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Diaria">Diaria</SelectItem>
                                            <SelectItem value="Semanal">Semanal</SelectItem>
                                            <SelectItem value="Mensual">Mensual</SelectItem>
                                            <SelectItem value="Bimestral">Bimestral</SelectItem>
                                            <SelectItem value="Trimestral">Trimestral</SelectItem>
                                            <SelectItem value="Semestral">Semestral</SelectItem>
                                            <SelectItem value="Anual">Anual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>

                {/* Resumen */}
                <FormField
                    control={form.control}
                    name="resumen"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resumen</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe las tareas específicas del mantenimiento..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2 mt-4">
                    {onClose && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={createMantenimientoMutation.isPending}
                        >
                            Cancelar
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="bg-gema-green/80 hover:bg-gema-green text-primary-foreground"
                        disabled={createMantenimientoMutation.isPending}
                    >
                        {createMantenimientoMutation.isPending ? "Guardando..." : "Guardar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
