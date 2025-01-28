const { Router } = require('express');
const ProductManager = require('../managers/ProductManager');

const router = Router();
const productManager = new ProductManager();

// GET: Todos los productos con opción de límite
router.get('/', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  res.json(limit ? products.slice(0, limit) : products);
});

// GET: Producto por ID
router.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// POST: Crear producto
router.post('/', async (req, res) => {
  const newProduct = req.body;
  const product = await productManager.addProduct(newProduct);
  res.status(201).json(product);
});

// PUT: Actualizar producto
router.put('/:pid', async (req, res) => {
  const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
  if (!updatedProduct) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(updatedProduct);
});

// DELETE: Eliminar producto
router.delete('/:pid', async (req, res) => {
  const deleted = await productManager.deleteProduct(req.params.pid);
  if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json({ message: 'Producto eliminado con éxito' });
});

module.exports = router;