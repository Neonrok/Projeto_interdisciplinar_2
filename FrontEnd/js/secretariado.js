function logout() {
  sessionStorage.removeItem("userLogado");
  window.location.href = "login.html";
}
function voltarInicio() {
  window.location.href = "index.html";
}

// ---------- Reuniões ----------
function agendarReuniao() {
  alert("Funcionalidade para agendar uma reunião (a implementar).");
}
function listarReunioes() {
  document.getElementById("lista-reunioes").innerText = "Reuniões agendadas: (simulação)";
}

// ---------- Níveis de Projeto ----------
function criarNivel() {
  const nome = document.getElementById("nomeNivel").value.trim();
  if (!nome) return alert("Insira um nome para o nível.");

  let niveis = JSON.parse(localStorage.getItem("niveisProjeto")) || [];
  niveis.push(nome);
  localStorage.setItem("niveisProjeto", JSON.stringify(niveis));
  alert("Nível criado.");
  atualizarDropdownNiveis();
}

function atualizarDropdownNiveis() {
  const dropdown = document.getElementById("nivelSelecionado");
  dropdown.innerHTML = "";
  let niveis = JSON.parse(localStorage.getItem("niveisProjeto")) || [];
  niveis.forEach(nivel => {
    const option = document.createElement("option");
    option.value = nivel;
    option.innerText = nivel;
    dropdown.appendChild(option);
  });
}

function atribuirNivel() {
  const projeto = document.getElementById("projetoSelecionado").value;
  const nivel = document.getElementById("nivelSelecionado").value;
  alert(`Atribuído o nível "${nivel}" ao projeto "${projeto}". (Simulação)`);
}

// ---------- Estatísticas ----------
function mostrarEstatisticas() {
  const estatisticasHTML = `
    <ul>
      <li>Atividades terminadas mês passado: 8</li>
      <li>Fotos recolhidas: 42</li>
      <li>Comparativo com mês anterior: +15%</li>
    </ul>`;
  document.getElementById("estatisticas").innerHTML = estatisticasHTML;
}

// Inicializar dropdowns simulados
document.addEventListener("DOMContentLoaded", () => {
  const projetos = ["Projeto Água", "Projeto Reciclagem", "Projeto Verde"];
  const dropdown = document.getElementById("projetoSelecionado");
  projetos.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.innerText = p;
    dropdown.appendChild(option);
  });

  atualizarDropdownNiveis();
});