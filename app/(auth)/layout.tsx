"use client";

import { AnimatedWaves } from "@/components/shared/animated-waves";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
       
      <div className="absolute inset-0 z-0 opacity-90">
        <AnimatedWaves />
      </div>
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}