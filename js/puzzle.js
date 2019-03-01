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

var _currentPiece;
var _currentDropPiece;
const PUZZLE_HOVER_TINT = '#009900';
var _mouse;

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
    _mouse = {x:0,y:0};
    _currentPiece = null;
    _currentDropPiece = null;
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
    document.onmousedown = onPuzzleClick;
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function onPuzzleClick(e){
    if(e.layerX || e.layerX == 0){
        _mouse.x = e.layerX - canvas.offsetLeft;
        _mouse.y = e.layerY - canvas.offsetTop;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - canvas.offsetLeft;
        _mouse.y = e.offsetY - canvas.offsetTop;
    }
    _currentPiece = checkPieceClicked();
    if(_currentPiece != null){
        stage.clearRect(_currentPiece.xPos,_currentPiece.yPos,pecaAmplada,pecaAltura);
        stage.save();
        stage.globalAlpha = .9;
        stage.drawImage(imatge, _currentPiece.sx, _currentPiece.sy, pecaAmplada, pecaAltura, _mouse.x - (pecaAmplada / 2), _mouse.y - (pecaAltura / 2), pecaAmplada, pecaAltura);
        stage.restore();
        document.onmousemove = updatePuzzle;
        document.onmouseup = pieceDropped;
    }
}

function checkPieceClicked(){

    console.log("mouseX:" + _mouse.x);
    console.log("mouseY:" + _mouse.y);
    _mouse.x = _mouse.x*4;
    _mouse.y = _mouse.y*4;

    var i;
    var piece;
    for(i = 0;i < peca.length;i++){
        piece = peca[i];
        if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + pecaAmplada) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + pecaAltura)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

function updatePuzzle(e){
    _currentDropPiece = null;
    if(e.layerX || e.layerX == 0){
        _mouse.x = (e.layerX - canvas.offsetLeft)*4;
        _mouse.y = (e.layerY - canvas.offsetTop)*4;
    }
    else if(e.offsetX || e.offsetX == 0){
        _mouse.x = e.offsetX - canvas.offsetLeft;
        _mouse.y = e.offsetY - canvas.offsetTop;
    }
    stage.clearRect(0,0,puzzleAmplada,puzzleAltura);
    var i;
    var piece;
    for(i = 0;i < peca.length;i++){
        piece = peca[i];
        if(piece == _currentPiece){
            continue;
        }
        stage.drawImage(imatge, piece.sx, piece.sy, pecaAmplada, pecaAltura, piece.xPos, piece.yPos, pecaAmplada, pecaAltura);
        stage.strokeRect(piece.xPos, piece.yPos, pecaAmplada,pecaAltura);
        if(_currentDropPiece == null){
            if(_mouse.x < piece.xPos || _mouse.x > (piece.xPos + pecaAmplada) || _mouse.y < piece.yPos || _mouse.y > (piece.yPos + pecaAltura)){
                //NOT OVER
            }
            else{
                _currentDropPiece = piece;
                stage.save();
                stage.globalAlpha = .4;
                stage.fillStyle = PUZZLE_HOVER_TINT;
                stage.fillRect(_currentDropPiece.xPos,_currentDropPiece.yPos,pecaAmplada, pecaAltura);
                stage.restore();
            }
        }
    }
    stage.save();
    stage.globalAlpha = .6;
    stage.drawImage(imatge, _currentPiece.sx, _currentPiece.sy, pecaAmplada, pecaAltura, _mouse.x - (pecaAmplada / 2), _mouse.y - (pecaAltura / 2), pecaAmplada, pecaAltura);
    stage.restore();
    stage.strokeRect( _mouse.x - (pecaAmplada / 2), _mouse.y - (pecaAltura / 2), pecaAmplada,pecaAltura);
}

function pieceDropped(e){

    document.onmousemove = null;
    document.onmouseup = null;
    if(_currentDropPiece != null){
        var tmp = {xPos:_currentPiece.xPos,yPos:_currentPiece.yPos};
        _currentPiece.xPos = _currentDropPiece.xPos;
        _currentPiece.yPos = _currentDropPiece.yPos;
        _currentDropPiece.xPos = tmp.xPos;
        _currentDropPiece.yPos = tmp.yPos;
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
