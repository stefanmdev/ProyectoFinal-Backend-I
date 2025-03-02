import Cart from "../models/Cart.js";

class CartManager {
  async createCart() {
    const cart = new Cart({ products: [] });
    return await cart.save();
  }

  async getCartById(cartId) {
    const cart = await Cart.findById(cartId).populate("products.product");
    if (!cart) throw new Error("No existe un carrito con ese id");
    return cart;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("No existe un carrito con ese id");
    const index = cart.products.findIndex(item => item.product.toString() === productId);
    if (index !== -1) {
      cart.products[index].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("No existe un carrito con ese id");
    cart.products = cart.products.filter(item => item.product.toString() !== productId);
    return await cart.save();
  }

  async updateCartProducts(cartId, productsArray) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("No existe un carrito con ese id");
    cart.products = productsArray;
    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error("No existe un carrito con ese id");
    const productItem = cart.products.find(item => item.product.toString() === productId);
    if (!productItem) throw new Error("El producto no existe en el carrito");
    productItem.quantity = quantity;
    return await cart.save();
  }

  async deleteCart(cartId) {
    const cart = await Cart.findByIdAndDelete(cartId);
    if (!cart) throw new Error("No existe un carrito con ese id");
    return cart;
  }
}

export default CartManager;
