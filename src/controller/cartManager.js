 const fs = require("fs");

 class CartManager{
 
     constructor(file){
         this.path = file;
         this.carts = []
     }
 
 
 
     async loadCarts(){
         try{
             if(fs.existSync(this.path)){
                 const fileData = await fs.promises.readFile(this.path, 'utf-8');
                 this.carts = JSON.parse(fileData)
             }
         }catch (error){
             await fs.promises.writeFile(this.path, JSON.stringify(this.carts), 'utf-8')
         }
     }
 
     async saveCarts(){
         try{
             const jsonData = JSON.stringify(this.carts)
             await fs.promises.writeFile(this.path, jsonData)
         }catch (error){
             throw new Error(error.message)
         }
     }
 
     async createCart(){
         await this.loadCarts()
         this.carts.push({
             id: this.carts.length + 1,
             products: []
         })
 
         await this.saveCarts()
     }
 
     async getCarts(){
         await this.loadCarts()
         return this.carts
     }
 
     async getCartById(id){
         await this.loadCarts()
         const cart = this.carts.find((cart) => cart.id == id)
         if(cart){ return cart }
         else{ throw new Error("There is no cart with the id: " + id) }
     }
 
     async productExists(id){
         const fileData = await fs.promises.readFile("./src/storage/products.json", 'utf-8');
         const products = JSON.parse(fileData)
         const productById = products.find((product) => product.id == id)
 
         if(!productById) throw new Error("There is no product with the id: " + id) 
     }
 
     async addProductToCart(cid, pid){ 
         await this.productExists(pid)
 
         await this.loadCarts()
         const cart = await this.getCartById(cid)
         const index = cart.products.findIndex(product => product.id == pid)
 
         if(index === -1){
             cart.products.push({
                 id: pid,
                 quantity: 1
             })
             this.saveCarts()
         }else{
             cart.products[index] = ({
                 ...cart.products[index],
                 quantity: Number(cart.products[index].quantity) + 1
             })
             this.saveCarts()
         }
     }
     
 }
 
 module.exports = CartManager