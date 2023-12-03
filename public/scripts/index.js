let btnComprar = document.querySelectorAll('.btn-comprar');
let recuperaCarrinhoCupcakes = {cupcakes:[]}

if (localStorage.getItem("Carrinho" != null)){
    recuperaCarrinhoCupcakes = JSON.parse(localStorage.getItem("Carrinho"))
}

btnComprar.forEach(item => {
    item.addEventListener('click', () =>
        {
            var indexCarrinho1 = recuperaCarrinhoCupcakes.cupcakes.findIndex(cupcake => cupcake.id == item.getAttribute("data-id"));
            let arrayCupcakesSalvos1 = recuperaCarrinhoCupcakes.cupcakes.filter(cupcake => (cupcake.id === item.getAttribute("data-id")))
            console.log(indexCarrinho1)
            console.log(arrayCupcakesSalvos1)
            if (arrayCupcakesSalvos1.length > 0){
                console.log(indexCarrinho1)
                console.log(arrayCupcakesSalvos1)
                recuperaCarrinhoCupcakes.cupcakes[indexCarrinho1].qnt += 1
                localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinhoCupcakes))
            }
            else{
            let cupcake = {
                id: item.getAttribute("data-id"),
                img: item.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getAttribute("src"),
                nome: item.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
                preco: item.previousElementSibling.textContent.replace("R$", ""),
                qnt: 1
            }
            recuperaCarrinhoCupcakes.cupcakes.push(cupcake)
            localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinhoCupcakes))
        }
        })
});