var numPeces = 3;
 
var canvas;
var stage;
 
var imatge;
var peca;
var puzzleAmplada;
var puzzleAltura;
var pecaAmplada;
var pecaAltura;

var puntuacio = 10000;

window.setInterval(function(){
    calculador_puntuacions();
}, 1000);

function calculador_puntuacions(){
    puntuacio --;
    document.getElementById('puntuacions').value = puntuacio;

}

function  guardaPuntuacions () {
    let puntuacio = document.getElementById("puntuacions").value;
    sessionStorage.setItem("puntuacions",puntuacio);
    console.log("Puntuació" + puntuacio);
    window.location.href = "finalitzarJoc.html";
}

function dimensionChange(){

    var dimensio = document.getElementById("mySelect").value;

    if(dimensio == '3x3'){
        numPeces = 3;
    }
    if(dimensio == '4x4'){
        numPeces = 4;
    }
    onImage();
}


function init(){
    imatge = new Image();
    imatge.addEventListener('load',onImage,false);
    imatge.src = "Images/newyork.jpg";
}

function init2(){
    imatge = new Image();
    imatge.addEventListener('load',onImage,false);
    imatge.src = "Images/paris.jpg";
}
function init3(){
    imatge = new Image();
    imatge.addEventListener('load',onImage,false);
    imatge.src = "Images/tokyo.jpg";
}

function onImage(e){
    pecaAmplada = Math.floor(imatge.width / numPeces)
    pecaAltura = Math.floor(imatge.height / numPeces)
    puzzleAmplada = pecaAmplada * numPeces;
    puzzleAltura = pecaAltura * numPeces;
    setCanvas();
    initPuzzle();
}

function setCanvas(){
    canvas = document.getElementById('canvas');
    stage = canvas.getContext('2d');
    canvas.width = puzzleAmplada;
    canvas.height = puzzleAltura;
    canvas.style.border = "1px solid black";
    canvas.style.width = "70%";
    canvas.style.height="70%";
}

function initPuzzle(){
    peca = [];
    stage.drawImage(imatge, 0, 0, puzzleAmplada, puzzleAltura, 0, 0, puzzleAmplada, puzzleAltura);
    buildPieces();
}

function buildPieces(){
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < numPeces * numPeces; i++){
        piece = {};
        piece.sx = xPos;
        piece.sy = yPos;
        peca.push(piece);
        xPos += pecaAmplada;
        if(xPos >= puzzleAmplada){
            xPos = 0;
            yPos += pecaAltura;
        }
    }
}

function shufflePuzzle(){
    peca = shuffleArray(peca);
    stage.clearRect(0,0,puzzleAmplada,puzzleAltura);
    var i;
    var piece;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < peca.length; i++){
        piece = peca[i];
        piece.xPos = xPos;
        piece.yPos = yPos;
        stage.drawImage(imatge, piece.sx, piece.sy, pecaAmplada, pecaAltura, xPos, yPos, pecaAmplada, pecaAltura);
        stage.strokeRect(xPos, yPos, pecaAmplada,pecaAltura);
        xPos += pecaAmplada;
        if(xPos >= puzzleAmplada){
            xPos = 0;
            yPos += pecaAltura;
        }
    }
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}
