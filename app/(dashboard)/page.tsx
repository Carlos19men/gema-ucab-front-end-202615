const Canva = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido</h1>
      <p>Selecciona una opción del menú para comenzar</p>
    </div>
  )
}

export default Canva

/**
 * Opción a considerar para despues 
 * // Versión mejorada (opcional)
export default function CanvaPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bienvenido al Sistema GEMA</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Ubicaciones Técnicas</h3>
          <p className="text-sm text-muted-foreground">
            Gestiona las ubicaciones técnicas del sistema
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Técnicos</h3>
          <p className="text-sm text-muted-foreground">
            Administra el personal técnico
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">Grupos de Trabajo</h3>
          <p className="text-sm text-muted-foreground">
            Organiza equipos de trabajo
          </p>
        </div>
      </div>
    </div>
  )
}
 */