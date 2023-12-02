let divCarrinho = document.querySelector(".div-carrinho")
let total = document.querySelector(".h3-valor-total")
let inputQnt = document.querySelectorAll(".input-qnt")
let totalValor = 0
var indexCarrinhoExcluido = 0
var dataAtual = new Date()
var ano = dataAtual.getFullYear()
var mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
var dia = (dataAtual.getDate()).toString().padStart(2, '0');

if (localStorage.getItem("Carrinho") != null){
    var recuperaCarrinho = ((JSON.parse(localStorage.getItem('Carrinho'))))
}

function renderCarrinho(carrinho){
    for (let i = 0; i < carrinho.cupcakes.length; i++) {
        let conteudoRow = document.createElement('div')
        conteudoRow.className = 'row mt-4'
        conteudoRow.setAttribute("data-id", `${carrinho.cupcakes[i].id}`)

        let imagem = `<div class="col-4"><img class="img-prod" src="${carrinho.cupcakes[i].img}"></div>`
        let qtde = `<div class="col-4 mt-3"><button class="btn-qnt" onclick="subtraiQuantidade(this)">-</button><input class="input-qnt" name="qnt" type="number" min="1" value="${carrinho.cupcakes[i].qnt}"><button class="btn-qnt ml-2" onclick="adicionaQuantidade(this)">+</button></div>`
        let preco = `<div class="col-2 mt-4"><p>R$${carrinho.cupcakes[i].preco.replace(".",",")}</p></div>`
        let apagarItem = `<div class="col-2 mt-3"><img class="img-lixeira" data-toggle="modal" data-target="#modal-confirm" onclick="selecionaCupcake(${carrinho.cupcakes[i].id})" src="images/lixeira-icone.png"></div>`
        let separator = `<div class="div-separator"></div>`

        totalValor += Number(carrinho.cupcakes[i].qnt) * parseFloat(carrinho.cupcakes[i].preco.replace("R$", ""))

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
    var indexCarrinho = recuperaCarrinho.cupcakes.findIndex(cupcake => cupcake.id == id);
    if (operacao == "soma") { 
        valorNovo = valorAtual + parseFloat(recuperaCarrinho.cupcakes[indexCarrinho].preco)
        recuperaCarrinho.cupcakes[indexCarrinho].qnt = qnt
        localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        totalValor += valorAtual  
    } 
    else {
        valorNovo = valorAtual - parseFloat(recuperaCarrinho.cupcakes[indexCarrinho].preco) 
        recuperaCarrinho.cupcakes[indexCarrinho].qnt = qnt
        localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        totalValor -= valorAtual   
    }   

    total.innerHTML = `R$${totalValor.toFixed(2).replace(".", ",")}`
}

function excluirCupcake(item){
    let arrayCupcakesSalvos = recuperaCarrinho.cupcakes.filter(cupcake => (cupcake.id != item))
    let novoCarrinho = {cupcakes:[]}

    arrayCupcakesSalvos.forEach(element => {
        novoCarrinho.cupcakes.push(element)
    });
    localStorage.setItem("Carrinho", JSON.stringify(novoCarrinho))
}

function selecionaCupcake(item){
    $(".btn-Confirm").click(function(){
            excluirCupcake(item)
            location.href="/carrinho"
        })
}


$(".modal-btn-close").click(() =>{
    for (let i = 0; i < recuperaCarrinho.cupcakes.length; i++) {
        $.post("/carrinho",{
            id_cupcake: recuperaCarrinho.cupcakes[i].id,
            qnt: recuperaCarrinho.cupcakes[i].qnt,
            valor: recuperaCarrinho.cupcakes[i].preco,
            data_compra: `${ano}-${mes}-${dia}`
        }, function(data,status){
            location.href="/carrinho"
        }) 
        }
        localStorage.removeItem("Carrinho")
    })