# E-commerce Backend

Este proyecto es el backend de un e-commerce desarrollado como entrega final para Coderhouse. Se utiliza MongoDB Atlas para la persistencia, con Mongoose como ORM.

---

## Descripción

- **Persistencia**: MongoDB Atlas (conexión remota).
- **ORM**: Mongoose y mongoose-paginate-v2 para paginación, filtrado y ordenamiento.
- **Funcionalidades**: Gestión de productos (CRUD) y carritos (crear, actualizar, eliminar, agregar productos).

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-backend.git
   cd ecommerce-backend
Instala las dependencias:
bash
Copiar
npm install
Configuración
.env
Crea un archivo .env en la raíz con:

env
Copiar
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xyz.mongodb.net/miEcommerce?retryWrites=true&w=majority
PORT=8080
Reemplaza <usuario>, <password> y cluster0.xyz.mongodb.net según tu configuración en MongoDB Atlas.
Nota: Para la entrega, incluye el contenido de .env en el espacio de Coder.

Ejecución
Modo producción:
bash
Copiar
node src/app.js
Modo desarrollo (con nodemon):
bash
Copiar
npm install --save-dev nodemon
npm run dev
Scripts Adicionales
Seed: Población de 40 productos para pruebas
bash
Copiar
node src/seed.js
Endpoints Principales
Productos (/api/products)
GET /: Listado de productos con paginación, filtrado y ordenamiento.
GET /:pid: Obtener un producto por ID.
POST /: Crear un nuevo producto (campos: title, description, price, img, code, stock).
PUT /:pid: Actualizar un producto.
DELETE /:pid: Eliminar un producto.
Carritos (/api/carts)
POST /: Crear un carrito vacío.
GET /:cid: Obtener un carrito con sus productos (populate).
POST /:cid/product/:pid: Agregar un producto al carrito (envía "quantity" en el body).
PUT /:cid: Reemplazar el array de productos del carrito.
PUT /:cid/products/:pid: Actualizar solo la cantidad de un producto.
DELETE /:cid/products/:pid: Eliminar un producto del carrito.
DELETE /:cid: Eliminar el carrito completo.
Colecciones de Postman
Las colecciones de Postman se encuentran en la carpeta .collections:

products.postman_collection.json
carts.postman_collection.json
Importa estas colecciones en Postman para probar los endpoints. Usa variables de entorno (por ejemplo, {{productId}}, {{cartId}}) para facilitar las pruebas.

Notas
La persistencia se realiza mediante MongoDB Atlas.
Se ha implementado paginación, filtrado y ordenamiento en el endpoint de productos.
Consulta la documentación para instrucciones detalladas sobre el uso de variables y pruebas en Postman.