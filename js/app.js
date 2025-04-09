// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio, sin Firebase, y 100% funcional 🤗

console.log("✅ app.js cargado correctamente");

// Inicializar Firebase (REEMPLAZA con tu propia configuración)
// 🔥 Inicialización de Firebase en modo compat
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



// ========== VIDEO Y TRANSMISIÓN ========== //
function mostrarZenoFM() {
  const contenedor = document.getElementById("videoContainer");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="zeno-box">
        <iframe src="https://zeno.fm/player/inacapinoptomontt" width="100%" height="160" frameborder="0" scrolling="no" allow="autoplay"></iframe>
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

// ========== CAMBIO ENTRE MODOS MANUAL ========== //
function cambiarModo(modo) {
 db.ref("radio/modoTransmision").once("value").then(snapshot => {
  if (!snapshot.exists()) {
    db.ref("radio/modoTransmision").set("zeno"); // o "twitch"
  }
});


function escucharModoTransmision() {
  db.ref("radio/modoTransmision").on("value", (snapshot) => {
    const modo = snapshot.val();
    if (modo === "twitch") {
      mostrarTwitch();
    } else {
      escucharModoTransmision(); // ✅ Escucha el valor guardado y actualiza para todos

    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  escucharModoTransmision(); // 🔄 sincronización en tiempo real
});


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

// ========== INICIALIZACIÓN COMPLETA ========== //
document.addEventListener("DOMContentLoaded", () => {
 document.addEventListener("DOMContentLoaded", () => {
  restaurarModo();
  actualizarReloj();
  actualizarClima();
  escucharModoTransmision(); // Esta sincroniza a todos con la señal actual
  setInterval(actualizarReloj, 60000);
  setInterval(actualizarClima, 10 * 60 * 1000);
});

// ========== EXPORTAR FUNCIONES GLOBALES ========== //
window.mostrarLoginVIP = mostrarLoginVIP;
window.accederVIP = accederVIP;
window.cerrarLoginVIP = cerrarLoginVIP;
window.toggleModo = toggleModo;
window.cambiarModo = cambiarModo;
window.mostrarTwitch = mostrarTwitch;
window.mostrarZenoFM = mostrarZenoFM;
