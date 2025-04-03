# E-Commerce Backend

Este proyecto es un backend para un sistema de e-commerce que maneja **productos**, **carritos** de compra y **usuarios**. Está desarrollado con **Node.js**, **Express** y **MongoDB** (usando Mongoose). Además, incluye autenticación JWT con Passport y colecciones de Postman para probar los endpoints fácilmente.

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

- **Node.js + Express**: Backend eficiente y modular.
- **MongoDB + Mongoose**: Persistencia de datos no relacional.
- **Passport.js + JWT**: Autenticación con cookies seguras.
- **Bcrypt**: Hash de contraseñas.
- **Mongoose Paginate**: Paginación avanzada.
- **Dotenv**: Variables de entorno.
- **Semillas automáticas**: Carga de productos de ejemplo al iniciar.

---

## Requisitos Previos

- **Node.js** (v14+)
- **npm** o **yarn**
- **MongoDB** local o Atlas
- **Postman** (opcional para probar endpoints)

---

## Instalación

```bash
git clone https://github.com/stefanmdev/ProyectoFinal-Backend-I.git
cd ecommerce-backend
npm install
```

---

## Configuración

Crear un archivo `.env` en la raíz:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
PORT=8080
JWT_SECRET=tu_clave_supersecreta
```

✅ Asegurate de que `.env` esté en `.gitignore`.

---

## Ejecución

```bash
npm run dev
```

Verás algo como:

```
Servidor escuchando en http://localhost:8080
Conexión a MongoDB exitosa
```

---

## Endpoints Principales

### Products
(Ruta base: `/api/products`)

- `GET /`: Listado con filtros, orden y paginación.
- `GET /:pid`: Producto por ID.
- `POST /`: Crear producto.
- `PUT /:pid`: Editar producto.
- `DELETE /:pid`: Eliminar producto.

### Carts
(Ruta base: `/api/carts`)

- `POST /`: Crear carrito.
- `GET /:cid`: Ver carrito (`populate`).
- `POST /:cid/product/:pid`: Agregar producto.
- `PUT /:cid`: Reemplazar productos.
- `PUT /:cid/products/:pid`: Cambiar cantidad.
- `DELETE /:cid/products/:pid`: Quitar producto.
- `DELETE /:cid`: Borrar carrito.

### Sessions / Autenticación
(Ruta base: `/api/sessions`)

- `POST /register`: Crea un usuario (`first_name`, `last_name`, `email`, `age`, `password`).
- `POST /login`: Inicia sesión y devuelve un JWT en una cookie.
- `GET /current`: Devuelve los datos del usuario autenticado (requiere cookie `token`).

---

## Colecciones de Postman

En la carpeta `.collections/` se incluyen:

- `Products API.postman_collection.json`
- `Carts API.postman_collection.json`
- `Coderhouse_Auth_API.postman_collection.json`

### Usar en Postman:
1. Abrí Postman
2. Click en **Import**
3. Seleccioná los `.json` de la carpeta `.collections`
4. Probá los endpoints fácilmente ✅

---
