"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { useState, useMemo } from "react"

// Datos completos de docentes (fuera del componente para evitar re-creación)
const TODOS_DOCENTES = [
  {
    id: 1,
    nombre: "Dr. Juan Carlos Méndez",
    especialidad: "Sistemas Computacionales",
    nivel: "Licenciatura",
    cursos: 3,
    estado: "Activo",
    email: "jc.mendez@cuh.edu.mx",
    telefono: "664-111-2222",
    badge: "default"
  },
  {
    id: 2,
    nombre: "Mtra. Patricia Gómez Rivera",
    especialidad: "Administración",
    nivel: "Licenciatura",
    cursos: 2,
    estado: "Activo",
    email: "patricia.gomez@cuh.edu.mx",
    telefono: "664-222-3333",
    badge: "default"
  },
  {
    id: 3,
    nombre: "Dr. Roberto Sánchez López",
    especialidad: "Derecho Constitucional",
    nivel: "Maestría",
    cursos: 4,
    estado: "Activo",
    email: "roberto.sanchez@cuh.edu.mx",
    telefono: "664-333-4444",
    badge: "default"
  },
  {
    id: 4,
    nombre: "Lic. Ana María Torres",
    especialidad: "Psicología Clínica",
    nivel: "Licenciatura",
    cursos: 2,
    estado: "Activo",
    email: "ana.torres@cuh.edu.mx",
    telefono: "664-444-5555",
    badge: "default"
  },
  {
    id: 5,
    nombre: "Dr. Carlos Eduardo Ramírez",
    especialidad: "Metodología de Investigación",
    nivel: "Doctorado",
    cursos: 2,
    estado: "Activo",
    email: "carlos.ramirez@cuh.edu.mx",
    telefono: "664-555-6666",
    badge: "default"
  },
  {
    id: 6,
    nombre: "Mtro. Fernando Delgado Cruz",
    especialidad: "Finanzas",
    nivel: "Maestría",
    cursos: 1,
    estado: "Inactivo",
    email: "fernando.delgado@cuh.edu.mx",
    telefono: "664-666-7777",
    badge: "secondary"
  }
]

export default function DocentesPage() {
  const [busqueda, setBusqueda] = useState("")
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")

  // Obtener permisos del módulo de Docentes desde el JSON
  const docentesModulo = menuData.menu
    .find(m => m.nombre === "Catálogos")
    ?.hijos?.find(h => h.idModulo === 502)
  
  const permisos = docentesModulo?.permisos || {
    puede_ver: false,
    puede_crear: false,
    puede_editar: false,
    puede_eliminar: false,
    alcance: []
  }

  // Obtener alcances disponibles según permisos del usuario
  const alcancesDisponibles = getAlcancesDisponibles(permisos.alcance || [])

  // Filtrar docentes según alcance y búsqueda
  const docentesFiltrados = useMemo(() => {
    return TODOS_DOCENTES.filter(docente => {
      // Filtrar por nivel académico según alcance del usuario
      const nivelPermitido = filtroNivel === "todos" || docente.nivel === filtroNivel
      const alcancePermitido = permisos.alcance?.includes("Global") || alcancesDisponibles.includes(docente.nivel)
      
      // Filtrar por búsqueda
      const coincideBusqueda = busqueda === "" || 
        docente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        docente.especialidad.toLowerCase().includes(busqueda.toLowerCase()) ||
        docente.email.toLowerCase().includes(busqueda.toLowerCase())
      
      return nivelPermitido && alcancePermitido && coincideBusqueda
    })
  }, [filtroNivel, busqueda, permisos.alcance, alcancesDisponibles])

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
                  <BreadcrumbPage>Docentes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Métricas */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card className="bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Docentes
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{docentesFiltrados.length}</div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% vs. mes anterior
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Activos
                </CardTitle>
                <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{docentesFiltrados.filter(d => d.estado === "Activo").length}</div>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% vs. mes anterior
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inactivos
                </CardTitle>
                <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{docentesFiltrados.filter(d => d.estado === "Inactivo").length}</div>
                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  -1.2% vs. mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Docentes */}
          <Card className="bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Catálogo de Docentes</CardTitle>
                  <CardDescription>
                    Consulta de profesores registrados en el sistema
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
                    placeholder="Buscar por nombre, especialidad o correo..." 
                    className="pl-8"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                </div>
                
                {/* Filtro por nivel académico */}
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    {alcancesDisponibles.map((nivel) => (
                      <SelectItem key={nivel} value={nivel}>
                        {nivel}
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
                      <th className="text-left p-3 font-semibold text-sm">Nombre Completo</th>
                      <th className="text-left p-3 font-semibold text-sm">Especialidad</th>
                      <th className="text-left p-3 font-semibold text-sm">Nivel</th>
                      <th className="text-left p-3 font-semibold text-sm">Cursos</th>
                      <th className="text-left p-3 font-semibold text-sm">Estado</th>
                      <th className="text-left p-3 font-semibold text-sm">Contacto</th>
                      {permisos.puede_ver && (
                        <th className="text-left p-3 font-semibold text-sm">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {docentesFiltrados.map((docente) => (
                      <tr key={docente.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{docente.nombre}</td>
                        <td className="p-3 text-sm text-muted-foreground">{docente.especialidad}</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline">{docente.nivel}</Badge>
                        </td>
                        <td className="p-3 text-sm text-center">{docente.cursos}</td>
                        <td className="p-3 text-sm">
                          <Badge variant={docente.badge as "default" | "secondary"}>
                            {docente.estado}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span>{docente.email}</span>
                            <span>{docente.telefono}</span>
                          </div>
                        </td>
                        {permisos.puede_ver && (
                          <td className="p-3 text-sm">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                Ver
                              </Button>
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
