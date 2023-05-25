
<?php
// require '../../vendor/autoload.php';
require_once('../clases/conexion.php');

//crear conexion
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {


    $sql = "CREATE TEMPORARY TABLE Latest SELECT idRemitente, MAX(created_on) AS latestDate FROM chat GROUP BY idRemitente";

    $sql2 = "SELECT * FROM chat INNER JOIN Latest ON Latest.latestDate = chat.created_on AND Latest.idRemitente = chat.idRemitente  ";


    if (
        isset($_GET['idRemitente']) ||
        isset($_GET['idChild'])  ||
        isset($_GET['idDestinatario']) ||
        isset($_GET['respondido']) ||
        isset($_GET['leido'])
    ) {


        if (isset($_GET['idRemitente'])) {
            $idRemitente = $_GET['idRemitente'];
            $sql2 .= " AND chat.idRemitente= '$idRemitente'";
        }

        if (isset($_GET['idChild'])) {
            $idChild = $_GET['idChild'];
            $sql2 .= " AND chat.idChild= '$idChild'";
        }

        if (isset($_GET['idDestinatario'])) {
            $idDestinatario = $_GET['idDestinatario'];
            $sql2 .= " AND chat.idDestinatario= '$idDestinatario' ";
        }

        if (isset($_GET['respondido'])) {
            $respondido = $_GET['respondido'];
            $sql2 .= " AND respondido= '$respondido' ";
        }

        if (isset($_GET['leido'])) {
            $leido = $_GET['leido'];
            $sql2 .= " AND leido= '$leido' ";
        }

       



        try {
            $result = $con->query($sql);
            $result2 = $con->query($sql2);
            $users = $result2->fetch_all(MYSQLI_ASSOC);
            // header("HTTP/1.1 200 OK");
            echo json_encode($users);
            // echo json_encode($sql);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 404 Not Found");
            // echo json_encode($sql);
        }
        exit;
    }    // } elseif (count($_GET) > 0) {
    //     header("HTTP/1.1 400 Bad Request");
    //     exit;
    // }


}





if ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    $json = json_decode(file_get_contents('php://input'), true);

    if (isset($_GET['idmsg'])) {
        $idmsg = $json['idmsg'];


        $sql = "UPDATE chat SET respondido = 1 where idmsg='$idmsg' ";


        try {
            $con->query($sql);
            header("HTTP/1.1 200 OK");
            echo json_encode($idmsg);
        } catch (mysqli_sql_exception $e) {
            header("HTTP/1.1 400 Bad Request");
        }
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}
