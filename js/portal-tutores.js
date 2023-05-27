import { loadInfoBaby, CerrarSesionTutores } from "./funciones.js";
let idUser = sessionStorage.getItem("IdUsuario");
let token = sessionStorage.getItem("token");
let tutor1 = sessionStorage.getItem("nombreTutor1");
let tutor2 = sessionStorage.getItem("nombreTutor2");
let idChild = sessionStorage.getItem("idChild");
let nombreBebe = sessionStorage.getItem("nombreBebe");

window.setInterval(function () {
  updateOnComingMessages();
  // cargarMensajesEnviadosYRecibidos();
  checkDiaperUpdates(today);
  if(today == document.querySelector('.chosenDate').attributes[0].value ){
    checkLogUpdates(today);  
   
  }

}, 7000);

//***********************************************************************
//         GESTIÓN DE PESTAÑAS PARA IR A REPORTE DIARIO Y MENSAJES
// ***********************************************************************

document.querySelector(".pestanaPerfil").addEventListener("click", abrirPerfil);
function abrirPerfil() {
  document.querySelector(".pestanaPerfil").classList.add("yellow");
  document.querySelector(".pestanaReporte").classList.remove("yellow");
  document.querySelector(".pestanaMensajes").classList.remove("yellow");

  document.querySelector(".seccionesPerfil").classList.remove("hidden");
  document.querySelector(".seccionesReporteDiario").classList.add("hidden");
  document.querySelector(".seccionChat").classList.add("hidden");
}

document
  .querySelector(".pestanaReporte")
  .addEventListener("click", abrirReporte);
function abrirReporte() {
  document.querySelector(".pestanaReporte").classList.add("yellow");
  document.querySelector(".pestanaMensajes").classList.remove("yellow");
  document.querySelector(".pestanaPerfil").classList.remove("yellow");

  document.querySelector(".seccionesPerfil").classList.add("hidden");
  document.querySelector(".seccionChat").classList.add("hidden");
  document.querySelector(".seccionesReporteDiario").classList.remove("hidden");
  checkLogUpdates(today);
  checkDiaperUpdates(today);

}

document
  .querySelector(".pestanaMensajes")
  .addEventListener("click", abrirMensajes);
function abrirMensajes() {
  cargarMensajesEnviadosYRecibidos();
  scrollToTheEnd();
  document.querySelector(".pestanaMensajes").classList.add("yellow");
  document.querySelector(".pestanaReporte").classList.remove("yellow");
  document.querySelector(".pestanaPerfil").classList.remove("yellow");

  document.querySelector(".seccionChat").classList.remove("hidden");
  document.querySelector(".seccionesPerfil").classList.add("hidden");
  document.querySelector(".seccionesReporteDiario").classList.add("hidden");
}

// ***********************************************************************
//                            GESTIÓN DE PERFIL
// ***********************************************************************
// gesionar cerrar session
document
  .querySelector("#cerrarSesion")
  .addEventListener("click", CerrarSesionTutores);

if (idUser && token) {
  loadInfoBaby();

}

// Informacion del bebe
let nombreBebePerfil = document.querySelector(".nombreBebePerfil");
let apellidosBebePerfil = document.querySelector(".apellidosBebePerfil");
let genero = document.querySelector(".genero");
let fechaNac = document.querySelector(".fechaNac");
let lugar = document.querySelector(".lugar");

// Informacion del Medicamentos
let isTakingMed = document.querySelector(".isTakingMed");
let isAllergicToMed = document.querySelector(".isAllergicToMed");
let medicamentoTomado = document.querySelector(".medicamentoTomado");
let medicamentoAlergia = document.querySelector(".medicamentoAlergia");

// Informacion de Alimentación
let hasFoodAllergy = document.querySelector(".hasFoodAllergy");
let alergenos = document.querySelector(".alergenos");
let alergias = document.querySelector(".alergias");

// Informacion de Discapacidad
let disability = document.querySelector(".disability");

// Informacion de Tutoresisalee
let tutorNombreCompleto = document.querySelector(".tutorNombreCompleto");
let relacionTutor = document.querySelector(".relacionTutor");
let direccionTutor = document.querySelector(".direccionTutor");
let telefonoTutor = document.querySelector(".telefonoTutor");

let tutorNombreCompleto2 = document.querySelector(".tutorNombreCompleto2");
let relacionTutor2 = document.querySelector(".relacionTutor2");
let direccionTutor2 = document.querySelector(".direccionTutor2");
let telefonoTutor2 = document.querySelector(".telefonoTutor2");

