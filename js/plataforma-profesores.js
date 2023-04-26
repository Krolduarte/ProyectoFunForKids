import { calcularEdadBebe, cambiarColorSiEscogido } from "../js/funciones.js";

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

// ##########################################################################
//     GESTION DE ACTUALIZACION DE ROSTER : CANTIDAD DE NIÑOS POR SALA
// ##########################################################################

window.addEventListener("load", checkRoster);
document.querySelector(".checkedin").addEventListener("click", mostrarTodos);
document.querySelector(".sala1").addEventListener("click", mostrarSala1);
document.querySelector(".sala2").addEventListener("click", mostrarSala2);
document.querySelector(".sala3").addEventListener("click", mostrarSala3);
RenderPage();
// mostrarFicha();
// window.setTimeout( function() {
//   window.location.reload();
// }, 30000);

//Actualizar conteo cada 5 segundos

// window.setInterval(function () {
//   checkRoster();
//   actualizarFechaYHora();
// }, 5000);

//función para que no se repitan la lista de niños al cambiar de sala.
function clearList() {
  document.querySelector(".childrenList").innerHTML = "";
}

function RenderPage() {
  clearList();

  let url = `http://localhost/proyectofinalciclo/api/checkedin/`;
  fetchKids(url);
  fetchRoster(``, "#total");
  fetchRoster(`?sala=1`, "#salaUno");
  fetchRoster(`?sala=2`, "#salaDos");
  fetchRoster(`?sala=3`, "#salaTres");
}
function checkRoster() {
  fetchRoster(``, "#total");
  fetchRoster(`?sala=1`, "#salaUno");
  fetchRoster(`?sala=2`, "#salaDos");
  fetchRoster(`?sala=3`, "#salaTres");
}

let childrenListDiv = document.querySelector(".childrenList");
let sala1 = document.querySelector(".sala1");
let sala2 = document.querySelector(".sala2");
let sala3 = document.querySelector(".sala3");
let todos = document.querySelector(".checkedin");

