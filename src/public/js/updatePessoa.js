const formUpdatePessoa = document.getElementById('formUpdatePessoa');

function mascara(src, mascara) {
    const campo = src.value.length;
    const texto = mascara.substring(campo);
    if (texto.charAt(0) !== '#') {
        src.value += texto.charAt(0);
        // Verifica se o próximo caractere na máscara é um espaço
        if (texto.charAt(1) === ' ') {
            src.value += ' ';
        }
    }
}



formUpdatePessoa.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData);
    const pessoaId = formUpdatePessoa.getAttribute("pessoaId");

    const res = await fetch('/pessoa/update/' + pessoaId, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    const dataRes = await res.json()

    if(res.status == 200){
        window.modal.changeModal('Pessoa Atualizada com sucesso',  dataRes.msg, ()=> window.modal.fechar(), 'ok')
    }else{
        window.modal.changeModal('Erro ao atualizar pessoa',  dataRes.msg, ()=> window.modal.fechar(), 'ok')
    }
    window.modal.abrir()
}); 


//BUSCAR ENDEREÇO COM CEP
function buscarEndereco(cep) {
    return new Promise((resolve, reject) => {
        if(!cep) throw new Error('cep não informado')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            reject(error)
        });
    })
}

//lidar input
const inputCep = document.getElementById('inputCep');
inputCep.addEventListener('keyup', (event) =>{
    handleInputCep(event.target.value)
})

//preencher inputs com resultado
async function handleInputCep(cep){
    if(cep.length == 9){
        const endereco = await buscarEndereco(cep);
        console.log(endereco)
        document.querySelector('[name=bairro]').value = endereco.bairro || '';
        document.querySelector('[name=complemento]').value = endereco.complemento || '';
        document.querySelector('[name=cidade]').value = endereco.localidade || '';
        document.querySelector('[name=rua]').value = endereco.logradouro || '';
        document.querySelector('[name=estado]').value = endereco.uf || '';

    }
}