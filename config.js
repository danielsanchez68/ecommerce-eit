export class Config {
    static get() {
        return {
            //persistencia : {tipo: 'memory', descripcion: 'memoria', URL: null},
            //persistencia : {tipo: 'file', descripcion: 'file system', URL : './productos.dat'},
            //persistencia : {tipo: 'mongo', descripcion: 'base mongo local', URL : 'mongodb://localhost:27017/ecommerce'},
            /* persistencia : {
                tipo: 'mongo',
                descripcion: 'base mongo atlas', 
                URL : 'mongodb+srv://daniel:daniel123@misdatos-fs00f.mongodb.net/ecommerce?retryWrites=true&w=majority'
            }, */
            /* persistencia : {
                tipo: 'mysql',
                descripcion: 'base mysql', 
                URL : '127.0.0.1', 
                user: 'root', 
                password: '',
                database: 'ecommerce'
            }, */
            /*
            persistencia : {
                tipo: 'mysql',
                descripcion: 'base mysql 000webhost', 
                URL : 'remotemysql.com', //email: danielsanchez68@hotmail.com - pass: DanielSanchez-123
                user: 'xANzlOORQ3', 
                password: 'JGQZQHseFD',
                database: 'xANzlOORQ3'
            },
            */
            persistencia : {tipo: 'sqlite3', descripcion: 'base SQLite3', URL : 'ecommerce.sqlite'},
        }
    }
}
