# Lumina tienda online

Se enseñará a como inicializar el proyecto en local de lumina, API + React

## Instalación

En cualquier directorio o carpeta ejecutamos

```bash
git clone https://github.com/JCamiloOg/lumina.git
cd lumina
```
la instalación del cliente y servidor se hace por separado
```bash
cd client
npm install
cd ..
cd server
npm install
```




## Variables de entorno

Para correr el proyecto necesitamos ciertas variables de entorno

### Para /client

```env
VITE_API_URL=http://localhost:3000
```

por defecto el back se ejecute en el puerto 3000

### Para /server

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=online_shop
PORT=3000
SECRET_KEY='super secreto'
CORS_ORIGIN=http://localhost:4000 # por defecto el cliente se ejecuta
NODE_ENV=development
DATABASE_URL="mysql://tu_usuario:tu_password@localhost:3306/online_shop"
```




#### En server ejecutamos las migraciones de Prisma pero antes creamos la base de datos con 2 usuarios de prueba

```sql
CREATE DATABASE online_shop
```

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```
Para los datos iniciales

```bash
npx prisma db seed
```
Iniciamos el servidor tanto en /client como en /server
```bash
npm run dev
```
### Usuarios de prueba
#### Admin
`admin@example.com`

`prueba`

#### Cliente
`cliente@example.com`

`prueba`

