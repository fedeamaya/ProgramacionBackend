 const express = require('express')
 const ProductManager = require('../controller/productmanager') 
 const router = express.Router()

 const pm = new ProductManager("./src/storage/products.json")

 router.get('/', async (req, res) => {
     await pm._initFS();
     const { limit } = req.query
     limit ? res.status(200).send({status: 'succes', payload: pm.products.slice(0, limit)}) : res.status(200).send({status: 'succes', payload: pm.getProducts()})
 })
 router.get('/:id', async (req, res) => {
     try{
         await pm._initFS();
         const product = await pm.getById(req.params.id)
         res.status(200).send({status: 'succes', payload: product})
     }catch(error){
         res.status(400).send({status: 'error', message: error.message})
     }
 })
 router.post('/', async (req, res) => {
     try{
         const product = req.body        
         await pm._initFS();
         
         await pm.addProduct(product)                
         res.status(200).send({status: 'succes', payload: pm.products})
     }catch (error){
         res.status(400).send({status: 'error', message: error.message})
     }
 })
 router.put('/:id', async (req, res) => {
     try{
         const product = req.body
         await pm._initFS();
         await pm.updateProduct(req.params.id, product)
         res.status(200).send({status: 'succes', payload: pm.products})
     }catch (Error){
         res.status(400).send({status: 'error', message: Error.message})
     }
 })
 router.delete('/:pid', async (req, res) => {
     try{
         await pm._initFS();
         await pm.deleteProduct(Number(req.params.pid))
         res.status(200).send({status: 'succes', payload: pm.products})
     }catch(error){
         res.status(400).send({status: 'error', message: error.message})
     }
 })
 
 module.exports = router;