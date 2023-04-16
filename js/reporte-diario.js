import {
 loadInfoBaby
} from "../js/funciones.js";

let token = sessionStorage.getItem("token");
let idUser = sessionStorage.getItem("IdUsuario");


// gesionar cerrar session
document.querySelector("#cerrarSesion").addEventListener("click", CerrarSesion);

function CerrarSesion() {
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("IdUsuario");
}

//Funcion para cargar en la cabecera la foto y nombre de la Bebé
if (idUser && token) {
  loadInfoBaby();
  }

  //cambiar de color la pestaña
  
  
