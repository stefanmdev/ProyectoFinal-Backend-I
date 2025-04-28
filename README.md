# Proyecto Final - Programación Backend II

Este proyecto es un backend completo para un sistema de e-commerce que maneja **productos**, **carritos** de compra, **autenticación de usuarios** con JWT y **generación de tickets** de compra.  
Desarrollado con **Node.js**, **Express** y **MongoDB** (Mongoose).

## Tabla de Contenidos

1. [Características](#características)  
2. [Requisitos Previos](#requisitos-previos)  
3. [Instalación](#instalación)  
4. [Configuración](#configuración)  
5. [Ejecución](#ejecución)  
6. [Endpoints Principales](#endpoints-principales)  
   - [Products](#products)  
   - [Carts](#carts)  
   - [Sessions / Autenticación](#sessions--autenticación)  
7. [Colecciones de Postman](#colecciones-de-postman)  

---

## Características

- **Node.js + Express**: Servidor robusto y modular.
- **MongoDB + Mongoose**: Base de datos no relacional.
- **Passport.js (Local y JWT)**: Sistema de autenticación seguro.
- **Bcrypt**: Encriptación de contraseñas.
- **Mongoose Paginate**: Paginación y filtros en productos.
- **uuid**: Generación de códigos únicos para tickets.
- **Dotenv**: Variables de entorno centralizadas.

---

## Requisitos Previos

- **Node.js** (v14 o superior)
- **npm** o **yarn**
- **MongoDB** local o MongoDB Atlas
- **Postman** (opcional para pruebas de API)

---

## Instalación

```bash
git clone https://github.com/stefanmdev/ProyectoFinal-Backend-II.git
cd ecommerce-backend
npm install
```

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```dotenv
MONGODB_URI=tu_string_de_conexión_mongodb
JWT_SECRET=tu_secreto_para_jwt
PORT=8080
```

✅ Asegurate de que `.env` esté en `.gitignore`.

---

## Ejecución

```bash
npm run dev
```

Cuando esté funcionando verás:

```
Servidor escuchando en http://localhost:8080
MongoDB conectado exitosamente
La colección de productos ya tiene datos
```

---

## Endpoints Principales

### Products
(Ruta base: `/api/products`)

- `GET /`: Listar productos (con filtros, paginación y ordenamiento).
- `GET /:pid`: Obtener producto por ID.
- `POST /`: Crear nuevo producto.
- `PUT /:pid`: Actualizar producto existente.
- `DELETE /:pid`: Eliminar producto.

### Carts
(Ruta base: `/api/carts`)

- `POST /`: Crear un carrito vacío.
- `GET /:cid`: Obtener carrito por ID (populate de productos).
- `POST /:cid/product/:pid`: Agregar producto al carrito.
- `PUT /:cid`: Reemplazar todos los productos del carrito.
- `PUT /:cid/product/:pid`: Actualizar cantidad de un producto en el carrito.
- `DELETE /:cid/product/:pid`: Eliminar producto específico del carrito.
- `DELETE /:cid`: Vaciar todo el carrito.
- `POST /:cid/purchase`: Finalizar compra y generar ticket.

### Sessions / Autenticación
(Ruta base: `/api/sessions`)

- `POST /register`: Registrar nuevo usuario (`first_name`, `last_name`, `email`, `age`, `password`).
- `POST /login`: Iniciar sesión, devuelve JWT en cookie `token`.
- `GET /current`: Ver datos del usuario autenticado (requiere cookie `token`).

---

## Colecciones de Postman

Están en la carpeta `.collections/`:

- `Products API.postman_collection.json`
- `Carts API.postman_collection.json`
- `Coderhouse_Auth_API.postman_collection.json`

### ¿Cómo importar en Postman?
1. Abrí **Postman**.
2. Clic en **Import**.
3. Elegí los archivos `.json` de la carpeta `.collections`.
4. Probá los endpoints fácilmente ✅.

---

