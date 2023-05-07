import {
    CerrarSesionMonitores
   } from "../js/funciones.js";

   document.querySelector("#cerrarSesion").addEventListener("click", CerrarSesionMonitores);

   //##########################################################################
//     INCLUIR ID DE MONITOR EN EL HEADBAR
// ##########################################################################
let idMonitor = sessionStorage.getItem('monitor');
document.querySelector('.idMonitor').innerHTML+= idMonitor;

document.querySelector('.recepcion').addEventListener('click', GetRecepcionDuty);

document.querySelector('.sala').addEventListener('click', GetSalaDuty);


function GetRecepcionDuty(){
    window.location.href = "../html/recepcion-check.html";
    sessionStorage.setItem('duty', 'recepcion');
}

function GetSalaDuty(){
    window.location.href = "../html/plataforma-profesores.html";
    sessionStorage.setItem('duty', 'sala');
}





