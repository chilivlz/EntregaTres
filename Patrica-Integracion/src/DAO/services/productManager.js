
import fs from "fs";



export class ProductManager {
    constructor(path) {
      this.path = "./src/products.json";
      this.products = [];
      this.id = 0;
      fs.existsSync(this.path) === false ? fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw err; console.log("Iniciando servidor");})
        : console.log("Iniciando servidor");
    }

  async addProduct(title,category, description, price, thumbnail, code, stock, status) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);
    this.products = products;

    if (products.length > 0){
      const lastProduct = products[products.length - 1];
      this.id = lastProduct.id +1;
    } else{
      this.id = 1;
    }
    

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError) {
      console.log("Error code, existing code");
      return 409
    } else {
      this.id++;
      this.title = title || "no title entered";
      this.category = category || "no category entered"
      this.description = description || "no description entered";
      this.price = price || "no price entered";
      this.thumbnail = thumbnail || "no thumbnail entered";
      this.code = code || "no code entered";
      this.stock = stock || "no stock entered";
      this.status = status || "no status entered";
      

      if (
        title == "no title entered" ||
        category == "no category entered"||
        description == "no title entered" ||
        price == "no title entered" ||
        thumbnail == "no title entered" ||
        code == "no title entered" ||
        stock == "no title entered" ||
        status == "no title entered"
      ) {
        console.log("Error: there are unfilled fields");
        return 401
      } else {
        const product = {
          id: this.id,
          title,
          category,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
        };

        this.products.push(product);
        const productsString = JSON.stringify(this.products);
        await fs.promises.writeFile(this.path, productsString);
      }
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(fileProducts);
   // console.log(fileProductsParse);
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = 
    JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      console.log(findProd);
      return findProd
    } else {
      console.log("product not found");
    }
  }

  async updateProduct(id, title, category, description, price, thumbnail, code,  stock, status) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);
    const codeExist= fileProductsParse.find((prod) => prod.code == code && prod.id !== id);

    if(codeExist){
      return 409
    }

    if (findProd == undefined) {
      console.log("product not found");
    } else {
      findProd['title'] = title?title:findProd['title'];
      findProd['category'] = category?category:findProd['category'];
      findProd['description'] = description?description:findProd['description'];
      findProd['price'] = price?price:findProd['price'];
      findProd['thumbnail'] = thumbnail?thumbnail:findProd['thumbnail'];
      findProd['code'] = code?code:findProd['code'];
      findProd['status'] = status?status:findProd['status'];
      const productsString = JSON.stringify(fileProductsParse);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
     (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("product not found");
      return "product not found"
    } else {
      //delete fileProductsParse[positionProduct, 1];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== id
      );
       console.log({productsDelete})

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
      return "Delete product sucessfully"
    }
  }
};


