let kleidungID;

function neueKleidung(){

    let titel = document.querySelector("#titel").value;
    let adresse = document.querySelector("#adresse").value;
    let bild = document.querySelector("#bild").value;
    let beschreibung = document.querySelector("#beschreibung").value;
    let stadt = document.querySelector("#stadt").value;
    let status = document.querySelector("input[name='status']:checked").value;
    let kleidungstyp = document.querySelector("#kleidungstyp").value;
    let preis = document.querySelector("#preis").value;
    let size = document.querySelector("#size").value;
    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

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

            alert("Dein Inserat wurde erstellt. \rDu wirst auf dein Profil zurückgeleitet.");
            window.location.href = "/profil.html";

        });

}


function logout(){

    localStorage.clear();
    window.location = "/login.html";

}

