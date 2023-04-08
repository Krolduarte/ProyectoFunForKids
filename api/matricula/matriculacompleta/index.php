<?php
// require '../../vendor/autoload.php';
require_once('../../clases/conexion.php');

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (
        isset($json['idUsuario']) &&
        isset($json['idChild'])  &&
        isset($json['idTutor1']) &&
        isset($json['idTutor2']) &&
        isset($json['idAutorizado1']) &&
        isset($json['idAutorizado2']) 
        
    ) {

        $idUsuario = $json['idUsuario'];
        $idChild = $json['idChild'];
        $idTutor1 = $json['idTutor1'];
        $idTutor2 = $json['idTutor2'];
        $idAutorizado1 = $json['idAutorizado1'];
        $idAutorizado2 = $json['idAutorizado2'];
      
       
    
        $sql = "INSERT INTO matricula (idUsuario,idChild,idTutor1,idTutor2,idAutorizado1,idAutorizado2) VALUES ($idUsuario, $idChild, $idTutor1, $idTutor2,$idAutorizado1,$idAutorizado2)";
        try {
            $con->query($sql);
            $idMatricula= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idUsuario' => $idMatricula,
                'msg' => "Matricula Actualizada"
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
