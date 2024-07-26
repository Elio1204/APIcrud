const express = require('express')
const routes  = express.Router()

const {todos_gastos, un_gasto,actualiza_gasto,crea_gasto,elimina_gasto} = require("../controllers/cotrollers.js")


routes.get('/',todos_gastos)
routes.get('/:id',un_gasto)
routes.post('/',crea_gasto)
routes.put('/:id',actualiza_gasto)
routes.delete('/:id',elimina_gasto)




module.exports = routes