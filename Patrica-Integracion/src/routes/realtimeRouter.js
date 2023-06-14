import express from "express";
import {Router} from "express";

import{ io } from "../app.js"
import { ProductManagerMongo } from "../DAO/services/products.service.js";

const productManagerMongo = new ProductManagerMongo ('./products.json'); 
export const routerRealTime = Router();

routerRealTime.use(express.json());
routerRealTime.use(express.urlencoded({ extended: true }));


routerRealTime.get("/", async (req, res) => {
    let allProducts = await productManagerMongo.getProducts();
    let mapAllproducts = allProducts.map((product) => {
      return {
        title: product.title,
        description: product.description,
        price: product.price,
      };
    });
    res.render("home", { mapAllproducts });
  });
  
  routerRealTime.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {});
  });
  
  routerRealTime.get("/chat", async (req, res) => {
    res.render("chat", {});
  });

