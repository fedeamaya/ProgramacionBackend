 const ProductManager = require('../controller/productmanager') 
 const pm = new ProductManager("./src/storage/products.json")
 
 const socketProduct = async (ioSocket) => {
     await pm._initFS()
     const products = await pm.getProducts()
 
     ioSocket.on('connection', socket => {
 
         socket.emit('products', products)
 
         socket.on('addProduct', async data => {
             await pm.addProduct(data)
         })
 
         socket.on('deleteProduct', async data => {
             await pm.deleteProduct(data)
         })
     })
 }
 
 module.exports = socketProduct