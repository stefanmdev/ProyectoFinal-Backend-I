import Product from "../models/Product.js";

export default class ProductDao {
  async getProducts(query) {
    const { page = 1, limit = 10, sort, category } = query;
    const filter = category ? { category } : {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    return await Product.paginate(filter, options);
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async addProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, updateData) {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
