<?php

require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (
        isset($json['idTutor']) &&
        isset($json['nombreTutor']) &&
        isset($json['apellidosTutor'])  &&
        isset($json['relacion']) &&
        isset($json['lugarNacimientoTutor']) &&
        isset($json['fechaNacimientoTutor'])  &&
        isset($json['dni']) &&
        isset($json['direccion']) &&
        isset($json['telefono']) 
        
    ) {


        $idTutor = $json['idTutor'];
        $nombreTutor = $json['nombreTutor'];
        $apellidosTutor = $json['apellidosTutor'];
        $relacion = $json['relacion'];
        $lugarNacimientoTutor = $json['lugarNacimientoTutor'];
        $fechaNacimientoTutor = $json['fechaNacimientoTutor'];
        $dni = $json['dni'];
        $direccion = $json['direccion'];
        $telefono = $json['telefono'];
       



        $sql = "INSERT INTO tutors (idTutor,nombreTutor,apellidosTutor,relacion,lugarNacimientoTutor,fechaNacimientoTutor,dni,direccion,telefono) VALUES ('$idTutor','$nombreTutor', '$apellidosTutor', '$relacion',  '$lugarNacimientoTutor', '$fechaNacimientoTutor', '$dni', '$direccion', '$telefono')";
        try {
            $con->query($sql);
            $idTutor= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idUsuario' => $idTutor,
                'msg' => "este tutor ha sido agregado a la lista"
            ]);
            // echo json_encode($con->insert_id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}





header("HTTP/1.1 400 Bad Request");
