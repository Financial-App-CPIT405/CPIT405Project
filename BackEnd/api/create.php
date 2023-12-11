<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: POST, OPTIONS"); // Add other allowed methods as needed

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Check Request Method
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode('Method Not Allowed');
    return;
}

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

// Include necessary files
include_once '../db/Database.php';
include_once '../models/Transaction.php';

// Instantiate a Database object & connect
$database = new Database();
$dbConnection = $database->connect();

// Instantiate Transaction object
$transaction = new Transaction($dbConnection);

// Get the HTTP POST request JSON body
$data = json_decode(file_get_contents("php://input"), true);

// Check if the required parameters are present in the JSON body
if (!$data || !isset($data['type']) || !isset($data['amount'])) {
    http_response_code(422);
    echo json_encode(
        array('message' => 'Error: Missing required parameters (type or amount) in the JSON body.')
    );
    return;
}

// Set the values for the transaction
$transaction->setType($data['type']);
$transaction->setAmount($data['amount']);

// Create a new transaction
if ($transaction->create()) {
    echo json_encode(
        array('message' => 'A transaction was created.')
    );
} else {
    echo json_encode(
        array('message' => 'Error: A transaction was not created.')
    );
}
