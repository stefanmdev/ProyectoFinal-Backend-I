🚀 Proyecto Backend - Segunda Pre-Entrega

📌 Descripción
Este proyecto es una API REST para la gestión de productos y carritos de compra, desarrollado como parte del curso de Backend en CoderHouse.

🛠 Tecnologías Utilizadas
Node.js
Express.js
Nodemon (para desarrollo)

📥 Instalación
1️⃣ Clonar el repositorio
bash
Copiar
Editar
git clone <https://github.com/stefanmdev/Entrega2-Backend-I.git>

2️⃣ Instalar dependencias
bash
Copiar
Editar
npm install

🚀 Ejecución
▶ Modo desarrollo (con Nodemon)
bash
Copiar
Editar
npm run dev

▶ Modo producción
bash
Copiar
Editar
npm start

🔹 El servidor se ejecutará en: http://localhost:8080

🌐 Endpoints
📦 Productos (/api/products)
✅ GET /api/products → Obtiene todos los productos.
✅ GET /api/products/:pid → Obtiene un producto por su ID.
✅ POST /api/products → Agrega un nuevo producto.
✅ PUT /api/products/:pid → Actualiza un producto por su ID.
✅ DELETE /api/products/:pid → Elimina un producto por su ID.

🛒 Carritos (/api/carts)
✅ POST /api/carts → Crea un nuevo carrito.
✅ GET /api/carts/:cid → Obtiene los productos de un carrito por su ID.
✅ POST /api/carts/:cid/product/:pid → Agrega un producto a un carrito.

🗄 Base de Datos
Los datos de productos y carritos se almacenan en archivos JSON dentro de la carpeta src/data/:
📂 src/data/productos.json
📂 src/data/carts.json

🧪 Pruebas con Postman
Para probar los endpoints, importar la colección de Postman incluida en el repositorio:
📄 Proyecto-Backend.postman_collection.json

👨‍💻 Autor
📌 Stefan - CoderHouse Backend