 // Alternância de Formulários
  function showSignUp() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('signup-container').classList.remove('hidden');
    document.getElementById('coordenador-login-container').classList.add('hidden');
    document.getElementById('conselho-login-container').classList.add('hidden');
  }

  function showLogin() {
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('coordenador-login-container').classList.add('hidden');
    document.getElementById('conselho-login-container').classList.add('hidden');
  }

  function showCoordenadorLogin() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('coordenador-login-container').classList.remove('hidden');
    document.getElementById('conselho-login-container').classList.add('hidden');
  }

  function showConselhoLogin() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('signup-container').classList.add('hidden');
    document.getElementById('coordenador-login-container').classList.add('hidden');
    document.getElementById('conselho-login-container').classList.remove('hidden');
  }


function showSecretariadoLogin() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('signup-container').classList.add('hidden');
  document.getElementById('coordenador-login-container').classList.add('hidden');
  document.getElementById('secretariado-login-container').classList.remove('hidden');
  document.getElementById('admin-login-container').classList.add('hidden');
}

function showAdminLogin() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('signup-container').classList.add('hidden');
  document.getElementById('coordenador-login-container').classList.add('hidden');
  document.getElementById('secretariado-login-container').classList.add('hidden');
  document.getElementById('admin-login-container').classList.remove('hidden');
}


  // Login como Convidado
  function loginGuest() {
    alert("Logado como convidado, acesso limitado.");
    sessionStorage.setItem('userLogado', JSON.stringify({
      id: 'guest',
      email: 'convidado@ecoescolas.com',
      tipo: 'guest'
    }));
    window.location.href = "index.html";
  }

  // Registo
  function signUpUser() {
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value;

    if (email && password) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === email)) {
        alert("Este email já está registado.");
        return;
      }

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));

      alert("Conta criada com sucesso!");
      showLogin();
    } else {
      alert("Preencha todos os campos.");
    }
  }

  // Login Utilizador
  function loginUser() {
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value;
    login(email, password);
  }

  // Login Coordenador
  function loginCoordenador() {
    const email = document.getElementById("coordenadorEmail").value.trim();
    const password = document.getElementById("coordenadorPassword").value;

    const coordenadorEmail = "coordenador@ecoescolas.com";
    const coordenadorPassword = "coordenador123";

    if (email === coordenadorEmail && password === coordenadorPassword) {
      alert("Login de coordenador bem-sucedido!");
      sessionStorage.setItem("userLogado", JSON.stringify({
        id: "coordenador",
        email: coordenadorEmail,
        tipo: "coordenador"
      }));
      window.location.href = "../html/coordenador.html";
    } else {
      alert("Credenciais de coordenador incorretas.");
    }
  }

  // ✅ Login Conselho
  function loginConselho() {
    const email = document.getElementById("conselhoEmail").value.trim();
    const password = document.getElementById("conselhoPassword").value;

    const conselhoEmail = "conselho@ecoescolas.com";
    const conselhoPassword = "conselho123";

    if (email === conselhoEmail && password === conselhoPassword) {
      alert("Login de membro do conselho bem-sucedido!");
      sessionStorage.setItem("userLogado", JSON.stringify({
        id: "conselho",
        email: conselhoEmail,
        tipo: "conselho"
      }));
      window.location.href = "../html/conselho.html";
    } else {
      alert("Credenciais de conselho incorretas.");
    }
  }

  // Login do Secretariado
function loginSecretariado() {
  const email = document.getElementById("secretariadoEmail").value.trim();
  const password = document.getElementById("secretariadoPassword").value;

  const validEmail = "secretariado@ecoescolas.com";
  const validPassword = "secret123";

  if (email === validEmail && password === validPassword) {
    alert("Login do Secretariado bem-sucedido!");

    sessionStorage.setItem("userLogado", JSON.stringify({
      id: "secretariado",
      email: validEmail,
      tipo: "secretariado"
    }));

    window.location.href = "../html/secretariado.html"; // redireciona para painel do secretariado
  } else {
    alert("Credenciais do Secretariado incorretas.");
  }
}

// Login do Admin
function loginAdmin() {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  const validEmail = "admin@ecoescolas.com";
  const validPassword = "admin123";

  if (email === validEmail && password === validPassword) {
    alert("Login de administrador bem-sucedido!");

    sessionStorage.setItem("userLogado", JSON.stringify({
      id: "admin",
      email: validEmail,
      tipo: "admin"
    }));

    window.location.href = "../html/admin.html"; // redireciona para painel do admin
  } else {
    alert("Credenciais do Admin incorretas.");
  }
}


  // Função de Login Geral
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      alert("Credenciais inválidas.");
      return;
    }

    if (!user.id) {
      user.id = gerarIdUnico();
      const index = users.findIndex(u => u.email === user.email);
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }

    const tipo = (user.email === 'coordenador@ecoescolas.com') ? 'coordenador' : 'user';
    sessionStorage.setItem('userLogado', JSON.stringify({
      id: user.id,
      email: user.email,
      tipo: tipo
    }));

    window.location.href = 'index.html';
  }

  function logout() {
    sessionStorage.removeItem('userLogado');
    window.location.href = 'index.html';
  }

  function gerarIdUnico() {
    return 'user-' + Math.random().toString(36).substr(2, 9);
  }