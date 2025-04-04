// script_limpio_radio.js
window.accederVIP = function () {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  const fondo = document.getElementById("fondoLogin");
  const panelVIP = document.getElementById("panelVIP");
  function mostrarLoginVIP() {
  document.getElementById("fondoLogin").classList.add("mostrar");
}
window.mostrarLoginVIP = mostrarLoginVIP;


  if (usuario === "Inacapino" && clave === "SedePuertoMontt") {
    fondo.classList.remove("mostrar");
    panelVIP.style.display = "block";
    document.getElementById("panelSelector").style.display = "flex";
    alert("🎉 Acceso VIP concedido. ¡Bienvenido al panel de control!");
  } else {
    alert("🚫 Usuario o contraseña incorrectos. Intenta nuevamente.");
  }
};


window.toggleModo = function () {
  const body = document.body;
  const modoActual = body.classList.contains("modo-noche") ? "noche" : "dia";
  const nuevoModo = modoActual === "noche" ? "modo-dia" : "modo-noche";

  body.classList.remove("modo-dia", "modo-noche");
  body.classList.add(nuevoModo);

  localStorage.setItem("modoPreferido", nuevoModo === "modo-noche" ? "noche" : "dia");
};

window.mostrarLoginVIP = function () {
  document.getElementById("fondoLogin").classList.add("mostrar");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("fondoLogin").classList.remove("mostrar");
  }
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("loginVIP");
  const fondo = document.getElementById("fondoLogin");
  if (fondo.classList.contains("mostrar") && !modal.contains(e.target)) {
    fondo.classList.remove("mostrar");
  }
});

function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  document.getElementById("reloj").textContent = `${horas}:${minutos}`;
}

function obtenerEmojiClima(icon) {
  const mapa = {
    "01d": "☀️", "01n": "🌕",
    "02d": "🌤️", "02n": "☁️",
    "03d": "⛅",  "03n": "⛅",
    "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️",
    "10d": "🌦️", "10n": "🌧️",
    "11d": "⛈️", "11n": "⛈️",
    "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️"
  };
  return mapa[icon] || "🌡️";
}

function actualizarClima() {
  const ciudad = "Puerto Montt";
  const pais = "CL";
  const API_KEY = "ac05bbbe9fcb2df2fb44145383ed0342"; // Tu API KEY

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}&units=metric&lang=es`)
    .then(res => res.json())
    .then(data => {
      const temperatura = Math.round(data.main.temp);
      const icon = data.weather[0].icon;
      const emoji = obtenerEmojiClima(icon);
      document.getElementById("clima").innerText = `${emoji} ${temperatura}°C`;
    })
    .catch(err => {
      console.error("Error al obtener clima:", err);
      document.getElementById("clima").innerText = "🌡️ --°C";
    });
}
document.addEventListener("DOMContentLoaded", function () {
  actualizarReloj();
  setInterval(actualizarReloj, 60000);
  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000);
  setInterval(cambiarMensaje, 15000);

  // Restaurar modo guardado
  const modoGuardado = localStorage.getItem("modoPreferido");
 if (modoGuardado === "noche") {
  document.body.classList.add("modo-noche");
} else if (modoGuardado === "dia") {
  document.body.classList.add("modo-dia");
}

// 🟩 Luego usamos esas funciones con addEventListener
  
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
  document.body.style.transition = "background-color 0.5s, color 0.5s";
}, 100);

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
 function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
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
  
});
