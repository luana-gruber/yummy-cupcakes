let btnComprar = document.querySelectorAll('.btn-comprar');
let recuperaCarrinho = []

if (localStorage.getItem("Carrinho" != null)){
    recuperaCarrinho = JSON.parse(localStorage.getItem("Carrinho"))
}

btnComprar.forEach(item => {
    item.addEventListener('click', event =>
        {
            let cupcake = {
                img: item.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.children[0].src,
                nome: item.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
                preco: item.previousElementSibling.textContent,
                qnt: 1
            }
            recuperaCarrinho.push(cupcake)
            localStorage.setItem("Carrinho", JSON.stringify(recuperaCarrinho))
        })
});