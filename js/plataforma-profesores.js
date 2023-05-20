import {
  calcularEdadBebe,
  calcularSalaDeAcuerdoAEdad,
  cambiarColorSiEscogido,
  CerrarSesionMonitores,
  cargarPlantillaRporteDiario,
} from "./funciones.js";

// Gestion de cerrar session
document
  .querySelector("#cerrarSesion")
  .addEventListener("click", CerrarSesionMonitores);

// ******************************************************************
//                      Gestión de fechas
// ******************************************************************
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

const dias_semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// Creamos el objeto fecha instanciándolo con la clase Date
const fecha = new Date();

let now =
  dias_semana[fecha.getDay()] +
  ", " +
  fecha.getDate() +
  " de " +
  meses[fecha.getMonth()] +
  " de " +
  fecha.getUTCFullYear();

document.querySelector(".fecha").innerHTML = now;

// today representa la fecha de hoy para enviar a reporte diario y deposiciones
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let today = year + "-" + month + "-" + day;

//##########################################################################
//                 INCLUIR ID DE MONITOR EN EL HEADBAR
// ##########################################################################
let idMonitor = sessionStorage.getItem("monitor");
document.querySelector(".idMonitor").innerHTML += idMonitor;

//saber si el profesor esta en duty de recepcion o de sala
let duty = sessionStorage.getItem("duty");
document.querySelector(".dutyDescription").innerHTML += duty.toUpperCase();

//Colores del headbar depende del duty
if (duty == "recepcion") {
    document.querySelector(".headbar").style.backgroundColor = "#4c6daa";
  }else{
      document.querySelector(".headbar").style.backgroundColor = "#f3b90f";
  }

 // *******************************Eventos de las pestañas de cada bebé ******************************

 document
 .querySelector(".pestanaPerfil")
 .addEventListener("click", loadBabyProfile);


function loadBabyProfile(e) {
    e.preventDefault();
    document
      .querySelector(".pestanaMensajes")
      .classList.remove("selectedOption");
    document
      .querySelector(".pestanaReporte")
      .classList.remove("selectedOption");
    document
      .querySelector(".pestanaPerfil")
      .classList.add("selectedOption");

 
    document.querySelector(".grisDiaper").classList.add("hidden");
    document.querySelector(".white").classList.add("hidden");
    document.querySelector(".grisSiesta").classList.add("hidden");
    document.querySelector(".profileBaby").style.display = "flex";
    document.querySelector(".mensajesBaby").style.display = "none";
  }

  document
  .querySelector(".pestanaReporte")
  .addEventListener("click", clearPestana);

  function clearPestana() {
    document
      .querySelector(".pestanaReporte")
      .classList.add("selectedOption");
    document
      .querySelector(".pestanaMensajes")
      .classList.remove("selectedOption");
    document
      .querySelector(".pestanaPerfil")
      .classList.remove("selectedOption");

    document.querySelector(".grisDiaper").classList.remove("hidden");
    document.querySelector(".white").classList.remove("hidden");
    document.querySelector(".grisSiesta").classList.remove("hidden");
    document.querySelector(".profileBaby").style.display = "none";
    document.querySelector(".mensajesBaby").style.display = "none";
  }

  document
  .querySelector(".pestanaMensajes")
  .addEventListener("click", mostrarPestanaChat);

  function mostrarPestanaChat() {
    document.querySelector(".pestanaMensajes").classList.add("selectedOption");
    document.querySelector(".pestanaReporte").classList.remove("selectedOption");
    document.querySelector(".pestanaPerfil").classList.remove("selectedOption");
  
    document.querySelector(".grisDiaper").classList.add("hidden");
    document.querySelector(".white").classList.add("hidden");
    document.querySelector(".grisSiesta").classList.add("hidden");
  
    document.querySelector(".profileBaby").style.display = "none";
    document.querySelector(".mensajesBaby").style.display = "flex";
    scrollChatWindow();
  }



 
//   ***************************************************************************
//                     FUNCIÓN QUE REVISA SI HAY MENSAJES NUEVOS
//   **************************************************************************
window.setInterval(function () {
  updateOnComingMessages();

  console.log("Comprobando si hay mensajes nuevos");
}, 5000);

//   ***************************************************************************
//        CUANDO LA PÁGINA CARGA SE ACTUALIZA LA CANTIDAD DE NIÑOS EN SALA   -llamadas a API
//   **************************************************************************

window.addEventListener("load", checKAmountBabies);

//Hace llamadas a la API dependiendo de la sala y retorna la cantidad de niños
function checKAmountBabies() {
  getKidsPerRoom(``, "#total");
  getKidsPerRoom(`?sala=1`, "#salaUno");
  getKidsPerRoom(`?sala=2`, "#salaDos");
  getKidsPerRoom(`?sala=3`, "#salaTres");
  getKidsRegistered();
}

function getKidsPerRoom(sala = "", nombreId) {
  let url = `http://localhost/proyectofinalciclo/api/children/roster/${sala}`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector(nombreId).innerHTML = data[0]["count"];
    });
}

function getKidsRegistered() {
  let url = `http://localhost/proyectofinalciclo/api/children/cantidad-registrados`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector("#totalregistrados").innerHTML = data[0]["count"];
    });
}

// ##########################################################################
//     GESTION DE ACTUALIZACION DE CANTIDAD DE NIÑOS POR SALA
// ##########################################################################

//definiendo las diferentes salas
let registrados = document.querySelector(".registrados");
let childrenListDiv = document.querySelector(".childrenList");
let sala1 = document.querySelector(".sala1");
let sala2 = document.querySelector(".sala2");
let sala3 = document.querySelector(".sala3");
let totalBebesEnSala = document.querySelector(".checkedin");
let fetchRegistrados = false;

//añadiendo evento para que muestre los niños dependiendo de la sala
totalBebesEnSala.addEventListener("click", mostrartotalBebesEnSala);
sala1.addEventListener("click", mostrarBebesSala1);
sala2.addEventListener("click", mostrarBebesSala2);
sala3.addEventListener("click", mostrarBebesSala3);
registrados.addEventListener("click", mostrarBebesRegistrados);

