"use client"

import { useState, useMemo } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Users, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  UserCheck,
  UserX
} from "lucide-react"
import menuData from "@/data/menu-data.json"
import { getAlcancesDisponibles } from "@/lib/permisos"

// Datos de ejemplo para la tabla de alumnos (movidos fuera del componente para evitar re-renders)
const TODOS_ALUMNOS = [
  {
    id: 1,
    matricula: "CUH53239645",
    nombre: "Angel Adrian Guerra Avila",
    programa: "Lic. Sistemas Computacionales",
    nivel: "Licenciatura",
    bimestre: "7°",
    estado: "Activo",
    email: "angel.guerra@cuh.edu.mx",
    telefono: "664-123-4567",
    badge: "default"
  },
  {
    id: 2,
    matricula: "CUH51218587",
    nombre: "Leonardo Morales Reyes",
    programa: "Lic. Administración",
    nivel: "Licenciatura",
    bimestre: "5°",
    estado: "Activo",
    email: "leonardo.morales@cuh.edu.mx",
    telefono: "664-234-5678",
    badge: "default"
  },
  {
    id: 3,
    matricula: "CUH51197227",
    nombre: "Gustavo Adolfo Bautista Hernandez",
    programa: "Lic. Derecho",
    nivel: "Licenciatura",
    bimestre: "3°",
    estado: "Activo",
    email: "gustavo.bautista@cuh.edu.mx",
    telefono: "664-345-6789",
    badge: "default"
  },
  {
    id: 4,
    matricula: "CUHMFD1231474",
    nombre: "Gustavo Adolfo Bautista Hernandez",
    programa: "Maestría en Educación",
    nivel: "Maestría",
    bimestre: "2°",
    estado: "Activo",
    email: "gustavo.bautista.maestria@cuh.edu.mx",
    telefono: "664-345-6789",
    badge: "default"
  },
  {
    id: 5,
    matricula: "CUH51239690",
    nombre: "Nestor Cristian Becerril Morales",
    programa: "Lic. Sistemas Computacionales",
    nivel: "Licenciatura",
    bimestre: "6°",
    estado: "Activo",
    email: "nestor.becerril@cuh.edu.mx",
    telefono: "664-567-8901",
    badge: "default"
  },
  {
    id: 6,
    matricula: "CUH52198456",
    nombre: "María Fernanda López García",
    programa: "Lic. Psicología",
    nivel: "Licenciatura",
    bimestre: "4°",
    estado: "Inactivo",
    email: "maria.lopez@cuh.edu.mx",
    telefono: "664-678-9012",
    badge: "secondary"
  },
  {
    id: 7,
    matricula: "CUHMA2234567",
    nombre: "Roberto Sánchez Pérez",
    programa: "Maestría en Administración",
    nivel: "Maestría",
    bimestre: "3°",
    estado: "Activo",
    email: "roberto.sanchez@cuh.edu.mx",
    telefono: "664-789-0123",
    badge: "default"
  },
  {
    id: 8,
    matricula: "CUHDOC3345678",
    nombre: "Ana María Torres Díaz",
    programa: "Doctorado en Educación",
    nivel: "Doctorado",
    bimestre: "4°",
    estado: "Activo",
    email: "ana.torres@cuh.edu.mx",
    telefono: "664-890-1234",
    badge: "default"
  },
  {
    id: 9,
    matricula: "CUHDOC3456789",
    nombre: "Carlos Eduardo Ramírez",
    programa: "Doctorado en Ciencias",
    nivel: "Doctorado",
    bimestre: "2°",
    estado: "Activo",
    email: "carlos.ramirez@cuh.edu.mx",
    telefono: "664-901-2345",
    badge: "default"
  }
]

