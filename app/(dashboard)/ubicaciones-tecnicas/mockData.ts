import { UbicacionTecnica } from "@/types/models/ubicacionesTecnicas.types";

export const mockUbicaciones: UbicacionTecnica[] = [
    {
        idUbicacion: 1,
        descripcion: "Planta Principal",
        abreviacion: "PP",
        codigo_Identificacion: "PP",
        nivel: 1,
        children: [
            {
                idUbicacion: 2,
                descripcion: "Edificio Administrativo",
                abreviacion: "ADM",
                codigo_Identificacion: "PP-ADM",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 3,
                        descripcion: "Oficina Gerencia",
                        abreviacion: "GER",
                        codigo_Identificacion: "PP-ADM-GER",
                        nivel: 3,
                        children: []
                    },
                    {
                        idUbicacion: 4,
                        descripcion: "Sala de Reuniones",
                        abreviacion: "REU",
                        codigo_Identificacion: "PP-ADM-REU",
                        nivel: 3,
                        children: []
                    }
                ]
            },
            {
                idUbicacion: 5,
                descripcion: "Nave Industrial A",
                abreviacion: "NAV-A",
                codigo_Identificacion: "PP-NAV-A",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 6,
                        descripcion: "Línea de Producción 1",
                        abreviacion: "LIN-1",
                        codigo_Identificacion: "PP-NAV-A-LIN-1",
                        nivel: 3,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        idUbicacion: 7,
        descripcion: "Centro de Distribución",
        abreviacion: "CD",
        codigo_Identificacion: "CD",
        nivel: 1,
        children: [
            {
                idUbicacion: 8,
                descripcion: "Almacén General",
                abreviacion: "ALM-GEN",
                codigo_Identificacion: "CD-ALM-GEN",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 9,
                        descripcion: "Zona de Recepción",
                        abreviacion: "REC",
                        codigo_Identificacion: "CD-ALM-GEN-REC",
                        nivel: 3,
                        children: []
                    },
                    {
                        idUbicacion: 10,
                        descripcion: "Zona de Despacho",
                        abreviacion: "DES",
                        codigo_Identificacion: "CD-ALM-GEN-DES",
                        nivel: 3,
                        children: []
                    }
                ]
            },
            {
                idUbicacion: 11,
                descripcion: "Cámara Frigorífica",
                abreviacion: "CAM-FRI",
                codigo_Identificacion: "CD-CAM-FRI",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 12,
                        descripcion: "Sección Congelados",
                        abreviacion: "CONG",
                        codigo_Identificacion: "CD-CAM-FRI-CONG",
                        nivel: 3,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        idUbicacion: 13,
        descripcion: "Planta de Tratamiento",
        abreviacion: "PT",
        codigo_Identificacion: "PT",
        nivel: 1,
        children: [
            {
                idUbicacion: 14,
                descripcion: "Área de Filtración",
                abreviacion: "FILT",
                codigo_Identificacion: "PT-FILT",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 15,
                        descripcion: "Filtro Primario",
                        abreviacion: "FP",
                        codigo_Identificacion: "PT-FILT-FP",
                        nivel: 3,
                        children: []
                    },
                    {
                        idUbicacion: 16,
                        descripcion: "Filtro Secundario",
                        abreviacion: "FS",
                        codigo_Identificacion: "PT-FILT-FS",
                        nivel: 3,
                        children: []
                    }
                ]
            },
            {
                idUbicacion: 17,
                descripcion: "Sala de Bombeo",
                abreviacion: "BOMB",
                codigo_Identificacion: "PT-BOMB",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 18,
                        descripcion: "Bomba Principal A",
                        abreviacion: "BP-A",
                        codigo_Identificacion: "PT-BOMB-BP-A",
                        nivel: 3,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        idUbicacion: 19,
        descripcion: "Campus Tecnológico",
        abreviacion: "CT",
        codigo_Identificacion: "CT",
        nivel: 1,
        children: [
            {
                idUbicacion: 20,
                descripcion: "Centro de Datos",
                abreviacion: "CDC",
                codigo_Identificacion: "CT-CDC",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 21,
                        descripcion: "Sala de Servidores",
                        abreviacion: "SRV",
                        codigo_Identificacion: "CT-CDC-SRV",
                        nivel: 3,
                        children: []
                    },
                    {
                        idUbicacion: 22,
                        descripcion: "Sala de Telecomunicaciones",
                        abreviacion: "TEL",
                        codigo_Identificacion: "CT-CDC-TEL",
                        nivel: 3,
                        children: []
                    }
                ]
            },
            {
                idUbicacion: 23,
                descripcion: "Laboratorio de Innovación",
                abreviacion: "LAB-INN",
                codigo_Identificacion: "CT-LAB-INN",
                nivel: 2,
                children: [
                    {
                        idUbicacion: 24,
                        descripcion: "Área de Prototipado",
                        abreviacion: "PROT",
                        codigo_Identificacion: "CT-LAB-INN-PROT",
                        nivel: 3,
                        children: []
                    }
                ]
            }
        ]
    }
];
