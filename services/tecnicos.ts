// services/tecnicos.ts - ARCHIVO TEMPORAL
export async function createTecnico(data: { Nombre: string; Correo: string }) {
  // Mock temporal para compilar
  console.log('Mock: Creando técnico', data);
  return Promise.resolve({ 
    success: true, 
    message: 'Técnico creado exitosamente (mock)' 
  });
}

export async function getTecnicos() {
  // Mock temporal
  return Promise.resolve({
    data: [
      { Id: 1, Nombre: "Técnico Demo", Correo: "demo@ucab.edu.ve" }
    ]
  });
}