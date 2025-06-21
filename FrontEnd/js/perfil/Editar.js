let charg = async function carregarDadosUsuario() {
    const jwt = localStorage.getItem('token');
    if (!jwt) {
        window.location.href = '../../html/login.html';
        return;
    } 
    const id = localStorage.getItem('id');
    
    const resposta = await fetch(`http://127.0.0.1:3000/users/${id}`,{
        method: 'GET',
        headers: { 'Authorization': `Bearer ${jwt}` }
    })

    let dados = await resposta.json();
    dados= dados.data;
    
    document.getElementById('Email').value = dados.Email || null;
    document.getElementById('Name').value = dados.Username || null;
    document.getElementById('bio').value = dados.descricao || null;
}

let Editar = async function Edit() {
    const jwt = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    console.log(jwt, id)

    let username = document.getElementById('Email').value;
    let Email = document.getElementById('Email').value;
    let bio = document.getElementById('bio').value;
    let password = document.getElementById('password').value

    const resposta = await fetch(`http://127.0.0.1:3000/users/${id}`,{
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify({ Username:username, Email:Email, descricao:bio, P_W:password })
    })

    const data = await resposta.json();

    if (resposta.ok) {
        alert('✅ Login bem-sucedido!');
        window.location.href = '../../html/perfil/perfil.html';
    } else { alert('❌ Erro: ' + data.message); };
}

window.addEventListener('DOMContentLoaded', () => {
    charg();
});