
 const fs = require("fs");

 class ProductManager {
 
   fields = ["title", "description", "price", "thumbnail", "code", "stock"];
 
  
   constructor(file) {
     this.products = [];
     this.id = 1; 
     this.path = file; 
     this._initFS(); 
   }
 
   async addProduct(product) {
   
     let verifyCode = this.products.find((p) => p.code === product.code);
 
     if (verifyCode) {
       return "This code already exists";
     }
 
     if (!this._checkFiels(product, this.fields)) {
       return "Fields missing";
     }
 
    
 
     let newProduct = { ...product, id: this.id };
     this.products.push(newProduct);
     this.id++;
 
    
     await this._saveDataFS(this.products);
 
     return "Product added";
   }
 
   async getProducts() {
     this.products = await this._getDataFS();
     let answer =
       this.products.length === 0
         ? "Empty list of products"
         : JSON.stringify(this.products);
     return answer;
   }
 
   async getById(id) {
     
     let arrayProducts = await this._getDataFS();
 
     let searchProduct = (nameKey, arrayProducts) => {
       for (let i = 0; i < arrayProducts.length; i++) {       
          
         if (arrayProducts[i].id === nameKey) {                    
           return arrayProducts[i];
         }
       }
       return "Not found";
     };
     return searchProduct(parseInt(id), arrayProducts);
   }
 
   async updateProduct(id, product) {    
 
     
     if (!this._checkFiels(product, this.fields)) {
       return "Fields missing";
     }
 
     const indexElement = this.products.findIndex((pr) => pr.id == id);
 
     if (indexElement >= 0) {
       let newProduct = [...this.products];
       newProduct[indexElement] = { ...product, id: id };
       this.products = newProduct;
       await this._saveDataFS(this.products);
       return "Product update";
     } else {
       return "Not found";
     }
   }
 
   async deleteProduct(id) {
    
     let indexElement = this.products.findIndex((pr) => pr.id == id);
 
    
     if (indexElement >= 0) {
       
       this.products.splice(indexElement, 1);
       await this._saveDataFS(this.products);
       return "Product delete";
     } else {
       return "Not found";
     }
   }
 
   async _initFS() {

     if (!fs.existsSync(this.path)) {
       await fs.promises.writeFile(this.path, "[]", "utf8");
     }
     this.products = await this._getDataFS();
   }
 
   async _getDataFS() {
     const fileContent = await fs.promises.readFile(this.path, "utf8");
     return JSON.parse(fileContent);
   }
 

   async _saveDataFS(info) {
     await fs.promises.writeFile(this.path, JSON.stringify(info));
   }
 
   _checkFiels(product, fields) {
     for (let x = 0; x < fields.length; x++) {
       if (!Object.keys(product).includes(fields[x])) {
         return false;
       }
     }
     return true;
   }
 }
 
 module.exports = ProductManager;