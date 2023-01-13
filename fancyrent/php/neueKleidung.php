<?php

require('config.php');
require('autorisieren.php');

$user = $_POST["user"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$bild = $_POST["bild"];
$beschreibung = $_POST["beschreibung"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];
$size = $_POST["size"];
$kleidungstyp = $_POST["kleidungstyp"];
$preis = $_POST["preis"];

$sql = "INSERT INTO kleidung (titel, bild, adresse, stadt, beschreibung, user, status, size, kleidungstyp, preis) VALUES (:Titel, :Bild, :Adresse, :Stadt, :Beschreibung, :User, :Status, :Size, :Kleidungstyp, :Preis)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Titel' => $titel, 'Bild' => $bild, 'Adresse' => $adresse, 'Stadt' => $stadt, 'Beschreibung' => $beschreibung,'User' => $user,'Status' => $status, 'Size' => $size, 'Kleidungstyp' => $kleidungstyp, 'Preis' => $preis));

if ($erfolg) {

    print_r('Inserat erfolgreich erstellt!');

    $letzteID = $pdo->lastInsertId();

} else {

    print_r($erfolg);
}
