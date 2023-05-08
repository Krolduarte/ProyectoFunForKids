
<?php
require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

$json = json_decode(file_get_contents('php://input'), true);

if (isset($json['idChild']) || isset($json['dailyReportReady'])) {

    $idChild = $json['idChild'];
    $dailyReportReady = $json['dailyReportReady'];


    $sql = "UPDATE children SET dailyReportReady='$dailyReportReady' WHERE idChild ='$idChild'";


    try {
        // print_r($sql);
        $con->query($sql);
        header("HTTP/1.1 200 OK");
        header("Content-Type: application/json");


        echo json_encode([
            'success' => true,
            'msg' =>  "Icono Actualizado"
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