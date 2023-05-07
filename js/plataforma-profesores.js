import {
  calcularEdadBebe,
  calcularSalaDeAcuerdoAEdad,
  cambiarColorSiEscogido,
  CerrarSesionMonitores,
  cargarPlantillaRporteDiario,
} from "../js/funciones.js";

// Gestion de cerrar session
document
  .querySelector("#cerrarSesion")
  .addEventListener("click", CerrarSesionMonitores);

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
//     INCLUIR ID DE MONITOR EN EL HEADBAR
// ##########################################################################
let idMonitor = sessionStorage.getItem("monitor");
document.querySelector(".idMonitor").innerHTML += idMonitor;

//saber si el profesor esta en duty de recepcion o de sala
let duty = sessionStorage.getItem("duty");

// ##########################################################################
//     GESTION DE ACTUALIZACION DE ROSTER : CANTIDAD DE NIÑOS POR SALA
// ##########################################################################

window.addEventListener("load", checkRoster);

let registrados = document.querySelector(".registrados");
let childrenListDiv = document.querySelector(".childrenList");
let sala1 = document.querySelector(".sala1");
let sala2 = document.querySelector(".sala2");
let sala3 = document.querySelector(".sala3");
let todos = document.querySelector(".checkedin");
let fetchRegistrados = false;

todos.addEventListener("click", mostrarTodos);
sala1.addEventListener("click", mostrarSala1);
sala2.addEventListener("click", mostrarSala2);
sala3.addEventListener("click", mostrarSala3);
registrados.addEventListener("click", fetchRegistered);

RenderPage();

document.querySelector("#buscadorNombre").addEventListener("keyup", filtrar);
document.querySelector("#buscadorApellido").addEventListener("keyup", filtrar);
document.querySelector("#buscadorGenero").addEventListener("keyup", filtrar);

function filtrar() {
  let nombreBabyInput = document.querySelector("#buscadorNombre").value;
  let apellidoBabyInput = document.querySelector("#buscadorApellido").value;
  let generoBabyInput = document.querySelector("#buscadorGenero").value;
  let url = "";
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox")
  ) {
    url = `http://localhost/proyectofinalciclo/api/checkedin/?checkedIn=1`;
    if (sala1.classList.contains("chosenBox")) {
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}&sala=1`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}&sala=1`;
      }

      if (generoBabyInput) {
        url += `&genero=${generoBabyInput}&sala=1`;
      }
    }
    if (sala2.classList.contains("chosenBox")) {
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}&sala=2`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}&sala=2`;
      }

      if (generoBabyInput) {
        url += `&genero=${generoBabyInput}&sala=2`;
      }
    }
    if (sala3.classList.contains("chosenBox")) {
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}&sala=3`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}&sala=3`;
      }

      if (generoBabyInput) {
        url += `&genero=${generoBabyInput}&sala=3`;
      }
    }

    if (todos.classList.contains("chosenBox")) {
      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }

      if (generoBabyInput) {
        url += `&genero=${generoBabyInput}`;
      }
    }
  } else {
    if (registrados.classList.contains("chosenBox")) {
      url = `http://localhost/proyectofinalciclo/api/children/childrenlist/?`;

      if (nombreBabyInput) {
        url += `&nombreBebe=${nombreBabyInput}`;
      }
      if (apellidoBabyInput) {
        url += `&apellido1Bebe=${apellidoBabyInput}`;
      }

      if (generoBabyInput) {
        url += `&genero=${generoBabyInput}`;
      }
    }
  }
  fetchKids(url);
  clearList();
}

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

// Depende de si entra en sala o en recepcion la pestaña abierta por defecto será diferente
function RenderPage() {
  clearList();

  if (duty == "recepcion") {
    fetchRegistrados = true;
    let url = `http://localhost/proyectofinalciclo/api/children/childrenlist`;
    document.querySelector(".registrados").classList.add("chosenBox");
    document
      .querySelector(".childrenList")
      .classList.add("salaRegisteredColor");

    fetchKids(url);
  } else {
    let url = `http://localhost/proyectofinalciclo/api/checkedin/?checkedIn=1`;
    fetchKids(url);
    fetchRoster(``, "#total");
    fetchRoster(`?sala=1`, "#salaUno");
    fetchRoster(`?sala=2`, "#salaDos");
    fetchRoster(`?sala=3`, "#salaTres");
  }
}

