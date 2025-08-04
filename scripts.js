const playSound = function () {
  let element = document.createElement("div");
  element.setAttribute("style", "display: none");
  element.innerHTML = `
      <audio id="background-audio" autoplay loop>
        <source
          src="Flor de capomo low quality.mp3"
          type="audio/mpeg"
        />
      </audio>
    `;
  document.body.appendChild(element);
};

// Función para reposicionar partículas aleatoriamente
function repositionParticles() {
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    const maxX = window.innerWidth - 50; // Ajustar según el ancho de la partícula
    const maxY = window.innerHeight - 50; // Ajustar según el alto de la partícula
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    particle.style.left = `${randomX}px`;
    particle.style.top = `${randomY}px`;
  });
}

// Intentar reproducir al cargar la página
window.addEventListener("load", () => {
  try {
    playSound();
    const audio = document.getElementById("background-audio");
    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch((error) => {
        console.log("Error al reproducir audio:", error);
        const notification = document.getElementById("notification");
        notification.textContent =
          "Haz clic en la página para iniciar el sonido.";
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
        }, 5000);
        // Iniciar el audio al primer clic
        document.addEventListener(
          "click",
          () => {
            audio
              .play()
              .catch((err) =>
                console.log("Error al intentar reproducir tras clic:", err)
              );
          },
          { once: true }
        );
      });
    }
    // Posicionar partículas inicialmente
    repositionParticles();
    // Reposicionar partículas cada 3 segundos
    setInterval(repositionParticles, 3000);
  } catch (error) {
    console.log("Error al intentar autoplay:", error);
  }
});