function mostrartotalBebesEnSala() {
  fetchRegistrados = false;
  totalBebesEnSala.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.add("greyBg");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?checkedIn=1`;
  fetchKids(url);
  getKidsPerRoom(``, "#total");
}

function mostrarBebesSala1() {
  fetchRegistrados = false;
  sala1.classList.add("chosenBox");
  if (
    sala2.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    totalBebesEnSala.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala2.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    totalBebesEnSala.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala1Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=1?checkedIn=1`;

  fetchKids(url);
  getKidsPerRoom(`?sala=1`, "#salaUno");
}
function mostrarBebesSala2() {
  fetchRegistrados = false;
  sala2.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    totalBebesEnSala.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    totalBebesEnSala.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.add("sala2Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=2?checkedIn=1`;
  fetchKids(url);
  getKidsPerRoom(`?sala=2`, "#salaDos");
}

function mostrarBebesSala3() {
  fetchRegistrados = false;
  sala3.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    totalBebesEnSala.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    totalBebesEnSala.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala3Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=3?checkedIn=1`;
  fetchKids(url);
  getKidsPerRoom(`?sala=3`, "#salaTres");
}

function mostrarBebesRegistrados() {
  fetchRegistrados = true;
  registrados.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    totalBebesEnSala.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    totalBebesEnSala.classList.remove("chosenBox");
  }
  clearList();
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("salaRegisteredColor");

  let url = `http://localhost/proyectofinalciclo/api/children/childrenlist/`;
  fetchKids(url);
}

// ##########################################################################
//                     GESTION DE FILTROS
// ##########################################################################

document.querySelector("#buscadorNombre").addEventListener("keyup", filtrar);
document.querySelector("#buscadorApellido").addEventListener("keyup", filtrar);
document.querySelector("#buscadorGenero").addEventListener("change", filtrar);

function filtrar() {
  let generoBabyInput = document.querySelector("#buscadorGenero").value;
  let nombreBabyInput = document.querySelector("#buscadorNombre").value;
  let apellidoBabyInput = document.querySelector("#buscadorApellido").value;

  let url = "";

  if (sala1.classList.contains("chosenBox")) {
    url = `http://localhost/proyectofinalciclo/api/checkedin/?`;
    if (nombreBabyInput || apellidoBabyInput || generoBabyInput) {
      url += `&sala=1`;
      if (generoBabyInput != "todos") {
        url += `&genero=${generoBabyInput}`;
      }
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }
    }
  }

  if (sala2.classList.contains("chosenBox")) {
    url = `http://localhost/proyectofinalciclo/api/checkedin/?`;
    if (nombreBabyInput || apellidoBabyInput || generoBabyInput) {
      if (generoBabyInput != "todos") {
        url += `&genero=${generoBabyInput}`;
      }
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }
      url += `&sala=2`;
    }
  }

  if (sala3.classList.contains("chosenBox")) {
    url = `http://localhost/proyectofinalciclo/api/checkedin/?`;
    if (nombreBabyInput || apellidoBabyInput || generoBabyInput) {
      url += `&sala=3`;
      if (generoBabyInput != "todos") {
        url += `&genero=${generoBabyInput}`;
      }
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }
    }
  }

  if (totalBebesEnSala.classList.contains("chosenBox")) {
    url = `http://localhost/proyectofinalciclo/api/checkedin/?checkedIn=1&`;
    if (nombreBabyInput || apellidoBabyInput || generoBabyInput) {
      if (generoBabyInput != "todos") {
        url += `&genero=${generoBabyInput}`;
      }
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }
    }
  }

  if (registrados.classList.contains("chosenBox")) {
    url = `http://localhost/proyectofinalciclo/api/children/childrenlist/?`;
    if (generoBabyInput != "todos") {
      url += `&genero=${generoBabyInput}`;
    }
    if (nombreBabyInput) {
      url += `&nombreBebe=${nombreBabyInput}`;
    }
    if (apellidoBabyInput) {
      url += `&apellido1Bebe=${apellidoBabyInput}`;
    }
  }

  fetchKids(url);
  clearList();
}

//función para que no se repitan la lista de niños al cambiar de sala.
function clearList() {
  document.querySelector(".childrenList").innerHTML = "";
}
// ##########################################################################
//                     GESTION DE DUTY: RECEPCIÓN O SALA
// ##########################################################################

//Al cargar la página depende del duty se carga total registrados o total ( en sala)

if (sessionStorage.getItem("duty") == "recepcion") {
  console.log(duty);
  fetchRegistrados = true;
  let url = `http://localhost/proyectofinalciclo/api/children/childrenlist`;
  document.querySelector(".registrados").classList.add("chosenBox");
  document.querySelector(".checkedin").classList.remove("chosenBox");
  document.querySelector(".childrenList").classList.add("salaRegisteredColor");

  fetchKids(url);
} else {
  totalBebesEnSala.classList.add("chosenBox");
  // clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?checkedIn=1`;
  fetchKids(url);
  getKidsPerRoom(``, "#total");
  getKidsPerRoom(`?sala=1`, "#salaUno");
  getKidsPerRoom(`?sala=2`, "#salaDos");
  getKidsPerRoom(`?sala=3`, "#salaTres");
}

//   **********************************************************************
//          GESTIÓN DE ACTUALIZACIÓN AL RECIBIR O ENVIAR MENSAJES DE CHAT
//   *********************************************************************

let divConIconoEmail = document.createElement("div");
divConIconoEmail.innerHTML = "";

