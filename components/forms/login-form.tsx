"use client"; // <-- Client Component

import { useState } from 'react';
// import { useTheme } from 'next-themes'; // <-- Ya no se necesita aquí
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
// import { ModeToggle } from "@/components/ui/mode-toggle"; // <-- Movido al layout

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useRouter } from 'next/navigation'; 
import { useAuthStore } from '@/stores/useAuthStore';
// import api from '@/lib/api'; // (Asegúrate de que este archivo exista)
import {Loader2 } from 'lucide-react';
import axios from 'axios';
// import Image from 'next/image'; // <-- Ya no se necesita aquí

export default function LoginForm() {
  // const { theme } = useTheme(); // <-- Ya no se necesita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const loginAction = useAuthStore((state) => state.login);

  // Tu lógica de handleSubmit (sin cambios)
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
        const user = loginAction(token);
        router.push(`/${user.area.toLowerCase()}`);
    } catch (err: any) { 
        console.error(err);
        if (err.response && err.response.status === 401) {
          setError(err.response.data.message || 'Usuario o contraseña incorrectos.');
        } else {
          setError('Error al conectar con el servidor. Intente de nuevo.');
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    // El TooltipProvider debería ir en tu 'app/layout.tsx' (raíz)
    <TooltipProvider delayDuration={300}>
      {/* Ya no se necesita el 'div' relativo ni el Tigrillo */}
      <Card className="w-[420px] bg-card/40 backdrop-blur-md border-border/50 shadow-2xl">
        {/* El ModeToggle se movió al layout */}
        
          <CardHeader className="space-y-3 pb-6">
            {/* El Logo se movió al layout */}
            
            <CardTitle className="text-2xl font-bold text-center bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent pt-8">
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
    </TooltipProvider>
  );
}