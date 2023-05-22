import { removeErrorMsg, checkDate, validateText } from "../js/funciones.js";
//Seleccionando elementos por su query selector en variables

let form = document.querySelector("#formulario");
let nombre = document.querySelector("#nombre");
let apellidos = document.querySelector("#apellidos");
let fecha = document.querySelector("#fecha");
let lugar = document.querySelector("#lugar");
let usuario = document.querySelector("#usuario");
let email = document.querySelector("#email");
let contrasena = document.getElementById("pwd");
let pwdRepeatInput = document.getElementById("pwd-repeat");
let divInfo = document.querySelector(".info");

let emailValido = false;
let userValido = false;
let validPwd = false;
let validMatch = false;
let validBirthday = false;



clearForm();
window.addEventListener("load", clearForm);

function clearForm() {
  nombre.value = "";
  apellidos.value = "";
  fecha.value = "";
  lugar.value = "";
  usuario.value = "";
  email.value = "";
  contrasena.value = "";
  pwdRepeatInput.value = "";
  divInfo.innerHTML = "";

  emailValido = false;
  userValido = false;
  validPwd = false;
  validMatch = false;
  validBirthday = false;
}

// Validar Nombre y Apellidos y lugar
nombre.addEventListener("keydown", validateText);
nombre.addEventListener("focus", removeErrorMsg);

apellidos.addEventListener("keydown", validateText);
apellidos.addEventListener("focus", removeErrorMsg);

lugar.addEventListener("keydown", validateText);
lugar.addEventListener("focus", removeErrorMsg);

// ###############################################
//        VERIFICAR FECHA
// ###############################################

fecha.addEventListener("blur", revisarFecha);
fecha.addEventListener("focus", removeErrorMsg);

function revisarFecha() {
  if (!checkDate(fecha, 18)) {
    fecha.classList.add("border-red");
    divInfo.innerHTML = "Fecha no válida";
    validBirthday = false;
  } else {
    divInfo.innerHTML = "";
    validBirthday = true;
  }
}

//Validar Nombre de usuario
usuario.addEventListener("blur", checkUser);
usuario.addEventListener("focus", removeErrorMsg);

