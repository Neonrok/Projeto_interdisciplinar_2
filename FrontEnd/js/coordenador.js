    window.onload = function() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const tbody = document.getElementById('userTableBody');

      if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">Nenhum utilizador registado ainda.</td></tr>';
        return;
      }

      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.password}</td>
        `;
        tbody.appendChild(row);
      });
    };

    function voltarInicio() {
  window.location.href = "index.html";
}

        function deleteUser(index) {
      if (confirm("Tens a certeza que queres remover este utilizador?")) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        location.reload();
      }
    }

    function adicionarProjeto() {
      const titulo = document.getElementById("tituloProjeto").value.trim();
      const descricao = document.getElementById("descricaoProjeto").value.trim();
      const categoria = document.getElementById("categoriaProjeto").value.trim();

      if (!titulo || !descricao || !categoria) {
        alert("Preenche todos os campos.");
        return;
      }

      const projetos = JSON.parse(localStorage.getItem("projetos")) || [];

      projetos.push({
        titulo,
        descricao,
        categoria,
        criadoPor: "coordenador@ecoescolas.com"
      });

      localStorage.setItem("projetos", JSON.stringify(projetos));
      alert("Projeto adicionado com sucesso!");
      mostrarProjetos();
      document.getElementById("tituloProjeto").value = "";
      document.getElementById("descricaoProjeto").value = "";
      document.getElementById("categoriaProjeto").value = "";
    }

    function removerProjeto(index) {
      if (confirm("Tens a certeza que queres remover este projeto?")) {
        let projetos = JSON.parse(localStorage.getItem("projetos")) || [];
        projetos.splice(index, 1);
        localStorage.setItem("projetos", JSON.stringify(projetos));
        mostrarProjetos();
      }
    }

    function mostrarProjetos() {
      const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
      const lista = document.getElementById("listaProjetos");
      lista.innerHTML = "";

      projetos.forEach((proj, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${proj.titulo}</strong> - ${proj.categoria}
          <button onclick="removerProjeto(${i})">Remover</button>
        `;
        lista.appendChild(li);
      });
    }

    function logout() {
      sessionStorage.clear();
      window.location.href = "login.html";
    }

    window.onload = function () {
const user = JSON.parse(sessionStorage.getItem("userLogado"));
if (!user || user.tipo !== "coordenador") {
  alert("Acesso negado.");
  window.location.href = "login.html";
  return;
}

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const tbody = document.getElementById('userTableBody');

      if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Nenhum utilizador registado.</td></tr>';
        return;
      }

      users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td><button onclick="deleteUser(${index})">Remover</button></td>
        `;
        tbody.appendChild(row);
      });

      mostrarAtividades();
    };