// Informacion de Autorizados
let autorizadoNombreCompleto = document.querySelector(
  ".autorizadoNombreCompleto"
);
let autorizadoRelacion = document.querySelector(".autorizadoRelacion");

let isTakingMedResponse = "";
let isAllergicToMedResponse = "";
let isAllergicToFoodResponse = "";
let hasFoodAllergyResponse = "";
let disabilityResponse = "";
let idChildfromSession = sessionStorage.getItem("idChild");

uploadBabyInfo();
function uploadBabyInfo(){

  fetch(
    `../api/matricula/matriculacompleta/?idUsuario=${sessionStorage.getItem("IdUsuario")}`,
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
        // ****************************************************
        //           FETCH PARA INFO DE PADRES
        // ****************************************************
  
        fetch(
          `../api/matricula/tutors/?idTutor=${element.idTutor1}`,
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
            sessionStorage.setItem('matriculado', 'true');
            data.forEach((element) => {
              tutorNombreCompleto.innerHTML += `<span>${element["nombreTutor"]} ${element["apellidosTutor"]}</span>`;
              relacionTutor.innerHTML += `<span>${element["relacion"]} `;
              direccionTutor.innerHTML += `<span>${element["direccion"]} `;
              telefonoTutor.innerHTML += `<span>${element["telefono"]}`;
              sessionStorage.setItem("nombreTutor1", element["nombreTutor"]);
            });
          });
  
        fetch(
          `../api/matricula/tutors/?idTutor=${element.idTutor2}`,
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
              tutorNombreCompleto2.innerHTML += `<span>${element["nombreTutor"]} ${element["apellidosTutor"]}</span>`;
              relacionTutor2.innerHTML += `<span>${element["relacion"]} `;
              direccionTutor2.innerHTML += `<span>${element["direccion"]} `;
              telefonoTutor2.innerHTML += `<span>${element["telefono"] == 0 ? "" :element["telefono"] }`;
              sessionStorage.setItem("nombreTutor2", element["nombreTutor"]);
            });
          });
  
        // ****************************************************
        //           FETCH PARA AUTORIZADOS
        // ****************************************************
  
        fetch(
          `../api/matricula/pickuplist/?idAutorizado=${element.idAutorizado1}`,
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
              autorizadoNombreCompleto.innerHTML += `<span>${element["nombreAutorizado"]} ${element["apellidosAutorizado"]}</span>`;
              autorizadoRelacion.innerHTML += `<span>${element["relacionAutorizado"]} `;
            });
          });
  
  
          fetch(
            `../api/matricula/pickuplist/?idAutorizado=${element.idAutorizado2}`,
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
              data.forEach((element2) => {
                document.querySelector('.autorizadoNombreCompleto2').innerHTML += `<span>${element2["nombreAutorizado"]} ${element2["apellidosAutorizado"]}</span>`;
                document.querySelector('.autorizadoRelacion2').innerHTML += `<span>${element2["relacionAutorizado"]} `;
              });
            });
  
        // ****************************************************
        //           FETCH PARA INFO DE NIÑO
        // ****************************************************
  
      
       
  
        fetch(
          `../api/children/childrenlist/?idChild=${sessionStorage.getItem('idChild')}`,
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
         let nombreBebe = element["nombreBebe"];
            sessionStorage.setItem("idChild", sessionStorage.getItem('idChild'));
            sessionStorage.setItem("nombreBebe", nombreBebe);
            data.forEach((element) => {
              console.log(element);
              if (element.isTakingMed == 0) {
                isTakingMedResponse = "NO";
              } else {
                isTakingMedResponse = "SI";
              }
  
              if (element.isAllergicToMed == 0) {
                isAllergicToMedResponse = "NO";
              } else {
                isAllergicToMedResponse = "SI";
              }
  
              if (element.isAllergicToFood == 0) {
                isAllergicToFoodResponse = "NO";
              } else {
                isAllergicToFoodResponse = "SI";
              }
  
              if (element.hasDisability == 0) {
                disabilityResponse = "Ninguna";
              } else {
                disability.innerHTML = `<span>${element["discapacidad"]}  </span>`;
              }
  
              if (element.hasFoodAllergy == 0) {
                hasFoodAllergyResponse = "NO";
                alergias.innerHTML = "";
                alergenos.innerHTML = "";
              } else {
                hasFoodAllergyResponse = "SI";
              }
  
              if (element.medicamentoTomado == "") {
                medicamentoTomado.innerHTML = "";
              } else {
                medicamentoTomado.innerHTML += `<span>${element["medicamentoTomado"]}</span>`;
              }
  
              nombreBebePerfil.innerHTML += `<span>  ${element["nombreBebe"]}</span>`;
              apellidosBebePerfil.innerHTML += `<span>  ${element["apellido1Bebe"]} ${element["apellido2Bebe"]}</span>`;
              fechaNac.innerHTML += `<span>${element["fechaNacimiento"]}</span>`;
              genero.innerHTML += `<span>${element["genero"]}</span>`;
              lugar.innerHTML += `<span>${element["lugarNacimiento"]}</span>`;
              isTakingMed.innerHTML += `<span>${isTakingMedResponse}</span>`;
              medicamentoAlergia.innerHTML += `<span>${element["medicamentoAlergia"] == "" ? "" : "Alergico a:" + element["medicamentoAlergia"]  }</span>`;
              isAllergicToMed.innerHTML += `<span>${isAllergicToMedResponse}</span>`;
              hasFoodAllergy.innerHTML += `<span>${hasFoodAllergyResponse}</span>`;
              alergias.innerHTML += `<span>  ${element["alergias"]}`;
              alergenos.innerHTML += `<span>${element["alergeno"]}</span>`;
            });
            // clearForm();
          });
      });
      // clearForm();
    });
}