function updateOnComingMessages() {
  let allDataId = document.querySelectorAll("[data-idChild]");

  fetch(
    `http://localhost/proyectofinalciclo/api/updatechat/?idDestinatario=admin&respondido=0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data) {
        data.forEach((dato) => {
          allDataId.forEach((child) => {
         
            if (child.dataset.idchild === dato.idChild) {
              // scrollChatWindow();
              console.log("Hay un mensaje nuevo sin responder");

              // child.innerHTML = `<img class="iconEmail" src="../img/plataforma-profesores/email(1).png" alt="email"/>`;
              divConIconoEmail.innerHTML = `<img class="iconEmail" src="../img/plataforma-profesores/email(1).png" alt="email"/>`;
              child.append(divConIconoEmail);
              if (dato.leido == 0) {
                cargarMensajes();
             
                agregarToast({
                  tipo: "exito",
                  titulo: "Info",
                  descripcion: "Tienes un mensaje nuevo!",
                });
                scrollChatWindow();
                let msg = {
                  idmsg: dato.idmsg,
                };
                fetch(`../api/updatemsg/?idmsg=${dato.idmsg}`, {
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
                    scrollChatWindow();
                  });
              }
            }
          });
        });
      } else {
        console.log("no hay msgs");
      }
    });
}

// ##########################################################################
//     GESTION DE FILA CON INFO DE CADA BEBE EN LA COLUMNA DERECHA   -PARA CARGAR PERFIL                                      !!!! revisar
// ##########################################################################

document.querySelector(".childrenList").addEventListener("click", (e) => {
  let idChildChosen = e.target.closest("div.rowChild").dataset.bebe;
  cargarPerfil(idChildChosen);

});

// ***************************************************************
//    CARGA INFORMACIÓN DEL PERFIL DE CADA NIÑO
// **************************************************************
function cargarPerfil(idChildChosen) {
  fetch(
    `http://localhost/proyectofinalciclo/api/children/info-completa/?idChild=${idChildChosen}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((element) => {
        // *****************************AÑADIR PESTAÑA PERFIL*************************
        document.querySelector(".profileBaby").innerHTML = `
        <section class="perfilSection">
            <div class="colTitulo">
            <div class="tituloBox">
                <div>Info</div>
            </div>
            </div>
  
            <div class="colInfoPerfil">
            <div class="nombreBebePerfil tituloLabel">Nombre: <span>${
              element["nombreBebe"]
            }</span> </div>
            <div class="apellidosBebePerfil tituloLabel">Apellidos:  <span>${
              element["apellido1Bebe"]
            }  ${element["apellido2Bebe"]}</span></div>
            <div class="genero tituloLabel">Género:  <span>${
              element["genero"]
            }</span></div>
            <div class="fechaNac tituloLabel">Fecha de Nacimiento:  <span>${
              element["FechaNacimiento"]
            }</span></div>
            <div class="lugar tituloLabel">Lugar de Nacimiento:  <span>${
              element["LugarNacimiento"]
            }</span></div>
            </div>

        </section>
        <hr>
  
        <section class="perfilSection">
            <div class="colTitulo">
            <div class="tituloBox">
                <div>Medicamentos</div>
            </div>
            </div>
            <div class="colInfoPerfil">
            <div class="isTakingMed tituloLabel">Toma medicamento:  <span>${
              element["isTakingMed"] == 0 ? "No" : "Si"
            }</span></div>
            <div class="medicamentoTomado tituloLabel">Toma:  <span>${
              element["medicamentoTomado"]
            }</span></div>
            <div class="isAllergicToMed tituloLabel">
                Es alérgico a algún medicamento:  <span>${
                  element["isAllergicToMed"] == 0 ? "No" : "Si"
                }</span>
            </div>
            <div class="medicamentoAlergia tituloLabel">Alergico a:  <span>${
              element["medicamentoAlergia"]
            }</span></div>
            </div>
        </section>
        <hr>
  
        <section class="perfilSection">
            <div class="colTitulo">
            <div class="tituloBox">
                <div>Alimentación</div>
            </div>
            </div>
            <div class="colInfoPerfil">
            <div class="hasFoodAllergy tituloLabel">
                Es alérgico a algún alimento: <span>${
                  element["hasFoodAllergy"] == 0 ? "No" : "Si"
                }</span>
            </div>
            <div class="alergenos tituloLabel">Alergenos:<span>${
              element["alergeno"]
            }</span></div>
            <div class="alergias tituloLabel">Orígen de Alergias:<span>${
              element["alergias"]
            }</span></div>
            </div>
         </section>
        <hr>
  
        <section class="perfilSection">
            <div class="colTitulo">
            <div class="tituloBox">
                <div>Discapacidad</div>
            </div>
            </div>
            <div class="colInfoPerfil">
            <div class="disability"><span>${
              element["hasDisability"] == 0 ? "No" : "Si"
            }</span>&nbsp;&nbsp;&nbsp;<span>${
          element["discapacidad"]
        }</&nbsp;span></div>
            </div>
        </section>
        <hr>
  
        <section class="perfilSection">
            <div class="colTitulo">
                <div class="tituloBox">
                    <div>Tutores</div>
                </div>
            </div>
            <div class="colInfoTutores">
                <div class="primerTutor">
                    <div class="tutorNombreCompleto tituloLabel">Nombre:<span>${
                      element["nombreCompletoTutor1"]
                    }</span></div>           
                </div>           
                <div class="segundoTutor">
                    <div class="tutorNombreCompleto2 tituloLabel">Nombre:<span>${
                      element["nombreCompletoTutor2"]
                    }</span></div>            
                </div>
            </div>
        </section>
        <hr>
  
        <section class="perfilSection">
            <div class="colTitulo">
                <div class="tituloBox">
                    <div>Autorizados</div>
                </div>
            </div>
            <div class="colInfoPerfil">
                <div class="autorizadoNombreCompleto tituloLabel">Nombre:<span>${
                  element["Autorizado1"]
                }</div>
                <div class="autorizadoNombreCompleto tituloLabel">Nombre:<span>${
                  element["Autorizado2"]
                }</div>
            </div>
        </section>`;
      });
    });
}

// ***************************************************************
//    FETCH KIDS HACE LLAMADAS A API CON INFO DE BEBES DEPENDIENDO DE LA URL
// **************************************************************

