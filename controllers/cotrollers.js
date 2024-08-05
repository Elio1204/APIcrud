// const { Sequelize } = require("sequelize"); los controladores tambien son middleware
const dbModeled = require ("../models/model.js");
// const modelDb = require("../models/model.js");

const todos_gastos = async (req,res) =>{
    try {
        const allSpends = await dbModeled.findAll()
        res.json(allSpends)
        // console.log('Respuesta',response);
    } catch (error) {
        res.json({message:error.message})
    }
}

// const sumatoria = async (req,res)=>{
//     try {
//         const suma = await dbModeled.sum('monto') 
//         res.json(suma)
//     } catch (error) {
//         res.json({message:error.message})
//     }
// }

const crea_gasto = async (req,res)=>{
    try {
        await dbModeled.create(req.body)
        console.log("Registro agregado correctamente");
    } catch (error) {
        res.json({message:error.message})
    }
}

const un_gasto = async (req, res) => {
    try {
        const id = req.params.id;
        const gasto = await dbModeled.findOne({ where: { id_gasto: id } });

        if (gasto) {
            res.json(gasto);
        } else {
            res.json('Id gasto no existe')
        }
    } catch (error) {
        res.send({message:error.message})
    }
};


const actualiza_gasto = async (req,res)=>{
    try {
        await dbModeled.update(req.body,{
            where:{id_gasto:req.params.id}
        })
        res.json('Registro editado con exito')
    } catch (error) {
        res.json({message:error.message})
    }
}

const elimina_gasto = async (req,res)=>{
    try {
        await dbModeled.destroy({where:{id_gasto:req.params.id}})
        res.json('Registro eliminado correctamente');
    } catch (error) {
        res.json({message:error.message});
    }
}


module.exports = {todos_gastos, un_gasto,actualiza_gasto,crea_gasto,elimina_gasto}