const express= require('express')
const routes = express.Router()
const Restaurant = require('../controller/Restaurant')

routes.post('/filter/:pageNo',Restaurant.FilterRestaurant)
routes.post('/user/:pageNo',Restaurant.UserResult)
routes.post('/restaurant',Restaurant.SerchedRestaurant)
module.exports=routes;