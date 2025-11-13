"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function SidebarLogo() {
  const { state } = useSidebar()
  const { theme } = useTheme()
  
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-center py-1">
          {state === "collapsed" ? (
            // Logo pequeño cuando el sidebar está colapsado
            <div className="w-10 h-10 relative">
              <Image
                src={theme === "dark" ? "/cuhv_dark.avif" : "/cuhv-light.avif"}
                alt="Logo CUH"
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            // Logo completo cuando el sidebar está expandido
            <div className="w-full px-3">
              <div className="relative w-full h-20">
                {/* Logo Claro */}
                <Image
                  src="/cuhv-light.avif"
                  alt="Logo CUH"
                  fill
                  className="object-contain transition-all duration-500 ease-in-out opacity-100 dark:opacity-0 dark:scale-95"
                  priority
                />
                {/* Logo Oscuro */}
                <Image
                  src="/cuhv_dark.avif"
                  alt="Logo CUH"
                  fill
                  className="object-contain transition-all duration-500 ease-in-out opacity-0 scale-95 dark:opacity-100 dark:scale-100"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
