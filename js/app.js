// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio, corregido y consolidado con amor 🤗

// ========== CONFIGURACIÓN INICIAL ========== //
console.log("app.js cargado");

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
  {
    nombre: "🎶 JAZZ & BLUES",
    url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FJAZZ%20%26%20BLUES%20(conversar%20%2Ccaf%C3%A9%20%2Cestudiar).mp4?alt=media&token=dee26a91-1bc0-4690-aefa-7137d682acdb"
  },
  {
    nombre: "🎮 Gaming Music 2023",
    url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FGaming%20Music%202023.mp4?alt=media&token=d3330f02-f47d-4557-9e32-8686bd308e43"
  },
  {
    nombre: "📚 Música para Live 2022",
    url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F3%20HORAS%20DE%20MUSICA%20PARA%20LIVE%202022.mp4?alt=media&token=ff7fccf3-fc80-4188-a47b-b7fcb5466425"
  },
  {
    nombre: "🕺 1 Hora MIX 2020",
    url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F1%20HOUR%20MIX%20(2020).mp4?alt=media&token=6a4b4e70-94c1-46f8-b7dc-6c208e855962"
  }
];


// ========== FUNCIONES DE ESTILO Y MODO OSCURO ========== //

// función toggleModo removida (duplicada con funciones_comunes.js)

// función restaurarModo removida (duplicada con funciones_comunes.js)

// ========== VIDEO Y TRANSMISIÓN ========== //

function cambiarVideoManual() {
  const indice = parseInt(document.getElementById("videoSelector").value);
  const videoSeleccionado = listaVideos[indice];
  console.log("Video seleccionado:", videoSeleccionado);
  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(videoSeleccionado);
  
  mostrarVideo(videoSeleccionado);
}


function mostrarVideo(videoSeleccionado) {
  console.log("Mostrando video:", videoSeleccionado);
  const twitchFrame = document.getElementById("twitchStream");
  const contenedor = document.getElementById("transmision");
  twitchFrame.style.display = "none";

  const volumenGuardado = localStorage.getItem("volumenUsuario") || 0.5;
  contenedor.innerHTML = `
    <video id="videoPlayer" autoplay controls style="width:100%; max-height:540px; border-radius:10px;" crossorigin="anonymous">
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

window.mostrarLoginVIP = mostrarLoginVIP;
window.accederVIP = accederVIP;
window.cerrarLoginVIP = cerrarLoginVIP;
window.toggleModo = toggleModo;
window.cambiarVideoManual = cambiarVideoManual;
window.activarAutoDJ = activarAutoDJ;
window.cambiarModo = cambiarModo;
