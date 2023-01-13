<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$bild = $_POST["bild"];
$beschreibung = $_POST["beschreibung"];
$stadt = $_POST["stadt"];
$status = $_POST["status"];
$size = $_POST["size"];
$kleidungstyp = $_POST["kleidungstyp"];
$preis = $_POST["preis"];
$bild = $_POST["bild"];
$kleidungID = $_POST["kleidungID"];

$sql = "UPDATE kleidung SET titel=?, bild=?, adresse=?, stadt=?, beschreibung=?, status=?, size=?, kleidungstyp=?, preis=? WHERE id=?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$titel, $bild, $adresse, $stadt, $beschreibung, $status, $size, $kleidungstyp, $preis, $kleidungID]);

    if ($erfolg) {

        print_r("Dein Inserat wurde aktualisiert.");

    } else {

        print_r($erfolg);
    }