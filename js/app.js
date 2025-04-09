// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio, corregido y consolidado con amor 🤗

// ========== CONFIGURACIÓN INICIAL ========== //
console.log("✅ app.js cargado correctamente");


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
  { nombre: "🎷 JAZZ & BLUES", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/JAZZ%20%26%20BLUES%20(conversar%20%2Ccaf%C3%A9%20%2Cestudiar).mp4" },
  { nombre: "🎮 Gaming Music 2023", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/Gaming%20Music%202023.mp4" },
  { nombre: "📚 3 HORAS DE MÚSICA PARA LIVE 2022", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/3%20HORAS%20DE%20MUSICA%20PARA%20LIVE%202022.mp4" },
  { nombre: "🕺 1 Hora y a bailar", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/1%20HOUR%20MIX%20(2020).mp4" },
  { nombre: "🎧 MixElectronic", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/MixElectronic.mp4" },
  { nombre: "⚡ Música Electrónica para Estudiar", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/M%C3%BAsica%20Electr%C3%B3nica%20para%20Estudiar%2C%20m%C3%BAsica%20para%20levantar%20el%20animo.mp4" },
  { nombre: "🎮 STREAMING GAMER", url: "https://storage.googleapis.com/inacapino-radio-spark.firebasestorage.app/videos/STREAMING%20GAMER.mp4" }
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

  const contenedor = document.getElementById("videoContainer");

  // Elimina el iframe de Twitch si existe
  const twitchFrame = document.getElementById("twitchStream");
  if (twitchFrame) twitchFrame.remove();

  // Vacía el contenedor
  contenedor.innerHTML = "";

  // Agrega el nuevo video
  contenedor.innerHTML = `
    <video id="videoPlayer" autoplay controls playsinline style="width:100%; max-height:540px; border-radius:10px;" crossorigin="anonymous">
      <source src="${videoSeleccionado.url}" type="video/mp4">
      Tu navegador no soporta la etiqueta de video.
    </video>
  `;

  setTimeout(() => {
    const videoEl = document.getElementById("videoPlayer");
    if (videoEl) {
      const volumenGuardado = localStorage.getItem("volumenUsuario") || 0.5;
      videoEl.volume = parseFloat(volumenGuardado);
      videoEl.muted = false;

      // Intentar forzar el play (algunos navegadores bloquean sin interacción)
      videoEl.play().catch(err => {
        console.warn("🎬 Autoplay bloqueado. Espera un clic del usuario.", err);
      });

      videoEl.addEventListener("volumechange", () => {
        localStorage.setItem("volumenUsuario", videoEl.volume);
      });
    }
  }, 200); // Espera un poco para que el DOM inserte bien el video

  // Actualiza el nombre en pantalla
  document.getElementById("nombreVideo").innerText = `🎧 Reproduciendo: ${videoSeleccionado.nombre}`;
}




function activarAutoDJ() {
  const indice = Math.floor(Math.random() * listaVideos.length);
  const video = listaVideos[indice];

  db.ref("radio/videoActual").set(video); // Guardamos primero el video

  // 🔄 Forzamos el cambio del modo aunque ya sea "autodj"
  db.ref("radio/modoTransmision").set("espera").then(() => {
    db.ref("radio/modoTransmision").set("autodj");
  });

  // 💡 Mostramos el video altiro por si no se detecta el cambio
  mostrarVideo(video);
}


// ========== VIP ========== //

// función accederVIP removida (duplicada con funciones_comunes.js)

// función mostrarLoginVIP removida (duplicada con funciones_comunes.js)

// ========== FRASES MOTIVACIONALES ========== //


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
      }).catch((error) => {
        console.error("Error al obtener videoActual:", error);
        activarAutoDJ(); // Si no hay nada guardado, activa uno aleatorio
      });
    }
  });
}


// función actualizarReloj removida (duplicada con funciones_comunes.js)

// función obtenerEmojiClima removida (duplicada con funciones_comunes.js)

// función actualizarClima removida (duplicada con funciones_comunes.js)

// ========== EVENTOS PRINCIPALES ========== //
function cambiarModo(modo) {
  if (modo === "twitch") {
    db.ref("radio/modoTransmision").set("twitch");
  } else if (modo === "autodj") {
    activarAutoDJ();
  }
}

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
