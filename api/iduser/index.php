<?php
require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT idUsuario FROM users WHERE 1 ";
   
    if (isset($_GET['usuario'])) {
        $usuario = $_GET['usuario'];
        $sql .= " AND usuario='$usuario'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $userID = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($userID);
          

    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
