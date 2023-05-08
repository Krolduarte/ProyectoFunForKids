<?php
// require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['idRemitente'])&& isset($json['idDestinatario']) && isset($json['idChild']) && isset($json['msgText'])) {

    
        $idRemitente = $json['idRemitente'];
        $idChild = $json['idChild'];
        $idDestinatario = $json['idDestinatario'];
        $msgText = $json['msgText'];
  
        
        $sql = "INSERT INTO chat (idChild,idRemitente,idDestinatario,msgText,created_on) VALUES ('$idChild','$idRemitente','$idDestinatario', '$msgText', CURTIME())";
        try {
            $con->query($sql);
            $idmsg = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idmsg'=>$idmsg,
                'msg'=> "Mensaje ha sido enviado"
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

    $sql = "SELECT * FROM chat where 1 ";

    if (isset($_GET['idRemitente']) || isset($_GET['idChild']) ||isset($_GET['msgText'])|| isset($_GET['created_on']) || isset($_GET['idDestinatario']) ||isset($_GET['notificacionFecha']) ){

        if (isset($_GET['idRemitente'])) {
            $idRemitente = $_GET['idRemitente'];
            $sql .= " AND idRemitente='$idRemitente' ";
        }

        if (isset($_GET['idChild'])) {
            $idChild = $_GET['idChild'];
            $sql .= " AND idChild='$idChild' ";
        }

        if (isset($_GET['idDestinatario'])) {
            $idDestinatario = $_GET['idDestinatario'];
            $sql .= " AND idDestinatario='$idDestinatario' ";
        }
       if (isset($_GET['msgText'])) {
            $msgText = $_GET['msgText'];
            $sql .= " AND msgText='$msgText' ";
        } 
        if (isset($_GET['created_on'])) {
            $created_on = $_GET['created_on'];
            $sql .= " AND created_on='$created_on' ";

        }

        if (isset($_GET['notificacionFecha'])) {
            $notificacionFecha = $_GET['notificacionFecha']. ' 00:00:00';
            $finfecha = $_GET['notificacionFecha'] . ' 23:59:59';
            $sql .= " AND created_on between ' $notificacionFecha' and ' $finfecha' ";

        }

    
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


