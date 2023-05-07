<?php
require_once('../../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['idChild'])) {
        $idChild = $_GET['idChild'];



        $sql = "SELECT CONCAT_WS(' ' ,children.nombreBebe,children.apellido1Bebe,children.apellido2Bebe) as nombreCompletoBebe, 
    CONCAT_WS(' ' ,tutors.nombreTutor,tutors.apellidosTutor) as nombreCompletoTutor1, children.FechaNacimiento,children.genero, children.isTakingMed, children.medicamentoTomado, children.isAllergicToMed, children.medicamentoAlergia, children.hasFoodAllergy, children.alergeno, children.alergias, children.hasDisability, children.discapacidad,children.nombreBebe, children.apellido1Bebe, children.apellido2Bebe,children.LugarNacimiento,matricula.idUsuario,
    (select CONCAT_WS(' ' ,tutors.nombreTutor,tutors.apellidosTutor)
    from matricula 
    inner join tutors 
    WHERE tutors.idTutor= matricula.idTutor2 and matricula.idChild='$idChild') as nombreCompletoTutor2,concat_ws(' ' ,pickuplist.nombreAutorizado, pickuplist.apellidosAutorizado) as Autorizado1,
    (select CONCAT_WS(' ' ,pickuplist.nombreAutorizado,pickuplist.apellidosAutorizado) 
    from pickuplist 
    inner join matricula 
    WHERE pickuplist.idAutorizado = matricula.idAutorizado2 and matricula.idChild='$idChild')as Autorizado2,children.foto,matricula.idTutor1,matricula.idTutor2,matricula.idAutorizado1,matricula.idAutorizado2
    FROM children 
    inner join matricula 
    inner join tutors 
    inner join pickuplist
    WHERE 1 and children.idChild = matricula.idChild and tutors.idTutor = matricula.idTutor1 and pickuplist.idAutorizado = matricula.idAutorizado1 and matricula.idChild='$idChild'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $children = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($children);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
