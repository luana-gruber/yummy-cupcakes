const session = require("express-session")
const mysqlSession = require("express-mysql-session")(session)

async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host: "localhost",
        user: "luu",
        password: "123456",
        database:"yummy"
    })
    global.connection = conn
    return connection
}

async function makeSession(server, opt){
    
    const dia = 1000 * 60 * 60 * 24;
    const conectado = await conecta()

    const  sessionStore = new mysqlSession(opt,conectado)

    server.use(session({
        secret: "hrgfgrfrty84fwir767",
        saveUninitialized:true,
        store:sessionStore,
        cookie: { maxAge: dia},
        resave: true
    }))

}

async function insertClientes(cliente){
    const conectado = await conecta()
    const values = [cliente.nome,cliente.email,cliente.telefone,cliente.cep,cliente.estado, cliente.bairro, cliente.rua, cliente.numero, cliente.complemento, cliente.senha]
    return await conectado.query("INSERT INTO cliente (nome,email,telefone,cep,estado,bairro,rua,numero,complemento,senha) VALUES(?,?,?,?,?,?,?,?,?,?)", values)
   
}

async function selectClientes(email,senha){
    const conectado = await conecta()
    const values = [email,senha]
    const [rows] = await conectado.query("SELECT * FROM yummy.cliente WHERE email=? AND senha=?", values)
    return rows
}

async function selectCupcakes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM yummy.cupcakes")
    return rows
}

async function insertPedidos(pedidos){
    const conectado = await conecta()
    console.log(pedidos)
    const values = [pedidos.cliente_id,pedidos.cupcake_id,pedidos.qnt,pedidos.valor,pedidos.data_compra, pedidos.total]
    return await conectado.query("INSERT INTO pedidos (cliente_id,cupcake_id,qnt,valor,data_compra, total) VALUES(?,?,?,?,?,?)", values)
   
}

async function selectPedidos(id){
    const conectado = await conecta()
    const value = id
    const [rows] = await conectado.query("SELECT yummy.cupcakes.nome, yummy.pedidos.valor, yummy.pedidos.data_compra, yummy.pedidos.qnt FROM yummy.pedidos INNER JOIN yummy.cupcakes ON yummy.pedidos.cupcake_id = yummy.cupcakes.id WHERE yummy.pedidos.cliente_id=?;", value)
    return rows
}

module.exports = {
    insertClientes,
    selectClientes,
    selectCupcakes,
    insertPedidos,
    selectPedidos,
    makeSession
}