// ***********************************************************************
//                            GESTIÓN DE REPORTE DIARIO
// ***********************************************************************
//Gestión de fecha para el reporte
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

const fecha = new Date();

let now =
  fecha.getDate() +
  " de " +
  meses[fecha.getMonth()] +
  " de " +
  fecha.getUTCFullYear();

let year = fecha.getFullYear();
let month = fecha.getMonth() + 1;
let day = fecha.getDate();
let today = year + "-" + month + "-" + day;

//Funcion para cargar en la cabecera la foto y nombre de la Bebé


if (token) {
  getIdChild();
  loadInfoBaby();
  
  cargarFicha();
  checkLogUpdates(today);
  checkDiaperUpdates(today);
  
}

// ***************************************************************
//          CARGAR BOTONES Y FECHA ACTUAL
// ***************************************************************
document.querySelector(".areaFecha").innerHTML = `<div id="divCalendario">
<img class="calendario" src="../img/reporte-diario/calendar.png" id="calendar" alt="calendario">

<input type="date" id="fechaExacta" name="fechaExacta"    min="2020-01-01">
</div>

<div class="fechaExactaFlechas">
<img class="arrows" src="../img/reporte-diario/left-arrow.png" id="btnPreviousDate" alt="leftarrow">
       <span dataset-id="${today}" class="chosenDate">${now} </span>    
  <img src="../img/reporte-diario/right-arrow(2).png" alt="rightarrow" class="arrows" id="btnNextDate" >
</div>
`;

// ***************************************************************
//            ACTUALIZAR INFO AL DAR ANTERIOR
// ***************************************************************

document
  .querySelector("#btnPreviousDate")
  .addEventListener("click", goToPreviousDate);

function goToPreviousDate() {
  fecha.setDate(fecha.getDate() - 1);
  let day = fecha.getDate();
  year = fecha.getFullYear();
  month = fecha.getMonth() + 1;
  today = year + "-" + month + "-" + day;
  cargarFicha();

  checkLogUpdates(today);
  checkDiaperUpdates(today);

  document.querySelector(".chosenDate").innerText =
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getUTCFullYear();
}
// ***************************************************************
//            ACTUALIZAR INFO AL DAR SIGUIENTE
// ***************************************************************

document.querySelector("#btnNextDate").addEventListener("click", goToNextDate);

function goToNextDate() {
  fecha.setDate(fecha.getDate() + 1);
  let day = fecha.getDate();
  year = fecha.getFullYear();
  month = fecha.getMonth() + 1;

  today = year + "-" + month + "-" + day;
  cargarFicha();

  checkLogUpdates(today);
  checkDiaperUpdates(today);
  document.querySelector(".chosenDate").innerText =
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getUTCFullYear();
}

// ***************************************************************
//           FUNCION PARA CARGAR FICHA
// ***************************************************************

