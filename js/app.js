document.addEventListener("DOMContentLoaded", function () {
  actualizarReloj();
  setInterval(actualizarReloj, 60000);

  // ✅ Modo noche o día
  const modoGuardado = localStorage.getItem("modoPreferido");
  if (modoGuardado === "noche") {
    document.body.classList.add("modo-noche");
  } else {
    document.body.classList.add("modo-dia");
  }

  // ✅ Firebase
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

  const transmision = document.getElementById("transmision");
  const zenoAudio = document.getElementById("zenoAudio");
  const nombreVideo = document.getElementById("nombreVideo");

  const listaVideos = [
    { nombre: "JAZZ & BLUES", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FJAZZ%20%26%20BLUES%20(conversar%20%2Ccaf%C3%A9%20%2Cestudiar).mp4?alt=media&token=dee26a91-1bc0-4690-aefa-7137d682acdb" },
    { nombre: "Gaming Music", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2FGaming%20Music%202023.mp4?alt=media&token=d3330f02-f47d-4557-9e32-8686bd308e43" },
    { nombre: "Un Gran momento para estudiar", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F3%20HORAS%20DE%20MUSICA%20PARA%20LIVE%202022.mp4?alt=media&token=ff7fccf3-fc80-4188-a47b-b7fcb5466425" },
    { nombre: "1 Hora y a bailar", url: "https://firebasestorage.googleapis.com/v0/b/inacapino-radio-spark.firebasestorage.app/o/videos%2F1%20HOUR%20MIX%20(2020).mp4?alt=media&token=6a4b4e70-94c1-46f8-b7dc-6c208e855962" }
  ];

  function mostrarVideoZeno(video) {
  transmision.innerHTML = `
    <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
      <source src="${video.url}" type="video/mp4">
    </video>
  `;
  nombreVideo.innerText = `🎧 Zeno + Visual: ${video.nombre}`;
  if (zenoAudio) {
    zenoAudio.volume = 0.7;
    zenoAudio.play();
  }
}


  function mostrarTwitch() {
    transmision.innerHTML = `
      <iframe 
        src="https://player.twitch.tv/?channel=xtian_alejandro&parent=sonrisitaeventos.github.io"
        allowfullscreen
        style="width: 100%; height: 100%; border: none; border-radius: 15px;">
      </iframe>
    `;
    nombreVideo.innerText = `🎥 Transmisión en vivo`;
    if (zenoAudio) zenoAudio.pause();
  }

  function iniciarModo() {
    db.ref("radio/modoTransmision").on("value", (snap) => {
      const modo = snap.val();
      if (modo === "twitch") {
        mostrarTwitch();
      } else {
        db.ref("radio/videoActual").once("value").then((videoSnap) => {
          const video = videoSnap.val();
          mostrarVideoZeno(video);
        });
      }
    });
  }
function mostrarLoginVIP() {
  const panel = document.getElementById("loginVIP");
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}

function toggleModo() {
  const body = document.body;
  if (body.classList.contains("modo-dia")) {
    body.classList.remove("modo-dia");
    body.classList.add("modo-noche");
    localStorage.setItem("modoPreferido", "noche");
  } else {
    body.classList.remove("modo-noche");
    body.classList.add("modo-dia");
    localStorage.setItem("modoPreferido", "dia");
  }
}

  iniciarModo();
// ✅ Haz global la función para que el botón pueda usarla
window.enviarMensajeChat = enviarMensajeChat;

   
// ✅ HACEMOS GLOBALES LAS FUNCIONES, DENTRO del DOMContentLoaded
window.scrollToTop = scrollToTop;
window.openModal = openModal;
window.closeModal = closeModal;
window.changeImage = changeImage;
window.mostrarLoginVIP = mostrarLoginVIP;
window.toggleModo = toggleModo;
window.cambiarVideoManual = cambiarVideoManual;
window.accederVIP = accederVIP;
window.activarAutoDJ = activarAutoDJ;
window.cambiarModo = cambiarModo;
}); // 👈 ESTE es el cierre del DOMContentLoaded