// Resto del código (sin cambios)
function sendMessage() {
  const messages = [
    "Aldo se alegra de ver tu mensaje!",
    "Ardo se vino con este mensaje",
    "Aldo se chaqueteó con tu mensaje!",
    "Ardo en acción, a Aldo no le gustó tu mensaje (se ardió)",
    "Te ardes mucho",
    "Xbox ganó la generación",
    "Mi madre llora 😢",
    "Live Ardo Reaction 😄",
            "Aldo le quiso enseñar el mensaje a Victor, pero Victor no esta, hablale",
            "Aldo le quiso enseñar el mensaje a Akane, pero Akane no esta, hablale",
            "Aldo le quiso enseñar el mensaje a Genaro, pero Genaro no esta, hablale",
  ];

  const messageInput = document.getElementById("message").value.trim();

  const video = document.getElementById("greetingVideo");
  const backgroundMusic = document.getElementById("background-audio");

  // Verifica si existe el video antes de reproducir
  const videoPath = `Videos/${messageInput.toLowerCase()}.mp4`;
  fetch(videoPath, { method: "HEAD" })
    .then((res) => {
      if (res.ok) {
        backgroundMusic.pause(); // Pausa la música de fondo
        video.src = videoPath;
        video.style.display = "block";
        video.volume = 1;
        video.play();

        // Espera a que se carguen los metadatos para obtener la duración real
        video.onloadedmetadata = function () {
          setTimeout(() => {
            video.style.display = "none";
            video.pause();
            video.currentTime = 0; // Reinicia el video
            backgroundMusic.play(); // Reanuda la música
          }, video.duration * 1000);
        };

        document.getElementById("message").value = "";
        return; // Sale de la función si se reproduce el video
      } else {
        // Si no existe el video, muestra mensaje aleatorio
        if (messageInput.toLowerCase().includes("galia")) {
          window.location.href = "https://www.youtube.com/watch?v=7ODcC5z6Ca0";
          return;
        } else if (messageInput.toLowerCase().includes("andres")) {
          showMessage("Andres se besa con Aldo");
        } else if (messageInput.toLowerCase().includes("diego")) {
          showMessage("Diegod esta tranquilizando a Aldo (se ardio)");
        } else if (messageInput.toLowerCase().includes("otto")) {
          showMessage("Otto esta en la casaaaaa");
        } else if (messageInput.toLowerCase().includes("isaac")) {
          showMessage(
            "Isaac tambien recibio el mensaje, ahora se chaquetea con Aldo"
          );
        } else if (messageInput.toLowerCase().includes("victor")) {
          showMessage(
            "Aldo le quiso enseñar el mensaje a Victor, pero Victor no esta, hablale"
          );
        } else if (messageInput.toLowerCase().includes("akane")) {
          showMessage(
            "Aldo le quiso enseñar el mensaje a Akane, pero Akane no esta, hablale"
          );
        } else if (messageInput.toLowerCase().includes("genaro")) {
          showMessage(
            "Aldo le quiso enseñar el mensaje a Genaro, pero Genaro no esta, hablale"
          );
        } else if (messageInput.toLowerCase().includes("fany")) {
          showMessage(
            "Aldo le quiso enseñar el mensaje a Fany, pero ya esta cerca navidad, asi que no esta"
          );
        } else if (messageInput.toLowerCase().includes("eilyn")) {
          showMessage(
            "Eilyn se fue de sabatico, pero Aldo le hara llegar el mensaje (si no se arde)"
          );
        } else if (messageInput.toLowerCase().includes("nestor")) {
          showMessage("EL toro colarado que no necesita pastillas");
        } else if (messageInput.toLowerCase().includes("osvaldo")) {
          showMessage(
            "Osvaldo? el chambeador super dotado (el aldo se lo quiere besar igual que victor)"
          );
        } else if (
          messageInput.toLowerCase().includes("jesse") ||
          messageInput.toLowerCase().includes("jessi") ||
          messageInput.toLowerCase().includes("jessica")
        ) {
          showMessage("Un roblox o que? (dice jesse)");
        } else if (messageInput.toLowerCase().includes("mayra")) {
          showMessage(
            "Mayra anda de gira, pero Aldo le hara llegar el mensaje"
          );
        } else if (
          messageInput.toLowerCase().includes("emi") ||
          messageInput.toLowerCase().includes("emiliano")
        ) {
          showMessage(
            "Emiliano se vino con este mensaje (pero no se ardio, no es como ardo)"
          );
        } else if (messageInput.toLowerCase().includes("nadin")) {
          showMessage(
            "Nadin dice 'Gott Mit Uns', aldo no lo entiende pero se ardio"
          );
        } else if (messageInput.toLowerCase().includes("danna")) {
          showMessage(
            "FELICIDADES, encontraste a Danna, tienes 3 dias de buena suerte"
          );
        } else if (messageInput.toLowerCase().includes("brandon")) {
          showMessage(
            "Dice Aldo que le dijo Diana que le dice Brandon q no puede contestar, pero que le manda saludos (???????)"
          );
        } else if (messageInput.toLowerCase().includes("gerardo")) {
          showMessage(
            "Gerardo dice, 'funen a los que no han vendido', el ardo en acción, se ardio con esto"
          );
        } else if (
          messageInput.toLowerCase().includes("sesgaro") ||
          messageInput.toLowerCase().includes("edgar")
        ) {
          showMessage(
            "Aldo nomas lo ve programando pendejadas junto con Victor JAJJAJA"
          );
        } else if (
          messageInput.toLowerCase().includes("otto") 
        ) {
          showMessage(
            "Otto?? Sigue vivo??"
          );
        } else if (
          messageInput.toLowerCase().includes("juan") ||
          messageInput.toLowerCase().includes("pablo")
        ) {
          showMessage("Esta ocupado jugando minecraft, o no se no soy arqui");
        } else if (
          messageInput.toLowerCase().includes("aburrido") ||
          messageInput.toLowerCase().includes("aburrida")
        ) {
          showMessage("Aburrida tu PTM");
        } else {
          showRandomMessage();
        }
      }
    })
    .catch(() => {
      showRandomMessage();
    });

  function showRandomMessage() {
    let randomMessage = messages[Math.floor(Math.random() * messages.length)];
    if (messageInput.toLowerCase() == "") {
      randomMessage = "pon algo w estás bien pendejo te ardes mucho";
    }
    const notification = document.getElementById("notification");
    notification.textContent = randomMessage;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
    document.getElementById("message").value = "";
  }

  // Muestra un mensaje fijo pasado como argumento
  function showMessage(msg) {
    const notification = document.getElementById("notification");
    notification.textContent = msg;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
    document.getElementById("message").value = "";
  }
}

function showPluginMessage() {
  const notification = document.getElementById("notification");
  notification.textContent = "¡Instala nuestro plugin de globos y confeti!";
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

function switchDesign() {
  document.body.style.background = "white";
  document.body.style.color = "black";
  document.body.style.fontFamily = "Arial";
  document.querySelector("table").style.background = "none";
  document.querySelector("table").style.border = "1px solid black";
  document.querySelector(".header").style.background = "none";
  document.querySelector(".header").style.color = "black";
  document.querySelector(".sidebar").style.background = "none";
  document.querySelector(".footer").style.background = "none";
  document
    .querySelectorAll(".blink")
    .forEach((el) => (el.style.animation = "none"));
  const notification = document.getElementById("notification");
  notification.textContent =
    "¡Modo aburrido activado! Refresca para volver a la fiesta de Aldo!";
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}
