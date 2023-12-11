<?php

class Transaction
{
    private $id;
    private $type;
    private $amount;
    private $created_at;
    private $dbConnection;
    private $dbTable = 'transactions';

    public function __construct($dbConnection)
    {
        $this->dbConnection = $dbConnection;
    }

    public function getId(){
        return $this->id;
    }

    public function getType(){
        return $this->type;
    }

    public function getAmount(){
        return $this->amount;
    }

    public function getCreatedAt(){
        return $this->created_at;
    }

    public function setId($id){
        $this->id = $id;
    }

    public function setType($type){
        $this->type = $type;
    }

    public function setAmount($amount){
        $this->amount = $amount;
    }

    public function setCreatedAt($created_at){
        $this->created_at = $created_at;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->dbTable . "(type, amount, created_at) VALUES(:type, :amount, now());";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":amount", $this->amount);
        if ($stmt->execute()) {
            return true;
        }
        // print an error message
        printf("Error: %s", $stmt->error);
        return false;
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->dbTable;
        $stmt = $this->dbConnection->prepare($query);
        if ($stmt->execute() && $stmt->rowCount() > 0) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return [];
    }

}
