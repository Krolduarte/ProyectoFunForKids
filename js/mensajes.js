import { loadInfoBaby,CerrarSesionTutores  } from "../js/funciones.js";

let token = sessionStorage.getItem("token");
let idUser = sessionStorage.getItem("IdUsuario");
let tutor1 = sessionStorage.getItem("nombreTutor1");
let tutor2 = sessionStorage.getItem("nombreTutor2");
let idChild = sessionStorage.getItem("idChild");


const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
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

function scrolled(){
  let scroll = document.querySelector('.msger');
  scroll.scrollTop = scroll.scrollHeight;
  console.log("scrolleado");
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
      respondido: 0,
      
    }),
  })
    .then((response) => {
      return response.json();




    })
    .then((data) => {
      console.log(data);

//Buscar último mensaje a ese Id y ponerle respondido:
fetch(`../api/updatechat/?idRemitente=admin&idChild=${idChild}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
    let idmsg =  parseInt(data[0]["idmsg"]);
    console.log(idmsg);

    let msg = {
      idmsg : parseInt(data[0]["idmsg"])
    }
    //Metodo put

    fetch(`../api/updatechat/?idmsg=${idmsg}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(msg),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  });

    });
});

function appendMessage(name, img, side, text,date) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time"><abbr id="fechamsg" title="${date}">${date.substring(date.length - 5)}</abbr></div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
  scrolled();
}


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
      var fecha=new Date(dato.created_on);
      // var formatDate=fecha.toLocaleString();
      let formatDate = 
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getFullYear() + "    " + 
    fecha.getHours() + ':' + fecha.getMinutes();
   
   
      if (dato.idRemitente == "admin") {
        appendMessage(ADMIN, ADMIN_IMG, "left", dato.msgText,formatDate);
      }
      if (dato.idRemitente  == idUser) {
        appendMessage(tutorNames, PERSON_IMG, "right", dato.msgText, formatDate);
      }
    });
  });
