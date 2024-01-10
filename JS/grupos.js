async function a() {
    fetch('http://localhost/Cosos/Erronka/talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
        .then(response => response.text())
        .then(data => {
            console.log(data); 
            if (data.match("Fatal error")) {
                alert("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu");
            }else{
                
            }
        });
}

a();