function fetchKids(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((bebe) => {
        let div = document.createElement("div");
        div.setAttribute("data-bebe", bebe["idChild"]);

        div.classList.add("listaBebes");

        // ##########################################################################
        //    AÑADIENDO EVENT LISTENER INDIVIDUAL QUE PERMITE MOSTRAR LA FICHA EN LA COLUMNA DERECHA
        // ##########################################################################

        div.addEventListener("click", mostrarFicha);
        div.addEventListener("click", cargarMensajes);
        let bebeApellido2 = bebe["apellido2Bebe"].substring(0, 1) + ".";
      
        // let horaIngreso =  bebe["horaIngreso"].substring(10, 16).toString();
        div.innerHTML = 
        `<div class="imagenydatos">
        <div class="fotoBebe "><img src="../uploads/${
          bebe["foto"]
        }" alt=""></div>
        <div class="datos">
          <p class="nombreBebe">${bebe["nombreBebe"]} ${
        bebe["apellido1Bebe"]
      } ${bebeApellido2}</p>
          <p class="edadBebe">${calcularEdadBebe(
            bebe["fechaNacimiento"]
          )}</p>
          <span>${agregarHoraEnRegistro(bebe["horaIngreso"])}</span>
        </div>
      </div>
      <div class="iconosInfoDetailed">
      ${checkMed()}
      ${checkAllergy()}
      ${checkDisability()}
      </div>    
      <div class="msgIcon "data-idChild="${bebe["idChild"]}">   
      ${checkFetchOrigin(bebe["checkedIn"])}
        </div>
        </div>`;
   
        function agregarHoraEnRegistro(bebeinfo){

        if(bebeinfo){
            return "Ingreso" + bebeinfo.substring(10, 16).toString()
        }else{
return "";
        }
        }
        // FetchDependingOnDuty();

        // ##########################################################################
        //     GESTION DE BOTONES QUE INDICAN SI EL BEBE TIENE ALERGIAS O TOMA MEDICAMENTOS O TIENE E.E
        // ##########################################################################
        // function FetchDependingOnDuty() {
        //   if (duty == "sala") {
          

        //     // **************Si el duty es Sala que muestre los siguientes Datos*********
        //     return `<div class="imagenydatos">
        //       <div class="fotoBebe "><img src="../uploads/${
        //         bebe["foto"]
        //       }" alt=""></div>
        //       <div class="datos">
        //         <p class="nombreBebe">${bebe["nombreBebe"]} ${
        //       bebe["apellido1Bebe"]
        //     } ${bebeApellido2}</p>
        //         <p class="edadBebe">${calcularEdadBebe(
        //           bebe["fechaNacimiento"]
        //         )}</p>
        //         <span>Ingreso:${bebe["horaIngreso"].substring(10, 16)}</span>
        //       </div>
        //     </div>
        //     <div class="iconosInfoDetailed">
        //     ${checkMed()}
        //     ${checkAllergy()}
        //     ${checkDisability()}
        //     </div>    
        //     <div class="msgIcon "data-idChild="${bebe["idChild"]}">   
        //       </div>`;
        //   } else {
        //     // **************Si el duty es Recepcion que muestre los siguientes Datos*********
        //     let bebeApellido2 = bebe["apellido2Bebe"].substring(0, 1) + ".";
        //     return `<div class="imagenydatos">
        //     <div class="fotoBebe "><img src="../uploads/${
        //       bebe["foto"]
        //     }" alt=""></div>
        //     <div class="datos">
        //       <p class="nombreBebe">${bebe["nombreBebe"]} ${
        //     bebe["apellido1Bebe"]
        //   } ${bebeApellido2}</p>
        //       <p class="edadBebe">${calcularEdadBebe(
        //         bebe["fechaNacimiento"]
        //       )}</p>
        //       <span>Ingreso:${bebe["horaIngreso"].substring(10, 16)}</span>
        //     </div>
        //   </div>
        //   <div class="iconosInfoDetailed">
        //   ${checkMed()}
        //   ${checkAllergy()}
        //   ${checkDisability()}
        //     </div>
        //     <div class="msgdiv" "data-bebe="${bebe["idChild"]}"></div>
        //     <div class="msgIcon "data-idChild="${bebe["idChild"]}">   
          
        //     ${checkFetchOrigin(bebe["checkedIn"])}
        //       </div>`;
        //   }
        // }

        function checkFetchOrigin(checkedin) {

            if(sessionStorage.getItem('duty')== 'recepcion'){

                if (fetchRegistrados) {
                    if (checkedin == 1) {
                      //Agrega un tono gris a cada perfil para indicar que estan checked in
                      div.classList.add("greyBg");
        
                      return `<p></p>`;
                    } else {
                      return `<div class="entradaTotal" data-id="${bebe["idChild"]}" data-method="checkin">Entrada</div>`;
                    }
                  } else {
                    return ` <p class="nombreBebe">
                     </p>
                     <span class="salaActual ${bgColorDependingOnSala(bebe["sala"])}">
                      ${bebe["sala"]}
                     </span><span class="salida" data-method="checkout" data-id="${
                       bebe["idChild"]
                     }" >Salida</span>`;
                  }
            }else{
                return ``;
            }
         
        }

        function bgColorDependingOnSala(sala) {
          let res = "";
          switch (sala) {
            case "1":
              res = "sala1Color";
              break;
            case "2":
              res = "sala2Color";
              break;
            case "3":
              res = "sala3Color";
              break;
          }

          return res;
        }

        function checkMed() {
          if (bebe["isTakingMed"] == 1) {
            return `<div class="iconInfo takingMeds">M</div>`;
          } else {
            return "";
          }
        }

        // function checkReportReady() {
        //   if (bebe["dailyReportReady"] == 1) {
        //     return `<img src="../img/plataforma-profesores/petition.png" alt="imagen_reporte_completo>`;
        //   } else {
        //     return "";
        //   }
        // }

        function checkAllergy() {
          if (bebe["hasFoodAllergy"] == 1 || bebe["isAllergicToMed"] == 1) {
            return `<div class="iconInfo alergic">A</div>`;
          } else {
            return "";
          }
        }

        function checkDisability() {
          if (bebe["hasDisability"] == 1) {
            return `<div class="iconInfo specialNeeds">E</div>`;
          } else {
            return "";
          }
        }

        

        // ##########################################################################
        //     RECARGA DE REPORTE DIARIO DEPENDIENDO DEL ID DE CADA NIÑO/NIÑA
        // ##########################################################################

        function mostrarFicha() {
          document
            .querySelector(".filtrosProfesores")
            .classList.add("reporteAbierto");
          document
            .querySelector(".pestanaReporte")
            .classList.add("selectedOption");
          document
            .querySelector(".pestanaMensajes")
            .classList.remove("selectedOption");
          document
            .querySelector(".pestanaPerfil")
            .classList.remove("selectedOption");

          clearPestana();

          sessionStorage.setItem("idChild", bebe["idChild"]);
          sessionStorage.setItem("idUsuario", bebe["idUsuario"]);
          sessionStorage.setItem("nombreBebe", bebe["nombreBebe"]);
          sessionStorage.setItem("apellido1Bebe", bebe["apellido1Bebe"]);
          let idChildSession = sessionStorage.getItem("idChild");
   

          // al escoger la ficha del niño se pone la listadebebes al 50%
          document.querySelector(".listabebes").classList.add("div50");
          document.querySelector(".secciones").style.display = "unset";
          document.querySelector(".secciones").classList.add("showDiv");

          // *************************************************
          // Gestion de cambio de color al escoger una fila
          // *************************************************
          div.classList.add("chosen");
          div.classList.remove("listaBebes");

          let otherDivs = document.querySelectorAll(".listaBebes");
          otherDivs.forEach((other) => {
            other.classList.remove("chosen");
            div.classList.add("listaBebes");
          });
          otherDivs.forEach((other) => other.classList.add("listaBebes"));

          document.querySelector(".infoBabyPicked").textContent = `${
            bebe["nombreBebe"] +
            " " +
            bebe["apellido1Bebe"] +
            " " +
            bebe["apellido2Bebe"]
          }`;

          // **función que carga la plantilla con la información de deposiciones, alimentacion y siestas (importada de funciones.js)
          cargarPlantillaRporteDiario();

          document
            .querySelector(".saveChanges")
            .addEventListener("click", saveChanges);

          // document
          //   .querySelector(".reportReady")
          //   .addEventListener("click", showReportReadyicon);

          // ##########################################################################
          //     AÑADIENDO EVENTO CLICK A AGREGAR MÁS PARA HACER FECTH A DEPOSICIONES
          // ##########################################################################

          document
            .querySelector(".iconoMas")
            .addEventListener("click", agregarConsistencia);

          // ##########################################################################
          //     AÑADIENDO EVENT LISTENERS ONCHANGE PARA  QUE AL ESCOGER LAS OPCIONES SE GUARDE EL VALOR
          // ##########################################################################
          var consistenciaEscogida = "";
          var numeroDeCambiosDiaper = "";
          var desayunoOpcionEscogida = "";
          var meriendaOpcionEscogida = "";
          var comidaOpcionEscogida = "";
          var siestaOpcionEscogida = "";
          // revisar consistencia
          let consistencias = document.querySelectorAll(
            'input[name="consistencia"]'
          );

          for (let consistenciaInput of consistencias) {
            consistenciaInput.addEventListener("change", function (e) {
              if (this.checked) {
                consistenciaEscogida = this.value;
                cambiarColorSiEscogido(consistencias);
              }
            });
          }

          // revisar cambio de pañal
          let cambiosDiaper = document.querySelectorAll(
            'input[name="diaperChange"]'
          );
          cambiosDiaper.forEach((cambio) => {
            cambio.addEventListener("change", function (e) {
              console.log("cambio");
              if (this.checked) {
                numeroDeCambiosDiaper = this.value;
                cambiarColorSiEscogido(cambiosDiaper);
              }
            });
          });

          // revisar Desayuno

          let desayunos = document.querySelectorAll('input[name="desayuno"]');

          for (let desayuno of desayunos) {
            desayuno.addEventListener("change", function (e) {
              if (this.checked) {
                desayunoOpcionEscogida = this.value;
                cambiarColorSiEscogido(desayunos);
              }
            });
          }

          // revisar Merienda

          let opcionesMerienda = document.querySelectorAll(
            'input[name="merienda"]'
          );

          for (let merienda of opcionesMerienda) {
            merienda.addEventListener("change", function (e) {
              if (this.checked) {
                meriendaOpcionEscogida = this.value;
                cambiarColorSiEscogido(opcionesMerienda);
              }
            });
          }

          // revisar Cena

          let opcionesComida = document.querySelectorAll(
            'input[name="comida"]'
          );

          for (let comida of opcionesComida) {
            comida.addEventListener("change", function (e) {
              if (this.checked) {
                comidaOpcionEscogida = this.value;
                cambiarColorSiEscogido(opcionesComida);
              }
            });
          }

          // revisar Cena

          let opcionesSiesta = document.querySelectorAll(
            'input[name="siesta"]'
          );

          for (let siesta of opcionesSiesta) {
            siesta.addEventListener("change", function (e) {
              if (this.checked) {
                siestaOpcionEscogida = this.value;
                cambiarColorSiEscogido(opcionesSiesta);
              }
            });
          }
          //Hace el fetch a la tabla deposiciones con el número de cambio de pañal y deposiciones:
          function agregarConsistencia() {
            fetch("../api/reportes/deposiciones/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idChild: idChildSession,
                idMonitor: idMonitor,
                consistencia: consistenciaEscogida,
                cambio_panal: numeroDeCambiosDiaper,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                agregarToast({
                  tipo: "info",
                  titulo: "Info",
                  descripcion: "Información de deposición actualizada!",
                  autoCierre: true,
                });
                document.querySelector("#liquida").checked = false;
                document
                  .querySelector("#liquida")
                  .nextElementSibling.classList.remove("selectedOption");
                document.querySelector("#blanda").checked = false;
                document
                  .querySelector("#blanda")
                  .nextElementSibling.classList.remove("selectedOption");
                document.querySelector("#dura").checked = false;
                document
                  .querySelector("#dura")
                  .nextElementSibling.classList.remove("selectedOption");
              })
              .catch((error) => {
                agregarToast({
                  tipo: "warning",
                  titulo: "Info",
                  descripcion: "No fué posible actualizar la deposición!",
                  autoCierre: true,
                });
              });
            // fin de fetch a deposiciones
          }

         
          //             Cargar actualizaciones de la ficha
          // ***************************************************************

          let url = `../api/reportes/reportediario/?idChild=${bebe["idChild"]}&fechayhora=${today}`;
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              data.forEach((dato) => {
                switch (dato["desayuno"]) {
                  case "poco":
                    document.querySelector("#pocodesayuno").checked = true;
                    document
                      .querySelector("#pocodesayuno")
                      .nextElementSibling.classList.add("selectedOption");
                    break;

                  case "bastante":
                    document.querySelector("#bastantedesayuno").checked = true;
                    document
                      .querySelector("#bastantedesayuno")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "mucho":
                    document.querySelector("#muchodesayuno").checked = true;
                    document
                      .querySelector("#muchodesayuno")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "todo":
                    document.querySelector("#tododesayuno").checked = true;
                    document
                      .querySelector("#tododesayuno")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                }

                switch (dato["merienda"]) {
                  case "poco":
                    document.querySelector("#pocomerienda").checked = true;
                    document
                      .querySelector("#pocomerienda")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "bastante":
                    document.querySelector("#bastantemerienda").checked = true;
                    document
                      .querySelector("#bastantemerienda")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "mucho":
                    document.querySelector("#muchomerienda").checked = true;
                    document
                      .querySelector("#muchomerienda")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "todo":
                    document.querySelector("#todomerienda").checked = true;
                    document
                      .querySelector("#todomerienda")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                }

                switch (dato["comida"]) {
                  case "poco":
                    document.querySelector("#pococomida").checked = true;
                    document
                      .querySelector("#pococomida")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "bastante":
                    document.querySelector("#bastantecomida").checked = true;
                    document
                      .querySelector("#bastantecomida")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "mucho":
                    document.querySelector("#muchocomida").checked = true;
                    document
                      .querySelector("#muchocomida")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "todo":
                    document.querySelector("#todocomida").checked = true;
                    document
                      .querySelector("#todocomida")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                }

                switch (dato["siesta"]) {
                  case "15":
                    document.querySelector("#quince").checked = true;
                    document
                      .querySelector("#quince")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "30":
                    document.querySelector("#treinta").checked = true;
                    document
                      .querySelector("#treinta")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "40":
                    document.querySelector("#cuarenta").checked = true;
                    document
                      .querySelector("#cuarenta")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                  case "60":
                    document.querySelector("#sesenta").checked = true;
                    document
                      .querySelector("#sesenta")
                      .nextElementSibling.classList.add("selectedOption");
                    break;

                  case "90":
                    document.querySelector("#noventa").checked = true;
                    document
                      .querySelector("#noventa")
                      .nextElementSibling.classList.add("selectedOption");
                    break;

                    case "120":
                    document.querySelector("#cientoveinte").checked = true;
                    document
                      .querySelector("#cientoveinte")
                      .nextElementSibling.classList.add("selectedOption");
                    break;
                }

                //  ****************************Llamada a Api con reporte de deposiciones para fecha actual***************************

                let url2 = `../api/reportes/deposiciones/?fechayhora=${today}&idChild=${bebe["idChild"]}`;
                fetch(url2, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    data.forEach((deposicion) => {
                      switch (deposicion["cambio_panal"]) {
                        case "1":
                          document.querySelector("#primero").checked = true;
                          document
                            .querySelector("#primero")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#hora1").title =
                            "Hora : " +
                            deposicion["fechayhora"].substring(10, 16) +
                            "-- Consistencia: " +
                            deposicion["consistencia"] +
                            "-- Monitor: " +
                            deposicion["idMonitor"];
                          break;
                        case "2":
                          document
                            .querySelector("#segundo")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#segundo").checked = true;
                          document.querySelector("#hora2").title =
                            "Hora : " +
                            deposicion["fechayhora"].substring(10, 16) +
                            "-- Consistencia: " +
                            deposicion["consistencia"] +
                            "-- Monitor: " +
                            deposicion["idMonitor"];
                          break;
                        case "3":
                          document
                            .querySelector("#tercero")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#tercero").checked = true;
                          document.querySelector("#hora3").title =
                            "Hora : " +
                            deposicion["fechayhora"].substring(10, 16) +
                            "-- Consistencia: " +
                            deposicion["consistencia"] +
                            "-- Monitor: " +
                            deposicion["idMonitor"];
                          break;
                        case "4":
                          document.querySelector("#cuarto").checked = true;
                          document
                            .querySelector("#cuarto")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#hora4").title =
                            "Hora : " +
                            deposicion["fechayhora"].substring(10, 16) +
                            "-- Consistencia: " +
                            deposicion["consistencia"] +
                            "-- Monitor: " +
                            deposicion["idMonitor"];
                          break;
                      }
                    });
                  });
              });
            });

          //Actualizar cambios en el reporte de los bebés

          function updateChanges() {
            let idreporte = `${
              bebe["apellido1Bebe"] + bebe["nombreBebe"] + today
            }`;

            fetch("../api/reportes/actualizacionreporte/", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idreporte: idreporte,
                idMonitor: idMonitor,
                idChild: bebe["idChild"],
                desayuno: desayunoOpcionEscogida,
                merienda: meriendaOpcionEscogida,
                comida: comidaOpcionEscogida,
                siesta: siestaOpcionEscogida,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
              });
            // fin de fetch
          }

          // fin de fetch reporte diario

 

          function saveChanges() {
            // **********************Revisar si hay un reporte activo****************

            let idreporte = `${
              bebe["apellido1Bebe"] + bebe["nombreBebe"] + today
            }`;

            fetch("../api/reportes/reportediario/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idreporte: idreporte,
                idMonitor: idMonitor,
                idChild: bebe["idChild"],
                desayuno: desayunoOpcionEscogida,
                merienda: meriendaOpcionEscogida,
                comida: comidaOpcionEscogida,
                siesta: siestaOpcionEscogida,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                agregarToast({
                  tipo: "info",
                  titulo: "Info",
                  descripcion: `Cambios para  ${bebe["nombreBebe"]} han sido guardados!`,
                  autoCierre: true,
                });
                console.log(data);

                //fetch a deposiciones
              })
              .catch((error) => {
                updateChanges();
                agregarToast({
                  tipo: "info",
                  titulo: "Info",
                  descripcion: `Cambios para  ${bebe["nombreBebe"]} han sido actualizados!`,
                  autoCierre: true,
                });
              });
            // fin de fetch
          }
        }

       
        document.querySelector(".childrenList").append(div);
        div.classList.add("rowChild");
      }); // fin de mostrarFicha

    

      //Función que impide que se muestre null de no haber tutor2 o autorizado 2
      function ifNullDoNotShow(info) {
        if (info == null) {
          return "&nbsp;";
        } else {
          return info + "- ";
        }
      }
      // ***********************************************************
      //          GESTION DE MODALBOX PARA ENTRADAS Y SALIDAS
      // ***********************************************************
      let entradas = document.querySelectorAll(".entradaTotal");
      let salidas = document.querySelectorAll(".salida");

      let operaciones = [entradas, salidas];

      operaciones.forEach((operacion) => {
        operacion.forEach((elemento) => {
          elemento.addEventListener("click", abrirModalBoxCheckIn);

          function abrirModalBoxCheckIn() {
            //Dibujar modal Check in
            let contenedorModal = document.createElement("div");
            contenedorModal.classList.add("contenedorModal");

            let url = `http://localhost/proyectofinalciclo/api/children/info-completa/?idChild=${elemento.dataset.id}`;
            fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                contenedorModal.innerHTML = `<div class="modalSignIn" id="modalSignIn">
                <div class="closeIcon">
                  <img class="cerrar" src="../img/plataforma-profesores/close.png" alt="" />
                </div>
                <div class="tituloModal">Entrada</div>
                <div class="fotoBebe"><img src="../uploads/${
                  data[0].foto
                }" alt=""></div>
                <div class="nombreBebe">${data[0].nombreCompletoBebe}</div>
             
                <select id="salaEscogida" name="sala">
                  <option value="0">Seleccione una sala</option>
                  <option value="1">Sala 1</option>
                  <option value="2">Sala 2</option>
                  <option value="3">Sala 3</option>
  
                </select>
                <span>Escoger entre Tutor o Autorizado</span>
                <select id="tutor" name="tutor">
                  <option value="0">Tutor</option>
                  <option value="${data[0].idTutor1}">${ifNullDoNotShow(
                  data[0].nombreCompletoTutor1
                )} ${data[0].relacion}</option>
                  <option value="${data[0].idTutor2}">${ifNullDoNotShow(
                  data[0].nombreCompletoTutor2
                )} ${ifNullDoNotShow(data[0].relacionTutor2)}</option>
                 
                </select>
                <select id="autorizado" name="autorizado">
                  <option value="0">Autorizado</option> 
                  <option value="${data[0].idAutorizado1}">${ifNullDoNotShow(
                  data[0].Autorizado1
                )} ${ifNullDoNotShow(data[0].relacionAutorizado1)} </option>
                <option value="${data[0].idAutorizado2}">${ifNullDoNotShow(
                  data[0].Autorizado2
                )} ${ifNullDoNotShow(data[0].relacionAutorizado2)}</option>
                </select>
                <button class="btnModal">Entrada</button>
              </div>`;
                //Gestion de boton para cerrar ModLal:
                document
                  .querySelector(".cerrar")
                  .addEventListener("click", cerrarModal);

                if (elemento.dataset.method == "checkin") {
                  document
                    .querySelector(".btnModal")
                    .addEventListener("click", checkIn);
                  document.querySelector(".btnModal").textContent = "Entrada";
                  document.querySelector(".tituloModal").textContent =
                    "Entrada";
                  document
                    .querySelector(".btnModal")
                    .classList.add("sala1Color");
                }

                if (elemento.dataset.method == "checkout") {
                  document
                    .querySelector(".btnModal")
                    .addEventListener("click", checkIn);
                  document.querySelector(".btnModal").textContent = "Salida";
                  document
                    .querySelector(".btnModal")
                    .classList.add("sala3Color");
                  document.querySelector(".tituloModal").textContent = "Salida";
                }

                var autorizadoEscogido = document.getElementById("autorizado");
                var tutorEscogido = document.getElementById("tutor");

                var salaEscogida = document.getElementById("salaEscogida");

                // *****************************************************************
                // Poner una sala escogida depende de la edad del niño/a
                // *****************************************************************

                let salaRecomendada = calcularSalaDeAcuerdoAEdad(
                  data[0].FechaNacimiento
                );
                var arr = Array.prototype.slice.call(salaEscogida.children);
                console.log(arr);
                arr.forEach((element) => {
                  if (element.value == salaRecomendada) {
                    element.setAttribute("selected", true);
                  }
                });

                // select option[value="0"]').attr("selected", true);

                function checkIn() {
                  console.log(tutorEscogido.value);
                  console.log(autorizadoEscogido.value);

                  let urlOperacion = "";
                  let body = {};
                  let method = "";
                  let valorCheckedin = "";

                  if (elemento.dataset.method == "checkin") {
                    urlOperacion = "../api/checkedin/";
                    method = "POST";
                    valorCheckedin = "1";
                    body = {
                      idChild: elemento.dataset.id,
                      idMonitorCheckIn: idMonitor,
                      sala: salaEscogida.value,
                    };
                    if (tutorEscogido.value == 0) {
                      body.idAutorizadoDrop = autorizadoEscogido.value;
                    }
                    if (autorizadoEscogido.value == 0) {
                      body.idTutorDrop = tutorEscogido.value;
                    }
                  } else if (elemento.dataset.method == "checkout") {
                    urlOperacion = "../api/checkedout/";
                    valorCheckedin = "0";
                    method = "PUT";
                    body = {
                      idChild: elemento.dataset.id,
                      idMonitorCheckOut: idMonitor,
                      idTutorPickUp: tutorEscogido.value,
                      idAutorizadoPickUp: autorizadoEscogido.value,
                    };
                  }

                  fetch(urlOperacion, {
                    method: method,
                    headers: {
                      "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(body),
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      console.log(data);

                      //  ********************************************
                      //  FETCH PARA MODIFICAR EL ESTADO CHECKED-IN EN TABLA CHILDREN
                      //  *******************************************
                      fetch("../api/children/childrenlist/", {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify({
                          idChild: elemento.dataset.id,
                          checkedIn: valorCheckedin,
                        }),
                      })
                        .then((response) => {
                          if (response.ok) {
                            return response.json();
                          }
                        })
                        .then((data) => {
                          window.location.reload();
                          console.log(data);
                        });
                    });

                  cerrarModal();
                }
              });

            document.querySelector(".container").appendChild(contenedorModal);
            contenedorModal.classList.add("contenedorModal");

            function cerrarModal() {
              document.querySelector(".container").removeChild(contenedorModal);
            }
          }
        });
      });
    });
}
//fin de fetchkidsURL
// ***********************************************************
//         GESTION DE CLOSE BUTTON AL LADO DE LAS PESTAÑAS
// ***********************************************************

  document
    .querySelector(".closebtnSala")
    .addEventListener("click", cerrarFicha);

  function cerrarFicha() {
    document
      .querySelector(".filtrosProfesores")
      .classList.remove("reporteAbierto");
    document.querySelector(".secciones").style.display = "none";
    document.querySelector(".listabebes").classList.remove("div50");

    let listaBebesDiv = document.querySelectorAll(".listaBebes");
          listaBebesDiv.forEach((baby) => {
            baby.classList.remove("chosen");
           
          });
  }
 

