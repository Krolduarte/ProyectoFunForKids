//Función que solo permite ingresar texto, no números para casos como Nombres, Apellidos, lugar de nacimiento
function validateText(event) {
  let keyCode = event.keyCode;
  //9 ES PARA QUE PERMITA TAB, 8 es el backspace
  let excludedKeys = [8, 9, 37, 39, 46, 32];

  if (!((keyCode >= 65 && keyCode <= 90) || excludedKeys.includes(keyCode))) {
    event.preventDefault();
  }
}

export { validateText };

function validateNumbers(e) {
  let key = e.keyCode;
  let excludedKeys = [8, 9];

  if (key < 48 || key > 57 || excludedKeys.includes(key)) {
    e.preventDefault();
  }
}

export { validateNumbers };

//Función que permite revisar que las fechas sean válidas
function checkDate(fecha, edadMin) {
  let hoy = new Date();
  let birthday = new Date(fecha.value);
  let years = 1000 * 86400 * 365 * edadMin;
  let limitRange = 1000 * 86400 * 365 * 100;

  if (
    hoy.getTime() - birthday.getTime() < years ||
    hoy.getTime() - birthday.getTime() > limitRange
  ) {
    return false;
  }
  return true;
}

export { checkDate };

//función que quita el borde rojo del cuadro de texto
function removeErrorMsg(e) {
  e.target.classList.remove("border-red");
  if(e.target.placeholder == "Campo Obligatorio"){
    e.target.placeholder = "";

  }
}

export { removeErrorMsg };

//función que añadeel borde rojo del cuadro de texto si ha hecho focus y no esta completo
function addRedBorderIfIncomplete(e){
  if (e.target.value == "" ){
    e.target.classList.add("border-red");
    e.target.placeholder = "Campo Obligatorio";
    
  }
  }
  export { addRedBorderIfIncomplete };

  function addRedBorderIfEmpty(input){
    if( input.value == ""){
      input.classList.add("border-red");
      input.placeholder = "Campo Obligatorio";
  }
 }

  export { addRedBorderIfEmpty };

  function checkIfInputChosen(value, radioButton) {
    if (value === "") {
      radioButton[0].nextElementSibling.classList.add("red");
      radioButton[1].nextElementSibling.classList.add("red");
    }
  }

  export { checkIfInputChosen };

function revisarDni(dni) {
  let regExDni = /(([XYZ]{1})([0-9]{7})([A-Z]{1}))|(([0-9]{8})([A-Z]{1}))/;

  if (regExDni.test(dni.value)) {
    return true;
  }else{
    return false;
  }
 
}

export { revisarDni };


function calcularEdadBebe(dateString) {
  let res = "";
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  var days = (hoy - fechaNacimiento) / 1000 / 60 / 60 / 24;
  var meses = parseInt((days % 365) / 30);
  var years = parseInt(days / 365);
  days = parseInt((days % 365) % 30);

  if (years <= 0) {
    if (meses < 2) {
      res = meses + " mes";
    } else {
      res = meses + " meses";
    }
  } else {
    if(years == 1 && meses== 1){
      res = years + " año y " + meses + " mes ";

    } else {
      res = years + " años y " + meses + " meses ";
    }

  }

  return res;
}
export { calcularEdadBebe };

function loadInfoBaby(){

  let idUser = sessionStorage.getItem("IdUsuario");
  let idChild = "";
  let nombreBebe = document.querySelector(".nombreBebe");
let fotoBebe = document.querySelector(".fotoBebe");
let edadBebe = document.querySelector(".edadBebe");
let fechaNacimiento = "";
let routePhoto = "";

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
              nombreBebe.innerHTML = `<span>${element["nombreBebe"]} ${element["apellido1Bebe"]} ${element["apellido2Bebe"]}</span>`;
              fechaNacimiento = element["fechaNacimiento"];
              console.log(fechaNacimiento);
              edadBebe.innerHTML = `<span>${calcularEdadBebe(
                fechaNacimiento
              )}</span>`;

              fotoBebe.style.backgroundImage = `url('../uploads/${element["foto"]}')`;              
            });
            // clearForm();
          });
      });
      // clearForm();
    });
}

export { loadInfoBaby };

function cambiarColorSiEscogido(input) {
            
  input.forEach((element) => {
    
    if (element.checked) {
      element.nextElementSibling.classList.add("selectedOption");
    } else {
      element.nextElementSibling.classList.remove("selectedOption");
    }
  });
}

export { cambiarColorSiEscogido };
