import express from 'express'
import cors from 'cors'

import {Routes} from './routes/productos.js'

/* Servidor instancia */
const app = express()

/* Servidor cors */
app.use(cors())

/* Servidor public */
app.use(express.static('public'))

/* Servidor Rutas */
const routes = new Routes()

const router = express.Router()
app.use('/productos', router)

router.use(express.urlencoded({extended: true}))
router.use(express.json())

router.get('/:id?', routes.get)
router.post('/', routes.post)
router.put('/:id', routes.put)
router.delete('/:id', routes.delete)

/* Servidor listen */
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor: ${error}`))
