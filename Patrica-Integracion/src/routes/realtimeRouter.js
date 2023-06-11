import express from "express";
import {Router} from "express";
import { ProductManager} from "../productManager.js";

import{ io } from "../app.js"


export const routerRealTime = express.Router();
const productManager = new ProductManager ('./products.json'); 

routerRealTime.use(express.urlencoded({ extended: true }));
routerRealTime.use(express.json());

routerRealTime.get('/', async (req,res)=>{
    const result = await productManager.getProducts();
    res.render('home',{ data:result });
   
});

routerRealTime.get('/realtimeproducts', async (req,res)=>{
    const result = await productManager.getProducts();
    res.render('realTimeProducts',{data:result});
});


