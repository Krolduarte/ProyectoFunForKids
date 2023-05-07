// *********************************************************************
// GESTIONA EL COLOR FONDO DE LAS PESTAÑAS DEPENDE DEL WINDOW LOCATION
// ********************************************************************


let urlPerfil= 'http://localhost/proyectofinalciclo/html/perfil.html';
let urlReporte = 'http://localhost/proyectofinalciclo/html/reporte-diario.html';
let mensajes = 'http://localhost/proyectofinalciclo/html/mensajes.html';

if(window.location == urlPerfil){
    document.querySelector('.pestanaPerfil').classList.add("yellow");
}

if(window.location == urlReporte){
    document.querySelector('.pestanaReporte').classList.add("yellow");
}

if(window.location == mensajes){
    document.querySelector('.pestanaMensajes').classList.add("yellow");
}
