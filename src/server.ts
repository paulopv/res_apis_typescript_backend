import express from 'express'
import colors from 'colors'
import router from './router'
import db from './config/db'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'

//conection to db
async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white('conexion a la base de datos exitosa'))

    }catch(error){
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectar a la base de datos'))
    
}
}
//llamado a la funcion de conexion
connectDB()
//crear servidor
//instancia de express
const server = express()

//permitir conexiones
const corsOptions : CorsOptions ={
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            
            callback(null, true)
        }else{
            callback(new Error ('Error de CORS'))
        }
    } 

}
server.use(cors(corsOptions))


//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products',router)

server.get('/api', (req, res) =>{
    res.json({msg: 'desde API'})
})


export default server