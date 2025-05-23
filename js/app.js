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
  if (sessionStorage.getItem("inacapinMostrado")) return;

  const asistente = document.getElementById("asistenteInacapin");
  const audio = document.getElementById("audioInacapin");

  if (asistente) {
    asistente.style.display = "flex";
    if (audio) {
      audio.play().catch((error) => {
        console.warn("🎧 El navegador bloqueó la reproducción automática:", error);
      });
    }
    sessionStorage.setItem("inacapinMostrado", "true");
  }
}

function cerrarInacapin() {
  const asistente = document.getElementById("asistenteInacapin");
  const audio = document.getElementById("audioInacapin");

  if (asistente) {
    asistente.style.display = "none";
  }

  if (audio) {
    audio.pause();         // ⏸️ Pausar el audio
    audio.currentTime = 0; // 🔄 Volver al inicio del audio
  }
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

  // 👇 Mostrar de inmediato la transmisión seleccionada
  if (modo === "twitch") {
    mostrarTwitch();
  } else {
    mostrarZenoFM();
  }

  // Mostrar aviso visual de cambio
  const aviso = document.getElementById("avisoCambio");
  if (aviso) {
    aviso.style.display = "block";
    aviso.classList.remove("aviso-cambio");
    void aviso.offsetWidth; // reinicia animación
    aviso.classList.add("aviso-cambio");

    setTimeout(() => {
      aviso.style.display = "none";
    }, 3000);
  }
}

/* ============================
🎨 Pop-Up Formulario Talleres
============================ */
  function abrirInscripcion() {
    document.getElementById("popupInscripcion").style.display = "flex";
  }

  function cerrarInscripcion() {
    document.getElementById("formularioTaller").reset();
    document.getElementById("mensajeConfirmacion").style.display = "none";
  }

  function enviarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const carrera = document.getElementById("carrera").value;
    const jornada = document.getElementById("jornada").value;
    const actividad = document.getElementById("actividad").value;

    const asunto = "Inscripción nueva a Talleres";
    const destinatario = "criffoa@inacap.cl,cmenesesg@inacap.cl";
    const cuerpo = `Nombre: ${nombre}\nApellido: ${apellido}\nCarrera: ${carrera}\nJornada: ${jornada}\nActividad: ${actividad}`;

    window.location.href = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    document.getElementById("mensajeConfirmacion").innerText = "✅ Muchas gracias por tu compromiso, en breve nos comunicaremos contigo. ¡Sigue disfrutando de esta entretenida Jornada! 🎉";
    document.getElementById("mensajeConfirmacion").style.display = "block";

    return false; // Evita que se recargue la página
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

  // ✅ Mostrar lo que diga Firebase o Zeno por defecto
  db.ref("radio/modoTransmision").once("value")
    .then((snapshot) => {
      const modo = snapshot.val();
      if (modo === "twitch") {
        mostrarTwitch();
      } else {
        mostrarZenoFM(); // incluso si es null o no existe, cae acá
      }
    })
    .catch((error) => {
      console.warn("⚠️ Error al leer modo desde Firebase:", error);
      mostrarZenoFM(); // Fallback por si Firebase falla
    });

  // 🎧 Mantener escucha en tiempo real
  escucharModoTransmision();

  setTimeout(() => {
    mostrarAsistenteInacapin();
  }, 2500);

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
window.abrirInscripcion = abrirInscripcion;
window.cerrarInscripcion = cerrarInscripcion;
window.enviarFormulario = enviarFormulario;

