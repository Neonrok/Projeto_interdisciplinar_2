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

    let username = document.getElementById('Name').value || null;;
    let Email = document.getElementById('Email').value || null;;
    let bio = document.getElementById('bio').value || null; // Assign null if empty
    let password = document.getElementById('password').value || null;

    const resposta = await fetch(`http://127.0.0.1:3000/users/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify({ Username:username, Email:Email, descricao:bio, P_W:password })
    })

    if (resposta.ok) {
        alert('✅ Login bem-sucedido!');
        window.location.href = '../../html/perfil/perfil.html';
    } else { alert('❌ :()'); };
}

let deletar = async function remover() {
    const jwt = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (confirm("Tens a serteza")) {
        const resposta = await fetch(`http://127.0.0.1:3000/users/${id}`,{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` }
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    charg();
});