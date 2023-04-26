
document.querySelector("#btnRegister").addEventListener('click', registrar);

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
            sessionStorage.setItem("token", data["token"]);

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

// **********************************************************
  // LLAMADA A LA API PARA CONSEGUIR ID DE USUARIO Q INICIA SESION
  // **********************************************************

  document.querySelector("#btnEntrar").addEventListener("click", (e) => {
    e.preventDefault();


    let url = `http://localhost/proyectofinalciclo/api/iduser/?usuario=${document.querySelector("#username").value}`
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
            break;
          case 401:
           
        }
      })
      .then((data) => {
        console.log(data[0]);
        console.log(url);
        if(data[0]){
          sessionStorage.setItem(
                  "IdUsuario",
                  data[0]['idUsuario']
                );
        }
        
       
      });
  });