import Product from "../models/Product.js";

class ProductManager {
  async addProduct(productData) {
    const { title, description, price, img, code, stock } = productData;
    if (!title || !description || !price || !img || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }
    const exists = await Product.findOne({ code });
    if (exists) {
      throw new Error("El código debe ser único");
    }
    const product = new Product(productData);
    return await product.save();
  }

  async getProducts(queryParams) {
    const { limit = 10, page = 1, sort, query } = queryParams;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true
    };
    if (sort) {
      options.sort = { price: sort.toLowerCase() === "asc" ? 1 : -1 };
    }
    let queryFilter = {};
    if (query) {
      queryFilter.title = { $regex: query, $options: "i" };
    }
    const result = await Product.paginate(queryFilter, options);
    return result;
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async updateProduct(id, updateData) {
    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }
}

export default ProductManager;
