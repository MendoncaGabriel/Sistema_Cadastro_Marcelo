function handleRemovePessoa(id){
    const res = prompt('Deseja realmente remover este usuário registrador ? : sim/nao');
    if(res  != "sim") return;

    fetch('/pessoa/delete/' + id, {
        method: 'DELETE',
        headers:{'Content-Type': 'applcation/json'}
    })
    .then(res => res.json())
    .then(res => {
        alert(res.msg)
        window.location.reload()
    })
    .catch(error => {
        alert('Erro ao remover Pessoa, consulte os logs')
        console.log(error)
    })
}