function checkRoster() {
  fetchRoster(``, "#total");
  fetchRoster(`?sala=1`, "#salaUno");
  fetchRoster(`?sala=2`, "#salaDos");
  fetchRoster(`?sala=3`, "#salaTres");
  fetchRosterRegistrados();
}

function mostrarTodos() {
  fetchRegistrados = false;
  todos.classList.add("chosenBox");
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
  fetchRoster(``, "#total");
}

function mostrarSala1() {
  fetchRegistrados = false;
  sala1.classList.add("chosenBox");
  if (
    sala2.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala2.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }
  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala1Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=1?checkedIn=1`;

  fetchKids(url);
  fetchRoster(`?sala=1`, "#salaUno");
}
function mostrarSala2() {
  fetchRegistrados = false;
  sala2.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala3.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala3.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala3Color");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.add("sala2Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=2?checkedIn=1`;
  fetchKids(url);
  fetchRoster(`?sala=2`, "#salaDos");
}

function mostrarSala3() {
  fetchRegistrados = false;
  sala3.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox") ||
    registrados.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
    registrados.classList.remove("chosenBox");
  }

  childrenListDiv.classList.remove("greyBg");
  childrenListDiv.classList.remove("sala1Color");
  childrenListDiv.classList.remove("sala2Color");
  childrenListDiv.classList.add("sala3Color");
  clearList();
  let url = `http://localhost/proyectofinalciclo/api/checkedin/?sala=3?checkedIn=1`;
  fetchKids(url);
  fetchRoster(`?sala=3`, "#salaTres");
}

