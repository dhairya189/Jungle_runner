var running, jumping;
var tiger, snake, jungle;
var PLAY = 1;
var END = 0;
var score = 0;
gameState = PLAY;

var snakeGroup;
var woodGroup;

function preload() {
  running = loadAnimation("frame1.png", "frame2.png", "frame3.png", "frame4.png", "frame5.png", "frame6.png", "frame7.png", "frame8.png", "frame9.png", "frame10.png", "frame11.png", "frame12.png", "frame13.png", "frame14.png", "frame15.png", "frame16.png");
  jungleImage = loadImage("jungle.png")
  tiger_run = loadAnimation("tiger1.png","tiger2.png","tiger3.png","tiger4.png","tiger5.png","tiger6.png","tiger7.png","tiger8.png")
  snakeImg = loadImage('snake.png')
  woodImg = loadImage('wooden-block.png')
  game_over = loadImage('gameover.png')
  snakeHiss = loadSound('snake_hiss.mp3')
  tigerGrowl = loadSound('tiger.mp3')
}

function setup() {
  createCanvas(1200, 1200);
  jungle = createSprite(450, 250, 900, 500);
  jungle.addImage("jungle", jungleImage);
  jungle.velocityX = -3
  
  player = createSprite(420,350,20,20)
  player.addAnimation("runner",running);
  player.scale = 0.38;
  player.setCollider('rectangle',0,0,150,150)

  tiger = createSprite(130,360,20,20)
  tiger.addAnimation("tiger_running",tiger_run)
  tiger.scale = 0.5;

  gameOver = createSprite(600,200,20,20);
  gameOver.addImage('gameover',game_over);
  gameOver.scale = 0.4;
  gameOver.visible = false;

  invisibleGround = createSprite(450,player.y + 40,1000,10)
  invisibleGround.visible = false;
  invisibleGround.debug = true;

  snakeGroup = new Group()
  woodGroup = new Group()
}

function draw() {
    refresh();
    fill('red');
    if(gameState == PLAY){
      player.collide(invisibleGround)
      score = score + Math.round(getFrameRate()/60)
    
        if(keyDown('SPACE')){
            player.velocityY = -8;
            player.changeAnimation('runner')
        }
    player.velocityY = player.velocityY + 1;
    spawnSnakes();
    spawnWood();
    if(tiger.isTouching(snakeGroup)){
      snakeGroup.destroyEach();
    }
    if(player.collide(snakeGroup)){
      gameState = END;
      snakeHiss.play();
    }
    if(player.collide(woodGroup)){
      player.setVelocity(0,0);
      tiger.setVelocity(2,0)
    }
    if(tiger.isTouching(woodGroup)){
      woodGroup.destroyEach();
    }
    if(tiger.collide(player)){
      gameState = END;
      tigerGrowl.play();  
    }    
    }

    if(gameState == END){
      player.destroy();
      tiger.destroy();
      snakeGroup.destroyEach();
      woodGroup.destroyEach();  
      jungle.setVelocity(0,0);
      gameOver.visible = true;
    }

    drawSprites();
    fill('red');
    textSize(20);
    text("Score: ", score, 100,600);
}

function refresh() {
    if (jungle.position.x <= 350) {
      jungle.position.x = 450;
    }
}

function spawnSnakes(){
  if(frameCount % 120 == 0){
    var snake = createSprite(500,370,20,20)
    snake.x = Math.round(random(700,1200))
    snake.lifetime = 100;
    snake.addImage('snake',snakeImg);
    snake.scale = 0.14;
    snake.setCollider("rectangle",0,0,snake.width,snake.height-20)
    snakeGroup.add(snake)
    snakeGroup.setVelocityEach(-8,0)
  }
}

function spawnWood(){
  if(frameCount % 160 == 0){
    var wood = createSprite(500,410,20,20)
    wood.x = Math.round(random(700,1200))
    wood.lifetime = 100;
    wood.scale =  0.2 ;
    wood.addImage('wood',woodImg)   
    wood.setCollider('rectangle',0,0,800,600)
    woodGroup.add(wood)
    woodGroup.setVelocityEach(-8,0)
  }
}

// //var PLAY = 1;
// //var END = 0;
// //var gameState = PLAY;

// //var trex, trex_running, trex_collided;
// //var ground, invisibleGround, groundImage;

// //var cloudsGroup, cloudImage;
// //var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

// //var score=0;

// //var gameOver, restart;



// //function preload(){
//   //trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
//   //trex_collided = loadAnimation("trex_collided.png");
  
//   //groundImage = loadImage("ground2.png");
  
//   //cloudImage = loadImage("cloud.png");
  
