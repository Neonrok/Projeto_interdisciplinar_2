// Função para carregar dados do usuário
async function carregarDadosUsuario() {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
        window.location.href = 'login.html';
        return;
    } 
    const id = localStorage.getItem('id');
    
    const resposta = await fetch(`http://localhost:3000/users/${id}`,{
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
    })

    let dados = await resposta.json();
    dados= dados.data
    console.log(dados)

    document.getElementById('email').textContent = dados.Email || '--';
    document.getElementById('username').textContent = dados.Username || '--';
    document.getElementById('bio').textContent = dados.descricao || 'Esta descrição não existe';

      // Atualiza o cargo e área admin
    const cargoEl = document.getElementById('cargo');
    let allcargos = ""

    if (dados.membro) {
        allcargos += 'Membro';
    } 
    if (dados.secretariado) {
        allcargos += 'Secretariado';
    } 
    if (dados.coordenador) {
        allcargos += 'Coordenador';
    } 
    if (dados.admin) {
        allcargos += 'Administrador';
    } 
    if(dados.membro || dados.secretariado || dados.coordenador || dados.admin){
      cargoEl.textContent = allcargos
    }
}

// Função para carregar foto do sessionStorage
function carregarFotoPerfil() {
    const fotoSalva = sessionStorage.getItem('fotoPerfil');
    if (fotoSalva) {
        document.getElementById('foto-perfil').src = fotoSalva;
    }
}

// Evento para abrir seletor de arquivo
document.getElementById('foto-perfil-container').addEventListener('click', () => {
    document.getElementById('input-foto-perfil').click();
});

// Permitir abertura com tecla Enter ou Espaço para acessibilidade
document.getElementById('foto-perfil-container').addEventListener('keydown', (event) => {
    if(event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        document.getElementById('input-foto-perfil').click();
    }
});

// Evento para atualizar foto e salvar no sessionStorage
document.getElementById('input-foto-perfil').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            const img = document.getElementById('foto-perfil');
            img.src = e.target.result;
            sessionStorage.setItem('fotoPerfil', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

    // Evento para logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    localStorage.clear();
    alert('Sessão terminada com sucesso!');
    window.location.href = '../index.html';
});

    // Inicializar página
window.addEventListener('DOMContentLoaded', () => {
    carregarDadosUsuario();
    carregarFotoPerfil();
});


 document.getElementById("viewUsersBtn").addEventListener("click", function() {
    window.location.href = "admin.html";
  });