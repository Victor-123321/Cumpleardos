// ===========================================================
//  LISTA DE VIDEOS ("Aldo Momentos")
//  El botón "Ver más Aldo Momentos" avanza en ESTE orden y da la
//  vuelta al llegar al final. Para agregar más, solo súmalos aquí.
// ===========================================================
window.videosAldo = [
  "Videos/video1.mp4",
  "Videos/video2.mp4",
  "Videos/video3.mp4",
  "Videos/video4.mp4",
  "Videos/video5.mp4",
  "Videos/video6.mp4",
  "Videos/video7.mp4",
  "Videos/video8.mp4",
  "Videos/video9.mp4",
  "Videos/video10.mp4",
  "Videos/video11.mp4",
  "Videos/video12.mp4",
  "Videos/beeso.mp4", // nuevo
  "Videos/patria.mp4" // nuevo
];

// Índice guardado (qué video toca mostrar)
function leerIndiceVideo() {
  var i = parseInt(localStorage.getItem("aldoVideoIndex") || "0", 10);
  if (isNaN(i) || i < 0 || i >= window.videosAldo.length) i = 0;
  return i;
}

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

// Al cargar: mostrar el video que toca según el índice guardado
window.addEventListener("load", () => {
  try {
    const idx = leerIndiceVideo();
    const videoSource = document.getElementById("videoSource");
    videoSource.src = window.videosAldo[idx];
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