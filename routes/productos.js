import { Productos } from '../api/productos.js'

export class Routes {

    constructor() {
        this.productos = new Productos()
        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
    }

    //get = async (req,res) => {
    async get(req,res) {
        let { id } = req.params
    
        let productoLeido = await this.productos.obtener(id)
        //console.log('obtener', id, productoLeido)
        console.log('obtener')
    
        res.json(productoLeido)
    }

    async post(req,res) {
        let producto = req.body
        let productoAgregado = await this.productos.agregar(producto)
    
        //console.log('agregar', producto, productoAgregado)
        console.log('agregar')
    
        res.json(productoAgregado)
    }

    async put(req,res) {
        let { id } = req.params
        let producto = req.body
        let productoActualizado = await this.productos.actualizar(producto,id)
        //console.log('actualizar', producto, producto._id ,id, productoActualizado)
        console.log('actualizar')

        res.json(productoActualizado)
    }
 
    async delete(req,res) {
        let { id } = req.params
    
        let productoBorrado = await this.productos.borrar(id)
        console.log('borrar')//, id, productoBorrado)
    
        res.json(productoBorrado)
    }
}