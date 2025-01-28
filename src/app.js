const express = require('express');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const { log } = require('console');

const app = express();
const PORT = 8080;

app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Bienvenido a mi servidor (Backend Primera Entrega)');
});

