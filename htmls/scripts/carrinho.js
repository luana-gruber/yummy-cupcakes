let divCarrinho = document.querySelector("#div-carrinho")
let total = document.querySelector(".col-4 div-valor-total")
let adiciona = document.querySelector(".adiciona")
let subtrai = document.querySelector(".subtrai")
let totalValor = 0
let recuperaCarrinho = []

if (localStorage.getItem("Carrinho" != null)){
    recuperaCarrinho = JSON.parse(localStorage.getItem("Carrinho"))
}

renderCarrinho(recuperaCarrinho)

function renderCarrinho(carrinho){
    for (let i = 0; i < carrinho.length; i++) {

        let conteudoRow = document.createElement('div')
        conteudoRow.className = 'row'

        let imagem = `<div class="col-4"><img class="img-prod" src="assets/${carrinho[i].img}"></div>`
        let qtde = `<div class="col-4 mt-3"><button class="btn-qnt subtrai">-</button><input class="input-qnt" name="qnt" id="qnt" type="number" value="${carrinho[i].qnt}"><button class="btn-qnt ml-2 adiciona">+</button></div>`
        let preco = `<div class="col-2 mt-4">${carrinho[i].preco}</p></div>`
        let apagarItem = `<div class="col-2 mt-3"><img class="img-lixeira" data-toggle="modal" data-target="#modal-confirm" src="assets/lixeira-icone.png"></div>`


        totalValor += Number(carrinho[i].qnt) * Number(carrinho[i].preco)

        conteudoRow.innerHTML += imagem
        conteudoRow.innerHTML += qtde
        conteudoRow.innerHTML += preco
        conteudoRow.innerHTML += apagarItem
        total.innerHTML = `<h3>R${totalValor}</h3>`

    }
}
