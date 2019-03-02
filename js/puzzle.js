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

var pecaActual;
var pecaActualDrop;
const COLOR_PUZZLE_HOOVER = '#009900';
var posMouse;

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
    pecaAmplada = Math.floor(imatge.width / numPeces);
    pecaAltura = Math.floor(imatge.height / numPeces);
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
    canvas.style.width = "100%";
    canvas.style.height="100%";
}

function initPuzzle(){
    peca = [];
    posMouse = {x:0,y:0};
    pecaActual = null;
    pecaActualDrop = null;
    stage.drawImage(imatge, 0, 0, puzzleAmplada, puzzleAltura, 0, 0, puzzleAmplada, puzzleAltura);
    buildPieces();
}

function buildPieces(){
    var i;
    var iPeca;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < numPeces * numPeces; i++){
        iPeca = {};
        iPeca.sx = xPos;
        iPeca.sy = yPos;
        peca.push(iPeca);
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
    var iPeca;
    var xPos = 0;
    var yPos = 0;
    for(i = 0; i < peca.length; i++){
        iPeca = peca[i];
        iPeca.xPos = xPos;
        iPeca.yPos = yPos;
        stage.drawImage(imatge, iPeca.sx, iPeca.sy, pecaAmplada, pecaAltura, xPos, yPos, pecaAmplada, pecaAltura);
        stage.strokeRect(xPos, yPos, pecaAmplada,pecaAltura);
        xPos += pecaAmplada;
        if(xPos >= puzzleAmplada){
            xPos = 0;
            yPos += pecaAltura;
        }
    }
    document.onmousedown = onPuzzleClick;
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e){
    if(e.layerX || e.layerX == 0){
        posMouse.x = e.layerX - canvas.offsetLeft;
        posMouse.y = e.layerY - canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        posMouse.x = e.offsetX - canvas.offsetLeft;
        posMouse.y = e.offsetY - canvas.offsetTop;
    }
    pecaActual = checkPieceClicked();
    if(pecaActual != null){
        stage.clearRect(pecaActual.xPos,pecaActual.yPos,pecaAmplada,pecaAltura);
        stage.save();
        stage.globalAlpha = .9;
        stage.drawImage(imatge, pecaActual.sx, pecaActual.sy, pecaAmplada, pecaAltura, posMouse.x - (pecaAmplada / 2), posMouse.y - (pecaAltura / 2), pecaAmplada, pecaAltura);
        stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }
}

function checkPieceClicked(){

    posMouse.x = posMouse.x*4;
    posMouse.y = posMouse.y*4;

    var i;
    var piece;
    for(i = 0;i < peca.length;i++){
        piece = peca[i];
        if(posMouse.x < piece.xPos || posMouse.x > (piece.xPos + pecaAmplada) || posMouse.y < piece.yPos || posMouse.y > (piece.yPos + pecaAltura)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e){
    pecaActualDrop = null;
    if(e.layerX || e.layerX == 0){
        posMouse.x = (e.layerX - canvas.offsetLeft)*4;
        posMouse.y = (e.layerY - canvas.offsetTop)*4;
    }
    else if(e.offsetX || e.offsetX == 0){
        posMouse.x = e.offsetX - canvas.offsetLeft;
        posMouse.y = e.offsetY - canvas.offsetTop;
    }
    stage.clearRect(0,0,puzzleAmplada,puzzleAltura);
    var i;
    var piece;
    for(i = 0;i < peca.length;i++){
        piece = peca[i];
        if(piece == pecaActual){
            continue;
        }
        stage.drawImage(imatge, piece.sx, piece.sy, pecaAmplada, pecaAltura, piece.xPos, piece.yPos, pecaAmplada, pecaAltura);
        stage.strokeRect(piece.xPos, piece.yPos, pecaAmplada,pecaAltura);
        if(pecaActualDrop == null){
            if(posMouse.x < piece.xPos || posMouse.x > (piece.xPos + pecaAmplada) || posMouse.y < piece.yPos || posMouse.y > (piece.yPos + pecaAltura)){
                //NOT OVER
            }
            else{
                pecaActualDrop = piece;
                stage.save();
                stage.globalAlpha = .4;
                stage.fillStyle = COLOR_PUZZLE_HOOVER;
                stage.fillRect(pecaActualDrop.xPos,pecaActualDrop.yPos,pecaAmplada, pecaAltura);
                stage.restore();
            }
        }
    }
    stage.save();
    stage.globalAlpha = .6;
    stage.drawImage(imatge, pecaActual.sx, pecaActual.sy, pecaAmplada, pecaAltura, posMouse.x - (pecaAmplada / 2), posMouse.y - (pecaAltura / 2), pecaAmplada, pecaAltura);
    stage.restore();
    stage.strokeRect( posMouse.x - (pecaAmplada / 2), posMouse.y - (pecaAltura / 2), pecaAmplada,pecaAltura);
}

function pieceDropped(e){

    document.onmousemove = null;
    document.onmouseup = null;
    if(pecaActualDrop != null){
        var tmp = {xPos:pecaActual.xPos,yPos:pecaActual.yPos};
        pecaActual.xPos = pecaActualDrop.xPos;
        pecaActual.yPos = pecaActualDrop.yPos;
        pecaActualDrop.xPos = tmp.xPos;
        pecaActualDrop.yPos = tmp.yPos;
    }
    resetPuzzleAndCheckWin();
}

function resetPuzzleAndCheckWin(){
    stage.clearRect(0,0,puzzleAmplada,puzzleAltura);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < peca.length;i++){
        piece = peca[i];
        stage.drawImage(imatge, piece.sx, piece.sy, pecaAmplada, pecaAltura, piece.xPos, piece.yPos, pecaAmplada, pecaAltura);
        stage.strokeRect(piece.xPos, piece.yPos, pecaAmplada,pecaAltura);
        if(piece.xPos != piece.sx || piece.yPos != piece.sy){
            gameWin = false;
        }
    }
    if(gameWin){
        setTimeout(gameOver,500);
    }
}
