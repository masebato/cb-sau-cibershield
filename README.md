# CB-SAU — Sistema de Autenticación de Usuarios

Microservicio de autenticación de CiberShield Colombia. Gestiona registro, login JWT, perfil de empresa y activos digitales.

## Stack

- **Node.js** >= 20
- **Framework**: `@masebato/apix` (Express + OpenAPI validation)
- **Auth**: JWT (access token 15 min + refresh token 7 días)
- **DB**: PostgreSQL 16

## Endpoints

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/health` | No | Estado del servicio |
| POST | `/api/auth/register` | No | Registro de empresa |
| POST | `/api/auth/login` | No | Login → tokens JWT |
| POST | `/api/auth/logout` | Sí | Invalidar refresh token |
| POST | `/api/auth/password-reset` | No | Recuperación de contraseña |
| GET | `/api/auth/profile` | Sí | Perfil del usuario autenticado |
| PUT | `/api/auth/profile` | Sí | Actualizar empresa/sector |
| POST | `/api/auth/assets` | Sí | Registrar activo (IP/CIDR/dominio) |
| DELETE | `/api/auth/assets/:id` | Sí | Eliminar activo |

Documentación interactiva disponible en `http://localhost:3001/docs`.

## Configuración

```bash
cp .env.example .env
# Editar .env con los valores reales
```

Variables requeridas:

| Variable | Default | Descripción |
|----------|---------|-------------|
| `PORT` | `3001` | Puerto del servicio |
| `JWT_SECRET` | — | Secreto para firmar tokens |
| `JWT_EXPIRES_IN` | `15m` | Duración access token |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Duración refresh token |
| `DB_HOST` | `localhost` | Host PostgreSQL |
| `DB_PORT` | `5432` | Puerto PostgreSQL |
| `DB_NAME` | `cibershield_sau` | Nombre de la base de datos |
| `DB_USER` | `postgres` | Usuario PostgreSQL |
| `DB_PASSWORD` | — | Contraseña PostgreSQL |

## Desarrollo

**1. Levantar la base de datos:**

```bash
docker compose up -d
```

**2. Instalar dependencias:**

```bash
npm install
```

**3. Iniciar el servicio:**

```bash
npm run dev
```

## Estructura

```
src/
├── index.js              # Entrada — configura y arranca @masebato/apix
├── config.js             # Variables de entorno centralizadas
├── openapi/
│   └── openapi.yml       # Contrato OpenAPI 3.0.3 del servicio
├── controllers/          # Capa HTTP: parsea req, llama service, responde
│   ├── index.js          # Mapeo operationId → función
│   ├── auth.js
│   ├── profile.js
│   └── assets.js
├── services/             # Lógica de negocio (sin conocimiento de HTTP)
│   ├── auth.service.js
│   ├── profile.service.js
│   └── assets.service.js
└── providers/            # Adaptadores externos
    ├── jwt.js            # sign / verify tokens
    └── db.js             # Conexión a PostgreSQL
```
