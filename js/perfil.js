import { loadInfoBaby, CerrarSesionTutores } from "../js/funciones.js";
let idUser = sessionStorage.getItem("IdUsuario");
let token = sessionStorage.getItem("token");

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

// Informacion de Tutores
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

let idChild = "";
let isTakingMedResponse = "";
let isAllergicToMedResponse = "";
let isAllergicToFoodResponse = "";
let hasFoodAllergyResponse = "";
let disabilityResponse = "";
let idChildfromSession = sessionStorage.getItem("idChild");

window.setTimeout(function () {
  updateOnComingMessages();
  console.log("reloading");
}, 2000);



function updateOnComingMessages() {
  fetch(
    `http://localhost/proyectofinalciclo/api/updatechat/?idRemitente=admin&idChild=${idChildfromSession}&respondido=0`,
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
        console.log(dato.idChild);
        console.log("hay mensajes");
        if (idChildfromSession === dato.idChild) {
          let div = document.createElement("div");
          div.classList.add("newmsg");
          document.querySelector(".pestanaMensajes").appendChild(div);
          div.style.display = "flex";
          div.innerHTML = "1";
        } else {
          console.log("no hay mensajes");
        }
      });
    });
}

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
      // ****************************************************
      //           FETCH PARA INFO DE PADRES
      // ****************************************************

      fetch(
        `http://localhost/proyectofinalciclo/api/matricula/tutors/?idTutor=${element.idTutor1}`,
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
            tutorNombreCompleto.innerHTML += `<span>${element["nombreTutor"]} ${element["apellidosTutor"]}</span>`;
            relacionTutor.innerHTML += `<span>${element["relacion"]} `;
            direccionTutor.innerHTML += `<span>${element["direccion"]} `;
            telefonoTutor.innerHTML += `<span>${element["telefono"]}`;
            sessionStorage.setItem("nombreTutor1", element["nombreTutor"]);
          });
        });

      fetch(
        `http://localhost/proyectofinalciclo/api/matricula/tutors/?idTutor=${element.idTutor2}`,
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
            telefonoTutor2.innerHTML += `<span>${element["telefono"]}`;
            sessionStorage.setItem("nombreTutor2", element["nombreTutor"]);
          });
        });

      // ****************************************************
      //           FETCH PARA AUTORIZADOS
      // ****************************************************

      fetch(
        `http://localhost/proyectofinalciclo/api/matricula/pickuplist/?idAutorizado=${element.idAutorizado1}`,
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

      // ****************************************************
      //           FETCH PARA INFO DE NIÑO
      // ****************************************************

      idChild = element["idChild"];
      console.log(idChild);

      fetch(
        `http://localhost/proyectofinalciclo/api/children/childrenlist/?idChild=${idChild}`,
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
          sessionStorage.setItem("idChild", idChild);
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
