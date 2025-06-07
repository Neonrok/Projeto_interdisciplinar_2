document.getElementById("atividadeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const area = document.getElementById("area").value;
  const recursos = document.getElementById("recursos").value;
  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;

  const li = document.createElement("li");
  li.textContent = `📝 ${nome} | Área: ${area} | Recursos: ${recursos} | De ${dataInicio} até ${dataFim}`;
  document.getElementById("listaPlano").appendChild(li);

  this.reset();
});

document.getElementById("execucaoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("execNome").value;
  const local = document.getElementById("local").value;
  const anotacoes = document.getElementById("anotacoes").value;

  const li = document.createElement("li");
  li.innerHTML = `<strong>${nome}</strong> 📍 ${local}<br>🗒️ ${anotacoes}`;
  document.getElementById("listaExecucao").appendChild(li);

  this.reset();
});