function mostrarTodos() {
  todos.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
  }
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.add("greyBg");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/`;

  fetchKids(url);
  fetchRoster(``, "#total");
}

function mostrarSala1() {
  sala1.classList.add("chosenBox");
  if (
    sala2.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox")
  ) {
    sala2.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
  }
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala1Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=1`;

  fetchKids(url);
  fetchRoster(`?sala=1`, "#salaUno");
}
function mostrarSala2() {
  sala2.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.add("sala2Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=2`;
  fetchKids(url);
  fetchRoster(`?sala=2`, "#salaDos");
}

function mostrarSala3() {
  sala3.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala3Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=3`;
  fetchKids(url);
  fetchRoster(`?sala=3`, "#salaTres");
}

function fetchRoster(sala = "", nombreId) {
  let url = `http://localhost/proyectofinalciclo/api/roster/${sala}`;
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

// ##########################################################################
//     GESTION DE FILA CON INFO DE CADA BEBE EN LA COLUMNA DERECHA
// ##########################################################################

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
        //AÑADIENDO EVENT LISTENER QUE PERMITE MOSTRAR LA FICHA EN LA COLUMNA DERECHA
        div.addEventListener("click", mostrarFicha);

        div.innerHTML = `         
              <div class="imagenydatos">
                <div class="fotoBebe "><img src="../uploads/${
                  bebe["foto"]
                }" alt=""></div>
                <div class="datos">
                  <p class="nombreBebe">${bebe["nombreBebe"]}</p>
                  <p class="edadBebe">
                  ${calcularEdadBebe(bebe["fechaNacimiento"])}
                  </p>
                  <p class="horaEntrada">Entrada: ${bebe[
                    "horaIngreso"
                  ].substring(10, 19)} </p>
                </div>
              </div>
              <div class="iconosInfoDetailed">
              ${checkMed()}
              ${checkAllergy()}
              ${checkDisability()}
                
              </div>
              <div class="msgIcon">
                <img src="../img/plataforma-profesores/email(1).png" alt="" />
                <img src="../img/plataforma-profesores/petition.png" alt="">
                </div>
            `;
        // ##########################################################################
        //     GESTION DE BOTONES QUE INDICAN SI EL BEBE TIENE ALERGIAS O TOMA MEDICAMENTOS O TIENE E.E
        // ##########################################################################

        function checkMed() {
          if (bebe["isTakingMed"] == 1) {
            return `<div class="iconInfo takingMeds">Medicamentos</div>`;
          } else {
            return "";
          }
        }

        function checkAllergy() {
          if (bebe["hasFoodAllergy"] == 1 || bebe["isAllergicToMed"] == 1) {
            return `<div class="iconInfo alergic">Alergias</div>`;
          } else {
            return "";
          }
        }

        function checkDisability() {
          if (bebe["hasDisability"] == 1) {
            return `<div class="iconInfo specialNeeds">E.E</div>`;
          } else {
            return "";
          }
        }

        // ##########################################################################
        //     RECARGA DE REPORTE DIARIO DEPENDIENDO DEL ID DE CAA NIÑO/NIÑA
        // ##########################################################################

        function mostrarFicha() {
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

          document.querySelector(".diaperGrid").innerHTML = `
        
              
              
              <div class="titulo1">Deposiciones</div>
       
              <div class="btnConsistencia">
                <input type="radio"  id="liquida" name="consistencia"  value="liquida" />
                <label for="liquida">Liquida</label>

                <input   type="radio" id="blanda" name="consistencia"  value="blanda" />
                <label for="blanda">Blanda</label>

                <input type="radio"  id="dura"   name="consistencia"    value="dura" />
                <label for="dura">Dura</label>
              </div>
               
              <div class="iconoMas">
                <img src="../img/reporte-diario/add.png" alt="" />
                <div class="agregar">Agregar deposición</div>
              </div>
              
              <div class="titulo3">Cambio de Pañal</div>
              <div class="rango">
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

            <input type="radio" id="todo" name="comida" value="todo"/>
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
               <button class="saveChanges">Guardar Cambios</button>
               `;

          document
            .querySelector(".saveChanges")
            .addEventListener("click", saveChanges);

          // document
          //   .querySelector(".agregar")
          //   .addEventListener("click", agregarConsistencia);

            document
            .querySelector(".iconoMas")
            .addEventListener("click", agregarConsistencia);

          // agregar consistencia

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

          function agregarConsistencia() {

              // switch (deposicion["consistencia"]) {
                      //   case "liquida":
                      //     document.querySelector("#liquida").checked = true;
                      //     document
                      //       .querySelector("#liquida")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     break;
                      //   case "blanda":
                      //     document
                      //       .querySelector("#blanda")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     document.querySelector("#blanda").checked = true;
                      //     break;
                      //   case "dura":
                      //     document
                      //       .querySelector("#dura")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     document.querySelector("#dura").checked = true;
                      //     break;
                      // }

            //Hace el fetch a la tabla deposiciones:
            fetch("../api/reportes/deposiciones/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idChild: bebe["idChild"],
                idMonitor: 1,
                consistencia: consistenciaEscogida,
                cambio_panal: numeroDeCambiosDiaper,
              }),
            })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data);
                document.querySelector("#liquida").checked = false;
                document.querySelector("#liquida").nextElementSibling.classList.remove("selectedOption");
                document.querySelector("#blanda").checked = false;
                document.querySelector("#blanda").nextElementSibling.classList.remove("selectedOption");
                document.querySelector("#dura").checked = false;
                document.querySelector("#dura").nextElementSibling.classList.remove("selectedOption");
              });
            // fin de fetch a deposiciones
          }

          // ***************************************************************
          //             Cargar actualizaciones de la ficha
          // ***************************************************************

          let url = `../api/reportes/reportediario/?idChild=${bebe["idChild"]}`;
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

                let url2 = `../api/reportes/deposiciones/?idChild=${bebe["idChild"]}`;
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

                      
                      // switch (deposicion["consistencia"]) {
                      //   case "liquida":
                      //     document.querySelector("#liquida").checked = true;
                      //     document
                      //       .querySelector("#liquida")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     break;
                      //   case "blanda":
                      //     document
                      //       .querySelector("#blanda")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     document.querySelector("#blanda").checked = true;
                      //     break;
                      //   case "dura":
                      //     document
                      //       .querySelector("#dura")
                      //       .nextElementSibling.classList.add("selectedOption");
                      //     document.querySelector("#dura").checked = true;
                      //     break;
                      // }

                      switch (deposicion["cambio_panal"]) {
                        case "1":
                          document.querySelector("#primero").checked = true;
                          document
                            .querySelector("#primero")
                            .nextElementSibling.classList.add("selectedOption");
                            document.querySelector('#hora1').title = deposicion["fechayhora"].substring(10, 16) +"  " +deposicion["consistencia"] ;
                          break;
                        case "2":
                          document
                            .querySelector("#segundo")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#segundo").checked = true;
                          document.querySelector('#hora2').title = deposicion["fechayhora"].substring(10, 16) +"  " +deposicion["consistencia"];
                          break;
                        case "3":
                          document
                            .querySelector("#tercero")
                            .nextElementSibling.classList.add("selectedOption");
                          document.querySelector("#tercero").checked = true;
                          document.querySelector('#hora3').title = deposicion["fechayhora"].substring(10, 16) +"  " +deposicion["consistencia"];
                          break;
                        case "4":
                          document.querySelector("#cuarto").checked = true;
                          document
                            .querySelector("#cuarto")
                            .nextElementSibling.classList.add("selectedOption");
                            document.querySelector('#hora4').title = deposicion["fechayhora"].substring(10, 16) +"  " +deposicion["consistencia"];
                          break;
                      }
                    });
                  });
              });
            });

          //UPDATE CHANGES

          function updateChanges() {
            let idreporte = `${
              bebe["apellido1Bebe"] +
              bebe["nombreBebe"] +
              bebe["fechaNacimiento"]
            }`;

            fetch("../api/reportes/actualizacionreporte/", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idreporte: idreporte,
                idMonitor: 1,
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

          // *********************

          function saveChanges() {
            // **********************Revisar si hay un reporte activo****************

            let idreporte = `${
              bebe["apellido1Bebe"] +
              bebe["nombreBebe"] +
              bebe["fechaNacimiento"]
            }`;

            fetch("../api/reportes/reportediario/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify({
                idreporte: idreporte,
                idMonitor: 1,
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

                //fetch a deposiciones
              })
              .catch((error) => {
                updateChanges();
              });
            // fin de fetch
          }
        }
        // fin de mostrarFicha
        document.querySelector(".childrenList").append(div);
        div.classList.add("rowChild");
      });
      // Final de forach de cada bebe
    });
}
