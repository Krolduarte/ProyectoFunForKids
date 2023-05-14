import { loadInfoBaby,CerrarSesionTutores } from "../js/funciones.js";

let token = sessionStorage.getItem("token");
let idUser = sessionStorage.getItem("IdUsuario");

// gesionar cerrar session
document.querySelector("#cerrarSesion").addEventListener("click", CerrarSesionTutores);


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

loadInfoBaby();
getIdChild();
cargarFicha();
checkLogUpdates(today);
checkDiaperUpdates(today);


if (idUser && token) {
  loadInfoBaby();

}

// ***************************************************************
//          CARGAR BOTONES Y FECHA ACTUAL
// ***************************************************************
document.querySelector(
  ".areaFecha"
).innerHTML = `<div id="divCalendario">
<img class="calendario" src="../img/reporte-diario/calendar.png" id="calendar" alt="calendario">

<input type="date" id="fechaExacta" name="fechaExacta"    min="2020-01-01">
</div>


<img class="arrows" src="../img/reporte-diario/left-arrow.png" id="btnPreviousDate" alt="leftarrow">
       <span class="chosenDate">${now} </span>    
  <img src="../img/reporte-diario/right-arrow(2).png" alt="rightarrow" class="arrows" id="btnNextDate" >`;

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
      <div class="titulo2">Merienda</div>
      <div class="titulo3">Comida</div>

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
      <div class="rango3">
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
        switch (dato["desayuno"]) {
          case "poco":
            document.querySelector("#pocodesayuno").checked = true;
            document.querySelector("#pocodesayuno")
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
  let idChild = sessionStorage.getItem("idChild");
  let urldepo = `../api/reportes/deposiciones/?fechayhora=${fechaEscogida}&idChild=${idChild}`;

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

document.querySelector('#fechaExacta').addEventListener('change', filtrarPorFechaExacta);

function filtrarPorFechaExacta(){
  cargarFicha();
  let fechaEscogida = document.querySelector('#fechaExacta').value; 

  checkLogUpdates(fechaEscogida);
  checkDiaperUpdates(fechaEscogida)
}
