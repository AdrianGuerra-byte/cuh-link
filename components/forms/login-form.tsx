"use client"; // <-- Client Component

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useRouter } from 'next/navigation'; 
import { useAuthStore } from '@/stores/useAuthStore';
import api from '@/lib/api';
import {Loader2 } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

export default function LoginForm() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const loginAction = useAuthStore((state) => state.login);

  // simula el envío al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
        const response = await axios.post('/api/auth/login', { 
            email, 
            password 
        });

        const token = response.data.token;

        //Accion Login de Zustand
        const user = loginAction(token);

        //Redirigir según el rol
        router.push(`/${user.area.toLowerCase()}`);
    } catch (err: any) { // Especificamos el tipo 'any' para 'err'
        console.error(err);
        if (err.response && err.response.status === 401) {
          // Si la API de simulación nos da un 401
          setError(err.response.data.message || 'Usuario o contraseña incorrectos.');
        } else {
          // Otro error (ej. de red)
          setError('Error al conectar con el servidor. Intente de nuevo.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative">
        <Card className="w-[420px] bg-card/40 backdrop-blur-md border-border/50 shadow-2xl">
        <div className="absolute left-4 top-4 z-10">
          <ModeToggle />
        </div>
          <CardHeader className="space-y-3 pb-6">
            {/* Logo CUH */}
            <div className="flex justify-center mb-2">
              {/* Logo Claro */}
              <Image 
                src={'/cuhv-light.avif'} 
                alt="Logo CUH" 
                width={800} 
                height={486}
                // ---
                className="h-48 w-auto object-contain block dark:hidden"
                priority 
              />
              {/* Logo Oscuro */}
              <Image 
                src={'/cuhv_dark.avif'} 
                alt="Logo CUH" 
                width={800} 
                height={486}
                // ---
                className="h-48 w-auto object-contain hidden dark:block"
                priority 
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent ">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center text-foreground">
              Bienvenido al Sistema de Gestión (SIGE)
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-5">
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm border border-destructive/30">
                    {error}
                  </div>
                )}

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email" className="font-medium">
                    Correo Institucional
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ejemplo@cuh.mx"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading} 
                    className="placeholder:text-foreground/40 font-bold"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password" className="font-medium">
                    Contraseña
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="placeholder:text-foreground/40 font-bold"
                  />
                  <p className="text-xs text-foreground/80 mt-2">
                    ¿Olvidó su contraseña? Comuníquese con{' '}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <strong className="text-primary cursor-help">
                          Dirección de Sistemas
                        </strong>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Extensión: 109</p>
                      </TooltipContent>
                    </Tooltip>
                    
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (<> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Accediendo....</>) : 'Acceder'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </TooltipProvider>
  );
}