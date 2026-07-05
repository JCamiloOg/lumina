# 🛍️ Lumina - Tienda Online

**Lumina**, una plataforma moderna de comercio electrónico (E-Commerce) desarrollada con una arquitectura desacoplada: un cliente interactivo y fluido en **React** y un servidor rápido y robusto en **Node.js (Express)** potenciado por **Prisma ORM** y **MySQL**.

---

## 🚀 Guía de Instalación y Configuración Local

### 1. Clonar el repositorio

En primer lugar, clona este repositorio en tu máquina de desarrollo local:

```bash
git clone https://github.com/JCamiloOg/lumina.git
cd lumina
```

---

### 2. Configurar el Servidor (Backend)

1. **Accede a la carpeta y descarga dependencias:**

   ```bash
   cd server
   npm install
   ```

2. **Configura el entorno:**
   Crea un archivo `.env` en la raíz del directorio `/server` y define las siguientes variables:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_DATABASE=online_shop
   DATABASE_URL="mysql://tu_usuario:tu_password@localhost:3306/online_shop"
   SECRET_KEY='super secreto'
   CORS_ORIGIN=http://localhost:4000
   NODE_ENV=development
   ```

3. **Crea la Base de Datos:**
   Conéctate a tu motor MySQL local y crea la base de datos:

   ```sql
   CREATE DATABASE online_shop;
   ```

4. **Ejecuta las migraciones y genera Prisma Client:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Poblar la base de datos (Database Seeding):**
   Genera registros iniciales (usuarios y productos):

   ```bash
   npx prisma db seed
   ```

6. **Inicia el servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```

> [!TIP]
> Por defecto, el servidor se iniciará en el puerto `3000`. Puedes visitar `http://localhost:3000/docs` para ver la especificación interactiva de la API con Swagger.

---

### 3. Configurar el Cliente (Frontend)

1. **Accede a la carpeta del cliente e instala dependencias:**
   Abre una nueva pestaña en tu terminal y ejecuta:

   ```bash
   cd client
   npm install
   ```

2. **Configura las variables de entorno:**
   Crea un archivo `.env` en la carpeta `/client`:

   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Inicia el servidor de desarrollo del cliente:**
   ```bash
   npm run dev
   ```

> [!NOTE]
> Por defecto, Vite ejecutará el cliente en el puerto `4000`.

---

## 🔑 Cuentas de Prueba

Al ejecutar `npx prisma db seed`, la base de datos se poblará con las siguientes cuentas de prueba:

| Rol               | Correo Electrónico  | Contraseña  | Propósito                                                         |
| :---------------- | :------------------ | :---------- | :---------------------------------------------------------------- |
| **Administrador** | `admin@example.com` | `123prueba` | Panel de control, gestión de productos, procesamiento de pedidos. |
| **Cliente**       | `cliente@gmail.com` | `123prueba` | Compras en la landing page, gestión de carrito, ver pedidos.      |

---

## 📖 Documentación de la API (Swagger UI)

La API cuenta con Swagger integrado para facilitar la comprensión y el testeo de las rutas desde una interfaz visual cómoda:

- **Ruta local:** `http://localhost:3000/docs`

### Resumen de Endpoints Principales

| Categoría         | Método  | Endpoint                 | Middleware / Permisos | Descripción                                            |
| :---------------- | :------ | :----------------------- | :-------------------- | :----------------------------------------------------- |
| **Autenticación** | `POST`  | `/api/auth/register`     | _Público_             | Crea un nuevo usuario cliente.                         |
|                   | `POST`  | `/api/auth/login`        | _Público_             | Autentica al usuario y devuelve el token JWT.          |
| **Productos**     | `GET`   | `/api/products`          | _Público_             | Obtiene todos los productos con stock/activos.         |
|                   | `GET`   | `/api/products/:id`      | _Público_             | Detalle de un producto individual.                     |
|                   | `POST`  | `/api/products`          | `Auth` + `Admin`      | Crea un nuevo producto.                                |
|                   | `PUT`   | `/api/products/:id`      | `Auth` + `Admin`      | Modifica un producto existente.                        |
| **Pedidos**       | `POST`  | `/api/orders`            | `Auth`                | Genera un pedido con el carrito actual.                |
|                   | `GET`   | `/api/orders`            | `Auth`                | Obtiene los pedidos del cliente (o todos si es Admin). |
|                   | `PATCH` | `/api/orders/:id/status` | `Auth` + `Admin`      | Actualiza el estado del envío.                         |

---

## 📁 Estructura General del Proyecto

```text
lumina/
├── client/                 # Aplicación Frontend React + Vite
│   ├── src/
│   │   ├── app/            # Rutas, layouts y estado global
│   │   ├── features/       # Módulos encapsulados (auth, dashboard, landing)
│   │   ├── shared/         # Componentes visuales genéricos y hooks reutilizables
│   │   └── utils/          # Utilidades y formateadores
│   └── package.json
│
├── server/                 # Servidor de API Express.js
│   ├── src/
│   │   ├── config/         # Configuración de base de datos, Swagger y CORS
│   │   ├── controllers/    # Controladores controladores de peticiones
│   │   ├── middlewares/    # Middlewares (autenticación, control de errores)
│   │   ├── routes/         # Definición de rutas del servidor
│   │   ├── validators/     # Validación de payloads usando Zod
│   │   └── server.ts       # Configuración inicial del servidor HTTP
│   ├── prisma/             # Esquemas de base de datos y seeds de inicio
│   └── package.json
```
