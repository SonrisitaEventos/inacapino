// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio, corregido y consolidado con amor 🤗

// ========== CONFIGURACIÓN INICIAL ========== //

const firebaseConfig = {
  apiKey: "AIzaSyAu4HVlBwgVeg7kp8RwahEFdOM72JKjhKA",
  authDomain: "inacapino-radio-spark.firebaseapp.com",
  databaseURL: "https://inacapino-radio-spark-default-rtdb.firebaseio.com",
  projectId: "inacapino-radio-spark",
  storageBucket: "inacapino-radio-spark.appspot.com",
  messagingSenderId: "64588373035",
  appId: "1:64588373035:web:78b92ca7b5b8b7396d1e6e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const listaVideos = [
  { nombre: "JAZZ & BLUES", url: "https://...dee26a91" },
  { nombre: "Gaming Music", url: "https://...d3330f02" },
  { nombre: "Un Gran momento para estudiar", url: "https://...ff7fccf3" },
  { nombre: "1 Hora y a bailar", url: "https://...6a4b4e70" },
];

// ========== FUNCIONES DE ESTILO Y MODO OSCURO ========== //

// función toggleModo removida (duplicada con funciones_comunes.js)

// función restaurarModo removida (duplicada con funciones_comunes.js)

// ========== VIDEO Y TRANSMISIÓN ========== //

function cambiarVideoManual() {
  const indice = parseInt(document.getElementById("videoSelector").value);
  const videoSeleccionado = listaVideos[indice];
  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(videoSeleccionado);

  mostrarVideo(videoSeleccionado);
}

function mostrarVideo(videoSeleccionado) {
  const twitchFrame = document.getElementById("twitchStream");
  const contenedor = document.getElementById("transmision");
  twitchFrame.style.display = "none";

  const volumenGuardado = localStorage.getItem("volumenUsuario") || 0.5;
  contenedor.innerHTML = `
    <video id="videoPlayer" autoplay controls style="width:100%; max-height:540px; border-radius:10px;">
      <source src="${videoSeleccionado.url}" type="video/mp4">
    </video>
  `;

  const videoEl = document.getElementById("videoPlayer");
  videoEl.volume = parseFloat(volumenGuardado);
  videoEl.addEventListener("volumechange", () => {
    localStorage.setItem("volumenUsuario", videoEl.volume);
  });

  document.getElementById("nombreVideo").innerText = `🎧 Reproduciendo: ${videoSeleccionado.nombre}`;
}


function activarAutoDJ() {
  const indice = Math.floor(Math.random() * listaVideos.length);
  const video = listaVideos[indice];
  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(video);
}

function cambiarModo(modo) {
  if (modo === "twitch") db.ref("radio/modoTransmision").set("twitch");
}

// ========== VIP ========== //

// función accederVIP removida (duplicada con funciones_comunes.js)

// función mostrarLoginVIP removida (duplicada con funciones_comunes.js)

// ========== FRASES MOTIVACIONALES ========== //

const frases = [
  "🎉La educación es el pasaporte al futuro. ✨",
  "🎉Cada paso cuenta, sigue avanzando.🌟",
  "🎉El conocimiento es poder.🌟",
  "✨Nunca dejes de aprender.",
  "✨Todo lo que puedas imaginar, lo puedes crear. 🎉",
  "🎉Tu esfuerzo de hoy es tu éxito de mañana.✨",
  "🌟La actitud es tan importante como la habilidad.🎉"
];
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

// ========== CLIMA Y HORA ========== //
// 🔄 Escuchar cambios en Firebase para mostrar Twitch o AutoDJ automáticamente
function escucharModoTransmision() {
  db.ref("radio/modoTransmision").on("value", (snapshot) => {
    const modo = snapshot.val();

    if (modo === "twitch") {
      mostrarTwitch();
    } else if (modo === "autodj") {
      db.ref("radio/videoActual").once("value").then((snap) => {
        const video = snap.val();
        mostrarVideo(video);
      });
    }
  });
}

// función actualizarReloj removida (duplicada con funciones_comunes.js)

// función obtenerEmojiClima removida (duplicada con funciones_comunes.js)

// función actualizarClima removida (duplicada con funciones_comunes.js)

// ========== EVENTOS PRINCIPALES ========== //

document.addEventListener("DOMContentLoaded", () => {
  restaurarModo();
  actualizarReloj();
  setInterval(actualizarReloj, 60000);
  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000);
  escucharModoTransmision(); // 🔁 Escuchar cambios en transmisión
});


// ========== EXPORTAR FUNCIONES GLOBALES ========== //

window.toggleModo = toggleModo;
window.accederVIP = accederVIP;
window.mostrarLoginVIP = mostrarLoginVIP;
window.cambiarVideoManual = cambiarVideoManual;
window.activarAutoDJ = activarAutoDJ;
window.cambiarModo = cambiarModo;
