<?php
require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($json['idChild']) && isset($json['nombreBebe']) && isset($json['apellido1Bebe'])  && isset($json['apellido2Bebe']) && isset($json['genero'])  && isset($json['fechaNacimiento']) && isset($json['lugarNacimiento']) && isset($json['isTakingMed']) && isset($json['isAllergicToMed'])  && isset($json['hasFoodAllergy']) && isset($json['hasDisability']) || isset($json['medicamentoTomado']) || isset($json['medicamentoAlergia']) || isset($json['alergeno']) || isset($json['alergias']) || isset($json['discapacidad']) ) {

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
      
        if (isset($json['medicamentoTomado'])){
            $medicamentoTomado = $json['medicamentoTomado'];
        }

        if (isset($json['medicamentoAlergia'])){
            $medicamentoAlergia = $json['medicamentoAlergia'];
        }

        if (isset($json['alergeno'])){
            $alergeno = $json['alergeno'];
        }
        if (isset($json['alergias'])){
            $json['alergias'] = implode(",", $json['alergias']);
        }

      
        if (isset($json['discapacidad'])){
            $discapacidad = $json['discapacidad'];
        }

        
     

        $sql = "INSERT INTO children (idChild,nombreBebe,apellido1Bebe,apellido2Bebe,genero,fechaNacimiento,lugarNacimiento,isTakingMed,medicamentoTomado,isAllergicToMed,medicamentoAlergia,hasFoodAllergy,alergeno,alergias,hasDisability,discapacidad) VALUES ('$idChild','$nombreBebe', '$apellido1Bebe', '$apellido2Bebe', '$genero', '$fechaNacimiento', '$lugarNacimiento', $isTakingMed, '$medicamentoTomado',$isAllergicToMed,'$medicamentoAlergia',$hasFoodAllergy,'$alergeno','{$json['alergias']}',$hasDisability,'$discapacidad')";
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'id' => $id,
                'msg' => "registrado"
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
