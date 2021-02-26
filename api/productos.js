import ProductosDaoFactory from '../dao/productosDaoFactory.js'
import { Config } from '../config.js'

export class Productos {
    constructor() {
        this.productosDao = ProductosDaoFactory.get()
    }

    async obtener(id) {
        return await this.productosDao.get(id)
    }

    async agregar(producto) {
        return await this.productosDao.add(producto)
    }

    async actualizar(producto, id) {
        return await this.productosDao.update(producto, id)
    }
    
    async borrar(id){
        return await this.productosDao.delete(id)
    }
}
