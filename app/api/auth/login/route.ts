import { NextResponse } from 'next/server';

// --- Tus Tokens Falsos (pero decodificables) para cada rol ---

// Payload: { sub: 1, area: "finanzas", rol: "Caja", email: "finanzas@cuh.mx" }
const TOKEN_FINANZAS = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZmluYW56YXNAY3VoLm14IiwiYXJlYSI6ImZpbmFuemFzIiwicm9sIjoiQ2FqYSIsImlhdCI6MTY3ODg4NjQwMH0.P8BvSdSf2Xqf8zR-tZgGcY8jVn-btILrU-gA7iH78qA";

// Payload: { sub: 2, area: "escolares", rol: "Coordinador", email: "escolares@cuh.mx" }
const TOKEN_ESCOLARES_COORD = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiZXNjb2xhcmVzQGN1aC5teCIsImFyZWEiOiJlc2NvbGFyZXMiLCJyb2wiOiJDb29yZGluYWRvciIsImlhdCI6MTY3ODg4NjQwMH0.j-fV4n-XwN2oXW8jK5nZ-bXvY8jQ-tZpP6vB9wS_zYc";

// Payload: { sub: 3, area: "sistemas", rol: "Desarrollador", email: "sistemas@cuh.mx" }
const TOKEN_SISTEMAS = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoic2lzdGVtYXNAY3VoLm14IiwiYXJlYSI6InNpc3RlbWFzIiwicm9sIjoiRGVzYXJyb2xsYWRvciIsImlhdCI6MTY3ODg4NjQwMH0.X-w-fUNC-3SgQQkXG8yb-nF3-m8a1nOze3y_3oNlESs";

// Payload: { sub: 4, area: "biblioteca", rol: "Bibliotecario", email: "biblioteca@cuh.mx" }
const TOKEN_BIBLIOTECA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImVtYWlsIjoiYmlibGlvdGVjYUBjdWgubXgiLCJhcmVhIjoiYmlibGlvdGVjYSIsInJvbCI6IkJpYmxpb3RlY2FyaW8iLCJpYXQiOjE2Nzg4ODY0MDB9.P7T0sW0-2gGf9bCqYv8F_aX_wE2gK-yN_jE-0oU_fXw";

// Payload: { sub: 5, area: "escolares", rol: "Auxiliar", email: "aux.escolares@cuh.mx" }
const TOKEN_ESCOLARES_AUX = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoiYXV4LmVzY29sYXJlc0BjdWgubXgiLCJhcmVhIjoiZXNjb2xhcmVzIiwicm9sIjoiQXV4aWxpYXIiLCJpYXQiOjE2Nzg4ODY0MDB9.D9fB2k-s_jG7vR-gY_wF-yK_zE-nJ-oV_zE_sQ_yW-o";


// --- El Manejador de la API ---
export async function POST(request: Request) {
  try {
    // 1. Lee el JSON que envió el formulario
    const { email, password } = await request.json();

    // 2. Simula un retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Lógica 
    if (password !== "123") {
      return new NextResponse(
        JSON.stringify({ message: 'Contraseña incorrecta' }),
        { status: 401 }
      );
    }

    // Comprueba el email
    switch (email) {
      case "finanzas@cuh.mx":
        return NextResponse.json({ token: TOKEN_FINANZAS });
      
      case "escolares@cuh.mx":
        return NextResponse.json({ token: TOKEN_ESCOLARES_COORD });
      
      case "sistemas@cuh.mx":
        return NextResponse.json({ token: TOKEN_SISTEMAS });
        
      case "biblioteca@cuh.mx":
        return NextResponse.json({ token: TOKEN_BIBLIOTECA });

      case "aux.escolares@cuh.mx":
        return NextResponse.json({ token: TOKEN_ESCOLARES_AUX });

      default:
        // 4. Usuario INVÁLIDO
        return new NextResponse(
          JSON.stringify({ message: 'Email no encontrado' }),
          { status: 401 } // 401 Unauthorized
        );
    }

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Error en el servidor' }),
      { status: 500 }
    );
  }
}