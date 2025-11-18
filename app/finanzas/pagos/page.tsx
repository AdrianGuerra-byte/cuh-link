"use client"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  DollarSign, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  Plus
} from "lucide-react"

export default function PagosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMatricula, setSelectedMatricula] = useState("")
  const [selectedConcepto, setSelectedConcepto] = useState("")
  const [selectedSubConcepto, setSelectedSubConcepto] = useState("")
  const [metodoPago, setMetodoPago] = useState("")

  // Datos de estudiantes
  const estudiantes = [
    {
      matricula: "CUH53239645",
      nombre: "Angel Adrian Guerra Avila",
      grado: "Licenciatura"
    },
    {
      matricula: "CUH51218587",
      nombre: "Leonardo Morales Reyes",
      grado: "Licenciatura"
    },
    {
      matricula: "CUH51197227",
      nombre: "Gustavo Adolfo Bautista Hernandez",
      grado: "Licenciatura"
    },
    {
      matricula: "CUHMFD1231474",
      nombre: "Gustavo Adolfo Bautista Hernandez",
      grado: "Maestría"
    },
    {
      matricula: "CUH51239690",
      nombre: "Nestor Cristian Becerril Morales",
      grado: "Licenciatura"
    }
  ]

  // Conceptos de pago
  const conceptos = {
    "Constancia": [
      { nombre: "Inscripción ANUAL", precio: 1000 },
      { nombre: "Reinscripción Anual", precio: 1200 },
      { nombre: "Credencial", precio: 75 },
      { nombre: "Seguro Escolar", precio: 125 },
      { nombre: "Constancia de no adeudo", precio: 50 },
      { nombre: "Constancia de estudios", precio: 400 },
      { nombre: "Acreditación servicio social", precio: 550 },
      { nombre: "Cambio de Licenciatura", precio: 950 },
      { nombre: "Cambio de turno", precio: 850 }
    ]
  }

  const getEstudianteData = (matricula: string) => {
    return estudiantes.find(e => e.matricula === matricula)
  }

  const getSubConceptoPrecio = () => {
    if (selectedConcepto && selectedSubConcepto) {
      const subConceptoObj = conceptos[selectedConcepto as keyof typeof conceptos]?.find(
        c => c.nombre === selectedSubConcepto
      )
      return subConceptoObj?.precio || 0
    }
    return 0
  }

  const handleRegistrarPago = () => {
    // Aquí iría la lógica para registrar el pago
    console.log({
      matricula: selectedMatricula,
      concepto: selectedConcepto,
      subConcepto: selectedSubConcepto,
      monto: getSubConceptoPrecio(),
      metodoPago
    })
    // Cerrar modal y limpiar formulario
    setIsModalOpen(false)
    setSelectedMatricula("")
    setSelectedConcepto("")
    setSelectedSubConcepto("")
    setMetodoPago("")
  }

  const estudianteSeleccionado = getEstudianteData(selectedMatricula)

  // Datos de ejemplo para las métricas
  const metricas = [
    {
      titulo: "Total Pagos Hoy",
      valor: "$45,231.89",
      cambio: "+20.1%",
      tendencia: "up",
      icono: DollarSign,
      color: "text-green-600 dark:text-green-400"
    },
    {
      titulo: "Pagos Pendientes",
      valor: "23",
      cambio: "-4%",
      tendencia: "down",
      icono: Clock,
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      titulo: "Pagos Completados",
      valor: "156",
      cambio: "+12%",
      tendencia: "up",
      icono: CheckCircle2,
      color: "text-blue-600 dark:text-blue-400"
    }
  ]

  // Datos de ejemplo para la tabla de pagos
  const pagos = [
    {
      id: "PAG-001",
      estudiante: "Angel Adrian Guerra Avila",
      matricula: "CUH53239645",
      concepto: "Inscripción ANUAL",
      monto: "$1,000.00",
      fecha: "15/11/2025",
      metodo: "Transferencia",
      estado: "Completado",
      badge: "default"
    },
    {
      id: "PAG-002",
      estudiante: "Leonardo Morales Reyes",
      matricula: "CUH51218587",
      concepto: "Reinscripción Anual",
      monto: "$1,200.00",
      fecha: "14/11/2025",
      metodo: "Efectivo",
      estado: "Pendiente",
      badge: "secondary"
    },
    {
      id: "PAG-003",
      estudiante: "Gustavo Adolfo Bautista Hernandez",
      matricula: "CUH51197227",
      concepto: "Credencial",
      monto: "$75.00",
      fecha: "13/11/2025",
      metodo: "Tarjeta",
      estado: "Completado",
      badge: "default"
    },
    {
      id: "PAG-004",
      estudiante: "Gustavo Adolfo Bautista Hernandez",
      matricula: "CUHMFD1231474",
      concepto: "Constancia de estudios",
      monto: "$400.00",
      fecha: "12/11/2025",
      metodo: "Transferencia",
      estado: "Completado",
      badge: "default"
    },
    {
      id: "PAG-005",
      estudiante: "Nestor Cristian Becerril Morales",
      matricula: "CUH51239690",
      concepto: "Seguro Escolar",
      monto: "$125.00",
      fecha: "11/11/2025",
      metodo: "Efectivo",
      estado: "Completado",
      badge: "default"
    },
  ]

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "success":
        return "default"
      case "warning":
        return "secondary"
      case "destructive":
        return "destructive"
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
                    Finanzas
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pagos</BreadcrumbPage>
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
                    {metrica.cambio} vs. día anterior
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Botón Registrar Pago */}
            <Card 
              className="bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <CardContent className="flex flex-col items-center justify-center h-full p-6">
                <div className="rounded-full bg-primary/20 p-4 group-hover:bg-primary/30 transition-all mb-3">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary">Registrar Pago</h3>
                <p className="text-xs text-muted-foreground mt-1">Nuevo registro</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Pagos */}
          <Card className="bg-card/40 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registro de Pagos</CardTitle>
                  <CardDescription>
                    Gestión y seguimiento de pagos de estudiantes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
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
                  <Input placeholder="Buscar por estudiante, matrícula o ID..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-sm">ID Pago</th>
                      <th className="text-left p-3 font-semibold text-sm">Estudiante</th>
                      <th className="text-left p-3 font-semibold text-sm">Matrícula</th>
                      <th className="text-left p-3 font-semibold text-sm">Concepto</th>
                      <th className="text-left p-3 font-semibold text-sm">Monto</th>
                      <th className="text-left p-3 font-semibold text-sm">Fecha</th>
                      <th className="text-left p-3 font-semibold text-sm">Método</th>
                      <th className="text-left p-3 font-semibold text-sm">Estado</th>
                      <th className="text-left p-3 font-semibold text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagos.map((pago) => (
                      <tr key={pago.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-3 text-sm font-medium">{pago.id}</td>
                        <td className="p-3 text-sm">{pago.estudiante}</td>
                        <td className="p-3 text-sm">
                          <Badge variant="outline" className="font-mono text-xs">
                            {pago.matricula}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">{pago.concepto}</td>
                        <td className="p-3 text-sm font-semibold text-primary">{pago.monto}</td>
                        <td className="p-3 text-sm text-muted-foreground">{pago.fecha}</td>
                        <td className="p-3 text-sm text-muted-foreground">{pago.metodo}</td>
                        <td className="p-3 text-sm">
                          <Badge variant={getBadgeVariant(pago.badge)}>
                            {pago.estado}
                          </Badge>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Ver
                            </Button>
                            <Button variant="ghost" size="sm">
                              Recibo
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

      {/* Modal de Registro de Pago */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Pago</DialogTitle>
            <DialogDescription>
              Usuario Caja - <span className="font-semibold text-foreground">Maritza</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Matrícula */}
            <div className="grid gap-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Select value={selectedMatricula} onValueChange={setSelectedMatricula}>
                <SelectTrigger id="matricula">
                  <SelectValue placeholder="Selecciona una matrícula" />
                </SelectTrigger>
                <SelectContent>
                  {estudiantes.map((estudiante) => (
                    <SelectItem key={estudiante.matricula} value={estudiante.matricula}>
                      {estudiante.matricula} - {estudiante.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Datos del Alumno (auto-rellenado) */}
            {estudianteSeleccionado && (
              <div className="grid gap-2 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Alumno</Label>
                    <p className="text-sm font-medium">{estudianteSeleccionado.nombre}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Grado</Label>
                    <p className="text-sm font-medium">{estudianteSeleccionado.grado}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Concepto */}
            <div className="grid gap-2">
              <Label htmlFor="concepto">Concepto</Label>
              <Select value={selectedConcepto} onValueChange={(value) => {
                setSelectedConcepto(value)
                setSelectedSubConcepto("") // Reset subconcepto
              }}>
                <SelectTrigger id="concepto">
                  <SelectValue placeholder="Selecciona un concepto" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(conceptos).map((concepto) => (
                    <SelectItem key={concepto} value={concepto}>
                      {concepto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-Concepto */}
            {selectedConcepto && (
              <div className="grid gap-2">
                <Label htmlFor="subconcepto">Tipo de {selectedConcepto}</Label>
                <Select value={selectedSubConcepto} onValueChange={setSelectedSubConcepto}>
                  <SelectTrigger id="subconcepto">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {conceptos[selectedConcepto as keyof typeof conceptos]?.map((subConcepto) => (
                      <SelectItem key={subConcepto.nombre} value={subConcepto.nombre}>
                        {subConcepto.nombre} - ${subConcepto.precio.toLocaleString('es-MX')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Monto (auto-calculado) */}
            {selectedSubConcepto && (
              <div className="grid gap-2">
                <Label htmlFor="monto">Monto</Label>
                <Input
                  id="monto"
                  value={`$${getSubConceptoPrecio().toLocaleString('es-MX')}.00`}
                  readOnly
                  className="font-bold text-lg text-primary"
                />
              </div>
            )}

            {/* Método de Pago */}
            <div className="grid gap-2">
              <Label htmlFor="metodo">Método de Pago</Label>
              <Select value={metodoPago} onValueChange={setMetodoPago}>
                <SelectTrigger id="metodo">
                  <SelectValue placeholder="Selecciona el método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRegistrarPago}
              disabled={!selectedMatricula || !selectedConcepto || !selectedSubConcepto || !metodoPago}
            >
              Registrar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
