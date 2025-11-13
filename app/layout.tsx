import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css"; 
const fontAvenir = localFont({
  src: [
    // --- Pesos Normales (400) ---
    {
      path: './fonts/AvenirNextCyr-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextCyr-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    // --- Pesos Medianos (500) ---
    {
      path: './fonts/AvenirNextCyr-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextCyr-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    // --- Pesos Bold (700) ---
    {
      path: './fonts/AvenirNextCyr-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextCyr-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    // --- Pesos Heavy (800 o 900) ---
    {
      path: './fonts/AvenirNextCyr-Heavy.ttf',
      weight: '800', // (Puedes usar 800 o 900 para 'Heavy')
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextCyr-HeavyItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    // --- Pesos UltraLight (200) ---
    {
      path: './fonts/AvenirNextCyr-UltraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/AvenirNextCyr-UltraLightIt.ttf',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: "--font-avenir"
});

export const metadata: Metadata = {
  title: "SULI - Sistema Universitario en Linea",
  description: "Sistema de gestion academica para el CUH Virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontAvenir.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}