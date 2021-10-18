const express = require('express')
const routes = express.Router()

//Se realiza una conexión con nuestras rutas para que consulten la BDD
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cars', (err, rows)=>{
            if(err) return res.send(err) //Permite realizar la consulta a una tabla

            res.json(rows) //Los datos se convierten en objetos JSON
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO cars set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cars added!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM cars WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cars excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE cars set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('cars updated!')
        })
    })
})

module.exports = routes