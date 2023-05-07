<?php
require_once('../../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM children  inner join checkedin WHERE checkedin.idChild=children.idChild ";


    if (
        isset($_GET['idChild']) || isset($_GET['nombreBebe']) || isset($_GET['apellido1Bebe'])  || isset($_GET['apellido2Bebe']) || isset($_GET['genero'])  || isset($_GET['fechaNacimiento']) || isset($_GET['lugarNacimiento']) || isset($_GET['isTakingMed']) || isset($_GET['medicamentoTomado']) || isset($_GET['isAllergicToMed']) || isset($_GET['medicamentoAlergia']) || isset($_GET['hasFoodAllergy']) || isset($_GET['alergeno']) || isset($_GET['alergias']) || isset($_GET['hasDisability'])  || isset($_GET['discapacidad']) || isset($_GET['checkedIn']) || isset($_GET['horaIngreso'])
    ) {

        if (isset($_GET['idChild'])) {
            $idChild = $_GET['idChild'];
            $sql .= "AND idChild='$idChild'";
        }

        if (isset($_GET['nombreBebe'])) {
            $nombreBebe = $_GET['nombreBebe'];
            $sql .= " AND nombreBebe LIKE '%" . $nombreBebe . "%'";
        }

        if (isset($_GET['apellido1Bebe'])) {
            $apellido1Bebe = $_GET['apellido1Bebe'];
            $sql .= " AND apellido1Bebe LIKE '%" . $apellido1Bebe . "%'";
        }
        if (isset($_GET['apellido2Bebe'])) {
            $apellido2Bebe = $_GET['apellido2Bebe'];
            $sql .= " AND apellido2Bebe LIKE '%" . $apellido2Bebe . "%'";
        }
        if (isset($_GET['genero'])) {
            $genero = $_GET['genero'];
            $sql .= " AND genero='$genero'";
        }
        if (isset($_GET['fechaNacimiento'])) {
            $fechaNacimiento = $_GET['fechaNacimiento'];
            $sql .= " AND fechaNacimiento='$fechaNacimiento'";
        }
        if (isset($_GET['lugarNacimiento'])) {
            $lugarNacimiento = $_GET['lugarNacimiento'];
            $sql .= " AND lugarNacimiento='$lugarNacimiento'";
        }
        if (isset($_GET['isTakingMed'])) {
            $isTakingMed = $_GET['isTakingMed'];
            $sql .= " AND isTakingMed='$isTakingMed'";
        }
        if (isset($_GET['medicamentoTomado'])) {
            $medicamentoTomado = $_GET['medicamentoTomado'];
            $sql .= " AND medicamentoTomado='$medicamentoTomado'";
        }
        if (isset($_GET['isAllergicToMed'])) {
            $isAllergicToMed = $_GET['isAllergicToMed'];
            $sql .= " AND isAllergicToMed='$isAllergicToMed'";
        }
        if (isset($_GET['medicamentoAlergia'])) {
            $medicamentoAlergia = $_GET['medicamentoAlergia'];
            $sql .= " AND medicamentoAlergia='$medicamentoAlergia'";
        }
        if (isset($_GET['hasFoodAllergy'])) {
            $hasFoodAllergy = $_GET['hasFoodAllergy'];
            $sql .= " AND hasFoodAllergy='$hasFoodAllergy'";
        }
        if (isset($_GET['alergeno'])) {
            $alergeno = $_GET['alergeno'];
            $sql .= " AND alergeno='$alergeno'";
        }
        if (isset($_GET['alergias'])) {
            $alergias = $_GET['alergias'];
            $sql .= " AND alergias='$alergias'";
        }
        if (isset($_GET['hasDisability'])) {
            $hasDisability = $_GET['hasDisability'];
            $sql .= " AND hasDisability='$hasDisability'";
        }


        if (isset($_GET['discapacidad'])) {
            $discapacidad = $_GET['discapacidad'];
            $sql .= " AND discapacidad = '$discapacidad'";
        }


        if (isset($_GET['checkedIn'])) {
            $checkedIn = $_GET['checkedIn'];
            $sql .= " AND checkedIn = '$checkedIn'";
        }

        if (isset($_GET['horaIngreso'])) {
            $horaIngreso = $_GET['horaIngreso'];
            $sql .= " AND horaIngreso = '$horaIngreso'";
        }
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        // print_r($sql);
        $result = $con->query($sql);
        $filtrados = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($filtrados);
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}
