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

        });
}

function holeKleider(){

    let userID = localStorage.getItem('userID');
    let token = localStorage.getItem('token');

    let formData = new FormData();
        formData.append('userID', userID);

    fetch("https://154518-5.web.fhgr.ch/php/holeKleider.php",
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

            kleiderAnzeigen(data);
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
            '<h2 class="inserat_titel">' + kleidung.status + ' ' + kleidung.titel + '</h2>' +
            '<h3 class="inserat_absender">' + kleidung.name + '</h3>' +
            '<img class="kleidung-image" src="' + kleidung.bild + '">' +
            '<p class="inserat_beschreibung">' + kleidung.beschreibung + '</p>' +
            '<h3 class="inserat_groesse">'+ "Grösse:" + '</h3>' + 
            '<p class="inserat_size">' + kleidung.size + '</p>' +
            '<h3 class="inserat_preis">' + "Preis in CHF:" + '</h3>' +
            '<p class="inserat_chf">' + kleidung.preis + '</p>' +
            '<h3 class="inserat_standort">' + "Standort:" + '</h3>' +
            '<p class="inserat_stadt">' + kleidung.stadt + '</p>' +
            '<a class="inserat_adresse" target="_blank" href="https://www.google.com/maps/search/?api=1&query=' + kleidung.adresse + '">' + kleidung.adresse + '</a> <br>' +
            '<a class="inserat_mail" href="mailto:' + kleidung.email +'">' + '<button class="inserat_email">' + "Mietanfrage senden" + '</button>' + '</a>'
            + '</div>';

        document.getElementById("liste-kleidung").appendChild(kleidungContainer);

    });
}


function logout(){

    localStorage.clear();
    window.location = "/login.html";

}