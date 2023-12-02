(async () => {
    const express = require('express')
    const server = express()
    const db = require('./db.js')
    const url = require('url')
    const path = require('path')
    const bodyParser = require('body-parser')
    const session = require("express-session")
    const mysqlSession = require("express-mysql-session")(session)

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
        createDatabaseTable: true,

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

    server.get('/login', (req, res) => res.render('login'))

    server.post("/login", async (req,res)=>{
        const {email,senha} = req.body
        const logado = await db.selectClientes(email,senha)
        if(logado != ""){
        req.session.userInfo = [email, logado[0].id]
        userInfo = req.session.userInfo
        console.log(userInfo)
        req.app.locals.info.user = userInfo
        res.redirect('/')
        }
    })

    server.use('/logout', function (req, res) {
        req.app.locals.info = {}
        req.session.destroy()
        res.clearCookie('connect.sid', { path: '/'});
        res.redirect("/login")
    })

server.listen(3000, () => console.log("Rodando")) 
})()