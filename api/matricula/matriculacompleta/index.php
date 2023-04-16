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
        isset($json['idAutorizado1']) 
       
        
    ) {

        $idUsuario = $json['idUsuario'];
        $idChild = $json['idChild'];
        $idTutor1 = $json['idTutor1'];
        $idTutor2 = $json['idTutor2'];
        $idAutorizado1 = $json['idAutorizado1'];
      
      
       
    
        $sql = "INSERT INTO matricula (idUsuario,idChild,idTutor1,idTutor2,idAutorizado1) VALUES ('$idUsuario', '$idChild', '$idTutor1', '$idTutor2','$idAutorizado1')";
        try {
            $con->query($sql);
            $idMatricula= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idMatricula' => $idMatricula,
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

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM matricula WHERE 1 ";
    if (isset($_GET['idMatricula'])) {
        $idMatricula = $_GET['idMatricula'];
        $sql .= " AND idMatricula='$idMatricula'";
    } elseif (isset($_GET['idUsuario'])) {
        $idUsuario = $_GET['idUsuario'];
        $sql .= " AND idUsuario='$idUsuario'";
    } elseif (isset($_GET['idChild'])) {
        $idChild = $_GET['idChild'];
        $sql .= " AND idChild='$idChild'";
    } elseif (isset($_GET['idTutor1'])) {
        $idTutor1 = $_GET['idTutor1'];
        $sql .= " AND idTutor1='$idTutor1'";
    } elseif (isset($_GET['idTutor2'])) {
        $idTutor2 = $_GET['idTutor2'];
        $sql .= " AND idTutor2='$idTutor2'";
   
    } elseif (isset($_GET['idAutorizado1'])) {
        $idAutorizado1 = $_GET['idAutorizado1'];     
        $sql .= " AND idAutorizado1='$idAutorizado1'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $tutors = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($tutors);
          

    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}



// if ($_SERVER['REQUEST_METHOD'] == 'GET') {
//     $sql = "SELECT children.* FROM matricula inner join children  WHERE 1 ";
   
//     if (isset($_GET['idChild'])) {
//         $idChild = $_GET['idChild'];
//         $sql .= " AND children.idChild='$idChild'";
    
//     } elseif (count($_GET) > 0) {
//         header("HTTP/1.1 400 Bad Request");
//         exit;
//     }

//     try {
//         $result = $con->query($sql);
//         $child = $result->fetch_all(MYSQLI_ASSOC);
//         header("HTTP/1.1 200 OK");
//         echo json_encode($child);
          

//     } catch (mysqli_sql_exception $e) {
//         header("HTTP/1.1 404 Not Found");
//     }
//     exit;
// }

