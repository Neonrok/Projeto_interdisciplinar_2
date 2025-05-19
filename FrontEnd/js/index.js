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
