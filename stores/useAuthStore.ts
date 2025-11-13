// stores/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware' // 1. Importa 'persist'
import { jwtDecode } from 'jwt-decode'     // 2. Importa 'jwt-decode'

// 1. Define la "forma" del usuario decodificado del JWT (Debe coincidir con el backend)
interface UserPayload {
  sub: number; // El ID de usuario
  area: string;
  rol: string; 
  email: string;
}

// 2. Define la "forma" del casillero (Estado y Acciones)
interface AuthState {
  token: string | null
  user: UserPayload | null
  login: (token: string) => UserPayload // Acción de Login
  logout: () => void // Acción de Logout
}

// 3. Se crea el casillero
export const useAuthStore = create(
  persist<AuthState>( // <-- 4. Envuelve con 'persist'
    (set) => ({
      // 5. Estado inicial
      token: null,
      user: null,
    
      // 6. Acción de Login 
      login: (tokenString: string) => {
        
        // Decodifica el token que viene de la API de simulación
        const userPayload = jwtDecode<UserPayload>(tokenString);
        
        // El 'set' que fusiona el estado
        set({ token: tokenString, user: userPayload });
        return userPayload;
      },
    
      // 7. Acción de Logout
      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage', // El nombre de la llave en localStorage
    }
  )
)