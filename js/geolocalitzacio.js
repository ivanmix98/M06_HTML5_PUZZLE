let lat_Paris = 48.8667;
let lon_Paris = 2.33333;

let lat_Tokio = 139.6917100;
let lon_Tokio = 35.6895000;

let lat_NY = 40.6643;
let lon_NY = -73.9385;

let ciutatMesProperaOld="";
let ciutatMesPropera="";

navigator.geolocation.getCurrentPosition(obtenirLocalitzacio);

var watchID =
    navigator.geolocation.watchPosition(function(posicio) {
        console.log("S'ha actualitzat la posició !");
        obtenirLocalitzacio(posicio);
    });

function obtenirLocalitzacio(posicio) {
    var latitud  = posicio.coords.latitude;
    var longitud = posicio.coords.longitude;

    console.log(" Latitud: " + latitud + " Longitud: " + longitud);

    let dist_Paris = distancia(latitud,longitud,lat_Paris,lon_Paris);
    let dist_Tokio = distancia(latitud,longitud,lat_Tokio,lon_Tokio);
    let dist_NY    = distancia(latitud,longitud,lat_NY,lon_NY);

    console.log(" Distancia a Paris:" + dist_Paris + " Distancia a Tokio:" + dist_Tokio + " Distancia a NY:" + dist_NY);

    if(dist_Paris < dist_Tokio && dist_Paris < dist_NY)    ciutatMesPropera = "Paris";
    if(dist_Tokio < dist_Paris && dist_Tokio < dist_NY)    ciutatMesPropera = "Tokio";
    if(dist_NY    < dist_Paris && dist_NY    < dist_Tokio) ciutatMesPropera = "NewYork";

    if(ciutatMesPropera != ciutatMesProperaOld){
        if(ciutatMesPropera == "NewYork")  init();
        if(ciutatMesPropera == "Paris")   init2();
        if(ciutatMesPropera == "Tokio")   init3();

    }
    ciutatMesProperaOld = ciutatMesPropera;
}


function aRadians(graus) {
    return graus * Math.PI / 180;
}
function distancia(latitud1, longitud1, latitud2, longitud2) {
    let R = 6371; // R radi en km de la terra
    let deltaLatitud = aRadians(latitud2   - latitud1);
    let deltaLongitud = aRadians(longitud2 - longitud1);
    latitud1 = aRadians(latitud1);
    latitud2 = aRadians(latitud2);
    let a = Math.sin(deltaLatitud / 2) * Math.sin(deltaLatitud / 2)
        + Math.cos(latitud1) * Math.cos(latitud2) *
        Math.sin(deltaLongitud / 2) *
        Math.sin(deltaLongitud / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}
