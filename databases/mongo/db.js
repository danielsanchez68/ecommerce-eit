import mongoose from 'mongoose'

import * as model from './model.js'

export class MongoDB {

    constructor(URL) {
        this.URL = URL

        process.on('exit', () => {
            this.close()
        })
    }

    async conectar(URL) {
        try {
            await mongoose.connect(this.URL, { useNewUrlParser: true, useUnifiedTopology: true })
        }
        catch(err) {
            console.log(`MongoDB: Error en conectar ${err}`)
        }        
    }

    async leer() {
        try {
            let productos = await model.productos.find({})
            return productos
        }
        catch(err) {
            console.log(`MongoDB: Error en leer ${err}`)
        }        
    }

    async guardar(producto) {
        try {
            const productoModel = new model.productos(producto);
            let prod = await productoModel.save()
            return prod
        }
        catch(err) {
            console.log(`MongoDB: Error en guardar ${err}`)
        }        
    }

    async actualizar(producto, id) {
        try {
            let prod = await model.productos.updateOne( {_id: id }, { $set: {...producto} })
            return prod
        }
        catch(err) {
            console.log(`MongoDB: Error en actualizar ${err}`)
        }        
    }

    async borrar(id) {
        try {
            await model.productos.deleteOne( {_id: id })
        }
        catch(err) {
            console.log(`MongoDB: Error en borrar ${err}`)
        }
    }

    close() {
        console.log('Cerrando conexión MongoDB!');
    }
}