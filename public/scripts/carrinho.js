let divCarrinho = document.querySelector(".div-carrinho")
let total = document.querySelector(".h3-valor-total")
let inputQnt = document.querySelectorAll(".input-qnt")
let totalValor = 0
var indexCarrinhoExcluido = 0

if (localStorage.getItem("Carrinho") != null){
    var recuperaCarrinho = ((JSON.parse(localStorage.getItem('Carrinho'))))
}

function renderCarrinho(carrinho){
    for (let i = 0; i < carrinho.length; i++) {
        let conteudoRow = document.createElement('div')
        conteudoRow.className = 'row mt-4'
        conteudoRow.setAttribute("data-id", `${carrinho[i].id}`)

        let imagem = `<div class="col-4"><img class="img-prod" src="${carrinho[i].img}"></div>`
        let qtde = `<div class="col-4 mt-3"><button class="btn-qnt" onclick="subtraiQuantidade(this)">-</button><input class="input-qnt" name="qnt" type="number" min="1" value="${carrinho[i].qnt}"><button class="btn-qnt ml-2" onclick="adicionaQuantidade(this)">+</button></div>`
        let preco = `<div class="col-2 mt-4"><p>R$${carrinho[i].preco.replace(".",",")}</p></div>`
        let apagarItem = `<div class="col-2 mt-3"><img class="img-lixeira" data-toggle="modal" data-target="#modal-confirm" onclick="selecionaCupcake(${carrinho[i].id})" src="images/lixeira-icone.png"></div>`
        let separator = `<div class="div-separator"></div>`

        totalValor += Number(carrinho[i].qnt) * parseFloat(carrinho[i].preco.replace("R$", ""))

        conteudoRow.innerHTML += imagem
        conteudoRow.innerHTML += qtde
        conteudoRow.innerHTML += preco
        conteudoRow.innerHTML += apagarItem
        conteudoRow.innerHTML += separator
  

        divCarrinho.appendChild(conteudoRow)
        total.innerHTML = `R$${totalValor.toFixed(2).replace(".", ",")}`
    }
}

renderCarrinho(recuperaCarrinho)

function adicionaQuantidade(item) {
    var qntAtual = parseInt(item.previousElementSibling.value)   
    var qntNova = qntAtual + 1
    item.previousElementSibling.value = qntNova

    var valor = parseFloat(item.parentNode.nextElementSibling.firstElementChild.innerText.replace("R$", ""))
    var id = item.parentNode.parentNode.getAttribute("data-id")
    atualizaValorTotal(valor, id, "soma", qntNova)
}

function subtraiQuantidade(item) {
    if (parseInt(item.nextElementSibling.value) != 1){
        var qntAtual = parseInt(item.nextElementSibling.value)   
        var qntNova = qntAtual - 1
        item.nextElementSibling.value = qntNova
        var valor = parseFloat(item.parentNode.nextElementSibling.firstElementChild.innerText.replace("R$", ""))
        var id = item.parentNode.parentNode.getAttribute("data-id")
        atualizaValorTotal(valor, id, "subtrai", qntNova)
    }
}

var valorNovo = 0
function atualizaValorTotal(valorAtual, id, operacao, qnt){
    var indexCarrinho = recuperaCarrinho.findIndex(cupcake => cupcake.id == id);
    if (operacao == "soma") { 
        valorNovo = valorAtual + parseFloat(recuperaCarrinho[indexCarrinho].preco)
        recuperaCarrinho[indexCarrinho].qnt = qnt
        localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        totalValor += valorAtual  
    } 
    else {
        valorNovo = valorAtual - parseFloat(recuperaCarrinho[indexCarrinho].preco) 
        recuperaCarrinho[indexCarrinho].qnt = qnt
        localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        totalValor -= valorAtual   
    }   

    total.innerHTML = `R$${totalValor.toFixed(2).replace(".", ",")}`
}

function excluirCupcake(item){
    var indexCarrinho = recuperaCarrinho.findIndex(cupcake => cupcake.id == item);
    localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho.splice(0, indexCarrinho)))
}

function selecionaCupcake(item){
    $(".btn-Confirm").click(function(){
            excluirCupcake(item)
            location.href="/carrinho"
        })
}
