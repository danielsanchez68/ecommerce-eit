export default class ProductosDaoMem {
    constructor() {
        this.lista = []
        this._id = 0
    }

    getIndex(id) {
        return this.lista.findIndex( prod => prod._id == id)
    }

    getNextId() {
        return ++this._id
    }

    async get(id) {
        let indice = this.getIndex(id)
        return id? this.lista[indice] : this.lista
    }

    async add(producto) {
        producto._id = this.getNextId()
        this.lista.push(producto)
        return producto
    }

    async update(producto, id) {
        let indice = this.getIndex(id)
        let productoNuevo = { ... this.lista[indice], ...producto }

        this.lista.splice(indice, 1, productoNuevo)
        return producto
    }
    
    async delete(id){
        let indice = this.getIndex(id)
        return this.lista.splice(indice, 1)
    }
}
