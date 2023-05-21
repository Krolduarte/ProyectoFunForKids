import {
  addRedBorderIfIncomplete,
  addRedBorderIfEmpty,
  checkIfInputChosen,
  removeErrorMsg,
  checkDate,
  checkBabyDate,
  validateText,
  validateNumbers,
  revisarDni,
} from "../js/funciones.js";

// ###############################################
//        GESTIONAR CERRAR SESIÓN
// ###############################################
document.querySelector("#cerrarSesion").addEventListener("click", CerrarSesion);

function CerrarSesion() {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("IdUsuario");
  sessionStorage.removeItem("token");
}
// ###############################################
//        GESTIONAR INGRESO A PÁGINA DE MATRICULA O REPORTE
// ###############################################

checkifRegistered();

function checkifRegistered() {
  let url = `http://localhost/proyectofinalciclo/api/matricula/matriculacompleta/?idUsuario=${sessionStorage.getItem(
    "IdUsuario"
  )}`;
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
      if (data.length > 0) {
        if (
          data[0].idMatricula > 0 &&
          sessionStorage.getItem("edicionMatricula") == "false"
        ) {
          window.location.href = "../html/reporte-diario.html";
        }

        if (sessionStorage.getItem("edicionMatricula") == "true") {
          document.querySelector('#tituloAEditar').textContent = " Edición de datos personales de Matrícula:"
          completarCamposMatrícula();
        }
      } else {
        if (data === undefined || data.length === 0)
          console.log("Aun no esta matriculado");
      }
    })
    .catch((error) => console.error(error));
}

function completarCamposMatrícula() {
  let url = `../api/info-matricula-completa/?idChild=${sessionStorage.getItem(
    "idChild"
  )}`;
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

      // **************************Información de bebé*****************************

      document.querySelector("#nombreBebe").value = data[0].nombreBebe;
      document.querySelector("#apellido1Bebe").value = data[0].apellido1Bebe;
      document.querySelector("#apellido2Bebe").value = data[0].apellido2Bebe;
      document.querySelector("#fechaNacimiento").value =
        data[0].fechaNacimiento;
      validBirthday = true;
      document.querySelector("#lugarNacimiento").value =
        data[0].lugarNacimiento;
      document.querySelector(
        ".fotoBebe"
      ).style.backgroundImage = `url('../uploads/${data[0].foto}'`;
      let radioButtonsGeneros = document.querySelectorAll(
        'input[name="genero"]'
      );

      if (data[0].genero == "hombre") {
        radioButtonsGeneros[0].checked = true;
      } else {
        radioButtonsGeneros[1].checked = true;
      }

      // **************************Información de Tutores*****************************

      document.querySelector("#relacion1").value = data[0].relacion;
      document.querySelector("#dni1").value = data[0].dni;
      document.querySelector("#telefono1").value = data[0].direccion;
      document.querySelector("#direccion1").value = data[0].telefono;
      dniValido1 = true;

      // **************************Información de Autorizados*****************************
      document.querySelector("#nombreAutorizado1").value =
        data[0].nombreAutorizado;
      document.querySelector("#apellidosAutorizado1").value =
        data[0].apellidosAutorizado;

      document.querySelector("#relacionAutorizado1").value =
        data[0].relacionAutorizado1;
      document.querySelector("#relacionAutorizado1").value =
        data[0].relacionAutorizado1;
      document.querySelector("#dniAutorizado1").value =
        data[0].relacionAutorizado1;
    })
    .catch((error) => console.error(error));

  // console.log(document.querySelector("#nombreBebe").value );
  // console.log(document.querySelector("#apellido1Bebe").value);
  // console.log(document.querySelector("#apellido2Bebe").value );
  // // document.querySelector("#genero").value = data[0].genero;
  // console.log(document.querySelector("#fechaNacimiento").value );
  // console.log(document.querySelector("#lugarNacimiento").value );
}
let primeraParteValida = false;
let segundaParteValida = false;
let terceraParteValida = false;
let cuartaParteValida = false;

// ###############################################
//      PRIMERA PARTE DE LA MATRÍCULA : BEBÉ
// ###############################################

let nombreBebe = document.querySelector("#nombreBebe");
let apellido1Bebe = document.querySelector("#apellido1Bebe");
let apellido2Bebe = document.querySelector("#apellido2Bebe");
let fechaNacimiento = document.querySelector("#fechaNacimiento");
let lugarNacimiento = document.querySelector("#lugarNacimiento");
let infoBebe = document.querySelector(".infoBebe");
let genero = "";
let validBirthday = false;
let validGender = false;

//Poner primera seccion de las pestañas en verde
document
  .querySelector(".groupPestanas")
  .children[0].classList.add("green-color");

// ###############################################
//        NOMBRE, APELLIDOS Y LUGAR NACIMIENTO: agregando eventos
// ###############################################
let camposBebe = [
  nombreBebe,
  apellido1Bebe,
  apellido2Bebe,
  lugarNacimiento,
  fechaNacimiento,
];
camposBebe.forEach((campo) => {
  campo.addEventListener("keydown", validateText);
  campo.addEventListener("blur", addRedBorderIfIncomplete);
  campo.addEventListener("focus", removeErrorMsg);
});

// ###############################################
//        VERIFICAR FECHA
// ###############################################

fechaNacimiento.addEventListener("change", revisarFecha);
fechaNacimiento.addEventListener("focus", removeErrorMsg);

function revisarFecha() {
  validBirthday = false;
  if (!checkBabyDate(fechaNacimiento, 5)) {
    fechaNacimiento.classList.add("border-red");
    infoBebe.innerHTML = "Fecha no válida";
    validBirthday = false;
  } else {
    infoBebe.innerHTML = "";
    fechaNacimiento.classList.remove("border-red");
    validBirthday = true;
  }
}

// ###############################################
//        VERIFICAR SI GENERO HA SIDO ESCOGIDO
// ###############################################
let radioButtonsGeneros = document.querySelectorAll('input[name="genero"]');
let  valorButton = document.querySelector('input[name="genero"]:checked');
if(valorButton){
  genero = document.querySelector('input[name="genero"]:checked').value;
}
if (sessionStorage.getItem("edicionMatricula") == "true") {

  if (document.querySelector('input[name="genero"]:checked')) {
    validGender = true;
    genero = document.querySelector('input[name="genero"]:checked').value;
  }
}

