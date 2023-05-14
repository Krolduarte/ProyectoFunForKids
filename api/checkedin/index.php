<?php
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $sql = "SELECT * FROM checkedin inner join children inner join matricula WHERE checkedin.idChild = children.idChild and matricula.idChild =children.idChild and checkedin.horaSalida is null ";

    if (
        isset($_GET['idChild']) ||
        isset($_GET['sala']) ||
        isset($_GET['idTutorDrop']) ||
        isset($_GET['idTutorPickUp']) ||
        isset($_GET['horaIngreso']) ||
        isset($_GET['nombreBebe']) ||
        isset($_GET['apellido1Bebe']) ||
        isset($_GET['genero']) ||
        isset($_GET['fechaNacimiento']) ||
        isset($_GET['lugarNacimiento']) ||
        isset($_GET['isTakingMed']) ||
        isset($_GET['medicamentoTomado']) ||
        isset($_GET['isAllergicToMed']) ||
        isset($_GET['medicamentoAlergia']) ||
        isset($_GET['hasFoodAllergy']) ||
        isset($_GET['alergeno']) ||
        isset($_GET['alergias']) ||
        isset($_GET['hasDisability']) ||
        isset($_GET['discapacidad']) ||
        isset($_GET['foto']) ||
        isset($_GET['checkedIn'])
    ) {


        if (isset($_GET['idChild'])) {
            $idChild = $_GET['idChild'];
            $sql .= " AND idChild='$idChild' ";
        }
        if (isset($_GET['sala'])) {
            $sala = $_GET['sala'];
            $sql .= " AND sala='$sala' ";
        }
        if (isset($_GET['idTutorDrop'])) {
            $idTutorDrop = $_GET['idTutorDrop'];
            $sql .= " AND idTutorDrop='$idTutorDrop' ";
        }
        if (isset($_GET['idTutorPickUp'])) {
            $idTutorPickUp = $_GET['idTutorPickUp'];
            $sql .= " AND idTutorPickUp='$idTutorPickUp' ";
        }
        if (isset($_GET['horaIngreso'])) {
            $horaIngreso = $_GET['horaIngreso'];
            $sql .= " AND horaIngreso='$horaIngreso' ";
        }
        if (isset($_GET['nombreBebe'])) {
            $nombreBebe = $_GET['nombreBebe'];
            $sql .= " AND nombreBebe LIKE '%" . $nombreBebe . "%'";
        }
        if (isset($_GET['apellido1Bebe'])) {
            $apellido1Bebe = $_GET['apellido1Bebe'];
            $sql .= " AND apellido1Bebe LIKE '%" . $apellido1Bebe . "%'";
        }
        if (isset($_GET['genero'])) {
            $genero = $_GET['genero'];
            $sql .= " AND genero LIKE '%" . $genero . "%'";
        }
        if (isset($_GET['fechaNacimiento'])) {
            $fechaNacimiento = $_GET['fechaNacimiento'];
            $sql .= " AND fechaNacimiento='$fechaNacimiento' ";
        }
        if (isset($_GET['lugarNacimiento'])) {
            $lugarNacimiento = $_GET['lugarNacimiento'];
            $sql .= " AND lugarNacimiento='$lugarNacimiento' ";
        }
        if (isset($_GET['isTakingMed'])) {
            $isTakingMed = $_GET['isTakingMed'];
            $sql .= " AND isTakingMed='$isTakingMed'";
        }
        if (isset($_GET['medicamentoTomado'])) {
            $medicamentoTomado = $_GET['medicamentoTomado'];
            $sql .= " AND medicamentoTomado='$medicamentoTomado' ";
        }
        if (isset($_GET['isAllergicToMed'])) {
            $isAllergicToMed = $_GET['isAllergicToMed'];
            $sql .= " AND isAllergicToMed='$isAllergicToMed' ";
        }
        if (isset($_GET['medicamentoAlergia'])) {
            $medicamentoAlergia = $_GET['medicamentoAlergia'];
            $sql .= " AND medicamentoAlergia='$medicamentoAlergia' ";
        }
        if (isset($_GET['hasFoodAllergy'])) {
            $hasFoodAllergy = $_GET['hasFoodAllergy'];
            $sql .= " AND hasFoodAllergy='$hasFoodAllergy' ";
        }
        if (isset($_GET['alergeno'])) {
            $alergeno = $_GET['alergeno'];
            $sql .= " AND alergeno='$alergeno' ";
        }
        if (isset($_GET['alergias'])) {
            $alergias = $_GET['alergias'];
            $sql .= " AND alergias='$alergias' ";
        }
        if (isset($_GET['hasDisability'])) {
            $hasDisability = $_GET['hasDisability'];
            $sql .= " AND hasDisability='$hasDisability' ";
        }
        if (isset($_GET['discapacidad'])) {
            $discapacidad = $_GET['discapacidad'];
            $sql .= " AND discapacidad='$discapacidad' ";
        }
        if (isset($_GET['foto'])) {
            $foto = $_GET['foto'];
            $sql .= " AND foto='$foto' ";
        }
        if (isset($_GET['checkedIn'])) {
            $checkedIn = $_GET['checkedIn'];
            $sql .= " AND checkedIn='$checkedIn' ";
        }
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

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (
        isset($json['idChild']) ||
        isset($json['idMonitorCheckIn']) ||
        isset($json['sala'])

    ) {

        $idChild = $json['idChild'];
        $idMonitorCheckIn = $json['idMonitorCheckIn'];
        $sala = $json['sala'];


        if (isset($json['idAutorizadoDrop'])) {
            $idAutorizadoDrop = $json['idAutorizadoDrop'];
            if ($idAutorizadoDrop != 0) {
                $sql = "INSERT INTO checkedin(idChild, idMonitorCheckIn, sala, idAutorizadoDrop, horaIngreso) VALUES ('$idChild', '$idMonitorCheckIn', '$sala',  '$idAutorizadoDrop', CURTIME())";
            }
        }

        if (isset($json['idTutorDrop'])) {

            $idTutorDrop = $json['idTutorDrop'];
            if ($idTutorDrop != 0) {
                $sql = "INSERT INTO checkedin(idChild, idMonitorCheckIn, sala, idTutorDrop, horaIngreso) VALUES ('$idChild', '$idMonitorCheckIn', '$sala',  '$idTutorDrop', CURTIME())";
            }
        }

        try {
            $con->query($sql);

            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'id' => $id,
                'msg' => "Checkin realizado exitosamente"
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

header("HTTP/1.1 400 Bad Request");
