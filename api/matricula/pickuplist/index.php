<?php
// require '../../vendor/autoload.php';
require_once('../../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (
        isset($json['idAutorizado']) &&
        isset($json['nombreAutorizado']) &&
        isset($json['apellidosAutorizado'])  &&
        isset($json['relacionAutorizado']) &&
        isset($json['dniAutorizado']) 
       
        
        
    ) {


        $idAutorizado = $json['idAutorizado'];
        $nombreAutorizado = $json['nombreAutorizado'];
        $apellidosAutorizado = $json['apellidosAutorizado'];
        $relacionAutorizado = $json['relacionAutorizado'];
        $dniAutorizado = $json['dniAutorizado'];
      
       
    
        $sql = "INSERT INTO pickuplist (idAutorizado, nombreAutorizado,apellidosAutorizado,relacionAutorizado,dniAutorizado) VALUES ('$idAutorizado', '$nombreAutorizado', '$apellidosAutorizado', '$relacionAutorizado',  '$dniAutorizado')";
        try {
            $con->query($sql);
            $idAutorizado= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idUsuario' => $idAutorizado,
                'msg' => "esta persona se ha sido agregado a la lista de autorizados"
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