// ********************************cargar Mensajes*****************************************
function scrollChatWindow() {
  let scroll = document.querySelector(".msger");
  scroll.scrollTop = scroll.scrollHeight;
}



function cargarMensajes() {


  document.querySelector(".mensajesBaby").innerHTML = `
  <section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> Fun For Kids Chat
      </div>
      <div class="msger-header-options">
        <span><i class="fas fa-cog"></i></span>
      </div>
    </header>
  
    <main class="msger-chat">
     
           
          </div>
        </div>
      </div>      
    </main>
  
    <form class="msger-inputarea">
      <input type="text" class="msger-input" placeholder="Escribe tu mensaje...">
      <button type="submit" class="msger-send-btn">Enviar</button>
    </form>
  </section>`;

  const msgerForm = document.querySelector(".msger-inputarea");
  const msgerInput = document.querySelector(".msger-input");
  const msgerChat = document.querySelector(".msger-chat");

  const ADMIN_MSG = "Bienvenido a FunForKids!";

  // Icons made by Freepik from www.flaticon.com
  const ADMIN_IMG = "../img/mensajes/admin.png";
  const PERSON_IMG = "../img/mensajes/parent.png";
  const ADMIN = "Fun For Kids";
  let tutor1 = "tutor1";
  let tutor2 = "tutor2";

  // ******************************************************
  //         CAPTURAR EVENTO AL ENVIAR EL MENSAJE
  // *****************************************************
  function formatDate(date) {
    var fecha = new Date(date);
    // var formatDate=fecha.toLocaleString();
    let formatDate =
      fecha.getDate() +
      " de " +
      meses[fecha.getMonth()] +
      " de " +
      fecha.getFullYear() +
      "    " +
      fecha.getHours() +
      ":" +
      fecha.getMinutes();

    return formatDate;
  }

  msgerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    let fechaActual = Date.now();
    appendMessage(
      sessionStorage.getItem("monitor"),
      PERSON_IMG,
      "right",
      msgText,
      formatDate(fechaActual)
    );
    msgerInput.value = "";

    // Haciendo fetch con el mensaje a la tabla chat

    fetch("http://localhost/proyectofinalciclo/api/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify({
        idChild: sessionStorage.getItem("idChild"),
        idRemitente: "admin",
        idDestinatario: sessionStorage.getItem("idUsuario"),
        msgText: msgText,
        respondido: 0,
        leido: 0,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        //Buscar último mensaje a ese Id y ponerle respondido:
        fetch(
          `../api/updatechat/?idRemitente=${sessionStorage.getItem("idUsuario")}&idChild=${sessionStorage.getItem(
            "idChild"
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            console.log(data);
            divConIconoEmail.innerHTML = "";
            let idmsg = parseInt(data[0]["idmsg"]);
            console.log(idmsg);

            let msg = {
              idmsg: parseInt(data[0]["idmsg"]),
            };
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

  function appendMessage(name, img, side, text, date) {
    //   Simple solution for small apps
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${date}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }

  // ******************************************************
  //        CARGAR MENSAJES ENVIADOS Y RECIBIDOS
  // *****************************************************

  fetch(
    `http://localhost/proyectofinalciclo/api/chat/?idChild=${sessionStorage.getItem(
      "idChild"
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((dato) => {
        if (dato.idRemitente == "admin") {
          appendMessage(
            ADMIN,
            ADMIN_IMG,
            "right",
            dato.msgText,
            formatDate(dato.created_on)
          );
        }
        if (dato.idRemitente == sessionStorage.getItem("idUsuario")) {
          appendMessage(
            "Tutores",
            PERSON_IMG,
            "left",
            dato.msgText,
            formatDate(dato.created_on)
          );
        }
      });
    });
}

