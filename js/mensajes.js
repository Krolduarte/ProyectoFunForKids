import { loadInfoBaby,CerrarSesionTutores  } from "../js/funciones.js";

let token = sessionStorage.getItem("token");
let idUser = sessionStorage.getItem("IdUsuario");
let tutor1 = sessionStorage.getItem("nombreTutor1");
let tutor2 = sessionStorage.getItem("nombreTutor2");
let idChild = sessionStorage.getItem("idChild");

// gesionar cerrar session
document.querySelector("#cerrarSesion").addEventListener("click", CerrarSesionTutores);

// function CerrarSesion() {
//   sessionStorage.removeItem("usuario");
//   sessionStorage.removeItem("IdUsuario");
//   sessionStorage.removeItem("idChild");
//   sessionStorage.removeItem("token");
// }
if (idUser && token) {
  loadInfoBaby();
}

const msgerForm = document.querySelector(".msger-inputarea");
const msgerInput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");

const ADMIN_MSG = "Bienvenido a FunForKids!";

// Icons made by Freepik from www.flaticon.com
const ADMIN_IMG = "../img/mensajes/admin.png";
const PERSON_IMG = "../img/mensajes/parent.png";
const ADMIN = "FUN FOR KIDS";

let tutorNames = "";
if (!tutor2) {
  tutorNames = tutor1;
} else {
  let tutorNames = tutor1 + "/" + tutor2;
}

// ******************************************************
//         CAPTURAR EVENTO AL ENVIAR EL MENSAJE
// *****************************************************

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(tutorNames, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // Haciendo fetch con el mensaje a la tabla chat

  fetch("http://localhost/proyectofinalciclo/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },

    body: JSON.stringify({
      idChild: idChild,
      idRemitente: idUser,
      idDestinatario: "admin",
      msgText: msgText,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

// function botResponse() {
//   const r = random(0, ADMIN_MSG.length - 1);
//   const msgText = ADMIN_MSG[r];
//   const delay = msgText.split(" ").length * 100;

//   setTimeout(() => {
//     appendMessage(ADMIN, ADMIN_IMG, "left", msgText);
//   }, delay);
// }

// // Utils
// function get(selector, root = document) {
//   return root.querySelector(selector);
// }

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

// function random(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

// ******************************************************
//        CARGAR MENSAJES ENVIADOS Y RECIBIDOS
// *****************************************************

fetch(`http://localhost/proyectofinalciclo/api/chat/?idChild=${idChild}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((dato) => {

   
      if (dato.idRemitente == "admin") {
        appendMessage(ADMIN, ADMIN_IMG, "left", dato.msgText);
      }
      if (dato.idRemitente  == idUser) {
        appendMessage(tutorNames, PERSON_IMG, "right", dato.msgText);
      }
    });
  });
