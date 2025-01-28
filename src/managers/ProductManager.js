const fs = require('fs').promises;
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, '../data/products.json');
  }

  async getProducts() {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((p) => p.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = { id: Date.now().toString(), ...product };
    products.push(newProduct);
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
    return products[index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((p) => p.id !== id);
    if (products.length === newProducts.length) return null;
    await fs.writeFile(this.filePath, JSON.stringify(newProducts, null, 2));
    return true;
  }
}

module.exports = ProductManager;