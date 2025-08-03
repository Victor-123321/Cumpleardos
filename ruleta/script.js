document.addEventListener("DOMContentLoaded", () => {
  let spinCount = 0;
  const fixedSequence = [0, 9, 10]; // Ardido, Más Ardido, ?
  const randomIndices = [0, 1, 5, 9, 10]; // Ardido, Pendejo, Prieto, Más Ardido, ?
  const totalAnswers = 11;
  const rouletteCanvas = document.getElementById("rouletteCanvas");
  const pointerCanvas = document.getElementById("pointerCanvas");
  const ctx = pointerCanvas.getContext("2d");
  const spinButton = document.getElementById("spinButton");
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  const notificationTextRes = document.getElementById("notificationTextRes");
  const closeNotification = document.getElementById("closeNotification");
  let selectedIndex = 0;

  if (
    !rouletteCanvas ||
    !pointerCanvas ||
    !spinButton ||
    !notification ||
    !notificationText ||
    !closeNotification
  ) {
    console.error("Error: Uno o más elementos DOM no se encontraron.");
    document.getElementById("result").innerText =
      "Error al cargar la página. Revisa la consola.";
    return;
  }

  const pointerImage = new Image();
  pointerImage.src = "pointer.png";
  pointerImage.onload = () => {
    console.log("Imagen pointer.png cargada correctamente");
    drawCustomPointer();
  };
  pointerImage.onerror = () => {
    console.error(
      "Error al cargar pointer.png. Asegúrate de que esté en C:\\RuletaWeb"
    );
    document.getElementById("result").innerText =
      "Error al cargar la imagen del indicador.";
  };

  const answers = [
    "Ardido",
    "Pendejo",
    "Naco",
    "Mugroso",
    "Jodido",
    "Prieto",
    "Guapo",
    "Precioso",
    "Pitudo",
    "Más Ardido",
    "?"
  ];

  const segments = answers.map((text, i) => ({
    fillStyle: `hsl(${(i * 360) / totalAnswers}, 70%, ${50 + (i % 2) * 10}%)`,
    text: text,
  }));

  let wheel;
  try {
    wheel = new Winwheel({
      canvasId: "rouletteCanvas",
      numSegments: totalAnswers,
      outerRadius: 400,
      innerRadius: 60,
      textFontSize: Math.max(30, 30 / Math.log(totalAnswers)),
      textAlignment: "outer",
      textMargin: 10,
      rotationAngle: -90 / totalAnswers,
      pointerAngle: 0,
      pointerGuide: {
        display: false,
      },
      segments: segments,
      animation: {
        type: "spinToStop",
        duration: 8,
        spins: 20,
        easing: "Power4.easeOut",
        callbackFinished: () => {
          console.log("CallbackFinished ejecutado");
          showResult();
        },
      },
    });
    console.log("Ruleta inicializada correctamente");
  } catch (e) {
    console.error("Error al inicializar Winwheel:", e);
    document.getElementById("result").innerText =
      "Error al cargar la ruleta. Revisa la consola.";
    return;
  }

  function drawCustomPointer() {
    if (pointerImage.complete && pointerImage.naturalWidth !== 0) {
      ctx.clearRect(0, 0, pointerCanvas.width, pointerCanvas.height);
      ctx.save();
      ctx.translate(398, 25);
      ctx.drawImage(pointerImage, -20, -20, 40, 40);
      ctx.restore();
    }
  }

  let pointerTween;
  function animatePointer() {
    if (pointerTween) pointerTween.kill();
    pointerTween = gsap.to(
      {},
      {
        duration: 8,
        ease: "power4.out",
        onUpdate: function () {
          ctx.clearRect(0, 0, pointerCanvas.width, pointerCanvas.height);
          ctx.save();
          ctx.translate(398, 25);
          const progress = this.progress();
          const bounce = Math.sin(progress * 80 * Math.PI) * 2;
          ctx.drawImage(pointerImage, -20, -20 + bounce, 40, 40);
          ctx.restore();
        },
      }
    );
  }

  function redrawWheel() {
    if (wheel) {
      wheel.draw();
      drawCustomPointer();
    }
  }

  function showNotification(winningAnswer) {
    console.log("Mostrando notificación para respuesta:", winningAnswer);
    if (!winningAnswer) {
      console.error("Error: winningAnswer no definido");
      return;
    }
    notificationText.innerText = `Eres un...`;
    if (winningAnswer === "?") {
      winningAnswer = "Que esperabas w, todopendejo";
    }
    notificationTextRes.innerText = `${winningAnswer}`;
    notification.style.display = "flex";
    spinButton.disabled = true;
    gsap.fromTo(
      notification,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.to(notification, {
      delay: 3,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        console.log("Notificación cerrada");
        notification.style.display = "none";
        spinButton.disabled = false;
      },
  });
  }

  closeNotification.addEventListener("click", () => {
    console.log("Cerrando notificación manualmente");
    gsap.to(notification, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        notification.style.display = "none";
        spinButton.disabled = false;
      },
    });
  });

  spinButton.addEventListener("click", () => {
    if (!wheel || spinButton.disabled) return;

    spinButton.disabled = true;

    spinCount++;
    if (spinCount <= 3) {
      selectedIndex = fixedSequence[spinCount - 1]; // 1st: Ardido (0), 2nd: Más Ardido (9), 3rd: ? (10)
    } else {
      selectedIndex = randomIndices[Math.floor(Math.random() * randomIndices.length)]; // Random from Ardido, Pendejo, Prieto, Más Ardido, ?
    }

    const audio = document.getElementById("vibrateSound");
    if (spinCount === 2) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.error("Error al reproducir audio:", e));
    } else if (spinCount === 5) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.error("Error al reproducir audio:", e));
      setTimeout(() => {
        audio.currentTime = 0;
        audio
          .play()
          .catch((e) => console.error("Error al reproducir audio:", e));
      }, 200);
    }

    const anglePerSegment = 360 / totalAnswers;
    let stopAngle = selectedIndex * anglePerSegment + anglePerSegment / 2;
    stopAngle = ((stopAngle % 360) + 360) % 360;
    stopAngle += 360 * 15;

    console.log(
      `Giro ${spinCount}: selectedIndex=${selectedIndex}, stopAngle=${stopAngle}, answer=${answers[selectedIndex]}`
    );

    if (wheel.animation) {
      wheel.animation.stopAngle = stopAngle;
      try {
        console.log("Iniciando animación...");
        wheel.rotationAngle = 0;
        wheel.clearCanvas();
        wheel.draw();
        animatePointer();
        wheel.startAnimation();
        console.log("Animación iniciada");
        setTimeout(() => {
          if (!wheel.animation.stopped) {
            console.log(
              "Fallback: Animación no completada, llamando a showResult"
            );
            showResult();
          }
        }, 8000);
      } catch (e) {
        console.error("Error al iniciar animación:", e);
        document.getElementById("result").innerText =
          "Error al girar la ruleta. Revisa la consola.";
      }
    }
  });

  function showResult() {
    console.log("showResult llamado");
    if (!wheel || !wheel.animation) return;
    try {
      let finalAngle = wheel.getRotationPosition();
      if (finalAngle === undefined) {
        console.error("Error: getRotationPosition() devolvió undefined");
        return;
      }
      finalAngle = finalAngle % 360;
      if (finalAngle < 0) finalAngle += 360;
      const anglePerSegment = 360 / totalAnswers;
      let segmentIndex =
        Math.floor((360 - finalAngle) / anglePerSegment) % totalAnswers;
      if (segmentIndex < 0 || segmentIndex >= totalAnswers) {
        console.error(`Error: segmentIndex fuera de rango: ${segmentIndex}`);
        segmentIndex = (segmentIndex + totalAnswers) % totalAnswers;
      }
      const winningSegment = segments[segmentIndex];
      if (!winningSegment) {
        console.error(
          `Error: No se encontró segmento en índice ${segmentIndex}`
        );
        return;
      }
      console.log(
        `Resultado: finalAngle=${finalAngle}, segmentIndex=${segmentIndex}, answer=${
          winningSegment.text
        }, expectedIndex=${selectedIndex}, expectedAnswer=${
          answers[selectedIndex]
        }`
      );
      document.getElementById(
        "result"
      ).innerText = `Último resultado: ${winningSegment.text}`;
      showNotification(winningSegment.text);
      redrawWheel();
    } catch (e) {
      console.error("Error al mostrar resultado:", e);
      document.getElementById("result").innerText =
        "Error al obtener resultado.";
    }
  }

  // Message Input Functionality
  function sendMessage() {
    const messageInput = document.getElementById("message").value.trim().toLowerCase();
    const notification = document.getElementById("notification");
    const video = document.getElementById("greetingVideo");
    const backgroundMusic = document.getElementById("backgroundMusic");
    
    if (messageInput === "hola") {
      backgroundMusic.pause();
      video.style.display = "block";
      video.play();
      setTimeout(() => {
        video.style.display = "none";
        video.pause();
        video.currentTime = 0;
        backgroundMusic.play();
      }, 10000);
      document.getElementById("message").value = "";
      return;
    }

    if (messageInput.includes("galia")) {
      window.location.href = "galia-page.html";
      return;
    }

    const messages = [
      `Aldo se alegra de ver tu mensaje: "${messageInput}"!`,
      `Ardo se vino con este mensaje: "${messageInput}"`,
      `Aldo se chaqueteó con tu mensaje: "${messageInput}"!`,
      `Ardo en acción, a Aldo no le gustó tu mensaje (se ardió): "${messageInput}"`,
      `Te ardes mucho con: "${messageInput}"`,
      `Xbox ganó la generación, y tu mensaje fue: "${messageInput}"`,
      `Mi madre llora 😢 por: "${messageInput}"`,
      `Live Ardo Reaction 😄 a: "${messageInput}"`,
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    notificationText.innerText = `Mensaje: ${randomMessage}`;
    notificationTextRes.innerText = ``;
    notification.style.display = "flex";
    gsap.fromTo(
      notification,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.to(notification, {
      delay: 3,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        notification.style.display = "none";
      },
    });
    document.getElementById("message").value = "";
  }
});