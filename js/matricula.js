import {
  removeErrorMsg,
  checkDate,
  validateText,
  validateNumbers,
  revisarDni,
} from "../js/funciones.js";

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

document
  .querySelector(".groupPestanas")
  .children[0].classList.add("green-color");

// ###############################################
//        NOMBRE
// ###############################################
nombreBebe.addEventListener("keydown", validateText);
nombreBebe.addEventListener("focus", removeErrorMsg);

// ###############################################
//       APELLIDO 1
// ###############################################

apellido1Bebe.addEventListener("keydown", validateText);
apellido1Bebe.addEventListener("focus", removeErrorMsg);
// ###############################################
//       APELLIDO2
// ###############################################

apellido2Bebe.addEventListener("keydown", validateText);
apellido2Bebe.addEventListener("focus", removeErrorMsg);
// ###############################################
//        LUGAR DE NACIMIENTO
// ###############################################

lugarNacimiento.addEventListener("keydown", validateText);
lugarNacimiento.addEventListener("focus", removeErrorMsg);
// ###############################################
//        VERIFICAR FECHA
// ###############################################

fechaNacimiento.addEventListener("blur", revisarFecha);
fechaNacimiento.addEventListener("focus", removeErrorMsg);

// ###############################################
//        VERIFICAR SI GENERO HA SIDO ESCOGIDO
// ###############################################

let radioButtons = document.querySelectorAll('input[name="genero"]');

for (let radioButton of radioButtons) {
  radioButton.addEventListener("change", function (e) {
    if (this.checked) {
      genero = this.value;
      validGender = true;
    }
  });
}
// let genero = document.querySelector('input[name="genero"]:checked');

function revisarFecha() {
  if (!checkDate(fechaNacimiento, 0)) {
    fechaNacimiento.classList.add("border-red");
    infoBebe.innerHTML = "Fecha no válida";
    validBirthday = false;
  } else {
    infoBebe.innerHTML = "";
    validBirthday = true;
  }
}

// ###############################################
//        VERIFICAR  QUE DATOS ESTEN COMPLETOS ANTES DE SIGUIENTE
// ###############################################
document
  .querySelector("#siguiente")
  .addEventListener("click", permitirSiguiente);

function permitirSiguiente(e) {
  e.preventDefault();
  if (
    validBirthday &&
    validGender &&
    nombreBebe.value != "" &&
    apellido1Bebe.value != "" &&
    apellido2Bebe.value != "" &&
    lugarNacimiento.value != ""
  ) {
    console.log("PARTE 1 -BEBÉ- válida");
    console.log(nombreBebe.value);
    console.log(apellido1Bebe.value);
    console.log(apellido2Bebe.value);
    console.log(genero);
    console.log(fechaNacimiento.value);
    console.log(lugarNacimiento.value);
    primeraParteValida = true;
    document.querySelector(".uno").style.display = "none";
    document.querySelector(".containerDos").style.display = "flex";
    document
      .querySelector(".groupPestanas")
      .children[0].classList.remove("green-color");
    document
      .querySelector(".groupPestanas")
      .children[1].classList.add("green-color");
  } else {
    alert("Revise que todos los campos esten completos");
    // console.log(validBirthday);
    // console.log(validGender);
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
    }
  });

  //Escoger Label opcion que dice No:
  document
    .querySelector("#medicamentoNo")
    .nextElementSibling.addEventListener("click", function () {
      document.querySelector("#medicamentoTomado").value = "";
      medicamentoTomadoValido = true;

      let hiddenDivs = document.querySelectorAll(".chosen2");
      for (let div of hiddenDivs) {
        div.classList.add("hidden2");
      }
    });

  //Escoger Label opcion que dice Si:
  document
    .querySelector("#medicamentoSi")
    .nextElementSibling.addEventListener("click", function () {
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
    }
  });
}

//Escoger Label opcion que dice No:
document
  .querySelector("#alergiaMedNo")
  .nextElementSibling.addEventListener("click", function () {
    document.querySelector("#medicamentoAlergia").value = "";
    medicamentoAlergiaValido = true;

    let hiddenDivs = document.querySelectorAll(".chosen3");
    for (let div of hiddenDivs) {
      div.classList.add("hidden3");
    }
  });

