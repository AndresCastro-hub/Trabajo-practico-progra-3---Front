# Frontend - Trabajo Práctico Progra3

## ¿Qué hace la app?

Aplicación web construida con Next.js que permite a los usuarios gestionar su plan de comidas semanal. Los usuarios pueden crear y administrar recetas, asignarlas a su calendario semanal (almuerzo y cena) y consultar información nutricional. Los administradores tienen acceso a un panel de gestión de la plataforma.

## Sistema de Roles

La app maneja dos roles, controlados via middleware de Next.js (`middleware.ts`):

- **usuario** — accede a `/calendario` y `/recetario`
- **administrador** — accede a `/admin`

Al iniciar sesión, el token JWT es decodificado y el usuario es redirigido automáticamente según su rol. Las rutas están protegidas: si un usuario intenta acceder a una ruta que no le corresponde, es redirigido a `/calendario`.

## Estructura de carpetas

La app usa una arquitectura **por features**. Cada feature agrupa sus propios componentes, hooks y services.

```
src/
├── app/                        # Rutas de Next.js (App Router)
│   ├── (auth)/                 # Rutas públicas (login, registro)
│   └── (dashboard)/            # Rutas protegidas por rol
│
├── components/                 # Componentes globales reutilizables
│   ├── navigation/             # Navbar, sidebar
│   ├── ui/                     # Componentes genéricos (Header, Spinner, Pagination, etc.)
│   └── ...
│
├── context/                    # Contextos globales de React
│
├── features/                   # Lógica agrupada por dominio
│   ├── auth/                   # Login y registro
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── dashboard/
│       ├── admin/              # Panel de administración
│       ├── calendario/         # Vista y lógica del calendario semanal
│       │   └── components/
│       └── recetario/          # Gestión de recetas
│           ├── components/     # Componentes de la lista de recetas
│           ├── detalle/        # Vista de detalle de una receta
│           ├── editar/         # Formulario de edición
│           ├── nueva/          # Formulario de nueva receta
│           ├── hooks/          # Hooks específicos del recetario
│           ├── services/       # Llamadas a la API
│           └── types/          # Tipos TypeScript del dominio
│
├── hooks/                      # Hooks globales (ej: useAuth)
├── interface/                  # Interfaces y tipos globales
└── middleware.ts               # Control de acceso por rol
```

### Convención dentro de cada feature

- **components/** — componentes visuales de esa feature
- **hooks/** — lógica de estado y efectos (ej: `useRecetario`, `useLoginForm`)
- **services/** — funciones que llaman a la API del backend (fetch)
- **types/** — interfaces y tipos TypeScript propios del dominio

## Cómo levantar la app

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

3. La app corre en `http://localhost:3000`

> El backend debe estar corriendo en `http://localhost:5000` antes de levantar el frontend.

## Tests

```bash
npm run test
```

Para correr en modo watch:
```bash
npm run test -- --watch
```

El proyecto usa **Jest** como framework de testing.
