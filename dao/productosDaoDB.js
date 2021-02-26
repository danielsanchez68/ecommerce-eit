import ProductosDBFactory from '../databases/productosDBFactory.js'

export default class ProductosDaoDB {
    constructor(persistencia) {
        this.productosDB = ProductosDBFactory.get(persistencia);
        (async() => {
            try {
                await this.productosDB.conectar()
                console.log(`Base de datos conectada`)
            }
            catch(error) {
                console.log(`Error en conexión de base de datos: ${error}`)
            }
        })()
    }

    async get(id) {
        try {
            let productos = await this.productosDB.leer()
            return productos
        }
        catch(error) {
            console.log('error get: ', error)
            return []
        }
    }

    async add(producto) {
        try {
            let prod = await this.productosDB.guardar(producto)
            return prod
        }
        catch(error) {
            console.log('error add: ', error)
            return []
        }
    }

    async update(producto, id) {
        try {
            let prod = await this.productosDB.actualizar(producto,id)
            return prod
        }
        catch(error) {
            console.log('error update: ', error)
            return []
        }
    }
    
    async delete(id){
        try {
            let res = await this.productosDB.borrar(id)
            return res
        }
        catch(error) {
            console.log('error delete: ', error)
            return []
        }
    }
}
