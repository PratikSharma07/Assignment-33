const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var score=0;
function preload() {
getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    friend1= new Friend(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    friend2 = new Friend(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    myself = new Myself(200,50);

    slingshot = new SlingShot(myself.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    noStroke();
    textSize(35);
    fill(255);
    text("Score "+score,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    friend1.display();
    log1.display();
    friend1.score();
    friend2.score();
    box3.display();
    box4.display();
    friend2.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    myself.display();
    platform.display();
 
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(myself.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
       myself.trajectory=[];
       slingshot.attach(myself.body);
       Matter.Body.setPosition(myself.body, {x: 200 , y: 50});
    }
}

async function getBackgroundImg(){
var respone = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
var responeJSON = await respone.json();
var datetime = responeJSON.datetime
var hour = datetime.slice(11,13);
if(hour>=6 && hour<=19){
    bg="sprites/bg.jpg"
}
else{
    bg="sprites/bg2.jpg";
}
backgroundImg=loadImage(bg);
console.log(backgroundImg);
}