for (let radioButton of radioButtonsGeneros) {
  radioButton.addEventListener("change", function (e) {
    if (this.checked) {
      genero = this.value;
      validGender = true;
      radioButtonsGeneros[0].nextElementSibling.classList.remove("red");
      radioButtonsGeneros[1].nextElementSibling.classList.remove("red");
    }
  });
}
for (let radioButton of radioButtonsGeneros) {
  radioButton.addEventListener("blur", function (e) {
    if (this.checked) {
      genero = this.value;
      validGender = true;
      radioButtonsGeneros[0].nextElementSibling.classList.remove("red");
      radioButtonsGeneros[1].nextElementSibling.classList.remove("red");
    }
  });
}

// ###############################################
//     GESTION DE FOTO
// ###############################################

let inpFile = document.querySelector("#inpFile");
let btnPhoto = document.querySelector("#btnPhoto");

btnPhoto.addEventListener("click", subirFoto);
let nombreFoto = Date.now();

function subirFoto(e) {
  e.preventDefault();

  let formData = new FormData();
  let endpoint = "../php/upload.php";
  formData.append("inpFile", inpFile.files[0]);
  formData.append("text", nombreFoto);

  fetch(endpoint, {
    method: method,
    body: formData,
  })
    .then((response) => {
      document.querySelector(
        ".fotoBebe"
      ).style.backgroundImage = `url('../uploads/${nombreFoto}${inpFile.files[0].name}'`;
    })

    .catch(console.error);
}

// ###############################################
//        VERIFICAR  QUE DATOS ESTEN COMPLETOS ANTES DE SIGUIENTE
// ###############################################
document
  .querySelector("#siguiente")
  .addEventListener("click", permitirSiguiente);

function permitirSiguiente(e) {
  e.preventDefault();

  checkIfInputChosen(genero, radioButtonsGeneros);
  camposBebe.forEach((campo) => {
    addRedBorderIfEmpty(campo);
  });

  if (
    validBirthday &&
    validGender &&
    nombreBebe.value != "" &&
    apellido1Bebe.value != "" &&
    apellido2Bebe.value != "" &&
    lugarNacimiento.value != ""
    // inpFile.files.length > 0
  ) {
    console.log("PARTE 1 -BEBÉ- válida");
    // console.log(nombreBebe.value);
    // console.log(apellido1Bebe.value);
    // console.log(apellido2Bebe.value);
    // console.log(genero);
    // console.log(fechaNacimiento.value);
    // console.log(lugarNacimiento.value);
    primeraParteValida = true;

    let nombreEnFormulario = document.querySelector("#nombreBebeFormulario");

    nombreEnFormulario.innerHTML = `Para saber más de ${nombreBebe.value}`;

    document.querySelector(".uno").style.display = "none";
    document.querySelector(".containerDos").style.display = "flex";
    document
      .querySelector(".groupPestanas")
      .children[0].classList.remove("green-color");
    document
      .querySelector(".groupPestanas")
      .children[1].classList.add("green-color");
  } else {
    infoBebe.innerHTML = "<p>Revise que todos los campos esten completos</p>";

    // console.log(validBirthday);
    // console.log(validGender);
    // console.log(document.querySelector('input[name="genero"]:checked').value)
    // console.log(nombreBebe.value != "");
    // console.log(apellido1Bebe.value != "");
    // console.log(apellido2Bebe.value != "");
    // console.log(lugarNacimiento.value != "");
  }
}

// ###############################################
//     GESTION DE BOTON VOLVER
// ###############################################

document
  .querySelector("#cancelarMatricula")
  .addEventListener("click", volverALandingPage);
function volverALandingPage(e) {
  e.preventDefault;
  window.location.href = "index.html";
}

// ###############################################
//     GESTION DE BOTON CANCELAR
// ###############################################

document.querySelector("#btnVolver").addEventListener("click", volver);
function volver(e) {
  e.preventDefault;
  document.querySelector(".uno").style.display = "flex";
  document.querySelector(".containerDos").style.display = "none";
  document
    .querySelector(".groupPestanas")
    .children[0].classList.add("green-color");
  document
    .querySelector(".groupPestanas")
    .children[1].classList.remove("green-color");
}

// ###############################################
//      SEGUNDA PARTE DE LA MATRÍCULA : PARA SABER MÁS DE NIÑO/NIÑA
// ###############################################

//CAMBIAR FONDO DE BOTONES SEGUN SON ESCOGIDOS:

let medsButtons = document.querySelectorAll('input[name="medicamento"]');
let medsAllergyButtons = document.querySelectorAll('input[name="alergiaMed"]');
let foodAllergyButtons = document.querySelectorAll(
  'input[name="alergiaAlimento"]'
);
let disabilityButtons = document.querySelectorAll('input[name="discapacidad"]');

cambiarFondoEscogido(medsButtons);
cambiarFondoEscogido(medsAllergyButtons);
cambiarFondoEscogido(foodAllergyButtons);
cambiarFondoEscogido(disabilityButtons);

function cambiarFondoEscogido(botones) {
  for (let boton of botones) {
    boton.addEventListener("change", function (e) {
      if (this.checked) {
        this.nextElementSibling.classList.add("selectedBox");
        if (botones[0].checked) {
          botones[1].nextElementSibling.classList.remove("selectedBox");
        }

        if (botones[1].checked) {
          botones[0].nextElementSibling.classList.remove("selectedBox");
        }
      }
    });
  }
}

// EVENT LISTENER PARA MEDICAMENTO TOMADO QUE DESPLIEGUE MÁS INFORMACION
let medicamentoTomadoValido = false;
//nombreMedicamentoToma es el nombre del medicamento que toma el bebé.
let isTakingMed = "";
let medicamentoTomado = document.querySelector("#medicamentoTomado");
let meds = document.querySelectorAll('input[name="medicamento"]');

