// Função para carregar dados do usuário
    function carregarDadosUsuario() {
      const dados = JSON.parse(sessionStorage.getItem('userLogado'));

      if (!dados || !dados.id) {
        alert('ID do usuário não fornecido. Faça login novamente.');
        window.location.href = 'login.html';
        return;
      }

      document.getElementById('user-id').textContent = dados.id;
      document.getElementById('email').textContent = dados.email || '--';
      document.getElementById('username').textContent = dados.email ? dados.email.split('@')[0] : 'user123';

      // Atualiza o cargo e área admin
      const cargoEl = document.getElementById('cargo');
      const adminArea = document.querySelector('.admin-area');

      if (dados.tipo === 'admin') {
        cargoEl.textContent = 'Administrador';
        adminArea.style.display = 'block';
        adminArea.setAttribute('aria-hidden', 'false');
      } else if (dados.tipo === 'user') {
        cargoEl.textContent = 'Utilizador Registado';
        adminArea.style.display = 'none';
        adminArea.setAttribute('aria-hidden', 'true');
      } else {
        cargoEl.textContent = 'Convidado';
        adminArea.style.display = 'none';
        adminArea.setAttribute('aria-hidden', 'true');
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
      alert('Sessão terminada com sucesso!');
      window.location.href = 'login.html';
    });

    // Inicializar página
    window.addEventListener('DOMContentLoaded', () => {
      carregarDadosUsuario();
      carregarFotoPerfil();
    });

    // Função para carregar dados do usuário
function carregarDadosUsuario() {
  const dados = JSON.parse(sessionStorage.getItem('userLogado'));

  if (!dados || !dados.id) {
    alert('ID do usuário não fornecido. Faça login novamente.');
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('user-id').textContent = dados.id;
  document.getElementById('email').textContent = dados.email || '--';
  document.getElementById('username').textContent = dados.email ? dados.email.split('@')[0] : 'user123';

  // Atualiza o cargo e visibilidade do botão admin
  const cargoEl = document.getElementById('cargo');
  const adminBtn = document.getElementById('adminBtn');

  if (dados.tipo === 'admin') {
    cargoEl.textContent = 'Administrador';
    adminBtn.style.display = 'inline-block';
  } else if (dados.tipo === 'user') {
    cargoEl.textContent = 'Utilizador Registado';
    adminBtn.style.display = 'none';
  } else {
    cargoEl.textContent = 'Convidado';
    adminBtn.style.display = 'none';
  }
}

// Evento para logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.clear();
  alert('Sessão terminada com sucesso!');
  window.location.href = 'login.html';
});

// Evento para entrar na área administrativa (só admins)
document.getElementById('adminBtn').addEventListener('click', () => {
  window.location.href = 'admin.html'; // Ajuste para o caminho correto da página admin
});

// Inicializar página
window.addEventListener('DOMContentLoaded', () => {
  carregarDadosUsuario();
  carregarFotoPerfil();
});
