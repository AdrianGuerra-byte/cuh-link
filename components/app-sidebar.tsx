"use client"

import * as React from "react"

import { NavDynamic } from "@/components/nav-dynamic"
import { NavUser } from "@/components/nav-user"
import { SidebarLogo } from "@/components/sidebar-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Importar el JSON estático
import menuData from "@/data/menu-data.json"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavDynamic modulos={menuData.menu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: menuData.usuario.nombre + " " + menuData.usuario.apellidoPaterno,
          email: `${menuData.usuario.area} - ${menuData.usuario.rol}`,
          avatar: "/avatars/shadcn.jpg",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
