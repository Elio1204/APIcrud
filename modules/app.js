const express      = require("express")
const cors         = require("cors")
const gastos_rutas = require('../routes/gastos_rutas.js') 

const           db = require ('../db/db.js')

const app  = express()
const port = 3030

app.use(cors())
app.use(express.json())


app.get("/", (req,res)=>{
    res.send('Home')
})

app.use("/gastos", gastos_rutas)


const baseConect = async () =>{
    try{
    await db.authenticate()
    console.log('Conectado a la base de datos');
    }catch(error){
        console.log('Error al conectar', error)
    }
}

app.listen(port,()=>{
    baseConect()
    console.log("Server runnign in port: ", port);
})
      