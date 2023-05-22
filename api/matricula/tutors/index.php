<?php

require_once('../../clases/conexion.php');
//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (
        isset($json['idTutor']) &&
        isset($json['nombreTutor']) &&
        isset($json['apellidosTutor'])  &&
        isset($json['relacion']) &&
        isset($json['lugarNacimientoTutor']) &&
        isset($json['fechaNacimientoTutor'])  &&
        isset($json['dni']) &&
        isset($json['direccion']) &&
        isset($json['telefono']) 
        
    ) {


        $idTutor = $json['idTutor'];
        $nombreTutor = $json['nombreTutor'];
        $apellidosTutor = $json['apellidosTutor'];
        $relacion = $json['relacion'];
        $lugarNacimientoTutor = $json['lugarNacimientoTutor'];
        $fechaNacimientoTutor = $json['fechaNacimientoTutor'];
        $dni = $json['dni'];
        $direccion = $json['direccion'];
        $telefono = $json['telefono'];
       



        $sql = "INSERT INTO tutors (idTutor,nombreTutor,apellidosTutor,relacion,lugarNacimientoTutor,fechaNacimientoTutor,dni,direccion,telefono) VALUES ('$idTutor','$nombreTutor', '$apellidosTutor', '$relacion',  '$lugarNacimientoTutor', '$fechaNacimientoTutor', '$dni', '$direccion', '$telefono')";
        try {
            $con->query($sql);
            $idTutor= $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'idTutor' => $idTutor,
                'msg' => "Tutor agregado a la base de datos"
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
    $sql = "SELECT * FROM tutors WHERE 1 ";
    if (isset($_GET['idTutor'])) {
        $idTutor = $_GET['idTutor'];
        $sql .= " AND idTutor='$idTutor'";
    } elseif (isset($_GET['nombreTutor'])) {
        $nombreTutor = $_GET['nombreTutor'];
        $sql .= " AND nombreTutor='$nombreTutor'";
    } elseif (isset($_GET['apellidosTutor'])) {
        $apellidosTutor = $_GET['apellidosTutor'];
        $sql .= " AND apellidosTutor='$apellidosTutor'";
    } elseif (isset($_GET['relacion'])) {
        $relacion = $_GET['relacion'];
        $sql .= " AND relacion='$relacion'";
    } elseif (isset($_GET['lugarNacimientoTutor'])) {
        $lugarNacimientoTutor = $_GET['lugarNacimientoTutor'];
        $sql .= " AND lugarNacimientoTutor='$lugarNacimientoTutor'";
   
    } elseif (isset($_GET['fechaNacimientoTutor'])) {
        $fechaNacimientoTutor = $_GET['fechaNacimientoTutor'];     
        $sql .= " AND fechaNacimientoTutor='$fechaNacimientoTutor'";

   
    } elseif (isset($_GET['dni'])) {
        $dni = $_GET['dni'];
        $sql .= " AND dni='$dni'";
    } elseif (isset($_GET['direccion'])) {
        $direccion = $_GET['direccion'];
        $sql .= " AND direccion='$direccion'";
    } elseif (isset($_GET['telefono'])) {
        $telefono = $_GET['telefono'];
        $sql .= " AND telefono='$telefono'";
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
        isset($json['idTutor']) ||
        isset($json['nombreTutor']) ||
        isset($json['apellidosTutor'])  ||
        isset($json['relacion']) ||
        isset($json['lugarNacimientoTutor']) ||
        isset($json['fechaNacimientoTutor'])  ||
        isset($json['dni']) ||
        isset($json['direccion']) ||
        isset($json['telefono']) 
        
    ) {


        $sql = "UPDATE tutors set actualizado = '1' ";

        $idTutor = $json['idTutor'];
       

        if (isset($json['idTutor'])) {
            $idTutor = $json['idTutor'];
           
                $sql .= ", idTutor='$idTutor'";
            
        }

        if (isset($json['nombreTutor'])) {
            $nombreTutor = $json['nombreTutor'];
           
                $sql .= ",nombreTutor='$nombreTutor'";
            
        }

        if (isset($json['apellidosTutor'])) {
            $apellidosTutor = $json['apellidosTutor'];
           
                $sql .= ",apellidosTutor='$apellidosTutor'";
            
        }
        if (isset($json['relacion'])) {
            $relacion = $json['relacion'];
           
                $sql .= ", relacion='$relacion'";
            
        }
        if (isset($json['lugarNacimientoTutor'])) {
            $lugarNacimientoTutor = $json['lugarNacimientoTutor'];
          
                $sql .= ", lugarNacimientoTutor='$lugarNacimientoTutor'";
            
        }
        if (isset($json['fechaNacimientoTutor'])) {
            $fechaNacimientoTutor = $json['fechaNacimientoTutor'];
           
                $sql .= ", fechaNacimientoTutor='$fechaNacimientoTutor'";
            
        }
        if (isset($json['dni'])) {
            $dni = $json['dni'];
          
                $sql .= ", dni='$dni'";
            
        }
        if (isset($json['direccion'])) {
            $direccion = $json['direccion'];
           
                $sql .= ", direccion='$direccion'";
            
        }
        if (isset($json['telefono'])) {
            $telefono = $json['telefono'];
          
                $sql .= ", telefono='$telefono'";
            
        }
        

        $sql .= " WHERE idTutor ='$idTutor'";



        try {
            // print_r($sql);
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            header("Content-Type: application/json");


            // header("Authorization: $token");

            // echo json_encode($idreporte);
            echo json_encode([
                'success' => true,
                'msg' =>  "Información de tutores actualizada"
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
