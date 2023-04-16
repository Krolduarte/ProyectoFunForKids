<?php

$texto = $_POST['text'];
$targetPath = "../uploads/".$texto . basename($_FILES["inpFile"]["name"]);
move_uploaded_file($_FILES["inpFile"]["tmp_name"], $targetPath);


// if (is_uploaded_file($_FILES['inpFile']['tmp_name'])) {
//     echo "File ". $_FILES['inpFile']['name'] ." uploaded successfully.\n";
//     echo "Displaying contents\n";
//     readfile($_FILES['inpFile']['tmp_name']);
//  } else {
//     echo "Possible file upload attack: ";
//     echo "filename '". $_FILES['inpFile']['tmp_name'] . "'.";
//  }
 
// print_r($_FILES);
// if (!isset($_FILES['inpFile'])) {
//     echo "false";
// }else{
//     echo "true";
// }
// if (!isset($_FILES['inpFile']['tmp_name'])) {
//     echo "false";
// }else{
//     echo "true";
// }


// echo $_FILES['inpFile']['name'];
// echo $_FILES['inpFile']['tmp_name'];
// echo $_FILES['inpFile']['type'];
// echo $_FILES['inpFile']['size'];
// echo $_FILES['inpFile']['error'];
//Mueve el archivo al directorio escogido
// $extensiones = array(0=>'image/jpg',1=>'image/jpeg',2=>'image/png');
// $max_tamanyo = 1024 * 1024 * 8;

// $ruta_destino = "../uploads/" . basename($_FILES["inpFile"]["name"]);
// $ruta_fichero_origen = $_FILES['inpFile']['tmp_name'];

// if (in_array($_FILES['inpFile']['type'], $extensiones) ) {
//      echo 'Es una imagen';
//      if ( $_FILES['inpFile']['size']< $max_tamanyo ) {
//           echo 'Pesa menos de 1 MB';
//           if( move_uploaded_file ( $ruta_fichero_origen, $ruta_destino ) ) {
//                echo 'Fichero guardado con éxito';
//           }
//      }
// }






