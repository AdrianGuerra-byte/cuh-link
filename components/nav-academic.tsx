"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

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

export function NavAcademic({
  items,
}: {
  items: {
    title: string
    icon?: LucideIcon
    isActive?: boolean
    programs?: {
      title: string
      modules?: {
        title: string
        url: string
      }[]
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Programas Académicos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((degree) => (
          <Collapsible
            key={degree.title}
            asChild
            defaultOpen={degree.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={degree.title} className="text-base font-semibold">
                  {degree.icon && <degree.icon />}
                  <span>{degree.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {degree.programs?.map((program) => (
                    <Collapsible
                      key={program.title}
                      asChild
                      className="group/program"
                    >
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuSubButton className="font-medium">
                            <span>{program.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/program:rotate-90" />
                          </SidebarMenuSubButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-3">
                            {program.modules?.map((module) => (
                              <SidebarMenuSubItem key={module.title}>
                                <SidebarMenuSubButton asChild>
                                  <a href={module.url}>
                                    <span className="text-sm">{module.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
