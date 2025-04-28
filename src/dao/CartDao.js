import Cart from "../models/Cart.js";

export default class CartDao {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCartById(cid) {
    return await Cart.findById(cid).populate('products.product');
  }

  async addProduct(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    const productIndex = cart.products.findIndex(p => p.product.equals(pid));

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    return await cart.save();
  }

  async removeProduct(cid, pid) {
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => !p.product.equals(pid));
    return await cart.save();
  }

  async updateCartProducts(cid, products) {
    const cart = await Cart.findById(cid);
    cart.products = products;
    return await cart.save();
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await Cart.findById(cid);
    const productInCart = cart.products.find(p => p.product.equals(pid));
    if (productInCart) {
      productInCart.quantity = quantity;
      return await cart.save();
    }
    return null;
  }

  async clearCart(cid) {
    const cart = await Cart.findById(cid);
    cart.products = [];
    return await cart.save();
  }

  async deleteCart(cid) {
    return await Cart.findByIdAndDelete(cid);
  }
}
