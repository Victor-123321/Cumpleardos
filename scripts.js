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
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const notification = document.getElementById("notification");
  notification.textContent = randomMessage;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
  document.getElementById("message").value = "";
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
