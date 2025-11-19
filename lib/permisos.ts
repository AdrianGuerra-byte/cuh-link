// Mapeo de alcances
export const ALCANCES = {
  LICU: "Licenciatura",
  MACU: "Maestría",
  DOCU: "Doctorado",
  Global: "Global"
} as const

export type AlcanceKey = keyof typeof ALCANCES

// Función para obtener los alcances disponibles según permisos
export function getAlcancesDisponibles(alcances: string[]): string[] {
  if (alcances.includes("Global")) {
    return ["Licenciatura", "Maestría", "Doctorado"]
  }
  
  return alcances.map(alcance => ALCANCES[alcance as AlcanceKey]).filter(Boolean)
}

// Función para validar si un usuario tiene acceso a un alcance específico
export function tieneAccesoAlcance(alcancesUsuario: string[], alcanceItem: string): boolean {
  if (alcancesUsuario.includes("Global")) return true
  
  const alcanceMap: Record<string, string> = {
    "Licenciatura": "LICU",
    "Maestría": "MACU",
    "Doctorado": "DOCU"
  }
  
  const alcanceCodigo = alcanceMap[alcanceItem]
  return alcancesUsuario.includes(alcanceCodigo)
}
