import { MongoDB } from './mongo/db.js'
import { MySQL } from './mysql/db.js'
import { SQLite3 } from './sqlite3/db.js'

export default class ProductosDBFactory {
    static get(persistencia) {
        if(persistencia.tipo == 'mongo') return new MongoDB(persistencia.URL)
        else if(persistencia.tipo == 'mysql') 
            return new MySQL(
                persistencia.URL, 
                persistencia.user, 
                persistencia.password,
                persistencia.database
            )
        else if(persistencia.tipo == 'sqlite3') return new SQLite3(persistencia.URL)
        else throw 'BASE DE DATOS DESCONOCIDA'
    }
}