function cargarFicha() {
  document.querySelector(".diaperGrid").innerHTML = `

      <div class="titulo5">Cambio de Pañal</div>
      <div class="rango5">
        <input type="radio" id="primero" name="diaperChange" value="1"/>
        <label for="primero"><abbr id="hora1" title="">1</abbr></label>

        <input type="radio" id="segundo" name="diaperChange" value="2"/>
        <label for="segundo"><abbr id="hora2" title="">2</abbr></label>

        <input type="radio" id="tercero" name="diaperChange" value="3"/>
        <label for="tercero"><abbr id="hora3" title="">3</abbr></label>

        <input type="radio" id="cuarto" name="diaperChange" value="4"/>
        <label for="cuarto"><abbr id="hora4" title="">4</abbr></label>  
      </div>
 

      `;

  document.querySelector(
    ".foodGrid"
  ).innerHTML = ` <div class="titulo1">Desayuno</div>
     
   

      <div class="rango3">
        <input type="radio"  id="pocodesayuno"  name="desayuno"  value="poco"/>
      <label for="pocodesayuno">Poco</label>

      <input type="radio"  id="bastantedesayuno"  name="desayuno" value="bastante"/>
    <label for="bastantedesayuno">Bastante</label>

    <input  type="radio" id="muchodesayuno" name="desayuno" value="mucho"/>
    <label for="muchodesayuno">Mucho</label>

    <input type="radio"   id="tododesayuno"  name="desayuno" value="todo"/>
    <label for="tododesayuno">Todo</label>
      </div>
      <div class="titulo2">Merienda</div>
      <div class="rango2">
        <input type="radio"  id="pocomerienda"  name="merienda" value="poco"/>
      <label for="pocomerienda">Poco</label>

      <input type="radio" id="bastantemerienda" name="merienda"  value="bastante"/>
      <label for="bastantemerienda">Bastante</label>

    <input type="radio"  id="muchomerienda" name="merienda" value="mucho" />
    <label for="muchomerienda">Mucho</label>

    <input  type="radio" id="todomerienda" name="merienda"   value="todo"/>
    <label for="todomerienda">Todo</label>
      </div>
      <div class="titulo3">Comida</div>
      <div class="rango">
        
        <input type="radio"   id="pococomida" name="comida" value="poco"/>
      <label for="pococomida">Poco</label>

      <input type="radio" id="bastantecomida"  name="comida"   value="bastante" />
    <label for="bastantecomida">Bastante</label>

    <input type="radio" id="muchocomida" name="comida"  value="mucho"/>
    <label for="muchocomida">Mucho</label>

    <input type="radio" id="todocomida" name="comida" value="todo"/>
    <label for="todocomida">Todo</label>
      </div>`;

  document.querySelector(
    ".siestaGrid"
  ).innerHTML = ` <div class="titulo1">Siesta</div>
      <div class="rango4">
        <input type="radio" id="quince" name="siesta"  value="15"/>
      <label for="quince">15 min</label>

      <input type="radio"  id="treinta"  name="siesta"  value="30"/>
    <label for="treinta">30 min</label>

    <input  type="radio"  id="cuarenta"  name="siesta"   value="40"/>
    <label for="cuarenta">40 min</label>

    <input type="radio" id="sesenta" name="siesta"  value="60"/>
    <label for="sesenta">60 min</label>

    <input type="radio" id="noventa" name="siesta" value="90"/>
    <label for="noventa">90 min</label>
      </div>
     
       `;
}

// ***************************************************************
//             CConseguir Id de niño
// ***************************************************************
function getIdChild() {
  let urlbaby = `../api/matricula/matriculacompleta/?idUsuario=${idUser}`;
  fetch(urlbaby, {
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
        sessionStorage.setItem("idChild", bebe.idChild);
      });
    });
}




let notificacionMerienda = sessionStorage.getItem('notificacionMerienda');
let notificacionComida = sessionStorage.getItem('notificacionComida');
let notificacionSiesta = sessionStorage.getItem('notificacionSiesta');

// function alertarDependeDeActualizacion(tipoNotificacion,tipodato,msg){
//   if(!tipoNotificacion){
//     if(tipodato= ""){
//       agregarToast({
//         tipo: "info",
//         titulo: "Actualización",
//         descripcion:  msg,
//         autoCierre: true,
//       });
//       tipoNotificacion = true;
     
//      }
//    }
// }




