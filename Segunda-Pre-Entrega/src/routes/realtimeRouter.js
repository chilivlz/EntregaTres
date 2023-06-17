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
      return res.status(200).json({
        status: "succesfull ",
        msg: "all products",
        data: allProducts
      })

  });
  
  routerRealTime.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {});
    res.json({});
  });
  
  routerRealTime.get("/chat", async (req, res) => {
    res.render("chat", {});
  });

