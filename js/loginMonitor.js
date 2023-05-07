

// **********************************************************
// LLAMADA A LA API PARA COMPROBAR CREDENCIALES Y GESTIONAR INICIO DE SESION
// **********************************************************

document.querySelector("#btnEntrar").addEventListener("click", (e) => {
  e.preventDefault();

  fetch("../api/login/monitores/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
     idMonitor: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          return response.json();
          break;
        case 401:
          revisarCredenciales();
      }
    })
    .then((data) => {
      if (data) {
        if (data["success"]) {
          sessionStorage.setItem(
            "monitor",
            document.querySelector("#username").value
          );
          sessionStorage.setItem("token", data["token"]);

          //Hacer otro fetch para idChild

          window.location.href = "../html/plataforma-profesores-opciones.html";
        }
      } else {
        console.log("credenciales no válidas");
      }
    });
});

function revisarCredenciales() {
  document.querySelector(".mensajes").innerHTML =
    "<p>Credenciales no válidas</p>";
  document.querySelector("#username").classList.add("border-red");
  document.querySelector("#password").classList.add("border-red");

  document.querySelector("#username").addEventListener("focus", intentar);

  function intentar() {
    document.querySelector(".mensajes").innerHTML = "";
    document.querySelector("#username").classList.remove("border-red");
    document.querySelector("#password").classList.remove("border-red");
  }
}

// // **********************************************************
// // LLAMADA A LA API PARA CONSEGUIR ID DE USUARIO Q INICIA SESION
// // **********************************************************

// document.querySelector("#btnEntrar").addEventListener("click", login);

// function login() {
//   let url = `http://localhost/proyectofinalciclo/api/iduser/?usuario=${
//     document.querySelector("#username").value
//   }`;

//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//   })
//     .then((response) => {
//       switch (response.status) {
//         case 200:
//           return response.json();
//           break;
//         case 401:
//       }
//     })
//     .then((data) => {
//       if (data[0]) {
//         sessionStorage.setItem("IdUsuario", data[0]["idUsuario"]);
//       }
//     });
// }
