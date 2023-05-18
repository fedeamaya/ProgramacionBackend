 const express = require('express')
 const handlebars = require('express-handlebars')
 const { Server } = require('socket.io')
 const productRouter = require('./routers/products')
 const cartRouter = require('./routers/carts')
 const viewsRouter = require('./routers/views')
 const socketProduct = require('./utils/socketProducts')
 const PORT = 8080
 const app = express()
 const severHttp = app.listen(PORT, () => {
     console.log('Server running on port: ' + PORT )
 })
 
 const ioSocket = new Server(severHttp)
 app.engine('handlebars', handlebars.engine())
 app.set('views', __dirname+'/views')
 app.set('view engine', 'handlebars')
 app.use(express.json())
 app.use(express.urlencoded({extended: true}))
 app.use('/static', express.static(__dirname+'/public'))
 app.use('/api/products', productRouter)
 app.use('/api/carts', cartRouter)
 app.use('/', viewsRouter)
 
 
 app.use("*", (req, res) => {
     res.status(404).send({status: "Error", message: `Requested path not found`,});
 });
 
 
 
 
 socketProduct(ioSocket)