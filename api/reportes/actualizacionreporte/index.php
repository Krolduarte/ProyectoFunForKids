<?php

require_once('../../clases/conexion.php');


//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idreporte']) || isset($json['idMonitor']) || isset($json['idChild'])  || isset($json['desayuno']) || isset($json['merienda'])  || isset($json['comida']) || isset($json['siesta'])) {

        $idreporte = $json['idreporte'];
        $idChild = $json['idChild'];

        $sql = "UPDATE reportediario SET fechayhora= CURTIME()";



        if (isset($json['desayuno'])) {
            $desayuno = $json['desayuno'];
            if ($desayuno != "") {
                $sql .= ", desayuno='$desayuno'";
            }
        }

        if (isset($json['merienda'])) {
            $merienda = $json['merienda'];
            if ($merienda != "") {
                $sql .= ",merienda='$merienda'";
            }
        }

        if (isset($json['comida'])) {
            $comida = $json['comida'];
            if ($comida != "") {
                $sql .= ",comida='$comida'";
            }
        }
        if (isset($json['siesta'])) {
            $siesta = $json['siesta'];
            if ($siesta != "") {
                $sql .= ", siesta='$siesta'";
            }
        }

        $sql .= " WHERE idreporte ='$idreporte'";



        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");


            // header("Authorization: $token");

            // echo json_encode($idreporte);
            echo json_encode([
                'success' => true,
                'msg' =>  " Reporte de ". $idreporte.  " actualizado"
            ]);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
} else {
    header("HTTP/1.1 400 Bad Request");
}
