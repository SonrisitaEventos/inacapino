// funciones_comunes.js
// 🎯 Funciones compartidas para clima, reloj, frases y animaciones

// ⏰ Actualización de la hora
function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  document.getElementById("reloj").textContent = `${horas}:${minutos}`;
}

// 🌤️ Función para obtener el emoji según el ícono
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

// 📡 Clima en tiempo real
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

// 🌜🌞 Modo Día/Noche
function toggleModo() {
  document.body.classList.toggle("modo-noche");
  document.body.classList.toggle("modo-dia");
  const modoActual = document.body.classList.contains("modo-noche") ? "noche" : "dia";
  localStorage.setItem("modoPreferido", modoActual);
}

function restaurarModo() {
  const modoGuardado = localStorage.getItem("modoPreferido");
  if (modoGuardado === "noche") {
    document.body.classList.add("modo-noche");
  } else {
    document.body.classList.add("modo-dia");
  }
}

// 📢 Frases motivacionales bajo el logo
const frases = [
  "🎉La educación es el pasaporte al futuro. ✨",
  "🎉Cada paso cuenta, sigue avanzando.🌟",
  "🎉El conocimiento es poder.🌟",
  "✨Nunca dejes de aprender.",
  "✨Todo lo que puedas imaginar, lo puedes crear. 🎉",
  "🎉Tu esfuerzo de hoy es tu éxito de mañana.✨",
  "🌟La actitud es tan importante como la habilidad.🎉"
];

function iniciarFrasesMotivacionales() {
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
}

// 🧡 Mensajes motivacionales tipo noticiero
const mensajes = [
  "🌞 ¡Hoy es un buen día para aprender algo nuevo!",
  "🎯 Sigue adelante, la meta está cada vez más cerca.",
  "🎉 Cada esfuerzo cuenta y tú lo estás haciendo genial.",
  "💡 Recuerda: una actitud positiva cambia todo.",
  "📚 Estudiar con pasión cambia tu presente y tu futuro.",
  "💪 No estás solo/a, ¡estamos contigo en cada paso!",
  "✨ Cree en ti: eres capaz de lograr cosas increíbles."
];

function iniciarNoticieroMotivacional() {
  let mensajeActual = 0;
  const contenedor = document.getElementById("mensajeTexto");
  setInterval(() => {
    if (contenedor) {
      mensajeActual = (mensajeActual + 1) % mensajes.length;
      contenedor.textContent = mensajes[mensajeActual];
      contenedor.classList.remove("mensaje-resalte");
      void contenedor.offsetWidth;
      contenedor.classList.add("mensaje-resalte");
    }
  }, 15000);
}

// ⬆️ Botón volver arriba
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🧠 Inicializar todo desde cada página
function initFuncionesComunes() {
  restaurarModo();
  actualizarReloj();
  actualizarClima();
  iniciarFrasesMotivacionales();
  iniciarNoticieroMotivacional();
  setInterval(actualizarReloj, 60000);
  setInterval(actualizarClima, 600000);
}

window.toggleModo = toggleModo;
window.scrollToTop = scrollToTop;
window.initFuncionesComunes = initFuncionesComunes;
