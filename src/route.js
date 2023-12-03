(async () => {
    const express = require('express')
    const server = express()
    const db = require('./db.js')
    const url = require('url')
    const path = require('path')
    const bodyParser = require('body-parser')
    const session = require("express-session")
    const mysqlSession = require("express-mysql-session")(session)
    const PORT = process.env.PORT || 3000

    server.set('view engine', 'ejs')
    server.set('views', path.join(__dirname, 'views'))

    server.use(express.static("public"))
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(bodyParser.json())

    var userInfo =' '
    server.locals.info = {
    user:userInfo
    }

    const options ={
        expiration: 10800000,
        createDatabaseTable: false,

        schema: {
            tableName: 'session_tbl',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }  
    }

    await db.makeSession(server,options,session)

    function checkFirst(req, res, next) {
        if (!req.session.userInfo || userInfo == '') {
            res.redirect('/');
        } else {
          next();
        }
      }

    server.get('/', async  (req, res) => {
        const consulta = await db.selectCupcakes()
        res.render(`index`, {
            cupcakes: consulta
        })
    })

    server.get('/cadastro', (req, res) => res.render('cadastro'))

    server.post("/cadastro", async (req, res) => {
        const info = req.body
        await db.insertClientes({
            nome: info.nome,
            email: info.email,
            telefone: info.telefone,
            cep: info.cep,
            estado: info.estado,
            bairro: info.bairro,
            rua: info.rua,
            numero: info.numero,
            complemento: info.complemento,
            senha: info.senha
        })
    res.redirect("/login")
    })

    server.get('/carrinho', (req, res) => res.render('carrinho'))

    server.post("/carrinho", async (req, res) => {
        const info = req.body
        console.log(info)

        await db.insertPedidos({
            cliente_id:req.session.userInfo[1],
            cupcake_id: info.id_cupcake,
            qnt: info.qnt,
            valor: info.valor,
            data_compra: info.data_compra,     
            total: info.total           
        })
        res.send(info)
    })

    server.get('/login', (req, res) => res.render('login'))

    server.post("/login", async (req,res)=>{
        const {email,senha} = req.body
        const logado = await db.selectClientes(email,senha)
        console.log(logado)
        if(logado != ""){
            req.session.userInfo = [email, logado[0].id]
            userInfo = req.session.userInfo
            req.app.locals.info.user= userInfo
            res.redirect('/')
        }
        else {res.render("loginNaoExiste")}
    })

    server.get('/sobre', (req, res) => res.render('sobre'))

    server.use('/logout', function (req, res) {
        req.app.locals.info = {}
        req.session.destroy()
        res.clearCookie('connect.sid', { path: '/'});
        res.redirect("/login")
    })

    server.get('/pedidos', checkFirst, async (req, res) => {    
        const consulta = await db.selectPedidos(req.session.userInfo[1])
        res.render(`pedidos`, {
        pedidos: consulta
        })
    })

server.listen(PORT, () => console.log("Rodando")) 
})()