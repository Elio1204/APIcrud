//Representacion de la tabla

const {DataTypes} = require("sequelize")
const db          = require('../db/db.js')

const modelDb = db.define('gastos_generales', {
    id_gasto    : {
        type:DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    descripcion : {type:DataTypes.STRING},
    categoria   : {type:DataTypes.STRING},
    monto       : {type:DataTypes.FLOAT},

})

module.exports = modelDb