
import { cartsModel } from "../models/carts.model.js";
import { ProductManagerMongo } from "./products.service.js";

const productManagerMongo = new ProductManagerMongo();

export class CartManagerMongo {
  constructor() {}

  async createCart() {
    try {
      const cart = await cartsModel.create({ products: [] });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartsModel.findById(id);

      if (!cart) {
        throw new Error("Cart not found");
      }

      return cart;
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(productId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      const cart = await cartsModel.findById(cartId);

      const existingProduct = cart.products.find((product) => product.product.toString() === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: productToAdd._id, quantity: 1 });
      }

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(productId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      const cart = await cartsModel.findById(cartId);

      const existingProduct = cart.products.find((product) => product.product.toString() === productId);

      if (!existingProduct) {
        throw new Error("Product not found in cart");
      }

      if (existingProduct.quantity <= 1) {
        cart.products = cart.products.filter((product) => product.product.toString() !== productId);
      } else {
        existingProduct.quantity--;
      }

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCartComplete(cartId, productId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(productId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      const cart = await cartsModel.findById(cartId);

      cart.products = cart.products.filter((product) => product.product.toString() !== productId);

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantityProductFromCart(cartId, productId, quantity) {
    try {
      const productToUpdate = await productManagerMongo.getProductById(productId);

      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error("Quantity must be a positive number");
      }

      const cart = await cartsModel.findById(cartId);

      const existingProduct = cart.products.find((product) => product.product.toString() === productId);

      if (!existingProduct) {
        throw new Error("Product not found in cart");
      }

      existingProduct.quantity = quantity;

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartArray(cartId, productArray) {
    try {
      const cart = await cartsModel.findById(cartId);

      const newCartProducts = productArray.products.map((product) => {
        return {
          product: product._id,
          quantity: product.quantity || 1,
        };
      });

      // @ts-ignore
      cart.products = newCartProducts;

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const cart = await cartsModel.findById(cartId);

      cart.products = [];

      await cart.save();

      return "Cart empty";
    } catch (error) {
      throw new Error("Cart not found");
    }
  }
}
