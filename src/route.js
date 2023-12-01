const express = require('express')

const route = express.Router()

route.get('/', (req, res) => res.render('index'))

route.get('/cadastro', (req, res) => res.render('cadastro'))

route.get('/carrinho', (req, res) => res.render('carrinho'))

route.get('/login', (req, res) => res.render('login'))

module.exports = route