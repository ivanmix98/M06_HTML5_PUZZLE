var emmagatzematge = {
    mostrar: function() {
            let usuario = (document.getElementById('nom_jugador').value);
            let res = localStorage.getItem(usuario);
            if(res != null){ sessionStorage.setItem("usuari", usuario);window.location.href = "puzzle.html";}
            else alert('El usuari '+ usuario + ' no sha trobat');


    }
}
document.getElementById('login').addEventListener('click', emmagatzematge.mostrar, false);