for (let med of meds) {
  med.addEventListener("change", function (e) {
    if (this.checked) {
      isTakingMed = this.value;
      meds[0].nextElementSibling.classList.remove("red");
      meds[1].nextElementSibling.classList.remove("red");
    }
  });

  //Escoger Label opcion que dice No:
  meds[0].nextElementSibling.addEventListener("click", function () {
    medicamentoTomado.value = "";
    medicamentoTomadoValido = true;

    let hiddenDivs = document.querySelectorAll(".chosen2");
    for (let div of hiddenDivs) {
      div.classList.add("hidden2");
    }
  });

  //Escoger Label opcion que dice Si:
  meds[1].nextElementSibling.addEventListener("click", function () {
    medicamentoTomadoValido = false;

    let hiddenDivs = document.querySelectorAll(".hidden2");
    for (let div of hiddenDivs) {
      div.classList.remove("hidden2");
    }
  });

  //MedicamentoTomadoValido es verdadero solo si es valor no esta vacío
  medicamentoTomado.addEventListener("blur", revisarMedicamento);
  function revisarMedicamento() {
    if (medicamentoTomado.value != "") {
      medicamentoTomadoValido = true;
    } else {
      medicamentoTomadoValido = false;
    }
  }
}

// EVENT LISTENER PARA ALERGIA A MEDICAMENTO QUE DESPLIEGUE MÁS INFORMACION
let medicamentoAlergiaValido = false;
let isAllergicToMed = "";
let medicamentoAlergia = document.querySelector("#medicamentoAlergia");
let medsAlergia = document.querySelectorAll('input[name="alergiaMed"]');

for (let medAlergia of medsAlergia) {
  medAlergia.addEventListener("change", function (e) {
    if (this.checked) {
      isAllergicToMed = this.value;
      medsAlergia[0].nextElementSibling.classList.remove("red");
      medsAlergia[1].nextElementSibling.classList.remove("red");
    }
  });
}

//Escoger Label opcion que dice No:
medsAlergia[0].nextElementSibling.addEventListener("click", function () {
  document.querySelector("#medicamentoAlergia").value = "";
  medicamentoAlergiaValido = true;

  let hiddenDivs = document.querySelectorAll(".chosen3");
  for (let div of hiddenDivs) {
    div.classList.add("hidden3");
  }
});

//Escoger Label opcion que dice Si:
medsAlergia[1].nextElementSibling.addEventListener("click", function () {
  medicamentoAlergiaValido = false;

  let hiddenDivs = document.querySelectorAll(".hidden3");
  for (let div of hiddenDivs) {
    div.classList.remove("hidden3");
  }
});

//MedicamentoAlergiaValido es verdadero solo si es valor no esta vacío
medicamentoAlergia.addEventListener("blur", revisarMedicamentoAlergia);
function revisarMedicamentoAlergia() {
  if (medicamentoAlergia.value != "") {
    medicamentoAlergiaValido = true;
  } else {
    medicamentoAlergiaValido = false;
  }
}

// EVENT LISTENER PARA ALERGIA ALIMENTARIA QUE DESPLIEGUE MÁS INFORMACION
// Alergias
let alergeno = document.querySelector("#alimento");
let alergias = [];
let hasFoodAllergy = "";
let alergiaAlimentosOpciones = document.querySelectorAll(
  'input[name="alergiaAlimento"]'
);

for (let opcion of alergiaAlimentosOpciones) {
  opcion.addEventListener("change", function (e) {
    if (this.checked) {
      hasFoodAllergy = this.value;
      alergiaAlimentosOpciones[0].nextElementSibling.classList.remove("red");
      alergiaAlimentosOpciones[1].nextElementSibling.classList.remove("red");
    }
  });
}

let checkboxes = document.querySelectorAll(".tipoAlergia");

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", function () {
    if (this.checked) {
      this.nextElementSibling.classList.add("selectedBox");
      alergias.push(this.value);
    } else {
      this.nextElementSibling.classList.remove("selectedBox");

      alergias.push(this.value);
      alergias = alergias.filter((e) => e !== this.value);
    }
  });

  checkbox.addEventListener("change", function () {
    checkboxes.forEach((button) => {
      if (!button.checked) {
        tipoAlergiasElegidasValido = false;
      } else {
        tipoAlergiasElegidasValido = true;
      }
    });
  });
}

let alimentoAlergiaValido = false;
let tipoAlergiasElegidasValido = false;

//Escoger Label opcion que dice Si:

alergiaAlimentosOpciones[1].nextElementSibling.addEventListener(
  "click",
  function () {
    alimentoAlergiaValido = false;
    tipoAlergiasElegidasValido = false;

    let hiddenDivs = document.querySelectorAll(".hidden");
    for (let div of hiddenDivs) {
      div.classList.remove("hidden");
    }
  }
);

//Escoger Label opcion que dice No:
alergiaAlimentosOpciones[0].nextElementSibling.addEventListener(
  "click",
  function () {
    alimentoAlergiaValido = true;
    tipoAlergiasElegidasValido = true;
    document.querySelector("#alimento").value = "";
    // Si no escoge la alergia al alimento que se desmarquen las casillas de ingestion, tacto y olfato y no sean checked
    checkboxes.forEach((button) => {
      button.checked = false;
      button.nextElementSibling.classList.remove("selectedBox");
    });
    alergias.length = 0;

    let hiddenDivs = document.querySelectorAll(".chosen");
    for (let div of hiddenDivs) {
      div.classList.add("hidden");
    }
  }
);

alergeno.addEventListener("blur", revisarAlimento);
function revisarAlimento() {
  if (alergeno.value != "") {
    alimentoAlergiaValido = true;
  } else {
    alimentoAlergiaValido = false;
  }
}

// EVENT LISTENER PARA DISCAPACIDAD MÁS INFORMACION
let discapacidadInfoValido = false;
let hasDisability = "";
let discapacidadOpciones = document.querySelectorAll(
  'input[name="discapacidad"]'
);
let discapacidad = document.querySelector("#discapacidadInfo");
for (let opcion of discapacidadOpciones) {
  opcion.addEventListener("change", function (e) {
    if (this.checked) {
      hasDisability = this.value;
      discapacidadOpciones[0].nextElementSibling.classList.remove("red");
      discapacidadOpciones[1].nextElementSibling.classList.remove("red");
    }
  });
}

discapacidadOpciones[1].nextElementSibling.addEventListener(
  "click",
  function () {
    discapacidadInfoValido = false;

    let hiddenDivs = document.querySelectorAll(".hidden4");
    for (let div of hiddenDivs) {
      div.classList.remove("hidden4");
    }
  }
);

