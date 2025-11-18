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
  Users, 
  TrendingUp, 
  UserPlus,
  Phone,
  Mail,
  Search,
  Filter,
  Download,
  Calendar,
  Clock
} from "lucide-react"

export default function ProspectosPage() {
  // Datos de ejemplo para las métricas
  const metricas = [
    {
      titulo: "Total Prospectos",
      valor: "342",
      cambio: "+18%",
      tendencia: "up",
      icono: Users,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      titulo: "Nuevos Esta Semana",
      valor: "24",
      cambio: "+12%",
      tendencia: "up",
      icono: UserPlus,
      color: "text-green-600 dark:text-green-400"
    },
    {
      titulo: "En Seguimiento",
      valor: "89",
      cambio: "+5%",
      tendencia: "up",
      icono: Clock,
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      titulo: "Tasa de Conversión",
      valor: "68%",
      cambio: "+3%",
      tendencia: "up",
      icono: TrendingUp,
      color: "text-purple-600 dark:text-purple-400"
    },
  ]

  // Datos de ejemplo para la tabla de prospectos
  const prospectos = [
    {
      id: "PROS-001",
      nombre: "Angel Adrian Guerra Avila",
      telefono: "664-123-4567",
      email: "angel.guerra@email.com",
      programa: "Lic. Sistemas",
      origen: "Redes Sociales",
      fechaContacto: "15/11/2025",
      estado: "Inscrito",
      prioridad: "Alta",
      badge: "default",
      prioridadColor: "destructive"
    },
    {
      id: "PROS-002",
      nombre: "Leonardo Morales Reyes",
      telefono: "664-234-5678",
      email: "leonardo.morales@email.com",
      programa: "Lic. Administración",
      origen: "Referido",
      fechaContacto: "14/11/2025",
      estado: "En Seguimiento",
      prioridad: "Media",
      badge: "secondary",
      prioridadColor: "secondary"
    },
    {
      id: "PROS-003",
      nombre: "Gustavo Adolfo Bautista Hernandez",
      telefono: "664-345-6789",
      email: "gustavo.bautista@email.com",
      programa: "Lic. Derecho",
      origen: "Evento",
      fechaContacto: "13/11/2025",
      estado: "Inscrito",
      prioridad: "Alta",
      badge: "default",
      prioridadColor: "destructive"
    },
    {
      id: "PROS-004",
      nombre: "Gustavo Adolfo Bautista Hernandez",
      telefono: "664-345-6789",
      email: "gustavo.bautista@email.com",
      programa: "Maestría Educación",
      origen: "Web",
      fechaContacto: "12/11/2025",
      estado: "Inscrito",
      prioridad: "Alta",
      badge: "default",
      prioridadColor: "destructive"
    },
    {
      id: "PROS-005",
      nombre: "Nestor Cristian Becerril Morales",
      telefono: "664-567-8901",
      email: "nestor.becerril@email.com",
      programa: "Lic. Sistemas",
      origen: "Redes Sociales",
      fechaContacto: "11/11/2025",
      estado: "Contactado",
      prioridad: "Alta",
      badge: "success",
      prioridadColor: "destructive"
    },
  ]

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "default":
        return "default"
      default:
        return "outline"
    }
  }

  const getPrioridadVariant = (color: string) => {
    switch (color) {
      case "destructive":
        return "destructive"
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
                    Promoción
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Prospectos</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Métricas */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
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
                    {metrica.cambio} vs. semana anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabla de Prospectos */}
          <Card className="bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Seguimiento de Prospectos</CardTitle>
                  <CardDescription>
                    Gestión y seguimiento de estudiantes potenciales
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Nuevo Prospecto
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
              
              {/* Barra de búsqueda */}
              <div className="flex gap-2 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar por nombre, email, teléfono o ID..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-sm">ID</th>
                      <th className="text-left p-3 font-semibold text-sm">Nombre Completo</th>
                      <th className="text-left p-3 font-semibold text-sm">Contacto</th>
                      <th className="text-left p-3 font-semibold text-sm">Programa</th>
                      <th className="text-left p-3 font-semibold text-sm">Origen</th>
                      <th className="text-left p-3 font-semibold text-sm">Fecha</th>
                      <th className="text-left p-3 font-semibold text-sm">Estado</th>
                      <th className="text-left p-3 font-semibold text-sm">Prioridad</th>
                      <th className="text-left p-3 font-semibold text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prospectos.map((prospecto) => (
                      <tr key={prospecto.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{prospecto.id}</td>
                        <td className="p-3 text-sm font-medium">{prospecto.nombre}</td>
                        <td className="p-3 text-sm">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span className="text-xs">{prospecto.telefono}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              <span className="text-xs">{prospecto.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="font-medium">
                            {prospecto.programa}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{prospecto.origen}</td>
                        <td className="p-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {prospecto.fechaContacto}
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge variant={getBadgeVariant(prospecto.badge)}>
                            {prospecto.estado}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <Badge variant={getPrioridadVariant(prospecto.prioridadColor)}>
                            {prospecto.prioridad}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Contactar
                            </Button>
                          </div>
                        </td>
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
