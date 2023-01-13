let kleidungID;

holeUserKleidung();


function neueKleidung(){

    console.log("neue Kleidung erstellt!");

    let titel = document.querySelector("#titel").value;
    let adresse = document.querySelector("#adresse").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let stadt = document.querySelector("#stadt").value;
    let status = document.querySelector("input[name='status']:checked").value;
    let kleidungstyp = document.querySelector("#kleidungstyp").value;
    let preis = document.querySelector("#preis").value;
    let size = document.querySelector("#size").value;


    let formData = new FormData();
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('bild', bild);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('size', size);
    formData.append('kleidungstyp', kleidungstyp);
    formData.append('preis', preis);

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    formData.append('user', userID);

    fetch("https://154518-5.web.fhgr.ch/php/neueKleidung.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((response) => {

            return response.text();

        })
        .then((data) => {

            document.querySelector('#nachricht').innerHTML = data;

        });
}


function holeUserKleidung() {

    let searchString = window.location.search;
    let urlParams = new URLSearchParams(searchString);
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
        formData.append('userID', userID);
        formData.append('inseratID', urlParams.get("id"));

    fetch("https://154518-5.web.fhgr.ch/php/holeUserKleidung.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.json();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

                kleidungID = data[0].id;

                document.querySelector('#infoText').innerHTML = "Hier kannst du dein Inserat bearbeiten:";
                document.querySelector('#button-aktualisieren').classList.remove("hidden");
                document.querySelector('#button-loeschen').classList.remove("hidden");
                document.querySelector('#titel').value = data[0].titel;
                document.querySelector('#adresse').value = data[0].adresse;
                document.querySelector('#beschreibung').value = data[0].beschreibung;
                document.querySelector('#stadt').value = data[0].stadt;
                document.querySelector('#bild').value = data[0].bild;
                document.querySelector('#bild-vorschau').src = data[0].bild;
                document.querySelector('#size').value = data[0].size;
                document.querySelector('#preis').value = data[0].preis;
                document.querySelector('#kleidungstyp').value = data[0].kleidungstyp;

                if (data[0].status == 1) {

                    document.querySelector('#status-frei').checked = true;

                } else {

                    document.querySelector('#status-besetzt').checked = true;

                }
            }
        );
}

function aktualisiereKleidung() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let titel = document.querySelector('#titel').value;
    let adresse = document.querySelector('#adresse').value;
    let beschreibung = document.querySelector('#beschreibung').value;
    let stadt = document.querySelector('#stadt').value;
    let bild = document.querySelector('#bild').value;
    let status = document.querySelector('input[name="status"]:checked').value;
    let size = document.querySelector('#size').value;
    let preis = document.querySelector('#preis').value;
    let kleidungstyp = document.querySelector('#kleidungstyp').value;

    let formData = new FormData();
    formData.append('userID', userID);
    formData.append('titel', titel);
    formData.append('adresse', adresse);
    formData.append('beschreibung', beschreibung);
    formData.append('stadt', stadt);
    formData.append('status', status);
    formData.append('bild', bild);
    formData.append('size', size);
    formData.append('preis', preis);
    formData.append('kleidungstyp', kleidungstyp);
    formData.append('kleidungID', kleidungID);

    fetch("https://154518-5.web.fhgr.ch/php/aktualisiereKleidung.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html";

            }

        })
        .then((data) => {
        
            alert("Dein Inserat wurde aktualisiert. \rDu wirst auf dein Profil zurückgeleitet.");
            window.location.href = "/profil.html";
    
        });
}

function loescheKleidung() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
        formData.append('userID', userID);
        formData.append('kleidungID', kleidungID);

    fetch("https://154518-5.web.fhgr.ch/php/loescheKleidung.php",
        {
            body: formData,
            method: "post",
            headers: {

                'Authorization': 'Basic ' + btoa(userID + ':' + token),

            }
        })

        .then((res) => {

            if (res.status >= 200 && res.status < 300) {

                return res.text();

            } else {

                alert('Deine Sitzung ist abgelaufen. Du wirst auf die Login-Seite weitergeleitet.');
                window.location = "/login.html";

            }

        })
        .then((data) => {

            document.querySelector('#button-neue').classList.remove("hidden");
            document.querySelector('#button-aktualisieren').classList.add("hidden");
            document.querySelector('#button-loeschen').classList.add("hidden");

            document.querySelector('#titel').value = "";
            document.querySelector('#adresse').value = "";
            document.querySelector('#beschreibung').value = "";
            document.querySelector('#stadt').value = "";
            document.querySelector('#bild').value = "";
            document.querySelector('#status-frei').checked = false;
            document.querySelector('#status-besetzt').checked = false;
            document.querySelector('#size').value = "";
            document.querySelector('#preis').value = "";
            document.querySelector('#kleidungstyp').checked = false;

            document.querySelector('#bild-vorschau').src = "";

            kleidungID = "";

        });

        alert("Dein Inserat wurde gelöscht. \rDu wirst auf dein Profil zurückgeleitet.");
        window.location.href = "/profil.html";

}


function logout(){

    localStorage.clear();
    window.location = "/login.html";

}