export default function AlumnosPage() {
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState("")

  // Obtener permisos del módulo desde el JSON
  const catalogosModulo = menuData.menu.find(m => m.nombre === "Catálogos")
  const alumnosModulo = catalogosModulo?.hijos.find(h => h.nombre === "Alumnos")
  const permisos = alumnosModulo?.permisos || {
    puede_ver: true,
    puede_crear: false,
    puede_editar: false,
    puede_eliminar: false,
    alcance: []
  }

  // Obtener alcances disponibles según permisos del usuario
  const alcancesDisponibles = getAlcancesDisponibles(permisos.alcance || [])

  // Filtrar alumnos según alcance y búsqueda
  const alumnosFiltrados = useMemo(() => {
    return TODOS_ALUMNOS.filter(alumno => {
      // Filtro por alcance
      const tieneAcceso = filtroNivel === "todos" || alumno.nivel === filtroNivel
      if (!tieneAcceso) return false

      // Validar que el usuario tenga acceso a este nivel según sus permisos
      const alcancePermitido = permisos.alcance?.includes("Global") || 
                               alcancesDisponibles.includes(alumno.nivel)
      if (!alcancePermitido) return false

      // Filtro por búsqueda
      if (busqueda) {
        const searchLower = busqueda.toLowerCase()
        return (
          alumno.nombre.toLowerCase().includes(searchLower) ||
          alumno.matricula.toLowerCase().includes(searchLower) ||
          alumno.programa.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
  }, [filtroNivel, busqueda, permisos.alcance, alcancesDisponibles])

  // Métricas dinámicas basadas en alumnos filtrados
  const metricas = [
    {
      titulo: "Total Alumnos",
      valor: alumnosFiltrados.length.toString(),
      cambio: "+5.2%",
      tendencia: "up",
      icono: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      titulo: "Activos",
      valor: alumnosFiltrados.filter(a => a.estado === "Activo").length.toString(),
      cambio: "+2.1%",
      tendencia: "up",
      icono: UserCheck,
      color: "text-green-600 dark:text-green-400"
    },
    {
      titulo: "Inactivos",
      valor: alumnosFiltrados.filter(a => a.estado === "Inactivo").length.toString(),
      cambio: "-1.2%",
      tendencia: "down",
      icono: UserX,
      color: "text-red-600 dark:text-red-400"
    }
  ]

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "default":
        return "default"
      case "secondary":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Catálogos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Alumnos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Métricas */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {metricas.map((metrica, index) => (
              <Card key={index} className="bg-card/40 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metrica.titulo}
                  </CardTitle>
                  <metrica.icono className={`h-4 w-4 ${metrica.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrica.valor}</div>
                  <p className={`text-xs ${metrica.tendencia === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {metrica.cambio} vs. mes anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabla de Alumnos */}
          <Card className="bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Catálogo de Alumnos</CardTitle>
                  <CardDescription>
                    Consulta de estudiantes registrados en el sistema
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              {/* Barra de búsqueda y filtros */}
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por nombre, matrícula o programa..." 
                    className="pl-8"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                {/* Filtro por Nivel/Alcance */}
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    {alcancesDisponibles.map((alcance) => (
                      <SelectItem key={alcance} value={alcance}>
                        {alcance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-sm">Matrícula</th>
                      <th className="text-left p-3 font-semibold text-sm">Nombre Completo</th>
                      <th className="text-left p-3 font-semibold text-sm">Programa</th>
                      <th className="text-left p-3 font-semibold text-sm">Nivel</th>
                      <th className="text-left p-3 font-semibold text-sm">Bimestre</th>
                      <th className="text-left p-3 font-semibold text-sm">Estado</th>
                      <th className="text-left p-3 font-semibold text-sm">Contacto</th>
                      {permisos.puede_ver && (
                        <th className="text-left p-3 font-semibold text-sm">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {alumnosFiltrados.map((alumno) => (
                      <tr key={alumno.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{alumno.matricula}</td>
                        <td className="p-3 text-sm font-medium">{alumno.nombre}</td>
                        <td className="p-3 text-sm text-muted-foreground">{alumno.programa}</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline">{alumno.nivel}</Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{alumno.bimestre}</td>
                        <td className="p-3 text-sm">
                          <Badge variant={getBadgeVariant(alumno.badge)}>
                            {alumno.estado}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span>{alumno.email}</span>
                            <span>{alumno.telefono}</span>
                          </div>
                        </td>
                        {permisos.puede_ver && (
                          <td className="p-3 text-sm">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
                              {/* Solo mostrar botones de edición/eliminación si tiene permisos */}
                              {permisos.puede_editar && (
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                              )}
                              {permisos.puede_eliminar && (
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  Eliminar
                                </Button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
