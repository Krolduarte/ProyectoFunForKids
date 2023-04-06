<?php
// require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['nombre']) && isset($json['apellidos'])  && isset($json['fechaNacimiento']) && isset($json['lugarNacimiento'])  && isset($json['usuario']) && isset($json['email']) && isset($json['contrasena'])) {

    
  
        $nombre = $json['nombre'];
        $apellidos = $json['apellidos'];
        $fechaNacimiento = $json['fechaNacimiento'];
        $lugarNacimiento = $json['lugarNacimiento'];
        $usuario = $json['usuario'];
        $email = $json['email'];
        $contrasena = hash("sha512", $json['contrasena']);
      
       
      

        $sql = "INSERT INTO users (nombre,apellidos,fechaNacimiento,lugarNacimiento,usuario,email,contrasena) VALUES ('$nombre', '$apellidos', '$fechaNacimiento',  '$lugarNacimiento', '$usuario', '$email', '$contrasena')";
        try {
            $con->query($sql);
            $idUsuario = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idUsuario'=>$idUsuario,
                'msg'=> "usuario creado"
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
