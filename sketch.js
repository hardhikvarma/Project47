
var monkey , monkey_running;
var backGround,backGroundImage;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var survivalTime = 0;
var score = 0;
var count = 0;
var gameState = "play";

function preload(){
  
  
  monkey_running = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png","bird9.png");
  
  bananaImage = loadImage("food.jpg");
  obstacleImage = loadImage("obstacle.png");
  
  backGroundImage = loadImage("Bg.jpg");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,165,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=(0.3);
 // monkey.debug = true;
  
  //backGround = createSprite(300,300);
  //backGround.addImage("background",backGroundImage);
// backGround.scale =(0.65);
 // backGround.velocityX = -3;
  
  ground = createSprite(225,300,1000,10);
  ground.visible= false;
  
  score = 0;
  
  FoodGroup =createGroup();
  obstaclesGroup =createGroup();
}


function draw() {
background(backGroundImage);
  //monkey.debug = (true);
  
  if (gameState === "play"){
 
    
    
 // monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -10;
   
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
  
   if(FoodGroup.isTouching(monkey)){
    score = score+1;
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale+ 0.02;
  }
 
  
  if(obstaclesGroup.isTouching(monkey)||monkey.y>550){
      gameState = "end";
  }
   food();
   obstacles();
survivalTime = survivalTime+Math.round(getFrameRate()/62);
   monkey.velocityY = monkey.velocityY + 1;
    
    
  }
  
  if (gameState === "end"){
   monkey.visible = false;
    survivalTime=0;
    score = 0;
   FoodGroup.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",200,305);
  
  }
  
  //food();
  //obstacles();
  
  drawSprites();

  textSize(20);
  fill("white");
  text("score:" + score,70,100);
  
  textSize(20);
  fill("black");
  text("Survival Time:" + survivalTime,300,100);
  survivalTime = Math.ceil(frameCount/getFrameRate());

  fill("yellow");
  text("Press space key to fly up",150,50);

  fill("red");
  text("warning: don't fall from the sky",140,25)
}

function food(){
 if(frameCount % 80 === 0)
 {
  var banana = createSprite(); 
   banana.x = Math.round(random(90,400));
   banana.velocityX = - 3
   banana.y = Math.round(random(120,200)); 
   banana.addImage("banana",bananaImage);
   banana.scale = (0.05);
   banana.lifetime = 300; 
   //banana.debug=(true);
 
   FoodGroup.add(banana);
   monkey.depth = banana.depth + 1;
 } 
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(Math.round(random(100,500)),Math.round(random(10,300)),10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("obstacles",obstacleImage)
   obstacle.scale = (0.4);
   obstacle.lifetime = 200;
   
   obstaclesGroup.add(obstacle);
   //obstacle.debug = true;
   obstacle.setCollider("rectangle",0,0,300,200)
   
 }
   
}