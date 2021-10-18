const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'carros'
}

// Middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

// Rutas -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Bienvenido')
})
app.use('/api', routes)

// Código necesario para que nuestro servidor pueda correr en una puerta-
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})