<?php
require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM users WHERE 1 ";
    if (isset($_GET['idUsuario'])) {
        $idUsuario = $_GET['idUsuario'];
        $sql .= "AND idUsuario='$idUsuario'";
    } elseif (isset($_GET['nombre'])) {
        $nombre = $_GET['nombre'];
        $sql .= " AND nombre='$nombre'";
    } elseif (isset($_GET['apellidos'])) {
        $apellidos = $_GET['apellidos'];
        $sql .= " AND apellidos='$apellidos'";
    } elseif (isset($_GET['fechaNacimiento'])) {
        $fechaNacimiento = $_GET['fechaNacimiento'];     
        $sql .= " AND fechaNacimiento='$fechaNacimiento'";

    } elseif (isset($_GET['lugarNacimiento'])) {
        $lugarNacimiento = $_GET['lugarNacimiento'];
        $sql .= " AND lugarNacimiento='$lugarNacimiento'";
    } elseif (isset($_GET['email'])) {
        $email = $_GET['email'];
        $sql .= " AND email='$email'";
    } elseif (isset($_GET['usuario'])) {
        $usuario = $_GET['usuario'];
        $sql .= " AND usuario='$usuario'";
    } elseif (isset($_GET['contrasena'])) {
        $contrasena = $_GET['contrasena'];
        $sql .= " AND contrasena='$contrasena'";
    } elseif (count($_GET) > 0) {
        header("HTTP/1.1 400 Bad Request");
        exit;
    }

    try {
        $result = $con->query($sql);
        $users = $result->fetch_all(MYSQLI_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($users);
          

    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 404 Not Found");
    }
    exit;
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = json_decode(file_get_contents('php://input'), true);


    if (isset($json['nombre']) && isset($json['apellidos'])  && isset($json['fechaNacimiento']) && isset($json['lugarNacimiento'])  && isset($json['usuario']) && isset($json['email']) && isset($json['contrasena'])) {

    
  
        $nombre = $json['nombre'];
        $apellidos = $json['apellidos'];
        $fechaNacimiento = $json['fechaNacimiento'];
        $lugarNacimiento = $json['lugarNacimiento'];
        $usuario = $json['usuario'];
        $email = $json['email'];
        $contrasena = hash("sha512", $json['contrasena']);
      
       
      

        $sql = "INSERT INTO users (nombre,apellidos,fechaNacimiento,lugarNacimiento,usuario,email,contrasena) VALUES ('$nombre', '$apellidos', '$fechaNacimiento',  '$lugarNacimiento', '$usuario', '$email', '$contrasena')";
        try {
            $con->query($sql);
            $id = $con->insert_id;
            header("HTTP/1.1 201 Created");
            header("Content-Type: application/json");
            echo json_encode([
                'success' => true,
                'id'=>$id,
                'msg'=> "usuario creado"
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



if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $sql = "DELETE FROM users WHERE idUsuario='$id'";
        try {
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            
            echo json_encode($id);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}

header("HTTP/1.1 400 Bad Request");
