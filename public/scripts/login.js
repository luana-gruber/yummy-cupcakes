let email = document.querySelector("#email")
let senha = document.querySelector("#senha")
let btnEntrar = document.querySelector('.btn-entrar')
let form = document.forms.formLogin

btnEntrar.addEventListener('click', e =>{
    e.preventDefault();
    if (email.value.trim() == "" || !isValidEmail(email.value)){
        addError(email)
        hideErrorMessage(email)
        openModal("Preencha o campo e-mail com um e-mail válido")
    } 
    else if (senha.value.trim() == "" || senha.value.length != 6){
        addError(senha)
        hideErrorMessage(senha)
        openModal("Preencha o campo senha com 6 caracteres")
    }
    else{
        openModal("Login Realizado com sucesso!")
        form.submit()
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
    $(".mensagem-login").text(mensagem)
    $("#modal-info").show()
    $(".modal-btn-close").click(function(){
        $("#modal-info-login").hide()
    })
}