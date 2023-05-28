import { Router } from "express";
import express from "express";
import { ProductManager } from "../productManager.js";
import { io } from "../app.js";

const productManager = new ProductManager();

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
      res.status(200).send({ status: "success", data: productsLimit });
    } else if (limit > allProducts.length) {
      res
        .status(400)
        .send({ status: "error", data: "Limit exceeds the products quantity" });
    } else {
      res.status(400).send({ status: "error", data: "Limit must be a number", msg: productslimit });
    }
  }); //limit//


  productManagerRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const found = await productManager.getProductById(pid);
        if(found != undefined) {
            return res.status(200).json({status: 'success', data: found});
        } else {
            return res.status(400).json( {status: 'Not found', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});   
    }
});

  productManagerRouter.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const { title, category, description, price, thumbnail, code, stock, status } = req.body;
      const updateProduct = await productManager.updateProduct(pid, title, category, description, price, thumbnail, code, stock, status);
      res.status(200).json({ status: "success", data: updateProduct });
    } catch (error) {
      res.status(400).send({ status: "error", data: error.message });
    }
  });

  productManagerRouter.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      productManager.deleteProduct(pid);
      io.emit('realTime',allProducts);
      return res.status(200).send("Deleted product successfully");
    } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
    }
  });

productManagerRouter.post("/", async (req, res) => {
    const  product  = req.body;
    const { title, category, description, price,thumbnail,code, stock, status } = product
    console.log(title, category, description,price,thumbnail, code , stock, status )
    console.log(product) 


   try {
      productManager.addProduct( title, category, description,price,thumbnail, code , stock, status);
      io.emit('realTime',allProducts);
      return res.status(200).json({ status: "success55", data: product });
      
    } catch (error) {
      res.status(400).send({ status: "error", data: error.message});
    }
  });



  

 


   

  




