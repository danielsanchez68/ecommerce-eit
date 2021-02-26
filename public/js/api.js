const PRODUCCION = true

const api = (function() {
    /* ---------------------------------- */
    /*             API REST               */
    /* ---------------------------------- */
    function getURL(id) {
        //return 'https://5c8ef17a3e557700145e85c7.mockapi.io/lista/' + (id?id:'')
        return (!PRODUCCION? 'http://localhost:8080':'') + '/productos/' + (id?id:'')
    }

    /* GET */
    async function getProdWeb() {
        let url = getURL() + '?' + Date.now()

        try {
            let prods = await fetch(url, {method: 'get'}).then(data => data.json())
            return prods
        }
        catch(error) {
            console.log('Error getProdWeb', error)
            //let prods = leerListaProductosLocal(listaProductos)
            //return prods
        }
    }

    /* POST */
    async function postProdWeb(prod) {

        try {
            return await fetch(getURL(), {
                method: 'post',
                body: JSON.stringify(prod),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        }
        catch(error) {
            //console.log('Error postProdWeb', error)
            return 'Error postProdWeb'+ error
        }
    }

    /* PUT */
    async function putProdWeb(id, prod) {
        try {
            return await fetch(getURL(id), {
                method: 'put',
                body: JSON.stringify(prod),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })            
        }
        catch(error) {
            //console.log('Error putProdWeb', error)
            return 'Error putProdWeb'+ error
        }
    }

    /* DELETE */
    async function deleteProdWeb(id) {
        try {
            console.log(getURL(id))
            await fetch(getURL(id), {method: 'delete'})
            return 'ok delete id ' + id 
        }
        catch(error) {
            //console.log('Error deleteProdWeb', error)
            return 'Error deleteProdWeb'+ error
        }
    }

    /* DELETE ALL */
    async function deleteAllProdWeb() {

        let porcentaje = 0
        let progress = document.querySelector('progress')
        let span = document.querySelector('#progress')

        let btnBorrarproductos = document.querySelector('#btn-borrar-productos')
        btnBorrarproductos.setAttribute('disabled', true)

        progress.value = 0
        progress.style.display = 'block'
        span.style.display = 'block'

        for(let i =0; i<listaProductos.length; i++ ) { 
            porcentaje = parseInt((i*100) / listaProductos.length)
            console.log(porcentaje + '%')
            progress.value = porcentaje
            span.innerText = porcentaje + '%'
            
            try {
                await fetch(getURL(listaProductos[i]._id), {method: 'delete'})
                //console.log('ok delete id ' + i) 
            }
            catch(error) {
                //console.log('Error deleteProdWeb', error)
                throw 'Error deleteAllProdWeb: '+ error
            }
        }

        porcentaje = 100
        console.log(porcentaje + '%')
        progress.value = porcentaje
        span.innerText = porcentaje + '%'

        setTimeout(() => {
            progress.style.display = 'none'
            span.style.display = 'none'
            btnBorrarproductos.removeAttribute('disabled')
        },2000)


        return 'ok delete All'
    }

    return {
        getProdWeb,
        postProdWeb,
        putProdWeb,
        deleteProdWeb,
        deleteAllProdWeb
    }
})()