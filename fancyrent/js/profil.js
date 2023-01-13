holeUser();

holeKleider();

function holeUser() {

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
        formData.append('userID', userID);

    fetch("https://154518-5.web.fhgr.ch/php/holeUser.php",
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

            document.querySelector("#username").innerHTML = data[0].name;

        })
};


function holeKleider(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
        formData.append('userID', userID);

    fetch("https://154518-5.web.fhgr.ch/php/holeProfilKleider.php",
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

            if (data.length == [0]){
                let keinInseratContainer = document.createElement("div");
                keinInseratContainer.innerHTML =

                '<div class="keinInserat">' + '<p>' + "Du hast noch keine Inserate." + '<br>' + "Gehe zu " + "'" + "Inserat erstellen" + "'"+ "." + '</p>' + '</div>';

                document.getElementById("liste-kleidung").appendChild(keinInseratContainer);

            }
            else {

                kleiderAnzeigen(data);

            }
        });
}


function kleiderAnzeigen(data) {
    
    data.forEach(kleidung => {

        if (parseInt(kleidung.status)) {

            kleidung.status = '🟢';

        } else {

            kleidung.status = "🔴"

        }

        let kleidungContainer = document.createElement("div");
        kleidungContainer.innerHTML =

            '<div class="kleidung">' +
            '<h2 class="profil_titel">' + kleidung.status + ' ' + kleidung.titel + '</h2>' +
            '<img class="kleidung-image" src="' + kleidung.bild + '">' +
            '<p class="profil_beschreibung">' + kleidung.beschreibung + '</p>' +
            '<h3 class="profil_groesse">'+ "Grösse:" + '</h3>' + 
            '<p class="profil_size">' + kleidung.size + '</p>' +
            '<h3 class="profil_preis">' + "Preis in CHF:" + '</h3>' +
            '<p class="profil_chf">' + kleidung.preis + '</p>' +
            '<h3 class="profil_standort">' + "Standort:" + '</h3>' +
            '<p class="profil_stadt">' + kleidung.stadt + '</p>' +
            '<a class="profil_adresse" target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + kleidung.adresse + '">' + kleidung.adresse + '</a> <br>' +
            '<p class="profil_bild">' + '<a href="../kleidung.html?id=' + kleidung.id + '">' + '<button id="bearbeiten">' + 'Inserat bearbeiten' + '</button>' + '</a>' + '</p>'
            + '</div>';

        document.getElementById("liste-kleidung").appendChild(kleidungContainer);

    });
}


function logout(){

    localStorage.clear();
    window.location = "/login.html";

}