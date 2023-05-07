<?php
require_once('../../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    $sql = "SELECT COUNT(checkedin.idChild) as count FROM `checkedin` 
    inner join children 
    where children.idChild= checkedin.idChild 
    and checkedin.horaSalida is null ";
    if (isset($_GET['sala'])) {
        $sala = $_GET['sala'];
        $sql .= "AND sala='$sala' ";

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
