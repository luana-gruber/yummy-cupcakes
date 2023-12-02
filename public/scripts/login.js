let email = document.querySelector("#email")
let senha = document.querySelector("#senha")
let btnEntrar = document.querySelector('.btn-entrar')
let form = document.forms.formLogin

btnEntrar.addEventListener('click', e =>{
    e.preventDefault();
    if (email.value.trim() == "" || !isValidEmail(email.value)){
        addError(email)
        hideErrorMessage(email)
    } 
    else if (senha.value.trim() == "" || senha.value.length != 6){
        addError(senha)
        hideErrorMessage(senha)
    }
    else{
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