discapacidadOpciones[0].nextElementSibling.addEventListener(
  "click",
  function () {
    document.querySelector("#discapacidadInfo").value = "";
    discapacidadInfoValido = true;

    let hiddenDivs = document.querySelectorAll(".chosen4");
    for (let div of hiddenDivs) {
      div.classList.add("hidden4");
    }
  }
);

discapacidad.addEventListener("blur", revisarDiscapacidad);
function revisarDiscapacidad() {
  if (document.querySelector("#discapacidadInfo").value != "") {
    discapacidadInfoValido = true;
  } else {
    discapacidadInfoValido = false;
  }
}

// ###############################################
//   VERIFICAR  QUE DATOS ESTEN COMPLETOS ANTES DE SIGUIENTE
// ###############################################
document
  .querySelector("#siguiente2")
  .addEventListener("click", checkIfComplete);

function checkIfComplete() {
  if (alergias.length > 0) {
    tipoAlergiasElegidasValido = true;
  }

  checkIfInputChosen(isTakingMed, meds);
  checkIfInputChosen(isAllergicToMed, medsAlergia);
  checkIfInputChosen(hasFoodAllergy, alergiaAlimentosOpciones);
  checkIfInputChosen(hasDisability, discapacidadOpciones);

  if (
    document.querySelector('input[name="medicamento"]:checked') &&
    document.querySelector('input[name="alergiaMed"]:checked') &&
    document.querySelector('input[name="alergiaAlimento"]:checked') &&
    document.querySelector('input[name="discapacidad"]:checked') &&
    alimentoAlergiaValido &&
    tipoAlergiasElegidasValido &&
    medicamentoAlergiaValido &&
    medicamentoTomadoValido &&
    discapacidadInfoValido
  ) {
    console.log("PARTE 2 -CUESTIONARIO- válida");
    // console.log(isTakingMed);
    // console.log(medicamentoTomado.value);

    // console.log(isAllergicToMed);
    // console.log(medicamentoAlergia.value);

    // console.log(hasFoodAllergy);
    // console.log(alergeno.value);
    // console.log(alergias);

    // console.log(hasDisability);
    // console.log(discapacidad.value);

    // console.log(discapacidadInfoValido);
    // console.log(disabilityButtons);

    segundaParteValida = true;

    document.querySelector(".containerDos").style.display = "none";
    document.querySelector(".containerTres").style.display = "flex";
    document
      .querySelector(".groupPestanas")
      .children[1].classList.remove("green-color");
    document
      .querySelector(".groupPestanas")
      .children[2].classList.add("green-color");
  } else {
    console.log("formulario incompleto");
  }
}

// ###############################################
//    TERCERA PARTE DE LA MATRÍCULA : TUTORES
// ###############################################

let validBirthdayTutor1 = false;
let dniValido1 = false;

// Datos del tutor
let nombreTutor1 = document.querySelector("#nombreTutor1");
let apellidosTutor1 = document.querySelector("#apellidosTutor1");
let relacion1 = document.querySelector("#relacion1");
let lugarNacimientoTutor1 = document.querySelector("#lugarNacimientoTutor1");
let fechaNacimientoTutor1 = document.querySelector("#fechaNacimientoTutor1");
let dni1 = document.querySelector("#dni1");
let direccion1 = document.querySelector("#direccion1");
let telefono1 = document.querySelector("#telefono1");

//Agregando eventos

let camposTutor = [
  nombreTutor1,
  apellidosTutor1,
  relacion1,
  lugarNacimientoTutor1,
  fechaNacimientoTutor1,
  dni1,
  direccion1,
  telefono1,
];

camposTutor.forEach((campo) => {
  campo.addEventListener("blur", addRedBorderIfIncomplete);
  campo.addEventListener("focus", removeErrorMsg);

  if (campo == telefono1) {
    campo.addEventListener("keydown", validateNumbers);
  } else {
    campo.addEventListener("keydown", validateText);
    if (campo == dni1) {
      campo.removeEventListener("keydown", validateText);
    }
    if (campo == direccion1) {
      campo.removeEventListener("keydown", validateText);
    }
  }
});

//fecha de nacimiento
fechaNacimientoTutor1.addEventListener("blur", revisarFechaTutor);

function revisarFechaTutor() {
  validBirthdayTutor1 = false;
  if (!checkDate(fechaNacimientoTutor1, 18) || fechaNacimientoTutor1 == "") {
    fechaNacimientoTutor1.classList.add("border-red");
    infoTutor.innerHTML = "<p>Fecha no válida</p>";
    validBirthdayTutor1 = false;
  } else {
    infoTutor.innerHTML = "";
    fechaNacimientoTutor1.classList.remove("border-red");
    validBirthdayTutor1 = true;
  }
}

//dnitutor1
dni1.addEventListener("blur", revisarDniTutor);

function revisarDniTutor() {
  dniValido1 = false;
  if (revisarDni(dni1)) {
    dniValido1 = true;
    dni1.classList.remove("border-red");
    infoTutor.innerHTML = "";
  } else {
    dniValido1 = false;
    dni1.classList.add("border-red");
    infoTutor.innerHTML = "<p> DNI no válido, revise el DNI ingresado.</p>";
  }
}

// **************************************************************
//     GESTION DE EXISTENCIA DE SEGUNDO TUTOR
// *************************************************************
let segundoTutor = false;
let hiddenDivs = document.querySelectorAll(".hidden5");
//agregar tutor
document.querySelector("#agregarTutor").addEventListener("click", agregarTutor);
function agregarTutor() {
  document.querySelector("#cboxUnTutor").checked = false;
  nombreTutor2.value = "";
  apellidosTutor2.value = "";
  relacion2.value = "";
  lugarNacimientoTutor2.value = "";
  telefono2.value = "";
  direccion2.value = "";
  fechaNacimientoTutor2.value = "";
  dni2.value = " ";

  for (let div of hiddenDivs) {
    div.classList.remove("hidden5");
    segundoTutor = true;
  }
}

document
  .querySelector("#cboxUnTutor")
  .addEventListener("change", anularSegundoTutor);

