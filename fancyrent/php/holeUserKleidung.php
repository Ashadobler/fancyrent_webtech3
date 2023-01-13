<?php

require("config.php");
require("autorisieren.php");

$userID = $_POST["userID"];
$inseratID = $_POST["inseratID"];

$sql = "SELECT * FROM kleidung WHERE id = $inseratID";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}