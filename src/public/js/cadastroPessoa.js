const formCreatePessoa = document.getElementById('formCreatePessoa');

var cleaveData = new Cleave('[name=data_nascimento]', {
    date: true,
    datePattern: ['d', 'm', 'Y']
});
 // Formatação de CPF
 var cleaveCPF = new Cleave('[name=cpf]', {
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2],
    numericOnly: true
});

// Formatação de RG
var cleaveRG = new Cleave('[name=rg]', {
    delimiters: ['.', '.', '-'],
    blocks: [2, 3, 3, 1],
    numericOnly: true
});

// Formatação de CEP
var cleaveCEP = new Cleave('[name=cep]', {
    delimiters: ['-'],
    blocks: [5, 3],
    numericOnly: true
});

// Formatação de Telefone
var cleaveTelefone = new Cleave('[name=telefone]', {
    delimiters: ['(', ') ', '-', ' '],
    blocks: [0, 2, 5, 4],
    numericOnly: true
});


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

function pegarReferencia(){
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    return ref
}
const ref = document.getElementById('ref')
ref.innerText ='Referência: '+ pegarReferencia()


formCreatePessoa.addEventListener('submit', function(event) {
    event.preventDefault();

    const ref = pegarReferencia()
    
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    console.log('Enviando formulario')
    fetch(`/pessoa/create?ref=${ref}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {

        if(res.status == 200 ){
            window.location.href = `/obrigado?ref=${ref}`
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