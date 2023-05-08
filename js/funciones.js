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

  var charCode = (e.which) ? e.which : e.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
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

//Función que permite revisar que las fechas sean válidas
function checkBabyDate(fecha, edadMax) {
  let hoy = new Date();
  let birthday = new Date(fecha.value);
  let years = 1000 * 86400 * 365 * 0;
  let limitRange = 1000 * 86400 * 365 * edadMax;

  if (
    hoy.getTime() - birthday.getTime() < years ||
    hoy.getTime() - birthday.getTime() > limitRange
  ) {
    return false;
  }
  return true;
}

export { checkBabyDate };

//función que quita el borde rojo del cuadro de texto
function removeErrorMsg(e) {
  e.target.classList.remove("border-red");
  if (e.target.placeholder == "Campo Obligatorio") {
    e.target.placeholder = "";
  }
}

export { removeErrorMsg };

//función que añadeel borde rojo del cuadro de texto si ha hecho focus y no esta completo
function addRedBorderIfIncomplete(e) {
  if (e.target.value == "") {
    e.target.classList.add("border-red");
    e.target.placeholder = "Campo Obligatorio";
  }
}
export { addRedBorderIfIncomplete };

function addRedBorderIfEmpty(input) {
  if (input.value == "") {
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
  } else {
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
    if (years == 1) {
      res = years + " año ";
      if (meses == 1) {
        res +=  "y " +meses + " mes ";
      }else{
        if (meses > 1) {
          res +=  "y " +meses + " meses ";
      }
    }

    } else {
      res = years + " años  ";
      if (meses == 1) {
        res += "y " +meses + " mes ";
      }else{
        if (meses > 1) {
          res += "y "+ meses + " meses ";
      }
    }

    }
  }

  return res;
}
export { calcularEdadBebe };

function calcularSalaDeAcuerdoAEdad(dateString) {
  let res = "";
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  var days = (hoy - fechaNacimiento) / 1000 / 60 / 60 / 24;
  var meses = parseInt((days % 365) / 30);
  var years = parseInt(days / 365);
  days = parseInt((days % 365) % 30);

  if (years < 1 && meses < 12) {
    res = "1";
  } else if (years >= 1 && meses < 12 && years < 2) {
    res = "2";
  } else if (years >= 2 && years <= 3) {
    res = "3";
  }

  return res;
}
export { calcularSalaDeAcuerdoAEdad };

function loadInfoBaby() {
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
            data.forEach((element) => {
              nombreBebe.innerHTML = `<span>${element["nombreBebe"]} ${element["apellido1Bebe"]} ${element["apellido2Bebe"]}</span>`;
              fechaNacimiento = element["fechaNacimiento"];

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

function CerrarSesionTutores() {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("IdUsuario");
  sessionStorage.removeItem("idChild");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("nombreTutor1");
  sessionStorage.removeItem("nombreTutor2");
}

export { CerrarSesionTutores };

function CerrarSesionMonitores() {
  sessionStorage.removeItem("monitor");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("duty");
}

export { CerrarSesionMonitores };

function cargarPlantillaRporteDiario(){
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
    <label for="primero"><abbr id="hora1" data-title="">1</abbr></label>

    <input type="radio" id="segundo" name="diaperChange" value="2"/>
    <label for="segundo"><abbr id="hora2" data-title="">2</abbr></label>

    <input type="radio" id="tercero" name="diaperChange" value="3"/>
    <label for="tercero"><abbr id="hora3" data-title="">3</abbr></label>

    <input type="radio" id="cuarto" name="diaperChange" value="4"/>
    <label for="cuarto"><abbr id="hora4" data-title="">4</abbr></label>



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
   <button class="saveChanges">Guardar Cambios</button>
   <button class="reportReady">Completo</button>
   `;

}

export { cargarPlantillaRporteDiario };