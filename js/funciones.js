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
  sessionStorage.removeItem("leido");
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
    <div class="agregar">Agregar</div>
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
  <div class="rango4">
    <input type="radio" id="quince" name="siesta"  value="15"/>
  <label for="quince">15 m.</label>

  <input type="radio"  id="treinta"  name="siesta"  value="30"/>
<label for="treinta">30 m.</label>

<input  type="radio"  id="cuarenta"  name="siesta"   value="40"/>
<label for="cuarenta">40 m.</label>


<input type="radio" id="sesenta" name="siesta"  value="60"/>
<label for="sesenta">60 m.</label>

<input type="radio" id="noventa" name="siesta" value="90"/>
<label for="noventa">90 m.</label>

<input type="radio" id="cientoveinte" name="siesta" value="120"/>
<label for="cientoveinte">120 m.</label>
  </div>

  <div class="divBtnSaveChanges">
  <button class="saveChanges">Guardar Cambios</button>
  </div>


   `;

}

export { cargarPlantillaRporteDiario };

   // ******************************************************
//       GESTION DE NOTIFICACIONES TIPO TOAST
// *****************************************************

function cargarNotificaciones(){


const contenedorToast = document.getElementById('contenedor-toast');

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
contenedorToast.addEventListener('click', (e) => {
	const toastId = e.target.closest('div.toast').id;

	if (e.target.closest('button.btn-cerrar')) {
		cerrarToast(toastId);
	}
});

// Función para cerrar el toast
const cerrarToast = (id) => {
	document.getElementById(id)?.classList.add('cerrando');
};

// Función para agregar la clase de cerrando al toast.
const agregarToast = ({ tipo, titulo, descripcion, autoCierre }) => {
	// Crear el nuevo toast
	const nuevoToast = document.createElement('div');

	// Agregar clases correspondientes
	nuevoToast.classList.add('toast');
	nuevoToast.classList.add(tipo);
	if (autoCierre) nuevoToast.classList.add('autoCierre');

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
		if (e.animationName === 'cierre') {
			nuevoToast.removeEventListener('animationend', handleAnimacionCierre);
			nuevoToast.remove();
		}
	};

	if (autoCierre) {
		setTimeout(() => cerrarToast(toastId), 5000);
	}

	// Agregamos event listener para detectar cuando termine la animación
	nuevoToast.addEventListener('animationend', handleAnimacionCierre);
};

}
export { cargarNotificaciones };