function fetchRoster(sala = "", nombreId) {
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

function fetchRosterRegistrados() {
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

function fetchRegistered() {
  fetchRegistrados = true;
  registrados.classList.add("chosenBox");
  if (
    sala1.classList.contains("chosenBox") ||
    sala2.classList.contains("chosenBox") ||
    todos.classList.contains("chosenBox")
  ) {
    sala1.classList.remove("chosenBox");
    sala2.classList.remove("chosenBox");
    todos.classList.remove("chosenBox");
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
        console.log(bebe);
        let div = document.createElement("div");
        div.setAttribute("data-bebe", bebe["idChild"]);

        div.classList.add("listaBebes");

        // ##########################################################################
        //    AÑADIENDO EVENT LISTENER INDIVIDUAL QUE PERMITE MOSTRAR LA FICHA EN LA COLUMNA DERECHA
        // ##########################################################################
        if (duty == "sala") {
          div.addEventListener("click", mostrarFicha);
          div.addEventListener("click", cargarMensajes);
        }

        div.innerHTML = FetchDependingOnDuty();

        // ##########################################################################
        //     GESTION DE BOTONES QUE INDICAN SI EL BEBE TIENE ALERGIAS O TOMA MEDICAMENTOS O TIENE E.E
        // ##########################################################################
        function FetchDependingOnDuty() {
          if (duty == "sala") {
            // **************Si el duty es Sala que muestre los siguientes Datos*********
            return `<div class="imagenydatos">
            <div class="fotoBebe "><img src="../uploads/${
              bebe["foto"]
            }" alt=""></div>
            <div class="datos">
              <p class="nombreBebe">${bebe["nombreBebe"]}</p>
              <p class="edadBebe">
              ${calcularEdadBebe(bebe["fechaNacimiento"])}
              </p>
              

            </div>
          </div>
          <div class="iconosInfoDetailed">
          ${checkMed()}
          ${checkAllergy()}
          ${checkDisability()}

          </div>
          <div class="msgIcon">
          <img src="../img/plataforma-profesores/email(1).png" alt="" /> <img src="../img/plataforma-profesores/petition.png" alt="">
            </div>`;
          } else {
            // **************Si el duty es Recepcion que muestre los siguientes Datos*********
            return `<div class="imagenydatos">
            <div class="fotoBebe "><img src="../uploads/${
              bebe["foto"]
            }" alt=""></div>
            <div class="datos">
              <p class="nombreBebe">${bebe["nombreBebe"]} ${
              bebe["apellido1Bebe"]
            }</p>
           

              <p class="edadBebe">
              ${calcularEdadBebe(bebe["fechaNacimiento"])}
              </p>

            </div>
          </div>
          <div class="iconosInfoDetailed">
          ${checkMed()}
          ${checkAllergy()}
          ${checkDisability()}

          </div>
          <div class="msgIcon">

          <p class="nombreBebe"></p>

          ${checkFetchOrigin(bebe["checkedIn"])}
            </div>`;
          }
        }

        function checkFetchOrigin(checkedin) {
          if (fetchRegistrados) {
            if (checkedin == 1) {
              //Agrega un tono gris a cada perfil para indicar que estan checked in
              div.classList.add("greyBg");

              return `<pEn Sala</p>`;
            } else {
              return `<div class="entradaTotal" data-id="${bebe["idChild"]}" data-method="checkin">Entrada</div>`;
            }
          } else {
            //Si el bebé ya esta en sala le aparece la hora de entrada y  la salida
            return ` <p class="nombreBebe">
           </p>
           <span class="salaActual ${bgColorDependingOnSala(bebe["sala"])}">
           SALA: ${bebe["sala"]}
           </span><span class="salida" data-method="checkout" data-id="${
             bebe["idChild"]
           }" >Salida</span>`;
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

        function clearPestana() {

          document.querySelector('.pestanaReporte').classList.add('selectedOption');
          document.querySelector('.pestanaMensajes').classList.remove('selectedOption');
          document.querySelector('.pestanaPerfil').classList.remove('selectedOption');

          
          document.querySelector(".grisDiaper").classList.remove("hidden");
          document.querySelector(".white").classList.remove("hidden");
          document.querySelector(".grisSiesta").classList.remove("hidden");
          document.querySelector(".profileBaby").style.display="none";
          document.querySelector(".mensajesBaby").style.display="none";
        }

        // ##########################################################################
        //     RECARGA DE REPORTE DIARIO DEPENDIENDO DEL ID DE CADA NIÑO/NIÑA
        // ##########################################################################

        function mostrarFicha() {
         document.querySelector('.pestanaReporte').classList.add('selectedOption');
         document.querySelector('.pestanaMensajes').classList.remove('selectedOption');
         document.querySelector('.pestanaPerfil').classList.remove('selectedOption');
         
          clearPestana();
          // sessionStorage.removeItem("idUsuario");
          sessionStorage.setItem("idChild", bebe["idChild"]);
          sessionStorage.setItem("idUsuario", bebe["idUsuario"]);
          let idChildSession = sessionStorage.getItem("idChild");
          let idUsuario = sessionStorage.getItem("idUsuario");

          // al escoger la ficha del niño se pone la listadebebes al 50%
          document.querySelector(".listabebes").classList.add(".div50");
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

          // **función que carga la plantilla con la información de deposiciones, alimentacion y siestas
          cargarPlantillaRporteDiario();

          document
            .querySelector(".saveChanges")
            .addEventListener("click", saveChanges);


          // ##########################################################################
          //     AÑADIENDO EVENTO CLICK A AGREGAR MÁS PARA HACER FECTH A DEPOSICIONES
          // ##########################################################################

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
            //Hace el fetch a la tabla deposiciones:
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
              });
            // fin de fetch a deposiciones
          }

          // *******************************Eventos de las pestañas: ******************************

          document
            .querySelector(".pestanaPerfil")
            .addEventListener("click", loadBabyProfile);

          document
            .querySelector(".pestanaReporte")
            .addEventListener("click", clearPestana);

          document
            .querySelector(".pestanaMensajes")
            .addEventListener("click", mostrarFichaMensajes);

          // ********************************cargar Perfil*****************************************
          function loadBabyProfile(e) {
            document.querySelector('.pestanaMensajes').classList.remove('selectedOption');
            document.querySelector('.pestanaReporte').classList.remove('selectedOption');
            document.querySelector('.pestanaPerfil').classList.add('selectedOption');

            e.preventDefault();
            document.querySelector(".grisDiaper").classList.add("hidden");
            document.querySelector(".white").classList.add("hidden");
            document.querySelector(".grisSiesta").classList.add("hidden");
             document.querySelector(".profileBaby").style.display = "flex";
            document.querySelector(".mensajesBaby").style.display = "none";

            fetch(
              `http://localhost/proyectofinalciclo/api/children/info-completa/?idChild=${idChildSession}`,
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
                
                  document.querySelector(
                    ".profileBaby"
                  ).innerHTML = `<section class="perfilSection">
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
          
          <!-- fin ColInfoPerfil -->
          </section>
          <hr />
          
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
          <hr />
          
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
          <hr />
          
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
          <hr />
          
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
          <hr />
          
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

          // **final carga perfil****

     

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

          //UPDATE CHANGES

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

          // *********************

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

      // Final de forEach de cada bebe

      // ***********************************************************
      //                    GESION DE MODALBOX
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
              <div class="fotoBebe"><img src="../uploads/${data[0].foto}" alt=""></div>
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
                <option value="${data[0].idTutor1}">${data[0].nombreCompletoTutor1}</option>
                <option value="${data[0].idTutor2}">${data[0].nombreCompletoTutor2}</option>
               
              </select>
              <select id="autorizado" name="autorizado">
                <option value="0">Autorizado</option> 
                <option value="${data[0].idAutorizado1}">${data[0].Autorizado1}</option>
              <option value="${data[0].idAutorizado2}">${data[0].Autorizado2}</option>
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

// *********removido*********
{
  /*   <p class="horaEntrada">Entrada: ${bebe["horaIngreso"].substring(10,16)} </p> */
}

// ***********************************************************
//         GESTION DE CLOSE BUTTON AL LADO DE LAS PESTAÑAS
// ***********************************************************

// if (window.location == "http://localhost/proyectofinalciclo/html/plataforma-profesores.html"){
//   document.querySelector('.headbar').style.backgroundColor="#f3b90f";
// }

if (duty == "recepcion") {
  document.querySelector(".headbar").style.backgroundColor = "#4c6daa";
}

if (duty == "sala") {
  document
    .querySelector(".closebtnSala")
    .addEventListener("click", cerrarFicha);

  function cerrarFicha() {
    document.querySelector(".secciones").style.display = "none";
    document.querySelector(".listabebes").classList.remove(".div50");
  }
  document.querySelector(".headbar").style.backgroundColor = "#f3b90f";
}
// if (window.location == "http://localhost/proyectofinalciclo/html/recepcion-check.html"){

// }
     // ********************************cargar Mensajes*****************************************

function mostrarFichaMensajes(){

  document.querySelector('.pestanaMensajes').classList.add('selectedOption');
  document.querySelector('.pestanaReporte').classList.remove('selectedOption');
  document.querySelector('.pestanaPerfil').classList.remove('selectedOption');


   document.querySelector(".grisDiaper").classList.add("hidden");
   document.querySelector(".white").classList.add("hidden");
   document.querySelector(".grisSiesta").classList.add("hidden");

  document.querySelector(".profileBaby").style.display = "none";
  document.querySelector(".mensajesBaby").style.display = "flex";

  // document.querySelector(".grisDiaper").classList.add("hidden");
  // document.querySelector(".white").classList.add("hidden");
  // document.querySelector(".grisSiesta").classList.add("hidden");
  // document.querySelector(".profileBaby").classList.add("hidden");
  // document.querySelector(".profileBaby").classList.add("hidden");
  // document.querySelector(".mensajesBaby").classList.remove("hidden");
}



     function cargarMensajes() {
      // document.querySelector(".grisDiaper").classList.remove("hidden");
      // document.querySelector(".white").classList.remove("hidden");
      // document.querySelector(".grisSiesta").classList.remove("hidden");
      // document.querySelector(".mensajesBaby").classList.add("hidden");
   
      


      let idUsuario = sessionStorage.getItem("idUsuario");


      document.querySelector(
        ".mensajesBaby"
      ).innerHTML = `<section class="msger">
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
    <button type="submit" class="msger-send-btn">Send</button>
  </form>
</section>`;

      const msgerForm = document.querySelector(".msger-inputarea");
      const msgerInput = document.querySelector(".msger-input");
      const msgerChat = document.querySelector(".msger-chat");

      const ADMIN_MSG = "Bienvenido a FunForKids!";

      // Icons made by Freepik from www.flaticon.com
      const ADMIN_IMG = "../img/mensajes/admin.png";
      const PERSON_IMG = "../img/mensajes/parent.png";
      const ADMIN = "FUN FOR KIDS";
      let tutor1 = "tutor1";
      let tutor2 = "tutor2";
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
            idChild: sessionStorage.getItem('idChild'),
            idRemitente: "admin",
            idDestinatario: idUsuario,
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

      fetch(
        `http://localhost/proyectofinalciclo/api/chat/?idChild=${sessionStorage.getItem('idChild')}`,
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
              appendMessage(ADMIN, ADMIN_IMG, "right", dato.msgText);
            }
            if (dato.idRemitente == idUsuario) {
              appendMessage(tutorNames, PERSON_IMG, "left", dato.msgText);
            }
          });
        });
    }