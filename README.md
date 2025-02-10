Proyecto Backend - Segunda Pre-Entrega

Descripción

Este proyecto es una API REST para la gestión de productos y carritos de compra. Fue desarrollado como parte del curso de Backend en CoderHouse.

Tecnologías Utilizadas

Node.js

Express

Nodemon (para desarrollo)

Instalación

Clonar el repositorio:

git clone <URL_DEL_REPOSITORIO>

Instalar las dependencias:

npm install

Ejecución

Para iniciar el servidor en modo desarrollo con Nodemon:

npm run dev

Para ejecutar el servidor en modo normal:

npm start

El servidor se ejecutará en http://localhost:8080.

Endpoints

Productos (/api/products)

GET /api/products → Obtiene todos los productos.

GET /api/products/:pid → Obtiene un producto por su ID.

POST /api/products → Agrega un nuevo producto.

PUT /api/products/:pid → Actualiza un producto por su ID.

DELETE /api/products/:pid → Elimina un producto por su ID.

Carritos (/api/carts)

POST /api/carts → Crea un nuevo carrito.

GET /api/carts/:cid → Obtiene los productos de un carrito por su ID.

POST /api/carts/:cid/product/:pid → Agrega un producto a un carrito.

Base de Datos

Los datos de productos y carritos se almacenan en archivos JSON:

src/data/productos.json

src/data/carts.json

Pruebas con Postman

Para probar los endpoints, importar la colección de Postman incluida en el repositorio (postman_collection.json).

Autor

Stefan - CoderHouse Backend