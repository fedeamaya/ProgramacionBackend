 const express = require('express')
 const ProductManager = require('../controller/productmanager')  
 const router = express.Router()
 const pm = new ProductManager("./src/storage/products.json")
 

 router.get('/', async(req, res) => {
     await pm._initFS()
     
     res.render('home', {
         
         products: await pm.getProducts()
     })
 })
 router.get('/realtimeproducts', (req, res) => {
     res.render('realTimeProducts', {})
 })
 
 module.exports = router;