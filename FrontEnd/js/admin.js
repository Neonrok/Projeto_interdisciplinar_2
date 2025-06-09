    // Simulação básica de dados em localStorage

    function logout() {
      sessionStorage.removeItem("userLogado");
      window.location.href = "login.html";
    }

    function criarProjeto() {
      const ano = document.getElementById("anoProjeto").value.trim();
      const descricao = document.getElementById("descricaoProjeto").value.trim();

      if (ano && descricao) {
        const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
        projetos.push({ ano, descricao });
        localStorage.setItem("projetos", JSON.stringify(projetos));
        alert("Projeto criado com sucesso!");
        document.getElementById("anoProjeto").value = "";
        document.getElementById("descricaoProjeto").value = "";
        listarProjetos();
      } else {
        alert("Preencha todos os campos do projeto.");
      }
    }

    function listarProjetos() {
      const container = document.getElementById("listaProjetos");
      const projetos = JSON.parse(localStorage.getItem("projetos")) || [];
      container.innerHTML = "<ul>" + projetos.map(p => `<li><strong>${p.ano}</strong>: ${p.descricao}</li>`).join("") + "</ul>";
    }

    function registarCoordenador() {
      const email = document.getElementById("coordenadorEmail").value.trim();
      const senha = document.getElementById("coordenadorSenha").value;

      if (email && senha) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ email, password: senha, tipo: "coordenador" });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Coordenador registado com sucesso!");
        document.getElementById("coordenadorEmail").value = "";
        document.getElementById("coordenadorSenha").value = "";
      } else {
        alert("Preencha todos os campos.");
      }
    }

    function realizarBackup() {
      const backup = {
        users: localStorage.getItem("users"),
        projetos: localStorage.getItem("projetos"),
        niveis: localStorage.getItem("niveisProjetos")
      };
      localStorage.setItem("backup", JSON.stringify(backup));
      document.getElementById("statusBackup").innerText = "Backup realizado com sucesso!";
    }

    function restaurarBackup() {
      const backup = JSON.parse(localStorage.getItem("backup"));
      if (backup) {
        localStorage.setItem("users", backup.users);
        localStorage.setItem("projetos", backup.projetos);
        localStorage.setItem("niveisProjetos", backup.niveis);
        document.getElementById("statusBackup").innerText = "Dados restaurados!";
        listarProjetos();
        listarNiveis();
      } else {
        alert("Nenhum backup encontrado.");
      }
    }

    function criarNivelProjeto() {
      const nome = document.getElementById("nomeNivel").value.trim();
      const descricao = document.getElementById("descricaoNivel").value.trim();

      if (nome && descricao) {
        const niveis = JSON.parse(localStorage.getItem("niveisProjetos")) || [];
        niveis.push({ nome, descricao });
        localStorage.setItem("niveisProjetos", JSON.stringify(niveis));
        alert("Nível criado com sucesso!");
        document.getElementById("nomeNivel").value = "";
        document.getElementById("descricaoNivel").value = "";
        listarNiveis();
      } else {
        alert("Preencha todos os campos do nível.");
      }
    }

    function listarNiveis() {
      const container = document.getElementById("listaNiveis");
      const niveis = JSON.parse(localStorage.getItem("niveisProjetos")) || [];
      container.innerHTML = "<ul>" + niveis.map(n => `<li><strong>${n.nome}</strong>: ${n.descricao}</li>`).join("") + "</ul>";
    }

    // Ao carregar a página
    window.onload = () => {
      listarProjetos();
      listarNiveis();
    };