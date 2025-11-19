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

// Datos completos de personal administrativo (fuera del componente para evitar re-creación)
const TODOS_ADMINISTRATIVOS = [
  {
    id: 1,
    nombre: "Maritza Sánchez López",
    puesto: "Cajera",
    area: "Finanzas",
    nivel: "Licenciatura",
    departamento: "Servicios Escolares",
    estado: "Activo",
    email: "maritza.sanchez@cuh.edu.mx",
    telefono: "664-111-2222",
    badge: "default"
  },
  {
    id: 2,
    nombre: "Adrian Guerra Silva",
    puesto: "Desarrollador",
    area: "Tecnología",
    nivel: "Global",
    departamento: "TI",
    estado: "Activo",
    email: "adrian.guerra@cuh.edu.mx",
    telefono: "664-222-3333",
    badge: "default"
  },
  {
    id: 3,
    nombre: "Laura Fernández Gómez",
    puesto: "Coordinadora Académica",
    area: "Académica",
    nivel: "Maestría",
    departamento: "Coord. Académica",
    estado: "Activo",
    email: "laura.fernandez@cuh.edu.mx",
    telefono: "664-333-4444",
    badge: "default"
  },
  {
    id: 4,
    nombre: "Roberto Martínez Cruz",
    puesto: "Jefe de Recursos Humanos",
    area: "Recursos Humanos",
    nivel: "Global",
    departamento: "RH",
    estado: "Activo",
    email: "roberto.martinez@cuh.edu.mx",
    telefono: "664-444-5555",
    badge: "default"
  },
  {
    id: 5,
    nombre: "Patricia Ramírez Díaz",
    puesto: "Asistente de Dirección",
    area: "Dirección",
    nivel: "Global",
    departamento: "Dirección General",
    estado: "Activo",
    email: "patricia.ramirez@cuh.edu.mx",
    telefono: "664-555-6666",
    badge: "default"
  },
  {
    id: 6,
    nombre: "Carlos Hernández Torres",
    puesto: "Mantenimiento",
    area: "Operaciones",
    nivel: "Licenciatura",
    departamento: "Mantenimiento",
    estado: "Inactivo",
    email: "carlos.hernandez@cuh.edu.mx",
    telefono: "664-666-7777",
    badge: "secondary"
  }
]

export default function AdministrativosPage() {
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [busqueda, setBusqueda] = useState("")

  // Obtener permisos del módulo desde el JSON
  const catalogosModulo = menuData.menu.find(m => m.nombre === "Catálogos")
  const administrativosModulo = catalogosModulo?.hijos.find(h => h.nombre === "Administrativos")
  const permisos = administrativosModulo?.permisos || {
    puede_ver: true,
    puede_crear: false,
    puede_editar: false,
    puede_eliminar: false,
    alcance: []
  }

  // Obtener alcances disponibles según permisos del usuario
  const alcancesDisponibles = getAlcancesDisponibles(permisos.alcance || [])

  // Filtrar administrativos según alcance y búsqueda
  const administrativosFiltrados = useMemo(() => {
    return TODOS_ADMINISTRATIVOS.filter(admin => {
      // Filtro por alcance
      const tieneAcceso = filtroNivel === "todos" || admin.nivel === filtroNivel
      if (!tieneAcceso) return false

      // Validar que el usuario tenga acceso a este nivel según sus permisos
      const alcancePermitido = permisos.alcance?.includes("Global") || 
                               alcancesDisponibles.includes(admin.nivel) ||
                               admin.nivel === "Global" // Los administrativos globales son visibles para todos
      if (!alcancePermitido) return false

      // Filtro por búsqueda
      if (busqueda) {
        const searchLower = busqueda.toLowerCase()
        return (
          admin.nombre.toLowerCase().includes(searchLower) ||
          admin.puesto.toLowerCase().includes(searchLower) ||
          admin.area.toLowerCase().includes(searchLower) ||
          admin.departamento.toLowerCase().includes(searchLower)
        )
      }

      return true
    })
  }, [filtroNivel, busqueda, permisos.alcance, alcancesDisponibles])

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
                  <BreadcrumbPage>Administrativos</BreadcrumbPage>
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
                  Total Administrativos
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{administrativosFiltrados.length}</div>
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
                <div className="text-2xl font-bold">{administrativosFiltrados.filter(a => a.estado === "Activo").length}</div>
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
                <div className="text-2xl font-bold">{administrativosFiltrados.filter(a => a.estado === "Inactivo").length}</div>
                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  -1.2% vs. mes anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Administrativos */}
          <Card className="bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Catálogo de Administrativos</CardTitle>
                  <CardDescription>
                    Consulta de personal administrativo registrado en el sistema
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
                    placeholder="Buscar por nombre, puesto, área o departamento..." 
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
                      <th className="text-left p-3 font-semibold text-sm">Puesto</th>
                      <th className="text-left p-3 font-semibold text-sm">Área</th>
                      <th className="text-left p-3 font-semibold text-sm">Departamento</th>
                      <th className="text-left p-3 font-semibold text-sm">Nivel</th>
                      <th className="text-left p-3 font-semibold text-sm">Estado</th>
                      <th className="text-left p-3 font-semibold text-sm">Contacto</th>
                      {permisos.puede_ver && (
                        <th className="text-left p-3 font-semibold text-sm">Acciones</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {administrativosFiltrados.map((admin) => (
                      <tr key={admin.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{admin.nombre}</td>
                        <td className="p-3 text-sm text-muted-foreground">{admin.puesto}</td>
                        <td className="p-3 text-sm text-muted-foreground">{admin.area}</td>
                        <td className="p-3 text-sm text-muted-foreground">{admin.departamento}</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline">{admin.nivel}</Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge variant={getBadgeVariant(admin.badge)}>
                            {admin.estado}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span>{admin.email}</span>
                            <span>{admin.telefono}</span>
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
