import express from "express";
import {Router} from "express";
import { ProductManager} from "../DAO/services/productManager.js";

import{ io } from "../app.js"

const productManager = new ProductManager ('./products.json'); 
export const routerRealTime = Router();


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


