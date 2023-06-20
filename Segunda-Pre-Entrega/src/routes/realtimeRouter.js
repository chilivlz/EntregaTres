import express from "express";
import {Router} from "express";
import { ProductManagerMongo } from "../DAO/services/products.service.js";
import { CartManagerMongo } from "../DAO/services/carts.service.js";

const productManagerMongo = new ProductManagerMongo ();
const cartManagerMongo = new CartManagerMongo(); 

export const routerRealTime = Router();

const app = express();
app.use(express.static("public"));

routerRealTime.use(express.json());
routerRealTime.use(express.urlencoded({ extended: true }));


routerRealTime.get("/", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query.limit, req.query.page, req.query.sort, req.query.query);

  const products = allProducts.docs.map((product) => ({
    name: product.title,
    description: product.description,
    price: product.price,
  }));

  return res.status(200).json({
    style: "./public/css/styles.css",
    products: products,
  });
});


routerRealTime.get("/products", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query.limit, req.query.page, req.query.sort, req.query.query);
  
  const products = allProducts.docs.map((product) => ({
    name: product.title,
    description: product.description,
    price: product.price,
    _id: product._id,
  }));

  res.status(200).json({
    products: {
      style: "../css/styles.css",
      products: products,
    },
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
  });
});


routerRealTime.get("/productDetail/:pid", async (req, res) => {
  let pId = req.params.pid;
  const product = await productManagerMongo.getProductById(pId);

  if (product) {
    return res.status(200).json({
      style: "css/styles.css",
      product: {
        name: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
      },
    });
  } else {
    return res.status(404).json({
      status: "error",
      data: "Product not found",
    });
  }
}); 
routerRealTime.get("/carts/:cid", async (req, res) => {
  try {
    const cId = req.params.cid;
    const cart = await cartManagerMongo.getCartById(cId);

    let totalPrice = 0;
    for (const product of cart.products) {
      totalPrice += product.quantity * product.product.price;
    }

    console.log(totalPrice);

    res.status(200).json({
      style: "styles.css",
      products: cart.products.map((product) => ({
        name: product.product.name,
        price: product.product.price,
        quantity: product.quantity,
      })),
      totalPrice: totalPrice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error retrieving cart" });
  }
});





  
  routerRealTime.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {});
    res.json({});
  });
  
  routerRealTime.get("/chat", async (req, res) => {
    res.render("chat", {});
  });

