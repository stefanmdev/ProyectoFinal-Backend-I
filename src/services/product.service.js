import ProductDao from "../dao/ProductDao.js";

const productDao = new ProductDao();

export default class ProductService {
  async getProducts(query) {
    return await productDao.getProducts(query);
  }

  async getProductById(id) {
    return await productDao.getProductById(id);
  }

  async addProduct(productData) {
    return await productDao.addProduct(productData);
  }

  async updateProduct(id, updateData) {
    return await productDao.updateProduct(id, updateData);
  }

  async deleteProduct(id) {
    return await productDao.deleteProduct(id);
  }
}
