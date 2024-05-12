
const createRegistrador = document.getElementById('createRegistrador');
const updateRegistrador = document.getElementById('updateRegistrador');

//UPDATE
const updatename = document.getElementById('updatename');
const updateEmail = document.getElementById('updateEmail');
const updateLogin = document.getElementById('updateLogin');
const updatePassword = document.getElementById('updatePassword');

function cleanInputsUpdateRegistradores(){
    updatename.value = '';
    updateEmail.value = '';
    updateLogin.value = '';
    updatePassword.value = '';
};
function switchFormRegistrador(action){
    if(action == 'create'){
        createRegistrador.classList.replace('hidden', 'block');
        updateRegistrador.classList.replace('block', 'hidden');
        cleanInputsUpdateRegistradores()
    }
    else if(action == "update") {
        updateRegistrador.classList.replace('hidden', 'block');
        createRegistrador.classList.replace('block', 'hidden');
    }

};

function changeInputsUpdateRegistrador(data){
    updatename.value = data.name ?? '';
    updateEmail.value = data.email ?? '';
    updateLogin.value = data.login ?? '';
}

function handleUpdateRegistrador(id){
    updateRegistrador.action = '/registrador/update/' + id;
    fetch('/registrador/getById/' + id, {
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
        console.log(res.result)
        changeInputsUpdateRegistrador(res.result[0])
    })
    
    switchFormRegistrador('update')
}

function handleRemoveRegistrador(id){
    const res = prompt('Deseja realmente remover este usuário registrador ? : sim/nao');
    if(res  != "sim") return;
    
    fetch('/registrador/remove/'+id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(error => {
        console.log(error)
        alert('Erro ao remover registrador')
    })

}