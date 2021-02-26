import { getOptions } from './options/mariaDB.js'
import knexLib from 'knex'

export class MySQL {

    constructor(URL, user, password, database) {
        this.URL = URL
        this.user = user
        this.password = password
        this.database = database

        process.on('exit', () => {
            this.close()
        })        
    }

    async conectar(URL) {
        try {
            this.knex = knexLib(getOptions(this.URL, this.user, this.password, this.database));

            /* Creo la tabla de productos si no existe */
            (async() => {
                let exists = await this.knex.schema.hasTable('productos')
                if (!exists) {
                    await this.knex.schema.createTable('productos', table => {
                        table.increments('_id').primary();
                        table.string('nombre', 50);
                        table.integer('cantidad');
                        table.float('precio');
                    });
                    console.log('Tabla de productos creada!')
                }
            })()
        }
        catch(err) {
            console.log(`MySQL: Error en conectar ${err}`)
        }        
    }

    async leer() {
        try {
            let productos = await this.knex('productos').select('*')
            return productos
        }
        catch(err) {
            console.log(`MySQL: Error en leer ${err}`)
        }        
    }

    async guardar(producto) {
        try {
            await this.knex('productos').insert(producto)
            return producto
        }
        catch(err) {
            console.log(`MySQL: Error en guardar ${err}`)
        }        
    }

    async actualizar(producto, id) {
        try {
            await this.knex.from('productos').where('_id', id).update(producto)
            return producto
        }
        catch(err) {
            console.log(`MySQL: Error en actualizar ${err}`)
        }        
    }

    async borrar(id) {
        try {
            await this.knex.from('productos').where('_id', id).del()
        }
        catch(err) {
            console.log(`MySQL: Error en borrar ${err}`)
        }
    }

    close() {
        console.log('Cerrando conexión MySQL!');
        this.knex.destroy();
    }
}