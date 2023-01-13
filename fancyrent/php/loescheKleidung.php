<?php
require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$kleidungID = $_POST["kleidungID"];

$sql = "DELETE FROM kleidung WHERE user = ? AND id = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $kleidungID]);

if ($erfolg) {

    echo "Inserat wurden gelöscht!";

} else {

    print_r($erfolg);
}

