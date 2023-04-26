<?php
require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idChild']) && isset($json['idMonitor'])  && isset($json['consistencia']) && isset($json['cambio_panal'])) {

        $idChild = $json['idChild'];
        $idMonitor = $json['idMonitor'];
        $consistencia = $json['consistencia'];
        $cambio_panal = $json['cambio_panal'];

        $sql = "INSERT INTO deposiciones (idChild,idMonitor,fechayhora,consistencia,cambio_panal) VALUES ('$idChild','$idMonitor', CURTIME(),'$consistencia', '$cambio_panal')";
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'msg' => "Deposicion registrada"
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


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT * FROM deposiciones WHERE 1 ";
    
    if (isset($_GET['id_deposiciones'])) {
        $id_deposiciones = $_GET['id_deposiciones'];
        $sql .= "AND id_deposiciones='$id_deposiciones'";

    } elseif (isset($_GET['idChild'])) {
        $idChild = $_GET['idChild'];
        $sql .= " AND idChild='$idChild'";

    } elseif (isset($_GET['idMonitor'])) {
        $idMonitor = $_GET['idMonitor'];
        $sql .= " AND idMonitor='$idMonitor'";

    } elseif (isset($_GET['fechayhora'])) {
        $fechayhora = $_GET['fechayhora'];
        $sql .= "AND fechayhora='$fechayhora'";

    } elseif (isset($_GET['consistencia'])) {
        $consistencia = $_GET['consistencia'];
        $sql .= " AND consistencia='$consistencia'";

    } elseif (isset($_GET['cambio_panal'])) {
        $cambio_panal = $_GET['cambio_panal'];
        $sql .= " AND cambio_panal='$cambio_panal'";
   
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
