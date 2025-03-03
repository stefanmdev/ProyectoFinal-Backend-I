# E-Commerce Backend

Este proyecto es un backend para un sistema de e-commerce que maneja **productos** y **carritos** de compra. Está desarrollado con **Node.js**, **Express** y **MongoDB** (usando Mongoose). Además, se incluyen colecciones de Postman para probar los endpoints de manera rápida.

## Tabla de Contenidos

1. [Características](#características)  
2. [Requisitos Previos](#requisitos-previos)  
3. [Instalación](#instalación)  
4. [Configuración](#configuración)  
5. [Ejecución](#ejecución)  
6. [Endpoints Principales](#endpoints-principales)  
   - [Products](#products)  
   - [Carts](#carts)  
7. [Colecciones de Postman](#colecciones-de-postman)  

---

## Características

- **Node.js + Express**: Para crear un servidor rápido y escalable.
- **MongoDB (Mongoose)**: Base de datos NoSQL para almacenar productos y carritos.
- **Mongoose Paginate**: Paginación de productos.
- **dotenv**: Para manejar variables de entorno.
- **Estructura modular**: Separación de rutas, modelos, managers y configuración.
- **Semillas (seed.js)**: Inserta datos iniciales de productos (incluyendo productos de ejemplo y algunos autogenerados).

---

## Requisitos Previos

- **Node.js** (v14 en adelante recomendado)
- **npm** o **yarn** (para instalar dependencias)
- **MongoDB** (instancia local o una conexión en la nube, por ejemplo MongoDB Atlas)
- **Postman** (opcional, para probar los endpoints con las colecciones incluidas)

---

## Instalación

1. **Clona** este repositorio:
```bash
git clone https://github.com/tu-usuario/ecommerce-backend.git
```

2. **Entra** en la carpeta del proyecto:
```bash
cd ecommerce-backend
```

3. **Instala** las dependencias:
```bash
npm install
```

---

## Configuración

Crea un archivo `.env` en la raíz del proyecto (o renombra el que ya existe de ejemplo) con el siguiente contenido:
```plaintext
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
PORT=8080
```

- `MONGODB_URI`: URL de conexión a tu base de datos MongoDB (local o en la nube).
- `PORT`: Puerto en el que se levantará el servidor (por defecto 8080).

Verifica que `.env` está en el archivo `.gitignore` para no subir tus credenciales a repositorios públicos.

---

## Ejecución

Para arrancar el servidor en modo desarrollo con **nodemon** (recarga automática):
```bash
npm run dev
```

Salida esperada en consola:
```php-template
MONGODB_URI: mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
Servidor escuchando en http://localhost:8080
MongoDB conectado
Conexión a MongoDB exitosa
...
```

Si la colección de productos está vacía, se ejecutará automáticamente el **seed** que cargará productos de ejemplo.

---


```
```

- **config/db.js**: Maneja la conexión con MongoDB.
- **managers**: Contiene la lógica de negocio (CRUD de productos y carritos).
- **models**: Define los esquemas de Mongoose para `Cart` y `Product`.
- **routes**: Define los endpoints de la API (carritos y productos).
- **seed.js**: Carga datos iniciales (productos) en la base de datos.

---

## Endpoints Principales

### Products

Los endpoints se definen bajo la ruta base `/api/products`:

1. **GET** `/api/products`  
   - Parámetros de consulta (query) opcionales:  
     - `page` (número de página)  
     - `limit` (límite de resultados por página)  
     - `sort` (`asc` o `desc` por precio)  
     - `query` (búsqueda por título)  
   - Retorna un objeto con la paginación y los productos.

2. **GET** `/api/products/:pid`  
   - Retorna un producto específico por su **ID** de MongoDB.

3. **POST** `/api/products`  
   - Crea un nuevo producto.  
   - Requiere `title`, `description`, `price`, `img`, `code`, `stock`.

4. **PUT** `/api/products/:pid`  
   - Actualiza un producto por su **ID**.  
   - El body puede contener campos como `price`, `stock`, etc.

5. **DELETE** `/api/products/:pid`  
   - Elimina un producto por su **ID**.

### Carts

Los endpoints se definen bajo la ruta base `/api/carts`:

1. **POST** `/api/carts`  
   - Crea un nuevo carrito vacío.

2. **GET** `/api/carts/:cid`  
   - Obtiene un carrito por su **ID**, incluyendo los detalles de los productos (populate).

3. **POST** `/api/carts/:cid/product/:pid`  
   - Agrega un producto al carrito (si ya existe, aumenta la cantidad).  
   - Se puede enviar `quantity` en el body (por defecto, 1).

4. **PUT** `/api/carts/:cid`  
   - Reemplaza completamente el array de productos en el carrito.  
   - Body esperado: `[ { product: "productId", quantity: number }, ... ]`.

5. **PUT** `/api/carts/:cid/products/:pid`  
   - Actualiza **solo** la cantidad de un producto específico en el carrito.

6. **DELETE** `/api/carts/:cid/products/:pid`  
   - Elimina un producto del carrito.

7. **DELETE** `/api/carts/:cid`  
   - Elimina el carrito completo.

---

## Colecciones de Postman

En la carpeta `./.collections/` se incluyen dos archivos JSON de colecciones de Postman:

- **Carts API.postman_collection.json**
- **Products API.postman_collection.json**

Para utilizarlos:

1. Abre Postman.
2. Haz clic en **Import**.
3. Selecciona el archivo JSON de la colección que quieras importar.
4. Ajusta las variables `{{cartId}}`, `{{productId}}`, etc., según los IDs reales generados en tu base de datos.

---


