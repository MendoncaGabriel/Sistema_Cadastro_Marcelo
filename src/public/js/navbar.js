//SAIR LOGOUT
document.getElementById('btnSair').addEventListener('click', () => {
  fetch('/auth/logout', {
    method: 'GET'
  })
  .then(res => {
    window.location.reload();
  })
})

const menuMobile = document.getElementById('menuMobile');

function abrirMenu(){
  menuMobile.classList.replace('hidden', 'block')
  setTimeout(() => {
    menuMobile.classList.replace('left-[-100%]', 'left-0')
  }, 10);
}
function fecharMenu(){
  menuMobile.classList.replace('left-0', 'left-[-100%]')
  setTimeout(() => {
    menuMobile.classList.replace('block', 'hidden')
  }, 300);
}