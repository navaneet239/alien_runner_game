var SET = 0,
  PLAY = 1,
  END = 2;
var gameState = SET;

var bk, bkk;

var alien, alienR;

var invisibleG;

var info, infobk;

var devil, devilbk, devilGroup;

var skull, skullbk, skullGroup;

var coin, coinbk, coinGroup;

var pack, packItem = 0,
  packbk;

var score = 0;

var hold;

function preload() {

  bkk = loadImage("cartoon-sci-fi-game-seamless-background-alien-planet-landscape-mountain-crater-visualization-fantasy-nature-view_1284-41500.jpg");


  alienR = loadAnimation("alien 1.png", "alien 2.png");

  infobk = loadImage("info.png");

  devilbk = loadImage("devil.png");

  skullbk = loadImage("skull.png");

  coinbk = loadImage("coin.png");

  packbk = loadImage("coin.png");



}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background("black");

  bk = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  //bk.scale = 0.75;
  //bk.velocityX = -5;

  info = createSprite(35, 35, 10, 10);
  info.addImage(infobk);
  info.scale = 0.07

  alien = createSprite(50, 300, 50, 50);
  alien.addAnimation("run", alienR);
  alien.setCollider("rectangle", 0, 0, 65, 85, 0)

  //alien.debug = true

  invisibleG = createSprite(60, 350, 100, 10);
  invisibleG.visible = false;

  coinGroup = createGroup();

  devilGroup = createGroup();

  skullGroup = createGroup();

  pack = createSprite(info.x + 40, info.y, 20, 20);
  pack.addImage(packbk);
  pack.scale = 0.25
  
    
  hold = createSprite(width/2, 60,width,10);
  hold.shapeColor = rgb(253, 96, 0);

}

function draw() {

  drawSprites();
  
  text("Score: " + score, width - 200, 35, fill("white"),textSize(20));

  alien.collide(invisibleG);
  
  //alien.bounceOff(hold);


  if (mouseIsOver(info)) {
    
    text("press space to jump", 10, 55, fill("white"),textSize(17.5));

    text("from the devil and the skull and obtain", 10, 70, fill("white"),textSize(17.5));

    text("the coin to boost your coin power pack. if you go to the devil", 10, 85, fill("white"),textSize(17.5));

    text("your score and coin power pack will become zero but", 10, 100, fill("white"),textSize(17.5));

    text("if you go to the skull,", 10, 115, fill("white"),textSize(17.5));

    text("you are dead.", 10, 130, fill("red"),textSize(17.5));

    text("* coin power pack will not  only collect coins but also bhoost your jumping power.", 10, 150, fill("black"),textSize(17.5));
  }

  text("you", alien.x + 35, alien.y - 40, fill("white"), textSize(20));

  text("= " + packItem, pack.x + 20, pack.y + 5)


  if (gameState === SET) {
    packItem = 0;
    bk.velocityX = 0;

    text("quick! the alien is becoming impatient.", width/2 - 225, 170, fill("white"),textSize(25))

    text("click on the alien to start", width/2 - 150, 200, fill("white"), textSize(25))

    if (mousePressedOver(alien)) {
      gameState = PLAY;
      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (keyDown("SPACE") && alien.y >= 120) {
      alien.velocityY = -12.5;
    }

    alien.velocityY = alien.velocityY + 0.8

    evil1();

    evil2();

    goldCoin();

    if (coinGroup.isTouching(alien)) {
      packItem = packItem + 1
    }

    if(skullGroup.isTouching(alien)){
      gameState = END;
      alien.velocityY = 0;
    }
    
    if(devilGroup.isTouching(alien)){
      score = 0;
      packItem = 0;
    }
    
    if(alien.isTouching(hold)){
      gameState = END;
      alien.velocityY = 0;
    }

  }

  if (gameState === END){
    bk.velocityX = 0;
    
    devilGroup.setVelocityXEach(0);
    devilGroup.destroyEach();
    
    skullGroup.setVelocityXEach(0);
    skullGroup.destroyEach();
    
    coinGroup.setVelocityXEach(0);
    coinGroup.destroyEach();
    
    devilGroup.setLifetimeEach(-1);
    skullGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    text("click on the alien to restart",width/2 - 150,200, textSize(30));
    
    if (mousePressedOver(alien)){
      replay();
    }
  }
  
}

function evil1() {

  if (frameCount % 230 === 0) {
    devil = createSprite(width, 300, 20, 20);
    devil.addImage(devilbk);
    devil.scale = 0.22;
    devil.velocityX = -(8 + 3 * score / 100);
    
    devil.setCollider("rectangle",0,0,350,350,0);

    
    devil.lifetime = width/-(8 + 3 * score / 100);
    
    devilGroup.add(devil);
    

  }
}

function evil2() {

  if (frameCount % 100 === 0) {
    skull = createSprite(width, 300, 20, 20);
    skull.addImage(skullbk);
    skull.scale = 0.22;
    skull.velocityX = -(8 + 3 * score / 100);
    
    skull.setCollider("circle",0,0,125);
    
    skull.lifetime = width/-(8 + 3 * score / 100);
    
    skullGroup.add(skull);

  }
}

function goldCoin() {

  if (frameCount % 150 === 0) {
    coin = createSprite(width, 150, 20, 20);
    coin.addImage(coinbk);
    coin.scale = 0.75;
    coin.velocityX = -(8 + 3 * score / 100);

    coin.setCollider("circle", 0, 0, 40);

    coin.lifeItem = width/-(8 + 3 * score / 100);
    
    coinGroup.add(coin);
  }

}

function replay (){
  
  gameState = PLAY;
  
  packItem = 0;
  
  score = 0;
  
  alien.y = 300;

  
}