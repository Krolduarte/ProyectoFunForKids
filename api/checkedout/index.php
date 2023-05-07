<?php
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    $sql = "UPDATE checkedin SET horaSalida= CURTIME()";



    if (isset($json['idAutorizadoPickUp'])) {
        $idAutorizadoPickUp = $json['idAutorizadoPickUp'];
        if ($idAutorizadoPickUp != 0) {
            $sql .= ", idAutorizadoPickUp='$idAutorizadoPickUp'";
        }
    }

    if (isset($json['idTutorPickUp'])) {
        $idTutorPickUp = $json['idTutorPickUp'];
        if ($idTutorPickUp != 0) {
            $sql .= ", idTutorPickUp='$idTutorPickUp'";
        }
    }

    if (isset($json['idMonitorCheckOut'])) {
        $idMonitorCheckOut = $json['idMonitorCheckOut'];
        if ($idMonitorCheckOut != "") {
            $sql .= ",idMonitorCheckOut='$idMonitorCheckOut'";
        }
    }

    if (isset($json['idChild'])) {
        $idChild = $json['idChild'];
    }

    $sql .= " WHERE idChild ='$idChild'";



    try {
        // print_r($sql);
        $con->query($sql);
        header("HTTP/1.1 200 OK");
        header("Content-Type: application/json");


        // header("Authorization: $token");

        // echo json_encode($idreporte);
        echo json_encode([
            'success' => true,
            'msg' =>  "Checkout realizado exitosamente"
        ]);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
    }
} else {
    header("HTTP/1.1 400 Bad Request");
}
exit;