function checkLogUpdates(fechaEscogida) {
  let idChild = sessionStorage.getItem("idChild");
  let url = `../api/reportes/reportediario/?idChild=${idChild}&fechayhora=${fechaEscogida}`;
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
        
  
   if(sessionStorage.getItem('notificacionDesayuno') == 'false'){
    if(dato.desayuno != ""){
      agregarToast({
        tipo: "info",
        titulo: "Actualización",
        descripcion:  "Su bebé ha desayunado!",
        autoCierre: true,
      });
     
      sessionStorage.setItem("notificacionDesayuno", 'true');
     }
   }

 
   if(sessionStorage.getItem('notificacionMerienda')== 'false'){
    if(dato.merienda != ""){
      agregarToast({
        tipo: "info",
        titulo: "Actualización",
        descripcion:  "Su bebé ha merendado!",
        autoCierre: true,
      });
      sessionStorage.setItem("notificacionMerienda", 'true');
    
     }
   }

   if(sessionStorage.getItem('notificacionComida')== 'false'){
    if(dato.comida != ""){
      agregarToast({
        tipo: "info",
        titulo: "Actualización",
        descripcion:  "Su bebé ha comido!",
        autoCierre: true,
      });
      sessionStorage.setItem("notificacionComida", 'true');
    
     }
   }

   
   if(sessionStorage.getItem('notificacionSiesta')== 'false'){
    if(dato.siesta != ""){
      agregarToast({
        tipo: "info",
        titulo: "Actualización",
        descripcion:  "Su bebé ha tomado una siesta!",
        autoCierre: true,
      });
      sessionStorage.setItem("notificacionSiesta", 'true');
    
     }
   }



      
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
        }

        // otro fetch a deposiciones
      });
    });
}

function checkDiaperUpdates(fechaEscogida) {
  let urldepo = `../api/reportes/deposiciones/?fechayhora=${fechaEscogida}&idChild=${sessionStorage.getItem('idChild')}`;

  fetch(urldepo, {
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
              deposicion["fechayhora"].substring(10, 16) +
              "  " +
              deposicion["consistencia"];
            break;
          case "2":
            document
              .querySelector("#segundo")
              .nextElementSibling.classList.add("selectedOption");
            document.querySelector("#segundo").checked = true;
            document.querySelector("#hora2").title =
              deposicion["fechayhora"].substring(10, 16) +
              "  " +
              deposicion["consistencia"];
            break;
          case "3":
            document
              .querySelector("#tercero")
              .nextElementSibling.classList.add("selectedOption");
            document.querySelector("#tercero").checked = true;
            document.querySelector("#hora3").title =
              deposicion["fechayhora"].substring(10, 16) +
              "  " +
              deposicion["consistencia"];
            break;
          case "4":
            document.querySelector("#cuarto").checked = true;
            document
              .querySelector("#cuarto")
              .nextElementSibling.classList.add("selectedOption");
            document.querySelector("#hora4").title =
              deposicion["fechayhora"].substring(10, 16) +
              "  " +
              deposicion["consistencia"];
            break;
        }
      });
    });
}

// ******************************************
//       GESTIÓN DE BUSCADOR POR FECHA
// ******************************************

document
  .querySelector("#fechaExacta")
  .addEventListener("change", filtrarPorFechaExacta);

function filtrarPorFechaExacta() {
  
  cargarFicha();
  let fechaEscogida = document.querySelector("#fechaExacta").value;

  checkLogUpdates(fechaEscogida);
  checkDiaperUpdates(fechaEscogida);
}

// ***********************************************************************
//                            GESTIÓN DE CHAT
// ***********************************************************************
let divMsgNew = document.createElement("div");
 divMsgNew.classList.add("visiblemsg");

function updateOnComingMessages() {
  scrollToTheEnd();
  fetch(
    `../api/updatechat/?idRemitente=admin&idChild=${sessionStorage.getItem("idChild")}&respondido=0`,
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
        if (data) {
        if (sessionStorage.getItem("idChild") === dato.idChild) {
          console.log("Hay un mensaje nuevo sin responder");
       

          document.querySelector(".pestanaMensajes").append(divMsgNew);
          divMsgNew.innerHTML = `<img src='../img/mensajes/mail.png'></img>`;

          if (dato.leido == 0) {
            cargarMensajesEnviadosYRecibidos();

            agregarToast({
              tipo: "newmessage",
              titulo: "Info",
              descripcion: "Tienes un mensaje nuevo!",
            });

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
                scrollToTheEnd();
                console.log("leido pasa a ser 1");
              });
          }
        } 
      }else{
        console.log("no hay msgs");
      }
      });
    });
}


