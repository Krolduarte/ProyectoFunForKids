<?php
require '../../../vendor/autoload.php';
require_once('../../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['usuario']) &&  isset($json['contrasena'])) {

        $contrasenaHash = hash("sha512", $json['contrasena']);
        $usuario = $json['usuario'];


        $sql = "SELECT usuario FROM users where 1
        and  usuario='$usuario'
        and contrasena='$contrasenaHash'";
    }

    try {
        $result = mysqli_query($con, $sql);
        if (mysqli_num_rows($result) == 1) {

            $payload = [
                'iss' => '$issuer',
                'user' => "localhost",
            ];
            $jwt = JWT::encode($payload, 's3cr3tw0rd', 'HS256');

            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'msg' => "usuario ha podido hacer login",
                'token' => $jwt,
            

            ]);
            exit;
            
        } else {
            header("HTTP/1.1 401 ");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => false,
                'msg' => 'Credenciales no validas'
            ]);
        }
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT idUsuario,usuario FROM users WHERE 1 ";
    
    if (isset($_GET['idUsuario'])) {
        $idUsuario = $_GET['idUsuario'];
        $sql .= "AND idUsuario='$idUsuario'";

    } elseif (isset($_GET['usuario'])) {
        $usuario = $_GET['usuario'];
        $sql .= " AND usuario='$usuario'";

   
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $deposiciones = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($deposiciones);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}


header("HTTP/1.1 400 Bad Request");