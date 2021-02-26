/* ------------------------------------------------ */
/*               VARIABLES GLOBALES                 */
/* ------------------------------------------------ */
let listaProductos = []

/* ------------------------------------------------ */
/*               FUNCIONES GLOBALES                 */
/* ------------------------------------------------ */

/* -------------------------------------------------- */

async function cambiarCantidad(id,el) {

    let index = listaProductos.findIndex(prod => prod._id == id)
    let cantidad = Number(el.value)
    console.log('Cambiar cantidad',id,index,cantidad)
    listaProductos[index].cantidad = cantidad

    let prod = listaProductos[index]
    try {
        await api.putProdWeb(id, prod)
    }
    catch(error) {
        console.log(error)
    }
}

async function cambiarPrecio(id, el) {

    let index = listaProductos.findIndex(prod => prod._id == id)
    let precio = Number(el.value)
    console.log('Cambiar precio',id,index,precio)
    listaProductos[index].precio = precio

    let prod = listaProductos[index]
    try {
        await api.putProdWeb(id, prod)
    }
    catch(error) {
        console.log(error)
    }
}

async function borrarProd(id) {
    console.log('borrar item',id)

    //listaProductos.splice(index,1)
    try {
        await api.deleteProdWeb(id)
        renderLista()
    }
    catch(error) {
        console.log(error)
    }
}

async function renderLista() {

    try {
        let source = await fetch('plantilla-lista.hbs', { method: 'get'}).then(data => data.text())

        // compile the template
        var template = Handlebars.compile(source);

        listaProductos = await api.getProdWeb()

        // execute the compiled template
        let data = { listaProductos } // { listaProductos } es igual a { listaProductos:listaProductos }

        //inyecto el código compitado con los datos en el html
        document.querySelector('#lista').innerHTML = template(data);

    }
    catch(error) {
        console.log('Error en renderLista', error)
    }
}

function configurarListeners() {

    /* Ingreso de producto */
    document.querySelector('#btn-entrada-producto').onclick = async () => {
        //console.log('btn-entrada-producto')

        let input =  document.querySelector('#ingreso-producto')
        let producto = input.value
        //console.log(producto)

        if(producto) {
            let prod = {nombre: producto, cantidad: 1, precio: 0}
            //listaProductos.push( prod )
            let prodPost = await api.postProdWeb(prod)
            //console.log('prodPost', prodPost)
            renderLista()
            input.value = null
        }
    }

    /* Borrar todos los productos */
    document.querySelector('#btn-borrar-productos').onclick = async () => {
        console.log('btn-borrar-productos')

        if(listaProductos.length) {
            await api.deleteAllProdWeb()
            renderLista()         }
    }
}

function start() {
    configurarListeners()
    renderLista()
}

/* ------------------------------------------------ */
/*                  EJECUCIONES                     */
/* ------------------------------------------------ */
window.addEventListener('DOMContentLoaded',start)
