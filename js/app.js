// 🎉 ¡Hola querido Cristián! Este es tu archivo JS limpio, corregido y consolidado con amor 🤗

// ========== CONFIGURACIÓN INICIAL ========== //
console.log("✅ app.js cargado correctamente");


// ========== VIDEO Y TRANSMISIÓN ========== //
function mostrarZenoFM() {
  const contenedor = document.getElementById("videoContainer");
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="zeno-box">
        <iframe src="https://zeno.fm/player/inacapinoptomontt" width="768" height="600" frameborder="0" scrolling="no"></iframe><a href="https://zeno.fm/" target="_blank" style="display: block; font-size: 0.9em; line-height: 10px;">A Zeno.FM Station</a>
      </div>
    `;
  }

  const nombre = document.getElementById("nombreVideo");
  if (nombre) {
    nombre.innerText = `🎧 Escuchando: Radio Online`;
  }
}

function activarAutoDJ() {
  db.ref("radio/modoTransmision").set("autodj");
}

// ========== CAMBIO ENTRE MODOS ========== //
function escucharModoTransmision() {
  db.ref("radio/modoTransmision").on("value", (snapshot) => {
    const modo = snapshot.val();
    if (modo === "twitch") {
      mostrarTwitch();
    } else if (modo === "autodj") {
      mostrarZenoFM();
    }
  });
}

function cambiarModo(modo) {
  if (modo === "twitch") {
    db.ref("radio/modoTransmision").set("twitch");
  } else if (modo === "autodj") {
    activarAutoDJ();
  }
}

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

// ========== EVENTOS INICIALES ========== //
document.addEventListener("DOMContentLoaded", () => {
  restaurarModo();
  actualizarReloj();
  setInterval(actualizarReloj, 60000);
  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000);
  escucharModoTransmision();
});

// ========== EXPORTAR FUNCIONES GLOBALES ========== //
window.mostrarLoginVIP = mostrarLoginVIP;
window.accederVIP = accederVIP;
window.cerrarLoginVIP = cerrarLoginVIP;
window.toggleModo = toggleModo;
window.activarAutoDJ = activarAutoDJ;
window.cambiarModo = cambiarModo;
