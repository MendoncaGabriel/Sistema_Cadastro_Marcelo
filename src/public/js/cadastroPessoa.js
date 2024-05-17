const formCreatePessoa = document.getElementById('formCreatePessoa');

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


// Buscar cep
const inputCep = document.getElementById('inputCep');
inputCep.addEventListener('keyup', (event) =>{
    handleInputCep(event.target.value)
})
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


formCreatePessoa.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    fetch('/pessoa/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status == 200 ){
            window.modal.changeModal('Sucesso!', 'Cadastrado com sucesso!', ()=>{window.modal.fechar(), window.location.reload()}, 'ok')
        }
       return res.json()
    })
    .then(res => {
   
        if(res.msg.includes('Duplicate') && res.msg.includes('pessoas.telefone_UNIQUE')){
            window.modal.changeModal('Atenção!', 'Telefone já foi cadastrado', ()=>window.modal.fechar(), 'ok')
        }
        if(res.msg.includes('Duplicate') && res.msg.includes('pessoas.email_UNIQUE')){
            window.modal.changeModal('Atenção!', 'Email já foi cadastrado', ()=>window.modal.fechar(), 'ok')
        }
        if(res.msg.includes('Duplicate') && res.msg.includes('pessoas.cpf_UNIQUE')){
            window.modal.changeModal('Atenção!', 'Cpf já foi cadastrado', ()=>window.modal.fechar(), 'ok')
        }
        window.modal.abrir()
    })
    .catch(error => {
        console.log(error)

    })
});