import { mockUbicaciones } from "./mockData";
import { UbicacionTecnica, PadreUbicacion } from "@/types/models/ubicacionesTecnicas.types";

// Helper to find a node and its path
const findNodeAndPath = (
    nodes: UbicacionTecnica[],
    targetId: number,
    path: UbicacionTecnica[] = []
): { node: UbicacionTecnica | null; path: UbicacionTecnica[] } => {
    for (const node of nodes) {
        if (node.idUbicacion === targetId) {
            return { node, path };
        }
        if (node.children && node.children.length > 0) {
            const result = findNodeAndPath(node.children, targetId, [...path, node]);
            if (result.node) {
                return result;
            }
        }
    }
    return { node: null, path: [] };
};

export const getPadresDeUbicacionMock = async (id: number): Promise<{ data: PadreUbicacion[]; success: boolean }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { path } = findNodeAndPath(mockUbicaciones, id);

    // Map UbicacionTecnica to PadreUbicacion
    const padres: PadreUbicacion[] = path.map(p => ({
        idUbicacion: p.idUbicacion,
        codigo_Identificacion: p.codigo_Identificacion,
        descripcion: p.descripcion,
        abreviacion: p.abreviacion,
        nivel: p.nivel,
        esUbicacionFisica: false
    }));

    return {
        data: padres,
        success: true,
    };
};

export const getUbicacionesDependientesMock = async (id: number): Promise<{ data: UbicacionTecnica[]; success: boolean }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { node } = findNodeAndPath(mockUbicaciones, id);

    if (!node) {
        return { data: [], success: false };
    }

    // Flatten the children? The original API might return direct children or all descendants.
    // Looking at the UI "Esto eliminará la ubicación y todas las ubicaciones dependientes", 
    // and the usage `dependencias.data.data.map`, it likely expects a list of all descendants to show what will be deleted.
    // Let's implement a flattener for the children.

    const getAllDescendants = (n: UbicacionTecnica): UbicacionTecnica[] => {
        let descendants: UbicacionTecnica[] = [];
        if (n.children) {
            for (const child of n.children) {
                descendants.push(child);
                descendants = descendants.concat(getAllDescendants(child));
            }
        }
        return descendants;
    };

    const descendants = getAllDescendants(node);

    return {
        data: descendants,
        success: true,
    };
};
