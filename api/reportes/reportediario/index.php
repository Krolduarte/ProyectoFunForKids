<?php
require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idreporte']) && isset($json['idMonitor']) && isset($json['idChild'])  && isset($json['desayuno']) && isset($json['merienda'])  && isset($json['comida']) && isset($json['siesta'])) {

        $idreporte = $json['idreporte'];
        $idMonitor = $json['idMonitor'];
        $idChild = $json['idChild'];
        $desayuno = $json['desayuno'];
        $merienda = $json['merienda'];
        $comida = $json['comida'];
        $siesta = $json['siesta'];




        $sql = "INSERT INTO reportediario (idreporte,fechayhora,idMonitor,idChild,desayuno,merienda,comida,siesta) VALUES ('$idreporte', CURTIME(),'$idMonitor', '$idChild', '$desayuno', '$merienda', '$comida', '$siesta')";
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'msg' => "Reporte ha sido registrado"
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

    $sql = "SELECT * FROM reportediario WHERE 1 ";
    if (isset($_GET['idreporte'])) {
        $idreporte = $_GET['idreporte'];
        $sql .= "AND idreporte='$idreporte'";
    }
    if (isset($_GET['fechayhora'])) {
        $fechayhora = $_GET['fechayhora'];
        $sql .= "AND fechayhora='$fechayhora'";

    } elseif (isset($_GET['idMonitor'])) {
        $idMonitor = $_GET['idMonitor'];
        $sql .= " AND idMonitor='$idMonitor'";

    } elseif (isset($_GET['idChild'])) {
        $idChild = $_GET['idChild'];
        $sql .= " AND idChild='$idChild'";

    } elseif (isset($_GET['desayuno'])) {
        $desayuno = $_GET['desayuno'];
        $sql .= " AND desayuno='$desayuno'";

    } elseif (isset($_GET['merienda'])) {
        $merienda = $_GET['merienda'];
        $sql .= " AND merienda='$merienda'";

    } elseif (isset($_GET['comida'])) {
        $comida = $_GET['comida'];
        $sql .= " AND comida='$comida'";

    } elseif (isset($_GET['siesta'])) {
        $siesta = $_GET['siesta'];
        $sql .= " AND siesta='$siesta'";
        
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


header("HTTP/1.1 400 Bad Request");