//   //obstacle1 = loadImage("obstacle1.png");
//   //obstacle2 = loadImage("obstacle2.png");
//   //obstacle3 = loadImage("obstacle3.png");
//   //obstacle4 = loadImage("obstacle4.png");
//   //obstacle5 = loadImage("obstacle5.png");
//  // obstacle6 = loadImage("obstacle6.png");
  
//   //gameOverImg = loadImage("gameOver.png");
//   //restartImg = loadImage("restart.png");
// //}

// //function setup() {
//   //createCanvas(600, 200);
  
//   //trex = createSprite(50,180,20,50);
  
//   //trex.addAnimation("running", trex_running);
//   //trex.addAnimation("collided", trex_collided);
//   //trex.scale = 0.5;
  
//   //ground = createSprite(200,180,400,20);
//   //ground.addImage("ground",groundImage);
//   //ground.x = ground.width /2;
//   //ground.velocityX = -(6 + 3*score/100);
  
//   //gameOver = createSprite(300,100);
//   //gameOver.addImage(gameOverImg);
  
//   //restart = createSprite(300,140);
//   //restart.addImage(restartImg);
  
//   //gameOver.scale = 0.5;
//   //restart.scale = 0.5;

//   //gameOver.visible = false;
//   //restart.visible = false;
  
//   //invisibleGround = createSprite(200,190,400,10);
//   //invisibleGround.visible = false;
  
//   //cloudsGroup = new Group();
//   //obstaclesGroup = new Group();
  
//   //score = 0;
// }

// function draw() {
//   //trex.debug = true;
//   background(255);
//   text("Score: "+ score, 500,50);
  
//   if (gameState===PLAY){
//     score = score + Math.round(getFrameRate()/60);
//     ground.velocityX = -(6 + 3*score/100);
  
//     if(keyDown("space") && trex.y >= 159) {
//       trex.velocityY = -12;
//     }
  
//     trex.velocityY = trex.velocityY + 0.8
  
//     if (ground.x < 0){
//       ground.x = ground.width/2;
//     }
  
//     trex.collide(invisibleGround);
//     spawnClouds();
//     spawnObstacles();
  
//     if(obstaclesGroup.isTouching(trex)){
//         gameState = END;
//     }
//   }
//   else if (gameState === END) {
//     gameOver.visible = true;
//     restart.visible = true;
    
//     //set velcity of each game object to 0
//     ground.velocityX = 0;
//     trex.velocityY = 0;
//     obstaclesGroup.setVelocityXEach(0);
//     cloudsGroup.setVelocityXEach(0);
    
//     //change the trex animation
//     trex.changeAnimation("collided",trex_collided);
    
//     //set lifetime of the game objects so that they are never destroyed
//     obstaclesGroup.setLifetimeEach(-1);
//     cloudsGroup.setLifetimeEach(-1);
    
//     if(mousePressedOver(restart)) {
//       reset();
//     }
//   }
  
  
//   drawSprites();
// }

// function spawnClouds() {
//   //write code here to spawn the clouds
//   if (frameCount % 60 === 0) {
//     var cloud = createSprite(600,120,40,10);
//     cloud.y = Math.round(random(80,120));
//     cloud.addImage(cloudImage);
//     cloud.scale = 0.5;
//     cloud.velocityX = -3;
    
//      //assign lifetime to the variable
//     cloud.lifetime = 200;
    
//     //adjust the depth
//     cloud.depth = trex.depth;
//     trex.depth = trex.depth + 1;
    
//     //add each cloud to the group
//     cloudsGroup.add(cloud);
//   }
  
// }

// function spawnObstacles() {
//   if(frameCount % 60 === 0) {
//     var obstacle = createSprite(600,165,10,40);
//     //obstacle.debug = true;
//     obstacle.velocityX = -(6 + 3*score/100);
    
//     //generate random obstacles
//     var rand = Math.round(random(1,6));
//     switch(rand) {
//       case 1: obstacle.addImage(obstacle1);
//               break;
//       case 2: obstacle.addImage(obstacle2);
//               break;
//       case 3: obstacle.addImage(obstacle3);
//               break;
//       case 4: obstacle.addImage(obstacle4);
//               break;
//       case 5: obstacle.addImage(obstacle5);
//               break;
//       case 6: obstacle.addImage(obstacle6);
//               break;
//       default: break;
//     }
    
//     //assign scale and lifetime to the obstacle           
//     obstacle.scale = 0.5;
//     obstacle.lifetime = 300;
//     //add each obstacle to the group
//     obstaclesGroup.add(obstacle);
//   }
// }

// function reset(){
//   gameState = PLAY;
//   gameOver.visible = false;
//   restart.visible = false;
  
//   obstaclesGroup.destroyEach();
//   cloudsGroup.destroyEach();
  
//   trex.changeAnimation("running",trex_running);
  
 
  
//   score = 0;
  
// } 