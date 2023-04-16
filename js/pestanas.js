// *********************************************************************
// GESTIONA EL COLOR FONDO DE LAS PESTAÑAS DEPENDE DEL WINDOW LOCATION
// ********************************************************************

console.log(window.location);
let urlPerfil= 'http://localhost/proyectofinalciclo/html/perfil.html';
let urlReporte = 'http://localhost/proyectofinalciclo/html/reporte-diario.html';
if(window.location == urlPerfil){
    document.querySelector('.pestanaPerfil').classList.add("yellow");
}

if(window.location == urlReporte){
    document.querySelector('.pestanaReporte').classList.add("yellow");
}
