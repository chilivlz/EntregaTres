import { Router } from "express";
import express from "express";
import { cartManager, CartManager } from "../cartManager.js";


export const cartsRouter = Router();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
  const userCart = await cartManager.createCart();

  res.status(201).send({ status: "success", data: userCart });
});

cartsRouter.get("/:cid", async (req, res) => {
  const cartId = req.params.cid
  const cartFound = await cartManager.getCartById(cartId)
  res.status(200).send({status: "success", msg: "carrito encontrado", data: cartFound,})
  res.send(cartFound)
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid
  cartManager.addProductToCart(cartId,productId)
  res.status(200).send({status:"sucess",msm:"se agrego product", data:cartManager })
  res.send("se agrego el producto")
});