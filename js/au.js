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
//      CUARTA PARTE DE LA MATRÍCULA :  AUTORIZADOS
// ###############################################
// quitar al copiar  QUITAR QUITAR QUITAR QUITAR QUITAR QUITAR QUITAR
let cuartaParteValida = false;


let primerAutorizado = true;
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
document.querySelector('#cancelAdd').addEventListener('click',cancelarAutorizarSegundaPersona);

function cancelarAutorizarSegundaPersona() {
    this.classList.add('hidden');
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
}else{
    segundoAutorizado = true;
    dniValidoAutorizado2 = false;
}

// ###############################################
//     ENVIAR TODO EL FORMULARIO CON LA INFORMACIÓN DE LA MATRÍCULA
// ###############################################


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
    cuartaParteValida = true;
    console.log(segundoAutorizado);
      // enviarMatricula();

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
