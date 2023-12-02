let nome = document.querySelector("#nome")
let telefone = document.querySelector("#telefone")
let email = document.querySelector("#email")
let cep = document.querySelector("#cep")
let cidade = document.querySelector("#cidade")
let estado = document.querySelector("#estado")
let bairro = document.querySelector("#bairro")
let rua = document.querySelector("#rua")
let numero = document.querySelector("#numero")
let complemento = document.querySelector("#complemento")
let senha = document.querySelector("#senha")
let confSenha = document.querySelector("#confsenha")
let btnCadastrar = document.querySelector('.btn-cadastrar')
let form = document.forms.formCadastro

telefone.addEventListener('keypress', (e) => mascaraTelefone(e.target.value))
telefone.addEventListener('change', (e) => mascaraTelefone(e.target.value)) 

const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "")
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2")
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2")
    telefone.value = valor
}

btnCadastrar.addEventListener('click', e =>{
    e.preventDefault();
    if (nome.value.trim() == "") {
        addError(nome)
        hideErrorMessage(nome)
    }
    else if (telefone.value.trim() == ""){
        addError(telefone)
        hideErrorMessage(telefone)
    }
    else if (cep.value.trim() == ""){
        addError(cep)
        hideErrorMessage(cep)
    }
    else if (cidade.value.trim() == ""){
        addError(cidade)
        hideErrorMessage(cidade)
    }
    else if (estado.value.trim() == ""){
        addError(estado)
        hideErrorMessage(estado)
    }
    else if (bairro.value.trim() == ""){
        addError(bairro)
        hideErrorMessage(bairro)
    }
    else if (rua.value.trim() == ""){
        addError(rua)
        hideErrorMessage(rua)
    }
    else if (numero.value.trim() == ""){
        addError(numero)
        hideErrorMessage(numero)
    }
    else if (email.value.trim() == "" || !isValidEmail(email.value)){
        addError(email)
        hideErrorMessage(email)
    } 
    else if (senha.value.trim() == "" || senha.value.length != 6){
        addError(senha)
        hideErrorMessage(senha)
    }
    else if (confSenha.value.trim() == "" || confSenha.value.trim() != senha.value.trim()){
        addError(confSenha)
        hideErrorMessage(confSenha)
    }
    else{
        $(btnCadastrar).attr("data-toggle", "modal")
        $(btnCadastrar).attr("data-target", "#modal-info")
        $(".modal-btn-close").click(function(){
            form.submit()
        })
    }
})

function addError(input){
    input.classList.add('input-error')
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function hideErrorMessage(input) {
    input.addEventListener("keyup", () => {
        input.classList.remove('input-error');
    })
}