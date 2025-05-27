// -----------------------------
// Alternância de Formulários
// -----------------------------
function showSignUp() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('signup-container').classList.remove('hidden');
  document.getElementById('admin-login-container').classList.add('hidden');
}

function showLogin() {
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('signup-container').classList.add('hidden');
  document.getElementById('admin-login-container').classList.add('hidden');
}

function showAdminLogin() {
  document.getElementById('login-container').classList.add('hidden');
  document.getElementById('signup-container').classList.add('hidden');
  document.getElementById('admin-login-container').classList.remove('hidden');
}

// -----------------------------
// Login como Convidado
// -----------------------------
function loginGuest() {
  alert("Logado com sucesso como convidado, mas o teu acesso está limitado!");
  sessionStorage.setItem('userLogado', JSON.stringify({
    id: 'guest',
    email: 'convidado@ecoescolas.com',
    tipo: 'guest'
  }));
  window.location.href = "index.html";
}

// -----------------------------
// Função de Registo
// -----------------------------
function signUpUser() {
  const email = document.getElementById('newEmail').value.trim();
  const password = document.getElementById('newPassword').value;

  if (email && password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se já existe esse email
    if (users.some(user => user.email === email)) {
      alert("Este email já está registado.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Conta criada com sucesso! Agora podes fazer login.");
    showLogin();
  } else {
    alert("Preencha todos os campos para se registar.");
  }
}

// -----------------------------
// Login do Utilizador Normal
// -----------------------------
function loginUser() {
  const email = document.getElementById('userEmail').value.trim();
  const password = document.getElementById('userPassword').value;
  login(email, password);
}

// -----------------------------
// Login do Administrador
// -----------------------------
function loginAdmin() {
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  const adminEmail = "admin@ecoescolas.com";
  const adminPassword = "admin123";

  if (email === adminEmail && password === adminPassword) {
    alert("Login de administrador bem-sucedido!");

    sessionStorage.setItem("userLogado", JSON.stringify({
      id: "admin",
      email: adminEmail,
      tipo: "admin"
    }));

    window.location.href = "../html/admin.html"; // redirecionamento para página do admin
  } else {
    alert("Credenciais de administrador incorretas.");
  }
}

// -----------------------------
// Lógica Comum de Login
// -----------------------------
function login(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert("Credenciais inválidas.");
    return;
  }

  // Gera ID único se não existir
  if (!user.id) {
    user.id = gerarIdUnico();
    const index = users.findIndex(u => u.email === user.email);
    users[index] = user;
    localStorage.setItem('users', JSON.stringify(users));
  }

  let tipo = (user.email === 'admin@ecoescolas.com') ? 'admin' : 'user';

  sessionStorage.setItem('userLogado', JSON.stringify({
    id: user.id,
    email: user.email,
    tipo: tipo
  }));

  window.location.href = 'index.html';
}

// -----------------------------
// Logout
// -----------------------------
function logout() {
  sessionStorage.removeItem('userLogado');
  window.location.href = 'index.html';
}

// -----------------------------
// Gerador de ID Único
// -----------------------------
function gerarIdUnico() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}
// -----------------------------