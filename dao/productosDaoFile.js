import fs from 'fs'

export default class ProductosDaoFile {
    constructor(URL) {
        this.lista = []
        this.URL = URL
    }

    getIndex(id) {
        return this.lista.findIndex( prod => prod._id == id)
    }

    getNextId() {
        return this.lista.length? (this.lista[this.lista.length-1]._id+1) : 1
    }

    async get(id) {
        try {
            let productos = await fs.promises.readFile(this.URL,'utf-8')
            this.lista = JSON.parse(productos)
            let indice = this.getIndex(id)
            return id? this.lista[indice] : this.lista
        }
        catch(error) {
            console.log('error get: ', error)
            return []
        }
    }

    async add(producto) {
        try {
            this.lista = await this.get()
            producto._id = this.getNextId()
            this.lista.push(producto)
            await fs.promises.writeFile(this.URL, JSON.stringify(this.lista,null,'\t'))
            return producto
        }
        catch(error) {
            console.log('error add: ', error)
            return []
        }
    }

    async update(producto, id) {
        try {
            let indice = this.getIndex(id)
        
            this.lista = await this.get()
            let productoNuevo = { ... this.lista[indice], ...producto }
        
            this.lista.splice(indice, 1, productoNuevo)
            await fs.promises.writeFile(this.URL, JSON.stringify(this.lista,null,'\t'))
            return producto
        }
        catch(error) {
            console.log('error update: ', error)
            return []
        }
    }
    
    async delete(id){
        try {
            this.lista = await this.get()
            let indice = this.getIndex(id)
            let producto = this.lista.splice(indice, 1)
            await fs.promises.writeFile(this.URL, JSON.stringify(this.lista,null,'\t'))
            return producto
        }
        catch(error) {
            console.log('error delete: ', error)
            return []
        }
    }
}
