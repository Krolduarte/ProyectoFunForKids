
<?php

require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

$json = json_decode(file_get_contents('php://input'), true);

if (isset($_GET['idmsg'])) {
    $idmsg = $json['idmsg'];


    $sql = "UPDATE chat SET leido = '1' where idmsg='$idmsg' ";


    try {
        $con->query($sql);
        header("HTTP/1.1 200 OK");
        echo json_encode($idmsg);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
    }
} else {
    header("HTTP/1.1 400 Bad Request");
}
exit;
}