//REPORT READY CHANGES

// let agregado = false;
// function showReportReadyicon() {
//   if (!agregado) {
//     let msgIcons = document.querySelectorAll("[data-idChild]");

//     msgIcons.forEach((row) => {
//       if (row.dataset.idchild == sessionStorage.getItem("idChild")) {
//         var arrFila = Array.prototype.slice.call(row.children);

//         let img = document.createElement("img");
//         row.append(img);
//         img.src = "../img/plataforma-profesores/petition.png";
//         agregado = true;
//       }
//     });

//     fetch("../api/reportes/icono-reporte/", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({
//         idChild: sessionStorage.getItem("idChild"),
//         dailyReportReady: "1",
//       }),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   }
// }


// ******************************************************
//       GESTION DE NOTIFICACIONES TIPO TOAST
// *****************************************************
const contenedorToast = document.getElementById("contenedor-toast");

// Event listener para detectar click en los toasts
contenedorToast.addEventListener("click", (e) => {
  const toastId = e.target.closest("div.toast").id;

  if (e.target.closest("button.btn-cerrar")) {
    cerrarToast(toastId);
  }
});

// Función para cerrar el toast
const cerrarToast = (id) => {
  document.getElementById(id)?.classList.add("cerrando");
};

// Función para agregar la clase de cerrando al toast.
const agregarToast = ({ tipo, titulo, descripcion, autoCierre }) => {
  // Crear el nuevo toast
  const nuevoToast = document.createElement("div");

  // Agregar clases correspondientes
  nuevoToast.classList.add("toast");
  nuevoToast.classList.add(tipo);
  if (autoCierre) nuevoToast.classList.add("autoCierre");

  // Agregar id del toast
  const numeroAlAzar = Math.floor(Math.random() * 100);
  const fecha = Date.now();
  const toastId = fecha + numeroAlAzar;
  nuevoToast.id = toastId;

  // Iconos
  const iconos = {
    exito: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path
                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
                      />
                  </svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                  <path
                                      d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                  />
                              </svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                  <path
                                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                                  />
                              </svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                  <path
                                      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                  />
                              </svg>`,
  };

  // Plantilla del toast
  const toast = `
          <div class="contenido">
              <div class="icono">
                  ${iconos[tipo]}
              </div>
              <div class="texto">
                  <p class="titulo">${titulo}</p>
                  <p class="descripcion">${descripcion}</p>
              </div>
          </div>
          <button class="btn-cerrar">
              <div class="icono">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                      <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                  </svg>
              </div>
          </button>
      `;

  // Agregar la plantilla al nuevo toast
  nuevoToast.innerHTML = toast;

  // Agregamos el nuevo toast al contenedor
  contenedorToast.appendChild(nuevoToast);

  // Función para menajera el cierre del toast
  const handleAnimacionCierre = (e) => {
    if (e.animationName === "cierre") {
      nuevoToast.removeEventListener("animationend", handleAnimacionCierre);
      nuevoToast.remove();
    }
  };

  if (autoCierre) {
    setTimeout(() => cerrarToast(toastId), 2000);
  }

  // Agregamos event listener para detectar cuando termine la animación
  nuevoToast.addEventListener("animationend", handleAnimacionCierre);
};