function checkUser() {
  if (usuario.value !== "") {
    fetch(
      `../api/checkuser?usuario=${usuario.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        req: JSON.stringify(usuario.value),
      }
    )
      .then((response) => {
        switch (response.status) {
          case 200:
            divInfo.innerHTML = "";
            userValido = true;
            break;

          case 400:
            divInfo.innerHTML = "<h3>Nombre de usuario ya existe</h3>";
            usuario.classList.add("border-red");
            userValido = false;
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  } else {
    userValido = false;
  }
}

//Validar Correo electrónico

email.addEventListener("blur", checkMail);
email.addEventListener("focus", removeErrorMsg);

let emailReg = /[a-z0-9\._-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;

function checkMail(e) {
  if (!emailReg.test(email.value) && email.value != "") {
    email.classList.add("border-red");
    divInfo.innerHTML = "Correo no válido";
  } else {
    emailValido = true;
    divInfo.innerHTML = "";
  }
}

//Validar contraseña y repetir Contraseña
// ###############################################
//         SEGURIDAD DE LA CONTRASEÑA
// ###############################################

// Seguridad de la contraseña (muy débil, débil, aceptable, fuerte, muy segura).

contrasena.addEventListener("keyup", checkSecurity);
contrasena.addEventListener("focus", checkSecurity);
contrasena.addEventListener("click", checkSecurity);
contrasena.addEventListener("blur", checkSecurity);

contrasena.addEventListener("focus", removeErrorMsg);

function checkSecurity(e) {
  let pass = e.target.value;

  divInfo.innerHTML = ` 
  <p>Incluye una letra mayúscula</p>
  <p>Incluye una letra Minúscula</p>
  <p>Incluye un número</p>
  <p>Incluye un símbolo</p>
  <p>La contraseña debe tener al menos 8 digitos</p>`;

  let security = 0;
  let numDigits = 0;
  let numMinus = 0;
  let numMayus = 0;
  let numSimb = 0;

  let abc = "abcdefghijklmnopqrstuvwxyz";

  pass.split("").forEach((car) => {
    numDigits += "0123456789".includes(car) ? 1 : 0;
    numMinus += abc.includes(car) ? 1 : 0;
    numMayus += abc.toUpperCase().includes(car) ? 1 : 0;
  });
  numSimb = pass.length - (numDigits + numMinus + numMayus);

  if (numMayus >= 1) {
    divInfo.children[0].classList.add("green");
  }

  if (numMinus >= 1) {
    divInfo.children[1].classList.add("green");
  }
  if (numDigits >= 1) {
    divInfo.children[2].classList.add("green");
  }

  if (numSimb >= 1) {
    divInfo.children[3].classList.add("green");
  }

  if (pass.length >= 8) {
    divInfo.children[4].classList.add("green");
  }

var arrDivInfo = Array.prototype.slice.call( divInfo.children )
arrDivInfo.forEach((child) => child.classList.contains('green') ? child.textContent= "" : child.classList.contains('red'))

  // if( divInfo.children.classList.contains('green')){
  
  // }
  //longitud
  security += Math.floor(pass.length / 2);
  security += numDigits > 0 ? 1 : 0;
  security += numMinus > 0 ? 1 : 0;
  security += numMayus > 0 ? 1 : 0;
  security += numSimb > 0 ? 1 : 0;

  if (
    numMayus >= 1 &&
    numMinus >= 1 &&
    numSimb >= 1 &&
    numDigits >= 1 &&
    pass.length >= 8
  ) {
    validPwd = true;
    contrasena.classList.remove("border-red");
    divInfo.getElementsByTagName("p").innerHTML = "";
  } else {
    contrasena.classList.add("border-red");
    validPwd = false;
  }

  // console.log(`Password" ${contrasena.value} `);
  // console.log(`Security ${security}`);
}

//Funciones para contraseña y repetir contraseña
pwdRepeatInput.addEventListener("focus", removeErrorMsg);
pwdRepeatInput.addEventListener("blur", checkPasswordsMatch);
// pwdRepeatInput.addEventListener("click", checkPasswordsMatch);
// pwdRepeatInput.addEventListener("keyup", checkPasswordsMatch);

function checkPasswordsMatch() {
  validMatch = false;
  if (pwdRepeatInput.value != contrasena.value) {
    divInfo.innerHTML = "Contraseñas no coinciden";
    pwdRepeatInput.classList.add("border-red");
  } else {
    pwdRepeatInput.classList.remove("border-red");
    validMatch = true;
    divInfo.innerHTML = " ";
  }
}

// ###############################################
//       REGISTRAR USUARIO SI LOS DATOS SON VALIDOS
// ###############################################

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
function checkMissingFields() {
  if (!nombre.value) {
    nombre.classList.add("border-red");
  }

  if (!apellidos.value) {
    apellidos.classList.add("border-red");
  }

  if (!fecha.value) {
    fecha.classList.add("border-red");
  }

  if (!lugar.value) {
    lugar.classList.add("border-red");
  }

  if (!usuario.value) {
    usuario.classList.add("border-red");
  }

  if (!email.value) {
    email.classList.add("border-red");
  }

  if (!contrasena.value) {
    contrasena.classList.add("border-red");
  }

  if (!pwdRepeatInput.value) {
    pwdRepeatInput.classList.add("border-red");
  }
}

let idUsuario = Math.random().toString(30).substring(2) + Date.now().toString(); 

document.querySelector(".btnRegister").addEventListener("click", () => {
  // Hacer el fetch solo si se cumplen estasn condiciones
  checkMissingFields();

  if (
    emailValido &&
    nombre.input != "" &&
    apellidos.input != "" &&
    lugar.input != "" &&
    userValido &&
    validMatch &&
    validPwd &&
    validBirthday
  ) {
    fetch("../api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify({
        idUsuario : idUsuario,
        nombre: nombre.value,
        apellidos: apellidos.value,
        fechaNacimiento: fecha.value,
        lugarNacimiento: lugar.value,
        usuario: usuario.value,
        email: email.value,
        contrasena: contrasena.value,
      }),
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        clearForm();
     
        divInfo.classList.add('green');
    
            agregarToast({ tipo: 'exito', titulo: 'Info', descripcion: 'Registro realizado correctamente, ingresa al Portal de Padres para iniciar proceso de matrícula!' });
         

        // window.location.href = "../html/login.html";
        setTimeout(() => {
          window.location.href = "../html/login.html";
          clearForm();
        }, 7000);
      });
  } else {
    alert("Completa todos los campos correctamente");
    divInfo.innerHTML += "<p>Asegurate de completar todos los campos</p>";
  }
});

// ###############################################
//       BOTON CANCELAR
// ###############################################
document.querySelector("#volverLogin").addEventListener('click', function() {
  window.location.href= "login.html";
})

// ******************************************************
//       GESTION DE NOTIFICACIONES TIPO TOAST
// *****************************************************
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