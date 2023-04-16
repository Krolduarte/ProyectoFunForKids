import {
    loadInfoBaby
   } from "../js/funciones.js";
   let idUser = sessionStorage.getItem("IdUsuario");
   let token = sessionStorage.getItem("token");


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

// Informacion de Tutores
let tutorNombre = document.querySelector(".tutorNombre");
let tutorApellidos = document.querySelector(".tutorApellidos");
let relacionTutor = document.querySelector(".relacionTutor");
let direccionTutor = document.querySelector(".direccionTutor");
let telefonoTutor = document.querySelector(".telefonoTutor");

// Informacion de Autorizados
let autorizadoNombre = document.querySelector(".tutorNombre");
let autorizadoApellidos = document.querySelector(".tutorApellidos");
let autorizadoRelacion = document.querySelector(".relacionTutor");

let idChild = "";
let isTakingMedResponse = "";
let isAllergicToMedResponse = "";
let isAllergicToFoodResponse = "";
let hasFoodAllergyResponse = "";
let disabilityResponse = "";





fetch(
  `http://localhost/proyectofinalciclo/api/matricula/matriculacompleta/?idUsuario=${idUser}`,
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
      idChild = element["idChild"];
      fetch(
        `http://localhost/proyectofinalciclo/api/childrenlist/?idChild=${idChild}`,
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

            if (element.isAllergicToFood== 0) {
                isAllergicToFoodResponse = "NO";
            } else {
                isAllergicToFoodResponse = "SI";
            }

            if (element.hasDisability== 0) {
                disabilityResponse = "Ninguna";
            } else {
                disability.innerHTML = `<span>${element["discapacidad"]}  </span>`;
            }

            if (element.hasFoodAllergy== 0) {
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
           medicamentoAlergia.innerHTML += `<span>${element["medicamentoAlergia"]}</span>`;
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