function anularSegundoTutor() {
  if (this.checked) {
    for (let div of hiddenDivs) {
      div.classList.add("hidden5");
    }
    // document.querySelector("#agregarTutor").classList.add("hidden");

    segundoTutor = false;
    dniValido2 = true;
    validBirthdayTutor2 = true;
    nombreTutor2.value = "Blank";
    apellidosTutor2.value = "Blank";
    relacion2.value = "Blank";
    lugarNacimientoTutor2.value = "Blank";
    telefono2.value = "Blank";
    direccion2.value = "Blank";
    fechaNacimientoTutor2.removeEventListener("blur", revisarFechaTutor2);
    fechaNacimientoTutor2.value = "2001-01-01";
    dni2.value = "00000000A ";
  } else {
    segundoTutor = true;
    validBirthdayTutor2 = false;
    dniValido2 = false;
  }
}

// *****************Fetch a tabla Users para autocompletar información de Tutor*************************

document
  .querySelector("#siguiente2")
  .addEventListener("click", cargarInfoDeRegistro);

function cargarInfoDeRegistro() {
  fetch(
    `http://localhost/proyectofinalciclo/api/users/?idUsuario=${sessionStorage.getItem(
      "IdUsuario"
    )}`,
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
      console.log(data);
      document.querySelector("#nombreTutor1").value = data[0].nombre;
      document.querySelector("#apellidosTutor1").value = data[0].apellidos;
      document.querySelector("#lugarNacimientoTutor1").value =
        data[0].lugarNacimiento;
      document.querySelector("#fechaNacimientoTutor1").value =
        data[0].fechaNacimiento;
      validBirthdayTutor1 = true;
    });
}

// ###############################################
//  TUTOR2
// ###############################################

let validBirthdayTutor2 = false;
let dniValido2 = false;

// Datos del tutor
let nombreTutor2 = document.querySelector("#nombreTutor2");
let apellidosTutor2 = document.querySelector("#apellidosTutor2");
let relacion2 = document.querySelector("#relacion2");
let lugarNacimientoTutor2 = document.querySelector("#lugarNacimientoTutor2");
let fechaNacimientoTutor2 = document.querySelector("#fechaNacimientoTutor2");
let dni2 = document.querySelector("#dni2");
let direccion2 = document.querySelector("#direccion2");
let telefono2 = document.querySelector("#telefono2");

//Agregando eventos

let camposTutor2 = [
  nombreTutor2,
  apellidosTutor2,
  relacion2,
  lugarNacimientoTutor2,
  fechaNacimientoTutor2,
  dni2,
  direccion2,
  telefono2,
];

camposTutor2.forEach((campo) => {
  campo.addEventListener("blur", addRedBorderIfIncomplete);
  campo.addEventListener("focus", removeErrorMsg);
  if (campo == telefono2) {
    campo.addEventListener("keydown", validateNumbers);
  } else {
    campo.addEventListener("keydown", validateText);
    if (campo == dni2) {
      campo.removeEventListener("keydown", validateText);
    }
    if (campo == direccion2) {
      campo.removeEventListener("keydown", validateText);
      campo.removeEventListener("keydown", validateText);
    }
  }
});

//fecha de nacimiento
fechaNacimientoTutor2.addEventListener("blur", revisarFechaTutor2);
function revisarFechaTutor2() {
  if (!checkDate(fechaNacimientoTutor2, 18) || fechaNacimientoTutor2 == "") {
    fechaNacimientoTutor2.classList.add("border-red");
    infoTutor.innerHTML = "<p>Fecha no válida</p>";
    validBirthdayTutor2 = false;
  } else {
    infoTutor.innerHTML = "";
    fechaNacimientoTutor2.classList.remove("border-red");
    validBirthdayTutor2 = true;
  }
}

//dnitutor1
dni2.addEventListener("blur", revisarDniTutor2);

function revisarDniTutor2() {
  dniValido2 = false;
  if (revisarDni(dni2)) {
    dniValido2 = true;
    dni2.classList.remove("border-red");
    infoTutor.innerHTML = "";
  } else {
    dniValido2 = false;
    dni2.classList.add("border-red");
    infoTutor.innerHTML = "<p> DNI no válido, revise el DNI ingresado.</p>";
  }
}

//fin de if segundo tutor

//INFO TUTOR
let infoTutor = document.querySelector(".infoTutor");

// ###############################################
//   VERIFICAR  QUE DATOS ESTEN COMPLETOS ANTES DE SIGUIENTE
// ###############################################
let tutor2Valid = false;
let botonNxtTutor = document.querySelector("#siguiente3");

botonNxtTutor.addEventListener("click", checkifTutorComplete);

function checkifTutorComplete() {
  camposTutor.forEach((campo) => {
    addRedBorderIfEmpty(campo);
  });

  //PARTE 2
  camposTutor2.forEach((campo) => {
    addRedBorderIfEmpty(campo);
  });

  if (
    dniValido1 &&
    validBirthdayTutor1 &&
    nombreTutor1.value != "" &&
    apellidosTutor1.value != "" &&
    relacion1.value != "" &&
    lugarNacimientoTutor1.value != "" &&
    telefono1.value != "" &&
    direccion1.value != "" &&
    dniValido2 &&
    validBirthdayTutor2 &&
    nombreTutor2.value != "" &&
    apellidosTutor2.value != "" &&
    relacion2.value != "" &&
    lugarNacimientoTutor2.value != "" &&
    telefono2.value != "" &&
    direccion2.value != ""
  ) {
    console.log("PARTE 3-TUTORES válida");
    terceraParteValida = true;
    console.log(nombreTutor1.value);
    console.log(apellidosTutor1.value);
    console.log(relacion1.value);
    console.log(lugarNacimientoTutor1.value);
    console.log(fechaNacimientoTutor1.value);
    console.log(dni1.value);
    console.log(direccion1.value);
    console.log(telefono1.value);
    console.log("***InfoTutor2***");
    console.log(nombreTutor2.value);
    console.log(apellidosTutor2.value);
    console.log(relacion2.value);
    console.log(lugarNacimientoTutor2.value);
    console.log(fechaNacimientoTutor2.value);
    console.log(dni2.value);
    console.log(direccion2.value);
    console.log(telefono2.value);

    if (terceraParteValida) {
      console.log("DOS PARTES VALIDAS");
      document.querySelector(".containerTres").style.display = "none";
      document.querySelector(".containerCuatro").style.display = "flex";
      document
        .querySelector(".groupPestanas")
        .children[2].classList.remove("green-color");
      document
        .querySelector(".groupPestanas")
        .children[3].classList.add("green-color");
    } else {
      console.log(" Parte 3 no valida");

      camposTutor.forEach((campo) => {
        addRedBorderIfEmpty(campo);
      });
      camposTutor2.forEach((campo) => {
        addRedBorderIfEmpty(campo);
      });
    }
  } else {
    console.log("PARTE 3-TUTORES NO válida");
    console.log(dniValido1);
    console.log(validBirthdayTutor1);
    console.log(nombreTutor1.value);
    console.log(apellidosTutor1.value);
    console.log(relacion1.value);
    console.log(lugarNacimientoTutor1.value);
    console.log(fechaNacimientoTutor1.value);
    console.log(dni1.value);
    console.log(direccion1.value);
    console.log(telefono1.value);
    console.log("******");
    console.log(dniValido2);
    console.log(validBirthdayTutor2);
    console.log(nombreTutor2.value);
    console.log(apellidosTutor2.value);
    console.log(relacion2.value);
    console.log(lugarNacimientoTutor2.value);
    console.log(fechaNacimientoTutor2.value);
    console.log(dni2.value);
    console.log(direccion2.value);
    console.log(telefono2.value);
  }
}

