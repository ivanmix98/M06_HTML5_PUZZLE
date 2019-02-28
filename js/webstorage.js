/*
 * programa que mostra com es pot treballar amb l'API webstorage
 * @author sergi.grau@fje.edu
 * @version 1.0
 * date 05.12.2016
 * format del document UTF-8
 *
 * CHANGELOG
 * 05.12.2016
 * - programa que mostra com es pot treballar amb l'API webstorage
 *
 * NOTES
 * ORIGEN
 * Desenvolupament en entorn client. Escola del clot
 */
let usuarios = [];

let emmagatzematgeWStg = {
    
    taula: document.getElementById('taula'),
    desar: function() {


       var usuario = (document.getElementById('nom').value);
       
       if (usuarios.indexOf(usuario) === -1){
        usuarios.push(usuario);
        
        localStorage.setItem(usuario, 0);
        emmagatzematgeWStg.esborrarTaula();
        emmagatzematgeWStg.mostrar();
       }
       else if(usuarios.indexOf(usuario) > -1){
           console.log(usuario + ' ja existeix');
           alert('El usuari '+ usuario + ' ja existeix');
       }
    },
    mostrar: function() {
        for (var i = 0; i < localStorage.length; i++) {
            var fila = taula.insertRow(0);
            fila.insertCell(0).innerHTML = localStorage.key(i);
        };
    },
    esborrarTaula: function() {
        while (taula.rows.length > 0) {
            taula.deleteRow(0);
        }
    },
    netejar: function() {
        localStorage.clear();
        usuarios = [];
        emmagatzematgeWStg.esborrarTaula();
        emmagatzematgeWStg.mostrar();
    }
};

emmagatzematgeWStg.mostrar();
document.getElementById('desar').addEventListener('click',    emmagatzematgeWStg.desar, false);
document.getElementById('netejar').addEventListener('click',  emmagatzematgeWStg.netejar, false);
