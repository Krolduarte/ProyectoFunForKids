<?php
// require '../../vendor/autoload.php';
require_once('../../clases/conexion.php');

use Firebase\JWT\JWT;

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (
        isset($json['idAutorizado']) &&
        isset($json['nombreAutorizado']) &&
        isset($json['apellidosAutorizado'])  &&
        isset($json['relacionAutorizado']) &&
        isset($json['dniAutorizado']) 
    ) {


        $idAutorizado = $json['idAutorizado'];
        $nombreAutorizado = $json['nombreAutorizado'];
        $apellidosAutorizado = $json['apellidosAutorizado'];
        $relacionAutorizado = $json['relacionAutorizado'];
        $dniAutorizado = $json['dniAutorizado'];
      
       
    
        $sql = "INSERT INTO pickuplist (idAutorizado, nombreAutorizado,apellidosAutorizado,relacionAutorizado,dniAutorizado) VALUES ('$idAutorizado', '$nombreAutorizado', '$apellidosAutorizado', '$relacionAutorizado',  '$dniAutorizado')";
        try {
            $con->query($sql);
            $idAutorizado= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idUsuario' => $idAutorizado,
                'msg' => "esta persona se ha sido agregado a la lista de autorizados"
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
    $sql = "SELECT * FROM pickuplist WHERE 1 ";
    if (isset($_GET['idAutorizado'])) {
        $idAutorizado = $_GET['idAutorizado'];
        $sql .= " AND idAutorizado='$idAutorizado'";
    } elseif (isset($_GET['nombreAutorizado'])) {
        $nombreAutorizado = $_GET['nombreAutorizado'];
        $sql .= " AND nombreAutorizado='$nombreAutorizado'";
    } elseif (isset($_GET['apellidosAutorizado'])) {
        $apellidosAutorizado = $_GET['apellidosAutorizado'];
        $sql .= " AND apellidosAutorizado='$apellidosAutorizado'";
    } elseif (isset($_GET['relacionAutorizado'])) {
        $relacionAutorizado = $_GET['relacionAutorizado'];
        $sql .= " AND relacionAutorizado='$relacionAutorizado'";
    } elseif (isset($_GET['dniAutorizado'])) {
        $dniAutorizado = $_GET['dniAutorizado'];
        $sql .= " AND dniAutorizado='$dniAutorizado'";

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

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (
        isset($json['idAutorizado']) &&
        isset($json['nombreAutorizado']) &&
        isset($json['apellidosAutorizado'])  &&
        isset($json['relacionAutorizado']) &&
        isset($json['dniAutorizado']) 
    ) {


        


        $sql = "UPDATE pickuplist set actualizado = '1' ";

        $idAutorizado = $json['idAutorizado'];
       

        if (isset($json['idAutorizado'])) {
            $idAutorizado = $json['idAutorizado'];
       
                $sql .= ", idAutorizado='$idAutorizado'";
       
        }

        if (isset($json['nombreAutorizado'])) {
            $nombreAutorizado = $json['nombreAutorizado'];
        
                $sql .= ",nombreAutorizado='$nombreAutorizado'";
         
        }

        if (isset($json['apellidosAutorizado'])) {
            $apellidosAutorizado = $json['apellidosAutorizado'];
          
                $sql .= ",apellidosAutorizado='$apellidosAutorizado'";
            
        }
        if (isset($json['relacionAutorizado'])) {
            $relacionAutorizado = $json['relacionAutorizado'];
           
                $sql .= ", relacionAutorizado='$relacionAutorizado'";
            
        }
        if (isset($json['dniAutorizado'])) {
            $dniAutorizado = $json['dniAutorizado'];
          
                $sql .= ", dniAutorizado='$dniAutorizado'";
            
        }
        
        

        $sql .= " WHERE idAutorizado ='$idAutorizado'";



        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");


            // header("Authorization: $token");

            // echo json_encode($idreporte);
            echo json_encode([
                'success' => true,
                'msg' =>  "Información de autorizado actualizada"
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