// ###############################################
//     GESTION DE BOTON VOLVER
// ###############################################

document.querySelector("#btnVolver2").addEventListener("click", volver2);
function volver2(e) {
  e.preventDefault;
  document.querySelector(".dos").style.display = "flex";
  document.querySelector(".containerTres").style.display = "none";
  document
    .querySelector(".groupPestanas")
    .children[1].classList.add("green-color");
  document
    .querySelector(".groupPestanas")
    .children[2].classList.remove("green-color");
}

// ###############################################
//      CUARTA PARTE DE LA MATRÍCULA :  AUTORIZADOS
// ###############################################

let dniValidoAutorizado = false;

let nombreAutorizado1 = document.querySelector("#nombreAutorizado1");
let apellidosAutorizado1 = document.querySelector("#apellidosAutorizado1");
let relacionAutorizado1 = document.querySelector("#relacionAutorizado1");
let dniAutorizado1 = document.querySelector("#dniAutorizado1");

let nombreAutorizado2 = document.querySelector("#nombreAutorizado2");
let apellidosAutorizado2 = document.querySelector("#apellidosAutorizado2");
let relacionAutorizado2 = document.querySelector("#relacionAutorizado2");
let dniAutorizado2 = document.querySelector("#dniAutorizado2");
let dniValidoAutorizado2 = false;

let divInfoAutorizados = document.querySelector(".infoAutorizados");
dniAutorizado1.addEventListener("blur", checkDniAutorizado);
dniAutorizado2.addEventListener("blur", checkDniAutorizado2);

let camposAutorizados = [
  nombreAutorizado1,
  apellidosAutorizado1,
  relacionAutorizado1,
  dniAutorizado1,
];
camposAutorizados.forEach((campo) => {
  campo.addEventListener("blur", addRedBorderIfIncomplete);
  campo.addEventListener("keydown", validateText);
  campo.addEventListener("focus", removeErrorMsg);
  if (campo == dniAutorizado1) {
    campo.removeEventListener("keydown", validateText);
  }
});

function checkDniAutorizado() {
  dniValidoAutorizado = false;

  if (revisarDni(dniAutorizado1)) {
    dniValidoAutorizado = true;
    dniAutorizado1.classList.remove("border-red");
    divInfoAutorizados.innerHTML = "";
  } else {
    dniValidoAutorizado = false;
    dniAutorizado1.classList.add("border-red");
    divInfoAutorizados.innerHTML =
      "<p>Dni no válido. Por favor revise el DNI ingresado</p>";
  }
}

function checkDniAutorizado2() {
  dniValidoAutorizado2 = false;

  if (revisarDni(dniAutorizado2)) {
    dniValidoAutorizado2 = true;
    dniAutorizado2.classList.remove("border-red");
    divInfoAutorizados.innerHTML = "";
  } else {
    dniValidoAutorizado2 = false;
    dniAutorizado2.classList.add("border-red");
    divInfoAutorizados.innerHTML =
      "<p>Dni no válido. Por favor revise el DNI ingresado</p>";
  }
}

//   *****************************************
//       si escogen que solo haya un autorizado

//   ****************************************

let primerAutorizado = true;

//   *****************************************
//       si escogen que no hayan autorizados

//   ****************************************
document
  .querySelector("#soloPadresAutorizados")
  .addEventListener("change", anularAutorizados);

function anularAutorizados() {
  if (this.checked) {
    primerAutorizado = false;
    dniValidoAutorizado = true;

    camposAutorizados.forEach((campo) => {
      campo.value = "0000000A";
    });

    camposAutorizados2.forEach((campo) => {
      campo.value = "0000000A";
    });

    document.querySelector("#agregarOtroAutorizado").classList.add("hidden");
    document.querySelector(".autorizadodiv1").classList.add("hidden");
    document.querySelector(".autorizadodiv2").classList.add("hidden");
    document.querySelector("#autorizadosBox").classList.add("hidden");
  } else {
    document.querySelector("#agregarOtroAutorizado").classList.remove("hidden");
    document.querySelector(".autorizadodiv1").classList.remove("hidden");
    document.querySelector(".autorizadodiv2").classList.remove("hidden");
    primerAutorizado = true;
    dniValidoAutorizado = false;

    camposAutorizados.forEach((campo) => {
      campo.value = "";
    });
  }
}

//Gestión de segundo Autorizado
let segundoAutorizado = false;

document
  .querySelector("#agregarOtroAutorizado")
  .addEventListener("click", desplegarSegundoAutorizado);

function desplegarSegundoAutorizado() {
  nombreAutorizado2.value = "";
  apellidosAutorizado2.value = "";
  relacionAutorizado2.value = "";
  dniAutorizado2.value = "";

  document.querySelector("#autorizadosBox").classList.remove("hidden");
  document.querySelector("#cancelAdd").classList.remove("hidden");

  segundoAutorizado = true;
}

let camposAutorizados2 = [
  nombreAutorizado2,
  apellidosAutorizado2,
  relacionAutorizado2,
  dniAutorizado2,
];

if (segundoAutorizado) {
  camposAutorizados2.forEach((campo) => {
    campo.addEventListener("blur", addRedBorderIfIncomplete);
    campo.addEventListener("keydown", validateText);
    campo.addEventListener("focus", removeErrorMsg);
    if (campo == dniAutorizado2) {
      campo.removeEventListener("keydown", validateText);
    }
  });
}
document
  .querySelector("#cancelAdd")
  .addEventListener("click", cancelarAutorizarSegundaPersona);

