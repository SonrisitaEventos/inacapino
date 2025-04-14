// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio y sincronizado 🤗

console.log("✅ app.js cargado correctamente");

// 🔥 Firebase Configuración
const firebaseConfig = {
  apiKey: "AIzaSyAu4HVlBwgVeg7kp8RwahEFdOM72JKjhKA",
  authDomain: "inacapino-radio-spark.firebaseapp.com",
  databaseURL: "https://inacapino-radio-spark-default-rtdb.firebaseio.com",
  projectId: "inacapino-radio-spark",
  storageBucket: "inacapino-radio-spark.firebasestorage.app",
  messagingSenderId: "64588373035",
  appId: "1:64588373035:web:78b92ca7b5b8b7396d1e6e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔊 Mostrar asistente Inacapin con audio
function mostrarAsistenteInacapin() {
  const asistente = document.getElementById("asistenteInacapin");
  const audio = document.getElementById("audioInacapin");

  if (asistente) {
    asistente.style.display = "flex";
    if (audio) {
      audio.play().catch((error) => {
        console.warn("🎧 El navegador bloqueó la reproducción automática:", error);
      });
    }
  }
}

document.body.addEventListener("click", () => {
  const audio = document.getElementById("audioInacapin");
  if (audio && audio.paused) {
    audio.play().catch((e) => console.warn("No se pudo reproducir audio:", e));
  }
}, { once: true });

function cerrarInacapin() {
  const asistente = document.getElementById("asistenteInacapin");
  if (asistente) asistente.style.display = "none";
}

// 🎥 Mostrar transmisiones
function mostrarZenoFM() {
  const contenedor = document.getElementById("videoContainer");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="zeno-box">
        <iframe src="https://zeno.fm/player/inacapinoptomontt" width="100%" height="280" frameborder="0" scrolling="no" allow="autoplay"></iframe>
      </div>
    `;
  }

  const nombre = document.getElementById("nombreVideo");
  if (nombre) {
    nombre.innerText = `🎧 Escuchando: Radio Online`;
  }
}

function mostrarTwitch() {
  const contenedor = document.getElementById("videoContainer");
  if (contenedor) {
    contenedor.innerHTML = `
      <iframe src="https://player.twitch.tv/?channel=xtian_alejandro&parent=sonrisitaeventos.github.io" 
              frameborder="0" allowfullscreen style="width:100%; height:540px; border-radius:10px;"></iframe>
    `;
  }

  const nombre = document.getElementById("nombreVideo");
  if (nombre) {
    nombre.innerText = `🔴 Transmisión en vivo desde Twitch`;
  }
}

// 🔄 Cambiar y escuchar el modo de transmisión
function cambiarModo(modo) {
  db.ref("radio/modoTransmision").set(modo);
}

function escucharModoTransmision() {
  db.ref("radio/modoTransmision").on("value", (snapshot) => {
    const modo = snapshot.val();

    // Mostrar aviso
    const aviso = document.getElementById("avisoCambio");
    if (aviso) {
      aviso.style.display = "block";
      aviso.classList.remove("aviso-cambio");
      void aviso.offsetWidth; // reinicia animación
      aviso.classList.add("aviso-cambio");

      // Ocultar después de unos segundos
      setTimeout(() => {
        aviso.style.display = "none";
      }, 3000);
    }

    // Cambiar la transmisión
    if (modo === "twitch") {
      mostrarTwitch();
    } else {
      mostrarZenoFM();
    }
  });
}

// 💬 Frases motivacionales
let fraseActual = 0;
setInterval(() => {
  fraseActual = (fraseActual + 1) % frases.length;
  const fraseEl = document.getElementById('frase');
  if (fraseEl) {
    fraseEl.style.opacity = 0;
    setTimeout(() => {
      fraseEl.textContent = frases[fraseActual];
      fraseEl.style.opacity = 1;
      fraseEl.classList.remove("fraseAnimada");
      void fraseEl.offsetWidth;
      fraseEl.classList.add("fraseAnimada");
    }, 300);
  }
}, 7000);

// ✅ Inicialización general
document.addEventListener("DOMContentLoaded", () => {
  restaurarModo();
  actualizarReloj();
  actualizarClima();
  escucharModoTransmision();
  setTimeout(() => {
  mostrarAsistenteInacapin();
  setInterval(actualizarReloj, 60000);
  setInterval(actualizarClima, 10 * 60 * 1000);
});

// 🌐 Exportar funciones globales
window.mostrarLoginVIP = mostrarLoginVIP;
window.accederVIP = accederVIP;
window.cerrarLoginVIP = cerrarLoginVIP;
window.toggleModo = toggleModo;
window.cambiarModo = cambiarModo;
window.mostrarTwitch = mostrarTwitch;
window.mostrarZenoFM = mostrarZenoFM;
window.cerrarInacapin = cerrarInacapin;
