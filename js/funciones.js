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
