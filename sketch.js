var monkey, monkey_animation;
var banana, banana_image, obstacle, obstacle_image;
var banana_grp, obstacles_grp;
var score=0, survival_time=0;
var replay, replay_image;
var play=1, end=2, game_state=play;

function preload(){
  monkey_animation =loadAnimation ("m1.png", "m2.png", "m3.png", "m4.png", "m5.png", "m6.png", "m7.png", "m8.png", "m9.png");
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
  replay_image=loadImage("replay.jpeg");
}

function setup() {
  createCanvas(750,600);
  
  ground=createSprite(375,550,750,100);
  ground.shapeColor="green";
  
  monkey=createSprite(100,445);
  monkey.addAnimation("monkey",monkey_animation);
  monkey.scale=0.2;
  
  obstacles_grp=createGroup();
  banana_grp=createGroup();
  
  replay=createSprite(375,400);
  replay.addImage(replay_image);
  replay.scale=1.5;
}


function draw() {
  background("lightblue");
  
  monkey.collide(ground);
  
  survival_time = survival_time + Math.round(getFrameRate()/60);
  
  console.log(obstacles_grp.velocityXEach);
  console.log(banana_grp.velocityXEach);
  
  if(game_state===play) {
    replay.visible=false;
    
    obstacles_grp.velocityXEach=-(5+survival_time/100);
    banana_grp.velocityXEach=-(5+survival_time/100);
    
    if(keyDown("space")&&monkey.y>=100) {
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;

    Obstacles();
    Bananas();
    
    textSize(30);
    fill("purple");
    text("Survival Time :: "+survival_time,25,50);
    
    textSize(30);
    fill("red");
    text("Score = "+score,550,50)
    
    if(banana_grp.isTouching(monkey)) {
      score++;
      banana_grp.destroyEach();
    }
    
    if(obstacles_grp.isTouching(monkey)) {
      game_state=end;
    }
    
  } else if(game_state===end) {    
    obstacles_grp.destroyEach();
    banana_grp.destroyEach();
    obstacles_grp.setLifetimeEach(-1);
    banana_grp.setLifetimeEach(-1);
    obstacles_grp.setVelocityXEach(0);
    banana_grp.setVelocityEach(0);
    
    monkey.visible=false;
    replay.visible=true;
    
    textSize(55);
    fill("red");
    text("Your Score is..."+score+" Points",65,300);
    
    if(mousePressedOver(replay)) {
      game_state=play;
      monkey.visible=true;
      score=0;
      survival_time=0;
    }
  }
  
  drawSprites();
}
function Obstacles() {
  if(frameCount%300===0) {
    obstacle=createSprite(800,445);
    obstacle.addImage(obstacle_image);
    obstacle.scale=0.3;
    obstacle.setCollider("rectangle",0,0,500,450);
    obstacle.velocityX=-5;
    obstacle.lifetime=180;
    obstacles_grp.add(obstacle);
  }
}
function Bananas() {
  if(frameCount%80===0) {
    banana=createSprite(800,Math.round(random(20,480)));
    banana.addImage(banana_image);
    banana.scale=0.2;
    banana.setCollider("rectangle",0,0,500,300)
    banana.velocityX=-5;
    banana.lifetime=180;
    banana_grp.add(banana);
  }
}