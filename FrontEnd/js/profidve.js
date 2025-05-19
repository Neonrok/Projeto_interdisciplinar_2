document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id'); // Obter o ID pelo URL

    if (!userId) {
        alert('ID do usuário não fornecido.');
        return;
    }
    fetch(`/api/perfil/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do perfil.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('N_User').textContent = data.Username || 'Usuário não informado';
            document.getElementById('posit').textContent = data.cargo || 'Cargo não informado';
            document.getElementById('desc').textContent = data.descricao || 'Sem descrição';
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar os dados do perfil.');
        });
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  // limpar dados de sessão
  // localStorage.clear();

  // Redirecionar para página de login
  window.location.href = "../html/login.html";
});

const fotoPerfilContainer = document.getElementById('foto-perfil-container');
const inputFotoPerfil = document.getElementById('input-foto-perfil');
const fotoPerfil = document.getElementById('foto-perfil');

fotoPerfilContainer.addEventListener('click', () => {
  inputFotoPerfil.click();  // Abre o seletor de arquivos
});

inputFotoPerfil.addEventListener('change', () => {
  const file = inputFotoPerfil.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoPerfil.src = e.target.result;  // Atualiza a foto para a nova selecionada
    };
    reader.readAsDataURL(file);
  }
});
