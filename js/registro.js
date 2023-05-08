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
      `http://localhost/proyectofinalciclo/api/checkuser?usuario=${usuario.value}`,
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
    fetch("http://localhost/proyectofinalciclo/api/register/", {
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
        switch (response.status) {
          case 200:
            divInfo.innerHTML = "<h1>Usuario registrado con éxito</h1>";
            divInfo.classList.add("success");
          
            break;
          case 400:
            divInfo.innerHTML = "<h2>Hubo un fallo en el registro</h2>";
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        
        clearForm();
        divInfo.classList.add('green');
        divInfo.innerHTML =
          "<h3>Registro exitoso! ahora puedes iniciar Sesión</h3>";
         

        // window.location.href = "../html/login.html";
        setTimeout(() => {
          window.location.href = "../html/login.html";
          clearForm();
        }, 5000);
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
