const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
    {x:10*box,y:10*box}
];

let food = {
    x:Math.floor(Math.random()*25)*box,
    y:Math.floor(Math.random()*25)*box
};

let score = 0;

let dx = box;
let dy = 0;

let game;

document.addEventListener("keydown",move);

function move(e){

    if(e.key=="ArrowLeft" && dx==0){
        dx=-box;
        dy=0;
    }

    if(e.key=="ArrowRight" && dx==0){
        dx=box;
        dy=0;
    }

    if(e.key=="ArrowUp" && dy==0){
        dx=0;
        dy=-box;
    }

    if(e.key=="ArrowDown" && dy==0){
        dx=0;
        dy=box;
    }

}

function draw(){

    ctx.fillStyle="#0f172a";
    ctx.fillRect(0,0,500,500);

    // food
    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    // snake
    for(let i=0;i<snake.length;i++){

        ctx.fillStyle=i==0 ? "#22c55e" : "#4ade80";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box-2,
            box-2
        );

    }

    let headX=snake[0].x+dx;
    let headY=snake[0].y+dy;

    // wall
    if(headX<0 || headY<0 || headX>=500 || headY>=500){

        clearInterval(game);

        alert("Game Over!");

        return;

    }

    // eat food
    if(headX==food.x && headY==food.y){

        score++;

        document.getElementById("score").innerHTML=score;

        food={

            x:Math.floor(Math.random()*25)*box,

            y:Math.floor(Math.random()*25)*box

        };

    }else{

        snake.pop();

    }

    let newHead={

        x:headX,

        y:headY

    };

    // hit body
    for(let s of snake){

        if(s.x==newHead.x && s.y==newHead.y){

            clearInterval(game);

            alert("Game Over!");

            return;

        }

    }

    snake.unshift(newHead);

}

document.getElementById("startBtn").onclick=function(){

    clearInterval(game);

    game=setInterval(draw,120);

};

document.getElementById("restartBtn").onclick=function(){

    snake=[{x:200,y:200}];

    dx=box;

    dy=0;

    score=0;

    document.getElementById("score").innerHTML=0;

    food={

        x:Math.floor(Math.random()*25)*box,

        y:Math.floor(Math.random()*25)*box

    };

    clearInterval(game);

    game=setInterval(draw,120);

};

document.getElementById("pauseBtn").onclick=function(){

    clearInterval(game);

};