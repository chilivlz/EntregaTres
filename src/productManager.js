
import fs from "fs";



export class ProductManager {
    constructor(path) {
      this.path = "path";
      this.products = [];
      this.id = 0;
      fs.existsSync(this.path) === false ? fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw err; console.log("Iniciando servidor");})
        : console.log("Iniciando servidor");
    }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const file = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(file);
    this.products = products;

    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError) {
      console.log("Error code, existing code");
    } else {
      this.id++;
      title = title || "no value entered";
      description = description || "no value entered";
      price = price || "no value entered";
      thumbnail = thumbnail || "no value entered";
      code = code || "no value entered";
      stock = stock || "no value entered";

      if (
        title == "no value entered" ||
        description == "no value entered" ||
        price == "no value entered" ||
        thumbnail == "no value entered" ||
        code == "no value entered" ||
        stock == "no value entered"
      ) {
        console.log("Error: there are unfilled fields");
      } else {
        const product = {
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
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
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("product not found");
    }
  }

  async updateProduct(id, prop, newValor) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd == undefined) {
      console.log("product not found");
    } else {
      findProd[prop] = newValor;
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
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
};


