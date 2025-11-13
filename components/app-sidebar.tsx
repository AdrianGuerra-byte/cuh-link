"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarLogo } from "@/components/sidebar-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Informacion de ejemplo.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Sistemas",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Historial",
          url: "#",
        },
        {
          title: "Pagos",
          url: "#",
        },
        {
          title: "Bajas",
          url: "#",
        },
      ],
    },
    {
      title: "Centros de Computo",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Inventario",
          url: "#",
        },
        {
          title: "Copias",
          url: "#",
        },
        {
          title: "Reportes",
          url: "#",
        },
      ],
    },
    {
      title: "Biblioteca",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Inventario",
          url: "#",
        },
        {
          title: "Control de Préstamos",
          url: "#",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