function cancelarAutorizarSegundaPersona() {
  this.classList.add("hidden");
  document.querySelector("#autorizadosBox").classList.add("hidden");
  segundoAutorizado = false;
  dniValidoAutorizado2 = true;
  nombreAutorizado2.value = "Blank";
  apellidosAutorizado2.value = "Blank";
  relacionAutorizado2.value = "Blank";
  dniAutorizado2.value = "00000000A ";
}

if (document.querySelector("#autorizadosBox").classList.contains("hidden")) {
  segundoAutorizado = false;
  dniValidoAutorizado2 = true;
  nombreAutorizado2.value = "Blank";
  apellidosAutorizado2.value = "Blank";
  relacionAutorizado2.value = "Blank";
  dniAutorizado2.value = "00000000A ";
} else {
  segundoAutorizado = true;
  dniValidoAutorizado2 = false;
}

// ###############################################
//     ENVIAR TODO EL FORMULARIO CON LA INFORMACIÓN DE LA MATRÍCULA
// ###############################################
// ###############################################
//     ENVIAR TODO EL FORMULARIO CON LA INFORMACIÓN DE LA MATRÍCULA
// ###############################################
let segundoAutorizadoValido = false;

document
  .querySelector("#enviarform")
  .addEventListener("click", checkifAuthorizedPersonComplete);

function checkifAuthorizedPersonComplete(e) {
  e.preventDefault();

  camposAutorizados.forEach((campo) => {
    addRedBorderIfEmpty(campo);
  });

  camposAutorizados2.forEach((campo) => {
    addRedBorderIfEmpty(campo);
  });

  if (
    dniValidoAutorizado &&
    nombreAutorizado1.value != "" &&
    apellidosAutorizado1.value != "" &&
    relacionAutorizado1.value != "" &&
    dniValidoAutorizado2 &&
    nombreAutorizado2.value != "" &&
    apellidosAutorizado2.value != "" &&
    relacionAutorizado2.value != ""
  ) {
    console.log("PARTE 4 -AUTORIZADOS con 1 solo es-  válida");
    // console.log(primerAutorizado);
    // console.log(segundoAutorizado);
    cuartaParteValida = true;
    enviarMatricula();
    // console.log(dniValidoAutorizado);
    // console.log(dniAutorizado1.value);
    // console.log(nombreAutorizado1.value);
    // console.log(apellidosAutorizado1.value);
    // console.log(relacionAutorizado1.value);
    // console.log(dniValidoAutorizado2);
    // console.log(dniAutorizado2.value);
    // console.log(nombreAutorizado2.value);
    // console.log(apellidosAutorizado2.value);
    // console.log(relacionAutorizado2.value);
  } else {
    cuartaParteValida = false;
    console.log("PARTE 4 -AUTORIZADOS con 1 solo es- NO válida");
    // console.log(dniValidoAutorizado);
    // console.log(dniAutorizado1.value);
    // console.log(nombreAutorizado1.value);
    // console.log(apellidosAutorizado1.value);
    // console.log(relacionAutorizado1.value);
    // console.log(dniValidoAutorizado2);
    // console.log(dniAutorizado2.value);
    // console.log(nombreAutorizado2.value);
    // console.log(apellidosAutorizado2.value);
    // console.log(relacionAutorizado2.value);
  }
}

// document
//   .querySelector("#enviarform")
//   .addEventListener("click", enviarMatricula);

// *************************************************
//        En caso que sea edicion de matricula
//*************************************************
let method = "";
if (sessionStorage.getItem("edicionMatricula") == 'true') {
  method = "PUT";
} else {
  method = "POST";
}

