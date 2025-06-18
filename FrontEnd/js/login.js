async function LogIn() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://127.0.0.1:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Username:username, P_W:password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    alert('✅ Login bem-sucedido!');
  } else {
    alert('❌ Erro: ' + data.message);
  };
  console.log(data);
};

async function SigIn() {
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const response = await fetch('http://localhost:3000/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({Username:username, Email:email, P_W:password})
  });

  const data = await response.json();
  if (response.ok) {
    alert('✅ Utilizador registado com sucesso!');
  } else {
    alert('❌ Erro ao registar: ' + data.message);
  };
  console.log(data);
};