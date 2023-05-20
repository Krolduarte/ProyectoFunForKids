<?php
require_once('../../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT * FROM children inner join matricula where matricula.idChild = children.idChild  ";
    // $sql = "SELECT * FROM children inner join checkedin where checkedin.idChild=children.idChild and checkedin.horaSalida is null ";
    if (isset($_GET['idChild'])) {
        $idChild = $_GET['idChild'];
        $sql .= " AND idChild='$idChild'";

    } elseif (isset($_GET['nombreBebe']) || isset($_GET['apellido1Bebe'])) {
        if (isset($_GET['nombreBebe'])) {
            $nombreBebe = $_GET['nombreBebe'];
            $sql .= " AND nombreBebe LIKE '%" . $nombreBebe . "%'";
        }
        if (isset($_GET['apellido1Bebe'])) {
            $apellido1Bebe = $_GET['apellido1Bebe'];
            $sql .= " AND apellido1Bebe LIKE '%" . $apellido1Bebe . "%'";
        }

    } elseif (isset($_GET['genero'])) {
        $genero = $_GET['genero'];
        $sql .= " AND genero LIKE '%" . $genero . "%'";
    } elseif (isset($_GET['fechaNacimiento'])) {
        $fechaNacimiento = $_GET['fechaNacimiento'];
        $sql .= " AND fechaNacimiento='$fechaNacimiento'";
    } elseif (isset($_GET['lugarNacimiento'])) {
        $lugarNacimiento = $_GET['lugarNacimiento'];
        $sql .= " AND lugarNacimiento='$lugarNacimiento'";
    } elseif (isset($_GET['isTakingMed'])) {
        $isTakingMed = $_GET['isTakingMed'];
        $sql .= " AND isTakingMed='$isTakingMed'";
    } elseif (isset($_GET['medicamentoTomado'])) {
        $medicamentoTomado = $_GET['medicamentoTomado'];
        $sql .= " AND medicamentoTomado='$medicamentoTomado'";
    } elseif (isset($_GET['isAllergicToMed'])) {
        $isAllergicToMed = $_GET['isAllergicToMed'];
        $sql .= " AND isAllergicToMed='$isAllergicToMed'";
    } elseif (isset($_GET['medicamentoAlergia'])) {
        $medicamentoAlergia = $_GET['medicamentoAlergia'];
        $sql .= " AND medicamentoAlergia='$medicamentoAlergia'";
    } elseif (isset($_GET['hasFoodAllergy'])) {
        $hasFoodAllergy = $_GET['hasFoodAllergy'];
        $sql .= " AND hasFoodAllergy='$hasFoodAllergy'";
    } elseif (isset($_GET['alergeno'])) {
        $alergeno = $_GET['alergeno'];
        $sql .= " AND alergeno='$alergeno'";
    } elseif (isset($_GET['alergias'])) {
        $alergias = $_GET['alergias'];
        $sql .= " AND alergias='$alergias'";
    } elseif (isset($_GET['hasDisability'])) {
        $hasDisability = $_GET['hasDisability'];
        $sql .= " AND hasDisability='$hasDisability'";
    } elseif (isset($_GET['discapacidad'])) {
        $discapacidad = $_GET['discapacidad'];
        $sql .= " AND discapacidad='$discapacidad'";
    } elseif (isset($_GET['foto'])) {
        $foto = $_GET['foto'];
        $sql .= " AND foto='$foto'";
    } elseif (isset($_GET['checkedIn'])) {
        $checkedIn = $_GET['checkedIn'];
        $sql .= " AND checkedIn='$checkedIn'";
    } elseif (isset($_GET['checkedIn'])) {
        $checkedIn = $_GET['checkedIn'];
        $sql .= " AND checkedIn='$checkedIn'";
    } elseif (isset($_GET['dailyReportReady'])) {
        $dailyReportReady = $_GET['dailyReportReady'];
        $sql .= " AND dailyReportReady='$dailyReportReady'";
   
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    $sql .= "order by children.nombreBebe";

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

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idChild']) || isset($json['checkedIn'])) {

        $idChild = $json['idChild'];
        $checkedIn = $json['checkedIn'];





        $sql = "UPDATE children SET checkedIn='$checkedIn' WHERE idChild ='$idChild'";


        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");


            echo json_encode([
                'success' => true,
                'msg' =>  "Update realizado en tabla Children en propiedad CheckedIn"
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
