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
      localStorage.setItem('token', data.accessToken);

    const verify = await fetch('http://127.0.0.1:3000/users/login/verify', {
        headers: { 'Authorization': `Bearer ${data.accessToken}` }
    });

    let form = await verify.json();
    localStorage.setItem('id', form.data);

    alert('✅ Login bem-sucedido!');

    window.location.href = '../html/perfil.html';
  } else { alert('❌ Erro: ' + data.message); };
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
    localStorage.setItem('token', data.accessToken);
    alert('✅ Utilizador registado com sucesso!');
    const verify = await fetch('http://127.0.0.1:3000/users/login/verify', {
        headers: { 'Authorization': `Bearer ${data.accessToken}` }
    });

    let form = await verify.json();
    localStorage.setItem('id', form.data);
    window.location.href = '../html/perfil.html';
  } else {
      alert('❌ Erro ao registar: ' + data.message);
  };
};