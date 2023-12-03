let btnComprar = document.querySelectorAll('.btn-comprar');
let recuperaCarrinhoCupcakes = {cupcakes:[]}

if (localStorage.getItem("Carrinho" != null)){
    recuperaCarrinhoCupcakes = JSON.parse(localStorage.getItem("Carrinho"))
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
            recuperaCarrinhoCupcakes.cupcakes.push(cupcake)
            localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinhoCupcakes))
        })
});