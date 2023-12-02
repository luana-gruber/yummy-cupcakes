let btnComprar = document.querySelectorAll('.btn-comprar');
let recuperaCarrinho = {cupcakes:[]}

if (localStorage.getItem("Carrinho" != null)){
    recuperaCarrinho = JSON.parse(localStorage.getItem("Carrinho"))
}

btnComprar.forEach(item => {
    item.addEventListener('click', () =>
        {
            let cupcake = {
                id: item.getAttribute("data-id"),
                img: item.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].getAttribute("src"),
                nome: item.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
                preco: item.previousElementSibling.textContent.replace("R$", ""),
                qnt: 1
            }
            recuperaCarrinho.cupcakes.push(cupcake)
            localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        })
});