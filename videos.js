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

// Intentar reproducir al cargar la página y cargar video aleatorio
window.addEventListener("load", () => {
  try {
    // Cargar video aleatorio
    const videoNumber = Math.floor(Math.random() * 12) + 1; // Número entre 1 y 11
    const videoSource = document.getElementById("videoSource");
    videoSource.src = `Videos/video${videoNumber}.mp4`;
    const video = document.getElementById("birthdayVideo");
    video.load(); // Recargar el video con la nueva fuente
    const videoPromise = video.play();
    if (videoPromise !== undefined) {
      videoPromise.catch((error) => {
        console.log("Error al reproducir video:", error);
        const notification = document.getElementById("notification");
        notification.textContent =
          "Haz clic en la página para iniciar el video.";
        notification.style.display = "block";
        setTimeout(() => {
          notification.style.display = "none";
        }, 5000);
        document.addEventListener(
          "click",
          () => {
            video
              .play()
              .catch((err) =>
                console.log(
                  "Error al intentar reproducir video tras clic:",
                  err
                )
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
    console.log("Error al intentar cargar:", error);
  }
});
