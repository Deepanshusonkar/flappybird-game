let board;
let boardW=360;
let boardH=640;
let context;

let birdW=34;
let birdH=24;
let birdX=boardW/8;
let birdY=boardH/2;
let birdimage;



let pipeArray = [];
let pw=64;
let ph=512;
let px=boardW;
let py=0;

let toppipe;
let bottompipe;

let vx=-2;
let vy=0;
let gravity=0.2   ;

let bird={
    x:birdX,
    y:birdY,
    width :birdW,
    height:birdH
}
let gameover=false;
let score=0;

window.onload = function(){
    board = document.getElementById("board");
    board.height=boardH;
    board.weidth=boardW;
    context=board.getContext("2d");

    //context.fillStyle="green";
   // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    birdimage=new Image();
    birdimage.src="./flappybird.png";
    birdimage.onload=function(){
    context.drawImage(birdimage,bird.x,bird.y,bird.width,bird.height);
    }
    toppipe=new Image();
    toppipe.src="./toppipe.png";
    bottompipe=new Image();
    bottompipe.src="./bottompipe.png";

    requestAnimationFrame(update);

    setInterval(placepipes, 1500);
    document.addEventListener("keydown",movebird);
}
function update(){
    requestAnimationFrame(update);  
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height);

    vy+=gravity;
    bird.y=Math.max(bird.y+vy , 0);
    context.drawImage(birdimage,bird.x,bird.y,bird.width,bird.height);

    if(bird.y>board.height){
        gameover=true;
    }

    for(i=0;i<pipeArray.length;i++){
        let pipe=pipeArray[i];
        pipe.x += vx;
        context.drawImage(pipe.image,pipe.x,pipe.y,pipe.width,pipe.height);

        if(!pipe.passed && bird.x>pipe.x+pipe.width){
            score+=0.5;
            pipe.passed=true;
        }
        if(detect(bird,pipe)){
            gameover=true;
        }
    }

    while(pipeArray.length>0 && pipeArray[0].x < -pw){
        pipeArray.shift();
    }

    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);
    if(gameover){
        context.fillText("Game Over",5,90);
    }  

}


function placepipes(){
    if(gameover){
        return;
    }
    let random= py-(ph/4)-(Math.random()*(ph/2));
    let opening=boardH/4;
    let q={
        image:toppipe,
        x:px,
        y:random,
        width:pw,
        height:ph,
        passed:false
    }
    pipeArray.push(q);

    let bo={
        image:bottompipe,
        x:px,
        y:random+ph+opening,
        width:pw,
        height:ph,
        passed:false
    }
    pipeArray.push(bo);
}
function movebird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code=="KeyX" || e.code=="touchstart"){
        vy=-4 ;
    if(gameover){
        bird.y=birdY;
        pipeArray=[];
        score=0;
        gameover=false;
    }
}
}
function detect(a,b){
    return a.x < (b.x + b.width) &&
           (a.x + a.width) > b.x &&
           a.y < (b.y+b.height) &&
           (a.y + a.height) > b.y;
}