//SAIR LOGOUT
document.getElementById('btnSair').addEventListener('click', () => {
    fetch('/auth/logout', {
      method: 'GET'
    })
    .then(res => {
      window.location.reload();
    })
})