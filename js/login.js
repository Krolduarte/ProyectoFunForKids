
document.querySelector("#btnRegister").addEventListener('click', registrar);


// function ingresar(e){
// e.preventDefault();
//     window.location.href= "../html/matricula.html";
// }


function registrar(e){
    e.preventDefault();
        window.location.href= "../html/registro.html";
    }


// **********************************************************
  // LLAMADA A LA API PARA COMPROBAR CREDENCIALES Y GESTIONAR INICIO DE SESION
  // **********************************************************

  document.querySelector("#btnEntrar").addEventListener("click", (e) => {
    e.preventDefault();

    fetch("../api/login/", {
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
        console.log(data);
        if (data) {
          if (data["success"]) {
            sessionStorage.setItem(
              "usuario",
              document.querySelector("#username").value
            );
            // sessionStorage.setItem("token", data["token"]);

            window.location.href= "../html/matricula.html";
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