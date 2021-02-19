var towerImg,tower;
var doorImg,door,doorsGroup;
var climberImg,climber,climbersGroup,ghostImg,ghost,invisibleBlockGroup,invisibleBlock;
var gameState="play";



function preload(){
  towerImg = loadImage("tower.png");  
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  if(gameState ==="play"){
    
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
         
    ghost.velocityY=ghost.velocityY+0.8;
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    

    
    
    
    if(tower.y>400){
      tower.y=300
    }
    
    spawnDoor();
      if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
     drawSprites();
    
  }
  
  
   
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
 }
 

function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    var climber = createSprite(200,10);
    climber.x = door.x;
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 800;
    
    door.lifetime=800;
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width; 
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    
    
    
    
    
    
    
    
    
    
    
  }
}




  