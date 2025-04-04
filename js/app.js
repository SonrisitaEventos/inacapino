
// script_limpio_radio.js

document.addEventListener("DOMContentLoaded", function () {
  actualizarReloj();
  setInterval(actualizarReloj, 60000);
  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000);
  setInterval(cambiarMensaje, 15000);

  // Restaurar modo guardado
  const modoGuardado = localStorage.getItem("modoPreferido");
  document.body.classList.add(modoGuardado === "noche" ? "modo-noche" : "modo-dia");

  // Banner cookies
  if (localStorage.getItem("cookiesAceptadas") !== "true") {
    document.getElementById("cookie-banner").style.display = "flex";
  }
  document.getElementById("aceptarCookies").addEventListener("click", window.aceptarCookies);
  document.getElementById("configurarCookies").addEventListener("click", window.mostrarPreferencias);

  // Firebase
  const firebaseConfig = { /* tus credenciales */ };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Frases animadas
  const frases = ["🎉La educación es el pasaporte al futuro. ✨", /* ... */ ];
  let fraseActual = 0;
  setInterval(() => {
    fraseActual = (fraseActual + 1) % frases.length;
    const fraseEl = document.getElementById('frase');
    fraseEl.style.opacity = 0;
    setTimeout(() => {
      fraseEl.textContent = frases[fraseActual];
      fraseEl.style.opacity = 1;
      fraseEl.classList.remove("fraseAnimada");
      void fraseEl.offsetWidth;
      fraseEl.classList.add("fraseAnimada");
    }, 300);
  }, 7000);

  // Scroll botón arriba
  window.onscroll = function () {
    const btn = document.getElementById("btnTop");
    btn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? "block" : "none";
  };

  // Audio Autoplay
  window.addEventListener("load", () => {
    const audio = document.getElementById("audioElement");
    const boton = document.getElementById("playMobile");
    audio.muted = false;
    audio.volume = 0.8;
    audio.play().catch(() => boton.style.display = "inline-block");
  });

  // Cargar mensajes chat
  cargarMensajes();
  setInterval(cargarMensajes, 10000);

  // Firebase listeners
  db.ref("radio/modoTransmision").on("value", (snapshot) => {
    const modo = snapshot.val();
    const transmision = document.getElementById("transmision");
    if (modo === "twitch") {
      transmision.innerHTML = `<div><iframe src="https://player.twitch.tv/?channel=xtian_alejandro&parent=sonrisitaeventos.github.io" allowfullscreen></iframe></div>`;
      document.getElementById("nombreVideo").innerText = `🎥 Transmisión en vivo`;
    }
  });

  db.ref("radio/videoActual").on("value", (snap) => {
    db.ref("radio/modoTransmision").once("value").then((modoSnap) => {
      if (modoSnap.val() === "autodj") {
        const video = snap.val();
        const transmision = document.getElementById("transmision");
        const volumenGuardado = localStorage.getItem("volumenUsuario") || 0.5;
        transmision.innerHTML = `<video id="videoPlayer" autoplay controls><source src="${video.url}" type="video/mp4"></video>`;
        const videoEl = document.getElementById("videoPlayer");
        videoEl.volume = parseFloat(volumenGuardado);
        videoEl.addEventListener("volumechange", () => {
          localStorage.setItem("volumenUsuario", videoEl.volume);
        });
        document.getElementById("nombreVideo").innerText = `🎧 Reproduciendo: ${video.nombre}`;
      }
    });
  });

  // Globalizar funciones
  window.scrollToTop = scrollToTop;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.changeImage = changeImage;
  window.mostrarLoginVIP = mostrarLoginVIP;
  window.toggleModo = toggleModo;
  window.cambiarVideoManual = cambiarVideoManual;
  window.accederVIP = accederVIP;
  window.activarAutoDJ = activarAutoDJ;
  window.cambiarModo = cambiarModo;
  window.enviarMensajeChat = enviarMensajeChat;
  window.aceptarCookies = function () {
    localStorage.setItem("cookiesAceptadas", "true");
    document.getElementById("cookie-banner").style.display = "none";
  }
  window.mostrarPreferencias = function () {
    alert("Aquí podrías redirigir a una sección de configuración de cookies.");
  }
});
