let nome = document.querySelector("#nome")
let telefone = document.querySelector("#telefone")
let emailCliente = document.querySelector("#email")
let cep = document.querySelector("#cep")
let cidade = document.querySelector("#cidade")
let estado = document.querySelector("#estado")
let bairro = document.querySelector("#bairro")
let rua = document.querySelector("#rua")
let numero = document.querySelector("#numero")
let complemento = document.querySelector("#complemento")
let senhaCliente = document.querySelector("#senha")
let confSenha = document.querySelector("#confsenha")
let btnCadastrar = document.querySelector('.btn-cadastrar')
let formCadastro = document.forms.formCadastro

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
        openModal("Preencha o campo nome")
    }
    else if (telefone.value.trim() == ""){
        addError(telefone)
        hideErrorMessage(telefone)
        openModal("Preencha o campo telefone")
    }
    else if (emailCliente.value.trim() == "" || !isValidEmail(emailCliente.value)){
        addError(emailCliente)
        hideErrorMessage(emailCliente)
        openModal("Preencha o campo e-mail com um e-mail válido")
    } 
    else if (cep.value.trim() == ""){
        addError(cep)
        hideErrorMessage(cep)
        openModal("Preencha o campo CEP")
    }
    else if (cidade.value.trim() == ""){
        addError(cidade)
        hideErrorMessage(cidade)
        openModal("Preencha o campo cidade")
    }
    else if (estado.value.trim() == ""){
        addError(estado)
        hideErrorMessage(estado)
        openModal("Preencha o campo estado")
    }
    else if (bairro.value.trim() == ""){
        addError(bairro)
        hideErrorMessage(bairro)
        openModal("Preencha o campo bairro")
    }
    else if (rua.value.trim() == ""){
        addError(rua)
        hideErrorMessage(rua)
        openModal("Preencha o campo logradouro")
    }
    else if (numero.value.trim() == ""){
        addError(numero)
        hideErrorMessage(numero)
        openModal("Preencha o campo número")
    }
    else if (senhaCliente.value.trim() == "" || senhaCliente.value.length != 6){
        addError(senhaCliente)
        hideErrorMessage(senhaCliente)
        openModal("Preencha o campo senha com 6 caracteres")
    }
    else if (confSenha.value.trim() == "" || confSenha.value.trim() != senhaCliente.value.trim()){
        addError(confSenha)
        hideErrorMessage(confSenha)
        openModal("O campo confirmar senha igual ao campo senha")
    }
    else{
        $(btnCadastrar).attr("data-toggle", "modal")
        $(btnCadastrar).attr("data-target", "#modal-info")
        openModal("Cadastro realizado com sucesso!")
        $(".modal-btn-close").click(function(){
            formCadastro.submit()
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

function openModal(mensagem){
    $(".mensagem").text(mensagem)
    $("#modal-info").show()
    $(".modal-btn-close ").click(function(){
        $("#modal-info").hide()
    })
}