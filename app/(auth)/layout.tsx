// app/(auth)/layout.tsx
import Image from 'next/image';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      
      {/* --- COLUMNA IZQUIERDA (Branding con imagen navideña de fondo) --- */}
      {/* Se oculta en móvil (hidden) y se muestra desde 'md' (md:flex) */}
      <div className="hidden md:flex flex-col items-center justify-center p-10 bg-primary text-primary-foreground relative overflow-hidden">
        
        {/* Imagen de fondo navideña con overlay oscuro */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/navidad-tigrillo.png"
            alt="Fondo Navideño Tigrillo"
            fill
            className="object-cover opacity-100"
            priority
          />
          {/* Overlay para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-xs"></div>
        </div>

        {/* Contenido sobre la imagen de fondo */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo con cambio según tema */}
          <div className="flex justify-center mb-8">
            {/* Logo Claro (modo light) */}
            <Image 
              src={'/cuhv-light.avif'} 
              alt="Logo CUH" 
              width={800} 
              height={486}
              className="w-[300px] h-auto object-contain drop-shadow-2xl transition-all duration-500 ease-in-out opacity-100 dark:opacity-0 dark:scale-95"
              priority 
            />
            {/* Logo Oscuro (modo dark) */}
            <Image 
              src={'/cuhv_dark.avif'} 
              alt="Logo CUH" 
              width={800} 
              height={486}
              className="w-[300px] h-auto object-contain drop-shadow-2xl absolute transition-all duration-500 ease-in-out opacity-0 scale-95 dark:opacity-100 dark:scale-100"
              priority 
            />
          </div>
          
          <h1 className="text-3xl font-bold text-center drop-shadow-lg text-primary-foreground dark:text-transparent dark:bg-linear-to-r dark:from-primary dark:to-primary/80 dark:bg-clip-text transition-colors duration-500">
            Sistema Universitario en Línea
          </h1>
          <p className="text-lg text-primary-foreground/90 mt-2 drop-shadow-md dark:text-primary-foreground/80 transition-colors duration-500">
            Gestión Académica y Administrativa
          </p>
        </div>
      </div>

      {/* --- COLUMNA DERECHA (Formulario) --- */}
      {/* Esta columna tiene el fondo de 'body' (olas/puntos) */}
      <div className="relative flex items-center justify-center p-4">
        
        {/* Botón de Modo Oscuro - anclado a esta columna */}
        <div className="absolute left-4 top-4 z-10 md:left-auto md:right-4">
          <ModeToggle />
        </div>

        {/* Aquí se renderizará tu 'login/page.tsx' (que contiene el LoginForm) */}
        {children}
      </div>
    </div>
  );
}