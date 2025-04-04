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

function toggleModo() {
  document.body.classList.toggle("modo-noche");
  document.body.classList.toggle("modo-dia");
  const modoActual = document.body.classList.contains("modo-noche") ? "noche" : "dia";
  localStorage.setItem("modoPreferido", modoActual);
}

function restaurarModo() {
  const modoGuardado = localStorage.getItem("modoPreferido");
  document.body.classList.add(modoGuardado === "noche" ? "modo-noche" : "modo-dia");
}

// ========== VIDEO Y TRANSMISIÓN ========== //

function cambiarVideoManual() {
  const indice = parseInt(document.getElementById("videoSelector").value);
  const videoSeleccionado = listaVideos[indice];
  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(videoSeleccionado);

  mostrarVideo(videoSeleccionado);
}

function mostrarVideo(videoSeleccionado) {
  const contenedor = document.getElementById("transmision");
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

function accederVIP() {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();
  if (usuario === "Inacapino" && clave === "SedePuertoMontt") {
    document.getElementById("loginVIP").style.display = "none";
    document.getElementById("panelVIP").style.display = "block";
    document.getElementById("panelSelector").style.display = "block";
    alert("¡Bienvenido administrador Inacapino! 🎉");
  } else {
    alert("Usuario o contraseña incorrecta 😢");
  }
}

function mostrarLoginVIP() {
  document.getElementById("loginVIP").style.display = "block";
}

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
  const API_KEY = "ac05bbbe9fcb2df2fb44145383ed0342";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}&units=metric&lang=es`)
    .then(res => res.json())
    .then(data => {
      const temperatura = Math.round(data.main.temp);
      const icon = data.weather[0].icon;
      const emoji = obtenerEmojiClima(icon);
      document.getElementById("clima").innerText = `${emoji} ${temperatura}°C`;
    })
    .catch(() => {
      document.getElementById("clima").innerText = "🌡️ --°C";
    });
}

// ========== EVENTOS PRINCIPALES ========== //

document.addEventListener("DOMContentLoaded", () => {
  restaurarModo();
  actualizarReloj();
  setInterval(actualizarReloj, 60000);
  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000);
});

// ========== EXPORTAR FUNCIONES GLOBALES ========== //

window.toggleModo = toggleModo;
window.accederVIP = accederVIP;
window.mostrarLoginVIP = mostrarLoginVIP;
window.cambiarVideoManual = cambiarVideoManual;
window.activarAutoDJ = activarAutoDJ;
window.cambiarModo = cambiarModo;
