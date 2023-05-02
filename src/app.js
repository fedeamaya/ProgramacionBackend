
 const express = require("express");
 const ProductManager = require("./productmanager");
 
 const productManager = new ProductManager("./src/productos.json");
 

 const app = express();
 const port = 8080;
 
 app.get("/products", async (req, res) => {
   const registers = req.query.limit;
   const products = await productManager.getProducts() 
   const productArray = JSON.parse(products);
 
     if (!registers) {      
       return  res.json(products)
     }
     else
     {
       if(productArray.length>=registers)
       {
         const filtro=productArray.slice(0,registers);
                 
         return  res.json(filtro)
         
       }else{
         return res.json({      
               error: "Limite superior al total de productos",
           })
       }
     }
 
 });
 
 app.get("/products/:id", async (req, res) => {
   
   const id = req.params.id;
   
   const productsSearch=await productManager.getById(id)  
   
   if (productsSearch) {
     return res.json(productsSearch);
   } else {
     return res.json({      
       error: "No se encontro el producto con el id: " + id,
     });
   }
 });
 
 
 app.listen(port, () => {
   console.log(`The app listening on port http://localhost:${port}`);
 });