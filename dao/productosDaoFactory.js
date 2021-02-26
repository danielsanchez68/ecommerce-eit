import ProductosDaoMem from './productosDaoMem.js'
import ProductosDaoFile from './productosDaoFile.js'
import ProductosDaoDB from './productosDaoDB.js'
import { Config } from '../config.js'

export default class ProductosDaoFactory {
    static get() {
        let persistencia = Config.get().persistencia

        console.log('PERSISTENCIA: ', persistencia)

        switch(persistencia.tipo) {
            case 'memory': return new ProductosDaoMem()
            case 'file': return new ProductosDaoFile(persistencia.URL)
            case 'mongo':
            case 'mysql':
            case 'sqlite3':
                return new ProductosDaoDB(persistencia)
            default : throw 'MECANISMO DE PERSISTENCIA DESCONOCIDO'
        }
    }
}