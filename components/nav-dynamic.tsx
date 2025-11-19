"use client"

import * as React from "react"
import {
  Building2,
  ChevronRight,
  DollarSign,
  FileText,
  GraduationCap,
  Megaphone,
  Settings,
  BookOpenText,
} from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Tipos para el JSON
type Permisos = {
  puede_ver: boolean
  puede_crear: boolean
  puede_editar: boolean
  puede_eliminar: boolean
  alcance: string[]
}

type Modulo = {
  idModulo: number
  nombre: string
  permisos?: Permisos
  hijos: Modulo[]
}

// Mapeo de iconos por nombre de módulo (solo para nivel 0)
const iconMap: Record<string, React.ElementType> = {
  "Promoción": Megaphone,
  "Finanzas": DollarSign,
  "Sistemas": Settings,
  "Servicios Escolares": GraduationCap,
  "Administración": Building2,
  "Catálogos": BookOpenText,
}

export function NavDynamic({
  modulos,
}: {
  modulos: Modulo[]
}) {
  // Función para normalizar nombres a formato de URL
  const normalizeUrlSegment = (nombre: string): string => {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .replace(/\s+/g, "-") // Espacios a guiones
      .replace(/[^a-z0-9-]/g, "") // Eliminar caracteres especiales
  }

  // Función para construir la ruta completa basada en la jerarquía
  const buildPath = (pathSegments: string[]): string => {
    return "/" + pathSegments.map(normalizeUrlSegment).join("/")
  }

  // Función recursiva para renderizar los items del menú
  const renderMenuItems = (items: Modulo[], level: number = 0, parentPath: string[] = []): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.hijos && item.hijos.length > 0
      const currentPath = [...parentPath, item.nombre]

      if (hasChildren) {
        // Renderiza un Collapsible si tiene hijos
        // Solo mostrar icono en nivel 0 (padres)
        const Icono = level === 0 ? (iconMap[item.nombre] || FileText) : null
        
        return (
          <Collapsible
            key={item.idModulo}
            asChild
            defaultOpen={level === 0}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.nombre}>
                  {Icono && <Icono className="h-4 w-4" />}
                  <span>{item.nombre}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderSubItems(item.hijos, level + 1, currentPath)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        )
      } else {
        // Renderiza un item simple sin hijos (hoja final)
        if (level === 0) {
          // Nivel raíz sin hijos - con icono
          const Icono = iconMap[item.nombre] || FileText
          const itemPath = buildPath(currentPath)
          
          return (
            <SidebarMenuItem key={item.idModulo}>
              <SidebarMenuButton asChild tooltip={item.nombre}>
                <a href={itemPath}>
                  <Icono className="h-4 w-4" />
                  <span>{item.nombre}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        }
      }
    })
  }

  // Función para renderizar sub-items (hijos y nietos - SIN iconos)
  const renderSubItems = (items: Modulo[], level: number, parentPath: string[]): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.hijos && item.hijos.length > 0
      const currentPath = [...parentPath, item.nombre]

      if (hasChildren) {
        // Collapsible anidado - SIN icono
        return (
          <Collapsible
            key={item.idModulo}
            asChild
            className="group/nested"
          >
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton>
                  <span>{item.nombre}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/nested:rotate-90" />
                </SidebarMenuSubButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-3">
                  {renderSubItems(item.hijos, level + 1, currentPath)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </Collapsible>
        )
      } else {
        // Hoja final - SIN icono - Genera la ruta completa
        const itemPath = buildPath(currentPath)
        
        return (
          <SidebarMenuSubItem key={item.idModulo}>
            <SidebarMenuSubButton asChild>
              <a href={itemPath}>
                <span className="text-sm">{item.nombre}</span>
              </a>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        )
      }
    })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {renderMenuItems(modulos, 0)}
      </SidebarMenu>
    </SidebarGroup>
  )
}
