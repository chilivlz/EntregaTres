import { Router } from "express";
import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager("..routes/src/products.json");

export const productManagerRouter = Router();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

//  limit//
productManagerRouter.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();
    let limit = req.query.limit; 
  
    if (!limit) {
      res.status(200).send({ status: "success", data: allProducts });
    } else if (limit > 0 && limit <= allProducts.length) {
      let productsLimit = allProducts.slice(0, limit);
      res.status(200).send({ status: "success", data: productsLimit, msg:products });
    } else if (limit > allProducts.length) {
      res
        .status(400)
        .send({ status: "error", data: "Limit exceeds the products quantity" });
    } else {
      res.status(400).send({ status: "error", data: "Limit must be a number", msg: productslimit });
    }
  }); //limit//


  productManagerRouter.get("/", async (req, res) => {


    const allProducts = await productManager.getProducts();
    let productId = req.params.pid;
    let productFound = allProducts.find((product) => product.id === productId);
    if (!productFound) {
      return res
        .status(404)
        .send({ status: "error", data: "Product ID not found", msg: IdnotFound});
    }
     res.status(200).send({ status: "success", data: productFound });
      
  });

  productManagerRouter.get("/:id", async (req,res)=>{
 try { 

  const id = req.params.id;
  const productsId = productsId.find((p) => p.id == id);
  
  const response =  await productsId
      ? { status: "succes", msg:" product found",data: productsId}
       : { status : "error", msg: "product NOT found", data: {}}
       res.status( productsId ? 200 : 404 ). json (response);

 } catch (error) {
    res.status(500).json({
        status: "error",
        msg: "Internal server error",
        data: {},


 });
   }});
  

 


   

  




