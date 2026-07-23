const enemyCars = ["🚗","🚙","🚕","🚓","🚚"];
const player=document.getElementById("player");
const game=document.getElementById("game");

const scoreUI=document.getElementById("score");
const lifeUI=document.getElementById("life");
const highUI=document.getElementById("high");

let x=180;

let score=0;

let speed=6;

let life=3;

let playing=false;

let mode="classic";

let high=localStorage.getItem("high")||0;

highUI.innerHTML=high;

document.getElementById("startBtn").onclick=()=>{

document.getElementById("menu").style.display="none";

mode=document.getElementById("mode").value;

if(mode=="night"){

game.classList.add("night");

}

playing=true;

spawnEnemy();

spawnCoin();

update();

}

document.addEventListener("keydown",(e)=>{

    if(e.key=="ArrowLeft" || e.key=="a"){
        x-=25;
        player.classList.add("turn-left");
        setTimeout(()=>player.classList.remove("turn-left"),100);
    }

    if(e.key=="ArrowRight" || e.key=="d"){
        x+=25;
        player.classList.add("turn-right");
        setTimeout(()=>player.classList.remove("turn-right"),100);
    }

    x=Math.max(0,Math.min(360,x));
    player.style.left=x+"px";
});

function update(){

if(!playing)return;

score++;

scoreUI.innerHTML=score;

if(score>high){

localStorage.setItem("high",score);

highUI.innerHTML=score;

}

requestAnimationFrame(update);

}

function spawnEnemy(){

    if(!playing)return;

    let enemy=document.createElement("div");

    enemy.className="enemy";
    enemy.innerHTML = enemyCars[Math.floor(Math.random()*enemyCars.length)];

    enemy.style.left=Math.random()*340+"px";
    enemy.style.top="-100px";

    game.appendChild(enemy);

let move=setInterval(()=>{

enemy.style.top=enemy.offsetTop+speed+"px";

if(hit(player,enemy)){

life--;

lifeUI.innerHTML=life;

enemy.remove();

clearInterval(move);

if(life<=0){

alert("Game Over!");

location.reload();

}

}

if(enemy.offsetTop>700){

enemy.remove();

clearInterval(move);

}

},20);

setTimeout(spawnEnemy,800);

}

function spawnCoin(){

if(!playing)return;

let coin=document.createElement("div");

coin.className="coin";

coin.style.left=Math.random()*360+"px";

coin.style.top="-30px";

game.appendChild(coin);

let move=setInterval(()=>{

coin.style.top=coin.offsetTop+speed+"px";

if(hit(player,coin)){

score+=100;

coin.remove();

clearInterval(move);

}

if(coin.offsetTop>700){

coin.remove();

clearInterval(move);

}

},20);

setTimeout(spawnCoin,2500);

}

function hit(a,b){

let ar=a.getBoundingClientRect();

let br=b.getBoundingClientRect();

return !(

ar.bottom<br.top ||

ar.top>br.bottom ||

ar.right<br.left ||

ar.left>br.right

);

}