document.addEventListener("DOMContentLoaded", function () {
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
      { nombre: "JAZZ & BLUES", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FJAZZ%20%26%20BLUES%20(conversar%20%2Ccaf%C3%A9%20%2Cestudiar).mp4?alt=media&token=dee26a91-1bc0-4690-aefa-7137d682acdb" },
      { nombre: "Gaming Music", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FGaming%20Music%202023.mp4?alt=media&token=d3330f02-f47d-4557-9e32-8686bd308e43" },
      { nombre: "Un Gran momento para estudiar", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F3%20HORAS%20DE%20MUSICA%20PARA%20LIVE%202022.mp4?alt=media&token=ff7fccf3-fc80-4188-a47b-b7fcb5466425" },
      { nombre: "1 Hora y a bailar", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F1%20HOUR%20MIX%20(2020).mp4?alt=media&token=6a4b4e70-94c1-46f8-b7dc-6c208e855962" },
    ];

   function cambiarVideoManual() {
  const indice = parseInt(document.getElementById("videoSelector").value);
  const videoSeleccionado = listaVideos[indice];

  // Guarda en Firebase
  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(videoSeleccionado);

  // Mostrar inmediatamente para el administrador
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



//=== modificado ====
   function accederVIP() {
  const usuario = document.getElementById("usuario").value;
  const clave = document.getElementById("clave").value;

  if (usuario === "Inacapino" && clave === "SedePuertoMontt") {
    document.getElementById("loginVIP").style.display = "none";
    document.getElementById("panelVIP").style.display = "block";
    document.getElementById("panelSelector").style.display = "block"; // <- ¡nuevo!
    alert("¡Bienvenido administrador Inacapino! 🎉");
  } else {
    alert("Usuario o contraseña incorrecta 😢");
  }
}


     // Frases animadas
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


 const images = [
      "imagenes/postales_1.jpg",
      "imagenes/postales_2.jpg",
      "imagenes/postales_3.jpg",
      "imagenes/postales_4.jpg",
      "imagenes/postales_5.jpg",
      "imagenes/postales_6.jpg"
    ];

function openModal(index) {
  currentImage = index;
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  modalImg.style.opacity = 0;
  modal.style.display = "flex";

  // Agrega la clase para el efecto fade
  setTimeout(() => {
    modal.classList.add("fade-in");
    modalImg.src = images[currentImage];
  }, 50);

  // Luego de otro pequeño delay, aplicamos opacidad
  setTimeout(() => {
    modalImg.style.opacity = 1;
  }, 100);
}


function closeModal() {
      document.getElementById("imgModal").style.display = "none";
    }

    function changeImage(step) {
      currentImage = (currentImage + step + images.length) % images.length;
      document.getElementById("modalImg").src = images[currentImage];
    }
 // Cerrar con ESC
    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    });
 // ... (todo tu código actual)

// ✅ FUNCIÓN QUE ABRE EL LOGIN VIP
function mostrarLoginVIP() {
  document.getElementById("loginVIP").style.display = "block";
}

//Al cargar la página, leer el modo actual y mostrarlo:

// ESCUCHA CAMBIO DE MODO
db.ref("radio/modoTransmision").on("value", (snapshot) => {
  const modo = snapshot.val();
  const transmision = document.getElementById("transmision");

  if (modo === "twitch") {
    transmision.innerHTML = `
  <div style="width: 100%; max-width: 960px; aspect-ratio: 16/9; margin: 0 auto;">
    <iframe 
      src="https://player.twitch.tv/?channel=xtian_alejandro&parent=sonrisitaeventos.github.io"
      allowfullscreen
      style="width: 100%; height: 100%; border: none; border-radius: 10px;">
    </iframe>
  </div>
`;

    document.getElementById("nombreVideo").innerText = `🎥 Transmisión en vivo`;
  }
});

// ESCUCHA CAMBIO DE VIDEO CUANDO MODO SEA AUTO-DJ
db.ref("radio/videoActual").on("value", (snap) => {
  db.ref("radio/modoTransmision").once("value").then((modoSnap) => {
    if (modoSnap.val() === "autodj") {
      const video = snap.val();
      const transmision = document.getElementById("transmision");
      const volumenGuardado = localStorage.getItem("volumenUsuario") || 0.5;

      transmision.innerHTML = `
        <video id="videoPlayer" autoplay controls style="width:100%; max-height:540px; border-radius:10px;">
          <source src="${video.url}" type="video/mp4">
        </video>
      `;

      const videoEl = document.getElementById("videoPlayer");
      videoEl.volume = parseFloat(volumenGuardado);
      videoEl.addEventListener("volumechange", () => {
        localStorage.setItem("volumenUsuario", videoEl.volume);
      });

      document.getElementById("nombreVideo").innerText = `🎧 Reproduciendo: ${video.nombre}`;
    }
  });
});


   
   // Mostrar/ocultar botón al hacer scroll
// Función para volver arriba
// Botón arriba
    window.onscroll = function () {
      const btn = document.getElementById("btnTop");
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    };
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
   
  function activarAutoDJ() {
  const indice = Math.floor(Math.random() * listaVideos.length);
  const videoSeleccionado = listaVideos[indice];

  db.ref("radio/modoTransmision").set("autodj");
  db.ref("radio/videoActual").set(videoSeleccionado);
}

function cambiarModo(modo) {
  if (modo === "twitch") {
    db.ref("radio/modoTransmision").set("twitch");
  }
}
   function toggleModo() {
  document.body.classList.toggle("modo-noche");
}
function actualizarReloj() {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  document.getElementById("reloj").textContent = `${horas}:${minutos}`;
}

actualizarReloj();
setInterval(actualizarReloj, 60000);

//Actualización del Clima
   
  const API_KEY = "ac05bbbe9fcb2df2fb44145383ed0342"; // Tu clave default
  const ciudad = "Puerto Montt";
  const pais = "CL";

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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_KEY}&units=metric&lang=es`)
      .then(res => res.json())
      .then(data => {
        const temperatura = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        const emoji = obtenerEmojiClima(icon);
        document.getElementById("clima").innerText = `${emoji} ${temperatura}°C`;
      })
      .catch(err => {
        console.error("Error al obtener clima:", err);
        document.getElementById("clima").innerText = "🌡️ --°C";
      });
  }

  actualizarClima();
  setInterval(actualizarClima, 10 * 60 * 1000); // Se actualiza cada 10 minutos

const mensajes = [
    "🌞 ¡Hoy es un buen día para aprender algo nuevo!",
    "🎯 Sigue adelante, la meta está cada vez más cerca.",
    "🎉 Cada esfuerzo cuenta y tú lo estás haciendo genial.",
    "💡 Recuerda: una actitud positiva cambia todo.",
    "📚 Estudiar con pasión cambia tu presente y tu futuro.",
    "💪 No estás solo/a, ¡estamos contigo en cada paso!",
    "✨ Cree en ti: eres capaz de lograr cosas increíbles."
  ];

  let mensajeActual = 0;
  const contenedor = document.getElementById("mensajeTexto");

  function cambiarMensaje() {
    mensajeActual = (mensajeActual + 1) % mensajes.length;
    contenedor.textContent = mensajes[mensajeActual];
    contenedor.classList.remove("mensaje-resalte");
    void contenedor.offsetWidth;
    contenedor.classList.add("mensaje-resalte");
  }

  setInterval(cambiarMensaje, 15000);

}); // 👈 Muy importante cerrar el addEventListener
