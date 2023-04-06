<?php

class Conexion  extends mysqli {
    private $host = "localhost"; 
    private $db = "fun4kids"; 
    private $user = "fun4kids"; 
    private $pass = "fun4kids"; 
    public function __construct() { 
        try { parent::__construct($this->host, $this->user, $this->pass, $this->db); 
        } catch (mysqli_sql_exception $e) { 
            echo "ERROR: {$e->getMessage()}"; 
            // header("HTTP/1.1 400 Bad Request"); 
            exit; 
            }  
            } 
           
}