function scrollToTheEnd() {
  let scroll = document.querySelector(".msger");
  scroll.scrollTop = scroll.scrollHeight;
}

const msgerForm = document.querySelector(".msger-inputarea");
const msgerInput = document.querySelector(".msger-input");
const msgerChat = document.querySelector(".msger-chat");

const ADMIN_MSG = "Bienvenido a FunForKids!";

// Icons made by Freepik from www.flaticon.com
const ADMIN_IMG = "../img/mensajes/admin.png";
const PERSON_IMG = "../img/mensajes/parent.png";
const ADMIN = "FUN FOR KIDS";
const TUTORES = "Tutores";


// ******************************************************
//         CAPTURAR EVENTO AL ENVIAR EL MENSAJE
// *****************************************************

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  let fechaActual = Date.now();

  appendMessage(
    TUTORES,
    PERSON_IMG,
    "right",
    msgText,
    formatDate(fechaActual)
  );
  msgerInput.value = "";

  // Haciendo fetch con el mensaje a la tabla chat

  fetch("../api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },

    body: JSON.stringify({
      idChild: sessionStorage.getItem('idChild'),
      idRemitente: idUser,
      idDestinatario: "admin",
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
      document.querySelector(".pestanaMensajes").innerHTML = `Mensajes
      
      `;

      //Buscar último mensaje a ese Id y ponerle respondido:
      fetch(`../api/updatechat/?idRemitente=admin&idChild=${sessionStorage.getItem('idChild')}`, {
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
         
          if(data.length > 0){
           
            let idmsg = parseInt(data[0]["idmsg"]);
            let msg = {
              idmsg: parseInt(data[0]["idmsg"]),
            };
          
       

          
          //Metodo put

          fetch(`../api/updatechat/?idmsg=${idmsg}&respondido=1`, {
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

          }else{
            console.log("Mensaje respondido a guarderia");
          }
        });
    });
});

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

// ******************************************************
//        CARGAR MENSAJES ENVIADOS Y RECIBIDOS
// *****************************************************

function cargarMensajesEnviadosYRecibidos() {
  fetch(`../api/chat/?idChild=${sessionStorage.getItem('idChild')}`, {
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
          appendMessage(
            ADMIN,
            ADMIN_IMG,
            "left",
            dato.msgText,
            formatDate(dato.created_on)
          );
        }
        if (dato.idRemitente == idUser) {
          appendMessage(
            TUTORES,
            PERSON_IMG,
            "right",
            dato.msgText,
            formatDate(dato.created_on)
          );
        }
      });
    });
}

function appendMessage(name, img, side, text, date) {
  const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time"><abbr id="fechamsg" title="${date}">${date.substring(
    date.length - 5
  )}</abbr></div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
  scrollToTheEnd();
}

// ******************************************************
//       GESTION DE NOTIFICACIONES TIPO TOAST
// *****************************************************
const contenedorToast = document.getElementById("contenedor-toast");

// contenedorBotones.addEventListener('click', (e) => {
// 	e.preventDefault();

// 	const tipo = e.target.dataset.tipo;

// 	if (tipo === 'exito') {
// 		agregarToast({ tipo: 'exito', titulo: 'Exito!', descripcion: 'La operación fue exitosa.', autoCierre: true });
// 	}
// 	if (tipo === 'error') {
// 		agregarToast({ tipo: 'error', titulo: 'Error', descripcion: 'Hubo un error', autoCierre: true });
// 	}
// 	if (tipo === 'info') {
// 		agregarToast({ tipo: 'info', titulo: 'Info', descripcion: 'Esta es una notificación de información.' });
// 	}
// 	if (tipo === 'warning') {
// 		agregarToast({ tipo: 'warning', titulo: 'Warning', descripcion: 'Ten cuidado' });
// 	}
// });

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

    newmessage: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 25 25">
              <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z"/>
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
    setTimeout(() => cerrarToast(toastId), 5000);
  }

  // Agregamos event listener para detectar cuando termine la animación
  nuevoToast.addEventListener("animationend", handleAnimacionCierre);
};

// ****************************************************************
//           GESTIÓN DE EDICIÓN DE INFO DE MATRÍCULA
// ****************************************************************

document.querySelector('#btnEditProfile').addEventListener('click', () => {
  sessionStorage.setItem('edicionMatricula', 'true')
})

