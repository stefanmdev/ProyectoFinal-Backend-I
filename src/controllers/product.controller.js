import ProductService from "../services/product.service.js";

// Creamos una instancia del service
const productService = new ProductService();

// Obtener todos los productos con filtros, paginación y ordenamiento
export const getProducts = async (req, res) => {
  try {
    const result = await productService.getProducts(req.query);
    const { prevPage, nextPage } = result;
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    result.prevLink = result.hasPrevPage ? `${baseUrl}?page=${prevPage}` : null;
    result.nextLink = result.hasNextPage ? `${baseUrl}?page=${nextPage}` : null;

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
export const addProduct = async (req, res) => {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json({ message: "Producto agregado correctamente", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
    res.json({ message: "Producto actualizado correctamente", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.pid);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
