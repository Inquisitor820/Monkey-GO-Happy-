var monkey , monkey_running;
var bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var score = 0;
var survivaltime = 0

function preload()
{
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{ 
  createCanvas(600,400);
  
  monkey = createSprite(50,360,15,15);
  monkey.addAnimation("runnning" , monkey_running);
  monkey.scale = 0.12;
   
  ground = createSprite(300 , 380 , 600 , 15);
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() 
{
  background("lightyellow")

//score
  if(monkey.isTouching(foodGroup))
    {
      foodGroup.destroyEach();
      score = score + 1;
      
    }
  
  
//monkey control
  if(keyDown("space") && monkey.y >= 120) 
  {
    monkey.velocityY = -15;
  }
    monkey.velocityY = monkey.velocityY + 0.9;
  
//groundscroll  
  ground.velocityX = -4
  if (ground.x < 0)
  {
     ground.x = ground.width/2;
  }
  
  //collision
  monkey.collide(ground);
  obstacleGroup.collide(monkey)
  
  
  //consoles
  console.log("Frame Count = " + frameCount);
  console.log("Frame Rate = " + frameRate());
  
  //groups
  food();
  obstacles();
  
  drawSprites();
  
  //scorefont
  fill("black");
  textFont("courier");
  textSize(20);
  text("Score : " + score , 450 , 35 );
  
  //lifetimefont
  fill("black");
  textFont("courier");
  textSize(20);
  survivaltime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survivaltime , 15 , 35);

}

function food()
{
  if (frameCount%80 == 0)
  {
    var banana = createSprite(600,240,40,10);
    banana.y = Math.round(random(100,250));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -7;  
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana)
  }
}

function obstacles()
{ if (frameCount%300 === 0)
  {  
     obstacle = createSprite(600 , 359 , 30 , 30);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.lifetime = 220;
     obstacle.velocityX = -4;
    
    obstacleGroup.add(obstacle);
  }
}




