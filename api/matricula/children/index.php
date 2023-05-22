<?php
require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idChild']) && isset($json['nombreBebe']) && isset($json['apellido1Bebe'])  && isset($json['apellido2Bebe']) && isset($json['genero'])  && isset($json['fechaNacimiento']) && isset($json['lugarNacimiento']) && isset($json['isTakingMed']) && isset($json['isAllergicToMed'])  && isset($json['hasFoodAllergy']) && isset($json['hasDisability']) || isset($json['medicamentoTomado']) || isset($json['medicamentoAlergia']) || isset($json['alergeno']) || isset($json['alergias']) || isset($json['discapacidad']) || isset($json['foto'])) {

        $idChild = $json['idChild'];
        $nombreBebe = $json['nombreBebe'];
        $apellido1Bebe = $json['apellido1Bebe'];
        $apellido2Bebe = $json['apellido2Bebe'];
        $genero = $json['genero'];
        $fechaNacimiento = $json['fechaNacimiento'];
        $lugarNacimiento = $json['lugarNacimiento'];
        $isTakingMed = $json['isTakingMed'];
        $isAllergicToMed = $json['isAllergicToMed'];
        $hasFoodAllergy = $json['hasFoodAllergy'];
        $hasDisability = $json['hasDisability'];
        $foto = $json['foto'];

        if (isset($json['medicamentoTomado'])) {
            $medicamentoTomado = $json['medicamentoTomado'];
        }

        if (isset($json['medicamentoAlergia'])) {
            $medicamentoAlergia = $json['medicamentoAlergia'];
        }

        if (isset($json['alergeno'])) {
            $alergeno = $json['alergeno'];
        }
        if (isset($json['alergias'])) {
            $json['alergias'] = implode(", ", $json['alergias']);
        }


        if (isset($json['discapacidad'])) {
            $discapacidad = $json['discapacidad'];
        }




        $sql = "INSERT INTO children (idChild,nombreBebe,apellido1Bebe,apellido2Bebe,genero,fechaNacimiento,lugarNacimiento,isTakingMed,medicamentoTomado,isAllergicToMed,medicamentoAlergia,hasFoodAllergy,alergeno,alergias,hasDisability,discapacidad,foto) VALUES ('$idChild','$nombreBebe', '$apellido1Bebe', '$apellido2Bebe', '$genero', '$fechaNacimiento', '$lugarNacimiento', $isTakingMed, '$medicamentoTomado',$isAllergicToMed,'$medicamentoAlergia',$hasFoodAllergy,'$alergeno','{$json['alergias']}',$hasDisability,'$discapacidad','$foto')";
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'msg' => "Bebé ha sido registrado"
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

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idChild']) || isset($json['nombreBebe']) || isset($json['apellido1Bebe'])  || isset($json['apellido2Bebe']) || isset($json['genero'])  || isset($json['fechaNacimiento']) && isset($json['lugarNacimiento']) && isset($json['isTakingMed']) && isset($json['isAllergicToMed'])  && isset($json['hasFoodAllergy']) && isset($json['hasDisability']) || isset($json['medicamentoTomado']) || isset($json['medicamentoAlergia']) || isset($json['alergeno']) || isset($json['alergias']) || isset($json['discapacidad']) || isset($json['foto'])) {

        $sql = "UPDATE children set dailyReportReady = '0' ";

        $idChild = $json['idChild'];


        if (isset($json['nombreBebe'])) {
            $nombreBebe = $json['nombreBebe'];
            if ($nombreBebe != "") {
                $sql .= ", nombreBebe='$nombreBebe'";
            }
        }

        if (isset($json['apellido1Bebe'])) {
            $apellido1Bebe = $json['apellido1Bebe'];
            if ($apellido1Bebe != "") {
                $sql .= ",apellido1Bebe='$apellido1Bebe'";
            }
        }

        if (isset($json['apellido2Bebe'])) {
            $apellido2Bebe = $json['apellido2Bebe'];
            if ($apellido2Bebe != "") {
                $sql .= ",apellido2Bebe='$apellido2Bebe'";
            }
        }
        if (isset($json['genero'])) {
            $genero = $json['genero'];
            if ($genero != "") {
                $sql .= ", genero='$genero'";
            }
        }
        if (isset($json['fechaNacimiento'])) {
            $fechaNacimiento = $json['fechaNacimiento'];
            if ($fechaNacimiento != "") {
                $sql .= ", fechaNacimiento='$fechaNacimiento'";
            }
        }
        if (isset($json['lugarNacimiento'])) {
            $lugarNacimiento = $json['lugarNacimiento'];
            if ($lugarNacimiento != "") {
                $sql .= ", lugarNacimiento='$lugarNacimiento'";
            }
        }
        if (isset($json['isTakingMed'])) {
            $isTakingMed = $json['isTakingMed'];

            $sql .= ", isTakingMed='$isTakingMed'";
        }
        if (isset($json['isAllergicToMed'])) {
            $isAllergicToMed = $json['isAllergicToMed'];

            $sql .= ", isAllergicToMed='$isAllergicToMed'";
        }
        if (isset($json['hasFoodAllergy'])) {
            $hasFoodAllergy = $json['hasFoodAllergy'];

            $sql .= ", hasFoodAllergy='$hasFoodAllergy'";
        }
        if (isset($json['hasDisability'])) {
            $hasDisability = $json['hasDisability'];
            if ($hasDisability != "") {
                $sql .= ", hasDisability='$hasDisability'";
            }
        }

        if (isset($json['discapacidad'])) {
            $discapacidad = $json['discapacidad'];

            $sql .= ", discapacidad='$discapacidad'";
        }
        if (isset($json['foto'])) {
            $foto = $json['foto'];

            $sql .= ", foto='$foto'";
        }

        if (isset($json['medicamentoTomado'])) {
            $medicamentoTomado = $json['medicamentoTomado'];

            $sql .= ", medicamentoTomado='$medicamentoTomado'";
        }

        if (isset($json['medicamentoAlergia'])) {
            $medicamentoAlergia = $json['medicamentoAlergia'];
            $sql .= ", medicamentoAlergia='$medicamentoAlergia'";
        }

        if (isset($json['alergeno'])) {
            $alergeno = $json['alergeno'];
            $sql .= ", alergeno='$alergeno'";
        }
        if (isset($json['alergias'])) {

            $json['alergias'] = implode(", ", $json['alergias']);
            $sql .= ", alergeno='{$json['alergias']}'";
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
                'msg' =>  "Información de BEBÉ actualizada"
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
