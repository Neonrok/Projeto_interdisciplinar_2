   
   function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }   
   
   function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

// Trocar foto de perfil
  const inputFoto = document.getElementById("input-foto");
  const fotoPerfil = document.getElementById("foto-perfil");

  // Carregar imagem guardada no localStorage (se houver)
  const imagemGuardada = localStorage.getItem("fotoPerfil");
  if (imagemGuardada) {
    fotoPerfil.src = imagemGuardada;
  }

  // Trocar foto ao escolher novo ficheiro
  inputFoto.addEventListener("change", () => {
    const file = inputFoto.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        fotoPerfil.src = e.target.result;
        localStorage.setItem("fotoPerfil", e.target.result); // Guardar imagem localmente
      };
      reader.readAsDataURL(file);
    }
  });

      // Scroll suave
    function scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Aparecer seções ao fazer scroll
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));


  function scrollCarousel(direction) {
    const carousel = document.getElementById('atividadeCarousel');
    const scrollAmount = 270; // largura do card + gap
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  function verMais(atividade) {
    alert("Mais informações sobre: " + atividade + "\n(Em breve!)");
  }


  