function enviarMatricula() {
  if (
    primeraParteValida &&
    segundaParteValida &&
    terceraParteValida &&
    cuartaParteValida
  ) {
    // ****************************************************
    // GENERANDO ID RANDOMS PARA BEBE, TUTORES Y AUTORIZADOS
    // ****************************************************

    let idChild =
      Math.random().toString(30).substring(2) + Date.now().toString();
    let idTutor =
      Math.random().toString(30).substring(2) + Date.now().toString();

    let idTutor2 =
      Math.random().toString(30).substring(2) + Date.now().toString();
    let idAutorizado =
      Math.random().toString(30).substring(2) + Date.now().toString();

    let idAutorizado2 =
      Math.random().toString(30).substring(2) + Date.now().toString();

    // ****************************************************
    // FETCH PARA ENVIAR INFO DE BEBE
    // ****************************************************
    let body = {};
    body = {
      idChild: idChild,
      nombreBebe: nombreBebe.value,
      apellido1Bebe: apellido1Bebe.value,
      apellido2Bebe: apellido2Bebe.value,
      genero: genero,
      fechaNacimiento: fechaNacimiento.value,
      lugarNacimiento: lugarNacimiento.value,
      isTakingMed: isTakingMed,
      medicamentoTomado: medicamentoTomado.value,
      isAllergicToMed: isAllergicToMed,
      medicamentoAlergia: medicamentoAlergia.value,
      hasFoodAllergy: hasFoodAllergy,
      alergeno: alergeno.value,
      alergias: alergias,
      hasDisability: hasDisability,
      discapacidad: discapacidad.value,
    };

    if (inpFile.files[0]) {
      body.foto = `${nombreFoto}${inpFile.files[0].name}`;
    }else{
      body.foto = `1684344642263parent.png`;
    }

    fetch("http://localhost/proyectofinalciclo/api/matricula/children/", {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify(body),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            divInfoAutorizados.innerHTML +=
              "<h1>Bebé registrado con éxito</h1>";

            // sessionStorage.setItem("id", data["id"]);
            break;
          case 400:
            divInfoAutorizados.innerHTML +=
              "<h2>Hubo un fallo en el registro</h2>";
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // clearForm();
        divInfoAutorizados.innerHTML = "<h3>Bebé ha sido registrado</h3>";

        // ****************************************************
        // FETCH PARA ENVIAR INFO DE TUTORES
        // ****************************************************

        // FETCH PARA TUTOR1
        fetch("http://localhost/proyectofinalciclo/api/matricula/tutors/", {
          method: method,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },

          body: JSON.stringify({
            idTutor: idTutor,
            nombreTutor: nombreTutor1.value,
            apellidosTutor: apellidosTutor1.value,
            relacion: relacion1.value,
            lugarNacimientoTutor: lugarNacimientoTutor1.value,
            fechaNacimientoTutor: fechaNacimientoTutor1.value,
            dni: dni1.value,
            direccion: direccion1.value,
            telefono: telefono1.value,
          }),
        })
          .then((response) => {
            switch (response.status) {
              case 200:
                divInfoAutorizados.innerHTML +=
                  "<h1>Tutor registrado con éxito</h1>";

                // sessionStorage.setItem("id", data["id"]);
                break;
              case 400:
                divInfoAutorizados.innerHTML +=
                  "<h2>Hubo un fallo en el registro</h2>";
                break;
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);

            // ****************************************************
            // FETCH PARA ENVIAR INFO DE TUTOR2
            // ****************************************************
            if (segundoTutor) {
              fetch(
                "http://localhost/proyectofinalciclo/api/matricula/tutors/",
                {
                  method: method,
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },

                  body: JSON.stringify({
                    idTutor: idTutor2,
                    nombreTutor: nombreTutor2.value,
                    apellidosTutor: apellidosTutor2.value,
                    relacion: relacion2.value,
                    lugarNacimientoTutor: lugarNacimientoTutor2.value,
                    fechaNacimientoTutor: fechaNacimientoTutor2.value,
                    dni: dni2.value,
                    direccion: direccion2.value,
                    telefono: telefono2.value,
                  }),
                }
              )
                .then((response) => {
                  switch (response.status) {
                    case 200:
                      divInfoAutorizados.innerHTML +=
                        "<h1>Tutor registrado con éxito</h1>";

                      // sessionStorage.setItem("id", data["id"]);
                      break;
                    case 400:
                      divInfoAutorizados.innerHTML +=
                        "<h2>Hubo un fallo en el registro</h2>";
                      break;
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  // clearForm();
                });
            }

            if (segundoAutorizado) {
              fetch(
                "http://localhost/proyectofinalciclo/api/matricula/pickuplist/",
                {
                  method: method,
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },

                  body: JSON.stringify({
                    idAutorizado: idAutorizado2,
                    nombreAutorizado: nombreAutorizado2.value,
                    apellidosAutorizado: apellidosAutorizado2.value,
                    relacionAutorizado: relacionAutorizado2.value,
                    dniAutorizado: dniAutorizado2.value,
                  }),
                }
              )
                .then((response) => {
                  switch (response.status) {
                    case 200:
                      divInfoAutorizados.innerHTML +=
                        "<h1>Autorizado registrado con éxito</h1>";
                      // sessionStorage.setItem("id", data["id"]);
                      break;
                    case 400:
                      divInfoAutorizados.innerHTML +=
                        "<h2>Autorizado no ha sido registrado</h2>";
                      break;
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  // clearForm();
                });
            }

            // FETCH PARA AUTORIZADOS

            if (primerAutorizado) {
              fetch(
                "http://localhost/proyectofinalciclo/api/matricula/pickuplist/",
                {
                  method: method,
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  },

                  body: JSON.stringify({
                    idAutorizado: idAutorizado,
                    nombreAutorizado: nombreAutorizado1.value,
                    apellidosAutorizado: apellidosAutorizado1.value,
                    relacionAutorizado: relacionAutorizado1.value,
                    dniAutorizado: dniAutorizado1.value,
                  }),
                }
              )
                .then((response) => {
                  switch (response.status) {
                    case 200:
                      divInfoAutorizados.innerHTML +=
                        "<h1>Autorizado registrado con éxito</h1>";
                      // sessionStorage.setItem("id", data["id"]);
                      break;
                    case 400:
                      divInfoAutorizados.innerHTML +=
                        "<h2>Autorizado no ha sido registrado</h2>";
                      break;
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  // clearForm();
                  divInfoAutorizados.innerHTML =
                    "<h3>Autorizado ha sido registrado</h3>";
                });
            }

            // ****************************************************
            // FETCH PARA MATRICULA
            // ****************************************************
            let idUserfromfetch = sessionStorage.getItem("IdUsuario");
            let body = {};
            body = {
              idUsuario: idUserfromfetch,
              idChild: idChild,
              idTutor1: idTutor,
            };

            if (segundoTutor) {
              body.idTutor2 = idTutor2;
            }

            if (primerAutorizado) {
              body.idAutorizado1 = idAutorizado;
            }

            if (segundoAutorizado) {
              body.idAutorizado2 = idAutorizado2;
            }

            fetch(
              "http://localhost/proyectofinalciclo/api/matricula/matriculacompleta/",
              {
                method: method,
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },

                body: JSON.stringify(body),
              }
            )
              .then((response) => {
                switch (response.status) {
                  case 200:
                    divInfoAutorizados.innerHTML +=
                      "<h1>Matricula se ha realizado exitosamente, Ingrese al Portal de Padres</h1>";
                    setTimeout(() => {
                      window.location.href = "../html/index.html";
                      // clearForm();
                    }, 7000);

                    break;
                  case 400:
                    agregarToast({
                      tipo: "warning",
                      titulo: "Info",
                      descripcion: "Hubo un fallo en la matrícula!",
                    });
                    break;
                }
                return response.json();
              })
              .then((data) => {
                console.log(data);
                // clearForm();

                agregarToast({
                  tipo: "exito",
                  titulo: "Info",
                  descripcion: "Matrícula realizada  correctamente!",
                });
                setTimeout(() => {
                  window.location.href = "../html/portal-tutores.html";
                  // clearForm();
                }, 7000);
              });
          });
      });
  }
}

// ###############################################
//     GESTION DE BOTON VOLVER
// ###############################################

document.querySelector("#btnVolver3").addEventListener("click", volver3);
function volver3(e) {
  e.preventDefault;
  document.querySelector(".tres").style.display = "flex";
  document.querySelector(".containerCuatro").style.display = "none";
  document
    .querySelector(".groupPestanas")
    .children[2].classList.add("green-color");
  document
    .querySelector(".groupPestanas")
    .children[3].classList.remove("green-color");
}

// if (matriculaRealizada){
//   window.location.href = "../html/reporte-diario.html";
// }else{
//   window.location.href = "../html/matricula.html";
// }

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
