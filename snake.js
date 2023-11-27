
//1.  variable declaration

var cvs = document.getElementById("canvas").getContext("2d");
var snakePosx = 80;
var snakePosy = 80;
var nPosx = 0;
var nPosy = 0;
var foodPosx = 140;
var foodPosy = 140;
var snakeTail = [];
var snakeSize = 1;
var score = 0;
var gameStatus = "Ready";

//2.  Windows onload fuction

window.onload = function () {
    document.addEventListener("keydown", inputControl);
    game = setInterval(mainGame, 200);
    
}





//3.  main game function

function mainGame() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("game-status").innerHTML = gameStatus;

    //control snke movement
    if (snakePosx >600) {
        snakePosx = 0;
    }
    if (snakePosx < 0) {
        snakePosx = 600;
    }
    if (snakePosy >600) {
        snakePosy = 0;
    }
    if (snakePosy < 0) {
        snakePosy = 600;
    }
    
    //game area

    // move snake

    snakePosx += nPosx;
    snakePosy += nPosy
    
    //background color
    cvs.fillStyle = "black";
    cvs.fillRect(0, 0, 600, 600);

    // grid line

    for (var col = 0; col < 600; col += 20){
        cvs.moveTo(col, 0);
        cvs.lineTo(col, 600);
    }
    for (var row = 0; row < 600; row += 20){
        cvs.moveTo(0, row);
        cvs.lineTo(600, row);
    }
   // cvs.strokeStyle = "red"
    cvs.stroke();


    // snake
    cvs.fillStyle = "red";
    //cvs.fillRect(snakePosx, snakePosy, 20, 20);
    for (var i = 0; i < snakeTail.length; i++){
        cvs.fillRect(
            snakeTail[i].x, snakeTail[i].y, 20, 20
        );

        // snake eats itself
        if (snakePosx == snakeTail[i].x && snakePosy == snakeTail[i].y && snakeSize > 1) {
            clearInterval(game);
            gameStatus="Game Over"
            document.getElementById("game-status").innerHTML = gameStatus;
        }

        
    }

    //  fruit
    cvs.fillStyle = "yellow";
    cvs.fillRect(foodPosx, foodPosy, 20, 20);

    // if snake eat food
    if (snakePosx == foodPosx && snakePosy == foodPosy) {
        snakeSize++;
        score += 10;
        foodPosx = Math.floor(Math.random()*20)*20;
        foodPosy = Math.floor(Math.random() * 20) * 20;

    }
    snakeTail.push({ x: snakePosx, y: snakePosy });
    while (snakeTail.length > snakeSize) {
        snakeTail.shift();
    }
}


//4. input controls

function inputControl(e) {
    console.log(e.keyCode);
    console.log(e.key);

    switch (e.keyCode) {
        case 38:
            //up
            nPosy -= 20;
            nPosx = 0;
            break;
        case 40:
            //down
            nPosy += 20;
            nPosx = 0;
            break;
        case 39:
            //right 
            nPosx += 20;
            nPosy = 0;
            break;
        case 37:
            //left
            nPosx -= 20;
            nPosy = 0;
            break;
        
            
    }
    if (e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40) {
        gameStatus = "Started";
        document.getElementById("game-status").innerHTML = gameStatus;
    }
}