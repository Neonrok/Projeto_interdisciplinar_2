const atividades = [
  {
    titulo: "Projeto Papel Amigo",
    categoria: "reciclagem",
    descricao: "Campanha de recolha de papel e sensibilização sobre o seu reaproveitamento.",
    detalhes: "Os alunos são convidados a trazer papel usado de casa. Serão colocados contentores específicos pela escola e feita uma campanha de sensibilização para a reutilização e reciclagem responsável.",
    imagem: "https://thumbs.dreamstime.com/b/papel-empilhado-340104.jpg"
  },
  {
    titulo: "Horta Biológica",
    categoria: "horta",
    descricao: "Montagem de uma horta com ervas aromáticas, alfaces e legumes.",
    detalhes: "Os alunos vão preparar canteiros, semear e cuidar de ervas aromáticas e legumes, aprendendo sobre agricultura biológica, compostagem e sustentabilidade alimentar.",
    imagem: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
  },
  {
    titulo: "Oficina de Sabão Artesanal",
    categoria: "oficina",
    descricao: "Criação de sabão ecológico a partir de óleo usado.",
    detalhes: "Aprende a transformar óleo alimentar usado em sabão ecológico. Uma excelente forma de reduzir resíduos e criar produtos úteis para a escola ou casa.",
    imagem: "https://th.bing.com/th/id/OIP.HNwqRf2cFqTWp28PtPb7nQHaE6?cb=iwp2&rs=1&pid=ImgDetMain"
  },
  {
    titulo: "Troca de Roupas",
    categoria: "reciclagem",
    descricao: "Evento de troca solidária para promover a reutilização de vestuário.",
    detalhes: "Traz roupas em bom estado que já não usas e troca por outras peças. Uma ação que promove a economia circular e ajuda famílias da comunidade.",
    imagem: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg"
  },
  {
    titulo: "Artes com Sucata",
    categoria: "oficina",
    descricao: "Criação de brinquedos e objetos artísticos com lixo reciclável.",
    detalhes: "Atividade artística onde os alunos usam embalagens, papelão, tampinhas e outros resíduos para criar esculturas, brinquedos e arte sustentável.",
    imagem: "https://images.pexels.com/photos/9816193/pexels-photo-9816193.jpeg"
  },
  {
    titulo: "Plantação de Árvores",
    categoria: "horta",
    descricao: "Atividade de reflorestação com espécies nativas.",
    detalhes: "Uma ação ecológica em que os alunos plantam árvores nos arredores da escola, aprendendo sobre biodiversidade e importância das florestas.",
    imagem: "https://th.bing.com/th/id/OIP._iUocg_56EmfgJMNP1Fz7gHaE4?cb=iwp2&rs=1&pid=ImgDetMain"
  }
];

function filtrarAtividades(categoria) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    if (categoria === 'todas' || card.classList.contains(categoria)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const titulo = card.querySelector("h3").textContent;
    card.addEventListener("click", () => abrirDetalhesProjeto(titulo));
  });
});

function abrirDetalhesProjeto(titulo) {
  const projeto = atividades.find(atividade => atividade.titulo === titulo);

  if (projeto) {
    const novaJanela = window.open("", "_blank", "width=600,height=600");

    novaJanela.document.write(`
      <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <title>${projeto.titulo}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; background-color: #f4f4f4; }
            h1 { color: #2c7a3f; }
            img { max-width: 100%; border-radius: 10px; }
            p { font-size: 16px; line-height: 1.5; }
            .voltar { margin-top: 20px; display: inline-block; text-decoration: none; color: #fff; background: #2c7a3f; padding: 10px 20px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>${projeto.titulo}</h1>
          <img src="${projeto.imagem}" alt="${projeto.titulo}">
          <p><strong>Categoria:</strong> ${projeto.categoria}</p>
          <p>${projeto.detalhes}</p>
          <a href="#" onclick="window.close()" class="voltar">Fechar</a>
        </body>
      </html>
    `);
  } else {
    alert("Projeto não encontrado.");
  }
}
