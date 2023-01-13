<?php

require("config.php");
require("autorisieren.php");


$sql = "SELECT kleidung.id, kleidung.titel, kleidung.bild, kleidung.adresse, kleidung.stadt, kleidung.beschreibung, kleidung.user, kleidung.status, kleidung.size, kleidung.kleidungstyp, kleidung.preis, user.name, user.email
FROM `kleidung`
INNER JOIN user
ON kleidung.user = user.id";


$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}

