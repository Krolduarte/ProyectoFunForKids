document.querySelector("#btnRegister").addEventListener("click", registrar);

function registrar(e) {
  e.preventDefault();
  window.location.href = "../html/registro.html";
}

// **********************************************************
// LLAMADA A LA API PARA COMPROBAR CREDENCIALES Y GESTIONAR INICIO DE SESION
// **********************************************************

document.querySelector("#btnEntrar").addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost/proyectofinalciclo/api/login/tutores/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      usuario: document.querySelector("#username").value,
      contrasena: document.querySelector("#password").value,
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
      sessionStorage.setItem("token", data["token"]);
      if (data) {
        let url = `http://localhost/proyectofinalciclo/api/iduser/?usuario=${
          document.querySelector("#username").value
        }`;

        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let idUsuario = data[0].idUsuario;
          
            sessionStorage.setItem("IdUsuario", data[0]["idUsuario"]);
            fetch(
              `http://localhost/proyectofinalciclo/api/matricula/matriculacompleta/?idUsuario=${data[0]["idUsuario"]}`,
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
                if (data.length == 1) {
                  window.location.href = "../html/perfil.html";
                } else {
                  window.location.href = "../html/matricula.html";
                }
                // if (data) {
                //   console.log(data);

                // } else {

                // }
              });
          });
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

// function login() {}
