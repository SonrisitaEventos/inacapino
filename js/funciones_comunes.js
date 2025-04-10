// funciones_comunes.js
// 🎯 Funciones compartidas para clima, reloj, frases y más

// ⏰ Actualizar reloj
function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  document.getElementById("reloj").textContent = `${horas}:${minutos}`;
}

// 🌤️ Clima desde OpenWeather
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
  const API_KEY = "ac05bbbe9fcb2df2fb44145383ed0342";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},CL&appid=${API_KEY}&units=metric&lang=es`)
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

// 🌗 Cambiar modo claro/oscuro
function toggleModo() {
  document.body.classList.toggle("modo-noche");
  document.body.classList.toggle("modo-dia");
  const modo = document.body.classList.contains("modo-noche") ? "noche" : "dia";
  localStorage.setItem("modoPreferido", modo);
}

function restaurarModo() {
  const modo = localStorage.getItem("modoPreferido");

  if (modo === "noche" || !modo) {
    document.body.classList.add("modo-noche");
    document.body.classList.remove("modo-dia");
    localStorage.setItem("modoPreferido", "noche");
  } else {
    document.body.classList.add("modo-dia");
    document.body.classList.remove("modo-noche");
  }
}


// 💬 Frases animadas bajo el logo
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
    const fraseEl = document.getElementById('frase');
    if (fraseEl) {
      fraseActual = (fraseActual + 1) % frases.length;
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

// 📢 Noticiero motivacional
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
  let actual = 0;
  const contenedor = document.getElementById("mensajeTexto");
  setInterval(() => {
    if (contenedor) {
      actual = (actual + 1) % mensajes.length;
      contenedor.textContent = mensajes[actual];
      contenedor.classList.remove("mensaje-resalte");
      void contenedor.offsetWidth;
      contenedor.classList.add("mensaje-resalte");
    }
  }, 15000);
}

// 🔐 Login VIP
function mostrarLoginVIP() {
  document.getElementById("fondoLogin").style.display = "flex";
}

function cerrarLoginVIP() {
  document.getElementById("fondoLogin").style.display = "none";
}

function accederVIP() {
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("clave").value;

  if (user === "Inacapino" && pass === "SedePuertoMontt") {
    cerrarLoginVIP();
    const panel = document.getElementById("panelVIP");
    if (panel) panel.style.display = "block";
  } else {
    alert("Credenciales incorrectas.");
  }
}

// 🖼️ Galería de postales
let imagenes = [];
let modal = null;
let modalImg = null;
let index = 0;

function openModal(i) {
  index = i;
  modal.style.display = 'flex';
  modalImg.src = imagenes[index].src;
}

function closeModal() {
  modal.style.display = 'none';
}

function changeImage(dir) {
  index = (index + dir + imagenes.length) % imagenes.length;
  modalImg.src = imagenes[index].src;
}

function moverGaleria(direccion) {
  const galeria = document.querySelector(".gallery-container");
  if (galeria) {
    const anchoItem = galeria.querySelector(".gallery-item img").offsetWidth + 12;
    galeria.scrollLeft += direccion * anchoItem;
  }
}

// ⬆️ Volver arriba
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 📦 Inicialización global
function initFuncionesComunes() {
  restaurarModo();
  actualizarReloj();
  actualizarClima();
  iniciarFrasesMotivacionales();
  iniciarNoticieroMotivacional();
  setInterval(actualizarReloj, 60000);
  setInterval(actualizarClima, 10 * 60 * 1000);

  // Inicializar galería
  imagenes = document.querySelectorAll('.imagen-postal');
  modal = document.getElementById('imgModal');
  modalImg = document.getElementById('modalImg');

  // Mostrar botón scroll top
  const btn = document.getElementById("btnTop");
  window.addEventListener("scroll", () => {
    if (btn) btn.style.display = window.scrollY > 300 ? "block" : "none";
  });
}

// 🌐 Exportar al global
window.scrollToTop = scrollToTop;
window.moverGaleria = moverGaleria;
window.openModal = openModal;
window.closeModal = closeModal;
window.changeImage = changeImage;
window.mostrarLoginVIP = mostrarLoginVIP;
window.cerrarLoginVIP = cerrarLoginVIP;
window.accederVIP = accederVIP;
window.toggleModo = toggleModo;
window.initFuncionesComunes = initFuncionesComunes;
