import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUbicacionTecnica } from "@/lib/api/ubicacionesTecnicas";
import { toast } from "sonner";

interface EditUbicacionProps {
  open: boolean;
  onClose: () => void;
  idUbicacion: number;
  descripcionOriginal?: string;
}

const EditUbicacionForm: React.FC<EditUbicacionProps> = ({
  open,
  onClose,
  idUbicacion,
  descripcionOriginal,
}) => {
  const queryClient = useQueryClient();
  const [descripcion, setDescripcion] = useState(descripcionOriginal || "");

  const { mutate, status } = useMutation({
    mutationFn: ({ id, descripcion }: { id: number; descripcion: string }) =>
      updateUbicacionTecnica(id, { descripcion }),
    onSuccess: () => {
      toast.success("Ubicación actualizada correctamente");
      queryClient.invalidateQueries({ queryKey: ["ubicacionesTecnicas"] });
      onClose();
    },
    onError: () => {
      toast.error("Error al actualizar la ubicación");
    },
  });

  const onSubmit = () => {
    if (descripcion.trim()) {
      mutate({ id: idUbicacion, descripcion });
    }
  };

  return (
    <Modal
      title="Editar Ubicación"
      isOpen={open}
      onClose={onClose}
      className="max-w-lg bg-white"
    >
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Input
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Nueva descripción"
        />
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!descripcion.trim() || status === "pending"}
          className="bg-gema-green/80 hover:bg-gema-green text-primary-foreground"
        >
          {status === "pending" ? "Actualizando..." : "Actualizar"}
        </Button>
      </div>
    </Modal>
  );
};

export default EditUbicacionForm;