//Escoger Label opcion que dice Si:
document
  .querySelector("#alergiaMedSi")
  .nextElementSibling.addEventListener("click", function () {
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

document
  .querySelector("#alergiaAlimentoSi")
  .nextElementSibling.addEventListener("click", function () {
    alimentoAlergiaValido = false;
    tipoAlergiasElegidasValido = false;

    let hiddenDivs = document.querySelectorAll(".hidden");
    for (let div of hiddenDivs) {
      div.classList.remove("hidden");
    }
  });

//Escoger Label opcion que dice No:
document
  .querySelector("#alergiaAlimentoNo")
  .nextElementSibling.addEventListener("click", function () {
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
  });

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
  'input[name="alergiaAlimento"]'
);
let discapacidad = document.querySelector("#discapacidadInfo");
for (let opcion of discapacidadOpciones) {
  opcion.addEventListener("change", function (e) {
    if (this.checked) {
      hasDisability = this.value;
    }
  });
}

document
  .querySelector("#discapacidadSi")
  .nextElementSibling.addEventListener("click", function () {
    discapacidadInfoValido = false;

    let hiddenDivs = document.querySelectorAll(".hidden4");
    for (let div of hiddenDivs) {
      div.classList.remove("hidden4");
    }
  });

document
  .querySelector("#discapacidadNo")
  .nextElementSibling.addEventListener("click", function () {
    document.querySelector("#discapacidadInfo").value = "";
    discapacidadInfoValido = true;

    let hiddenDivs = document.querySelectorAll(".chosen4");
    for (let div of hiddenDivs) {
      div.classList.add("hidden4");
    }
  });

discapacidad.addEventListener("blur", revisarDiscapacidad);
function revisarDiscapacidad() {
  if (document.querySelector("#discapacidadInfo").value != "") {
    discapacidadInfoValido = true;
  } else {
    discapacidadInfoValido = false;
  }
}
// let medicamentoAutorizado = document.querySelector(
//   'input[name="medicamento"]:checked'
// ).value;

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
    console.log(isTakingMed);
    console.log(medicamentoTomado.value);

    console.log(isAllergicToMed);
    console.log(medicamentoAlergia.value);

    console.log(hasFoodAllergy);
    console.log(alergeno.value);
    console.log(alergias);

    console.log(hasDisability);
    console.log(discapacidad.value);

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

// nombre de Tutor1
let nombreTutor1 = document.querySelector("#nombreTutor1");
nombreTutor1.addEventListener("keydown", validateText);
nombreTutor1.addEventListener("focus", removeErrorMsg);

// apellidos de Tutor1
let apellidosTutor1 = document.querySelector("#apellidosTutor1");
apellidosTutor1.addEventListener("keydown", validateText);
apellidosTutor1.addEventListener("focus", removeErrorMsg);

// relacion de Tutor1
let relacion1 = document.querySelector("#relacion1");
relacion1.addEventListener("keydown", validateText);
relacion1.addEventListener("focus", removeErrorMsg);

// lugar de Nacimiento de Tutor1
let lugarNacimientoTutor1 = document.querySelector("#lugarNacimientoTutor1");
lugarNacimientoTutor1.addEventListener("keydown", validateText);
lugarNacimientoTutor1.addEventListener("focus", removeErrorMsg);

//fecha Nacimiento Tutor1
let fechaNacimientoTutor1 = document.querySelector("#fechaNacimientoTutor1");
fechaNacimientoTutor1.addEventListener("blur", revisarFechaTutor);
fechaNacimientoTutor1.addEventListener("focus", removeErrorMsg);

//INFO TUTOR
let infoTutor = document.querySelector(".infoTutor");

function revisarFechaTutor() {
  if (!checkDate(fechaNacimientoTutor1, 18)) {
    fechaNacimientoTutor1.classList.add("border-red");
    infoTutor.innerHTML = "Fecha no válida";
    validBirthdayTutor1 = false;
  } else {
    infoTutor.innerHTML = "";
    validBirthdayTutor1 = true;
  }
}

//dnitutor1

let dni1 = document.querySelector("#dni1");

dni1.addEventListener("blur", revisarDniTutor);

function revisarDniTutor() {
  dniValido1 = false;
  if (revisarDni(dni1)) {
    dniValido1 = true;
  } else {
    dniValido1 = false;
  }
}

//direccion tutor1
let direccion1 = document.querySelector("#direccion1");
//numero movil
let telefono1 = document.querySelector("#telefono1");
telefono1.addEventListener("keydown", validateNumbers);

//agregar tutor
document.querySelector("#agregarTutor").addEventListener("click", agregarTutor);
function agregarTutor() {
  let hiddenDivs = document.querySelectorAll(".hidden5");
  for (let div of hiddenDivs) {
    div.classList.remove("hidden5");
  }
}
// ###############################################
//   VERIFICAR  QUE DATOS ESTEN COMPLETOS ANTES DE SIGUIENTE
// ###############################################
document
  .querySelector("#siguiente3")
  .addEventListener("click", checkifTutorComplete);

function checkifTutorComplete() {
  if (
    dniValido1 &&
    validBirthdayTutor1 &&
    nombreTutor1.value != "" &&
    apellidosTutor1.value != "" &&
    relacion1.value != "" &&
    lugarNacimientoTutor1.value != "" &&
    telefono1.value != "" &&
    direccion1.value != ""
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
    console.log(dni1.value);
    console.log(dniValido1);
    console.log(validBirthdayTutor1);
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

dniAutorizado1.addEventListener("blur", checkDniAutorizado);

function checkDniAutorizado() {
  dniValidoAutorizado = false;
  if (revisarDni(dniAutorizado1)) {
    dniValidoAutorizado = true;
  } else {
    dniValidoAutorizado = false;
  }
}

// ###############################################
//     ENVIAR TODO EL FORMULARIO CON LA INFORMACIÓN DE LA MATRÍCULA
// ###############################################

document
  .querySelector("#enviarform")
  .addEventListener("click", checkifAuthorizedPersonComplete);

function checkifAuthorizedPersonComplete(e) {
  e.preventDefault();
  if (
    dniValidoAutorizado &&
    nombreAutorizado1.value != "" &&
    apellidosAutorizado1.value != "" &&
    relacionAutorizado1.value != ""
  ) {
    console.log("PARTE 4 -AUTORIZADOS- válida");
    cuartaParteValida = true;
    console.log(nombreAutorizado1.value);
    console.log(apellidosAutorizado1.value);
    console.log(relacionAutorizado1.value);
    console.log(dniAutorizado1.value);
  } else {
    console.log("Parte 4 -Autorizados NO valida");
  }
}

document
  .querySelector("#enviarform")
  .addEventListener("click", enviarMatricula);

function enviarMatricula() {
  if (
    primeraParteValida &&
    segundaParteValida &&
    terceraParteValida &&
    cuartaParteValida
  ) {


    //Convertir estos datos en objeto json para enviar a la Api
    console.log(nombreBebe.value);
    console.log(apellido1Bebe.value);
    console.log(apellido2Bebe.value);
    console.log(genero);
    console.log(fechaNacimiento.value);
    console.log(lugarNacimiento.value);
    console.log(isTakingMed);
    console.log(medicamentoTomado.value);

    console.log(isAllergicToMed);
    console.log(medicamentoAlergia.value);

    console.log(hasFoodAllergy);
    console.log(alergeno.value);
    console.log(alergias);

    console.log(hasDisability);
    console.log(discapacidad.value);

    console.log(nombreTutor1.value);
    console.log(apellidosTutor1.value);
    console.log(relacion1.value);
    console.log(lugarNacimientoTutor1.value);
    console.log(fechaNacimientoTutor1.value);
    console.log(dni1.value);
    console.log(direccion1.value);
    console.log(telefono1.value);
    console.log(nombreAutorizado1.value);
    console.log(apellidosAutorizado1.value);
    console.log(relacionAutorizado1.value);
    console.log(dniAutorizado1.value);

    // fetch("http://localhost/proyectofinalciclo/api/matricula/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json;charset=utf-8",
    //     },

    //     body: JSON.stringify({
    //       nombre: nombreBebe.value,
    //       apellido1: apellido1Bebe.value,
    //       apellido2: apellido2Bebe.value,
    //       genero: genero,
    //       fechaNacimiento:fechaNacimiento.value,
    //       lugarNacimiento: lugarNacimiento.value,
    //       tomaMedicamento : medicamentoTomado,
    //       medicamento: medsButtons.value,
    //       tieneAlergiaMed: medicamentoAlergiaValido,
    //       medicamentoAlergiaValido : medsAllergyButtons.value,
    //       tieneAlergiaAlimento : foodAllergyButtons.value,
    //       alimentoAlergia: alimentoAlergia.value,
    //       causaAlergia :alergias,
    //       tieneDiscapacidad: discapacidadInfo,
    //       discapacidad :disabilityButtons.value,
    //       nombreTutor: nombreTutor1.value,
    //       apellidosTutor: apellidosTutor1.value,
    //       relacion1:relacion1.value,
    //       lugarNacimientoTutor1: lugarNacimientoTutor1.value,
    //       fechaNacimientoTutor1: fechaNacimientoTutor1.value,
    //       dni1 : dni1.value,
    //       direccion1: direccion1.value,
    //       telefono1: telefono1.value,
    //       nombreAutorizado1: nombreAutorizado1.value,
    //       apellidosAutorizado1: apellidosAutorizado1.value,
    //       relacionAutorizado1: relacionAutorizado1.value,
    //       dniAutorizado1: dniAutorizado1.value,

    //     }),
    //   })
    //     .then((response) => {
    //       switch (response.status) {
    //         case 200:
    //           divInfo.innerHTML = "<h1>Usuario registrado con éxito</h1>";
    //           divInfo.classList.add("success");
    //           // sessionStorage.setItem("id", data["id"]);
    //           break;
    //         case 400:
    //           divInfo.innerHTML = "<h2>Hubo un fallo en el registro</h2>";
    //           break;
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       // clearForm();
    //       divInfo.innerHTML =
    //         "<h3>Registro exitoso! ahora puedes iniciar Sesión</h3>";

    //       // window.location.href = "../html/login.html";
    //       setTimeout(() => {
    //         window.location.href = "../html/login.html";
    //         // clearForm();
    //       }, 5000);
    //     });
  } else {
    console.log("Alguna de las partes del formulario no es válida");
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
