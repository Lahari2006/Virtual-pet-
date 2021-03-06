var dogImg, happyDogImg, dog, database, foodS, foodStock, canvas, lastFed, fedTime, foodObj, feed, addFood, food1, foodCount, input, milk, milkImg;
var backgroundImage;

function preload() {
  dogImg = loadImage('Images/Dog.png');
  happyDogImg = loadImage('Images/happy dog.png');
  milkImg = loadImage('Images/Milk.png');
  backgroundImage = loadImage('Images/background.jpg')
}

function setup() {
  database = firebase.database();

  dog = createSprite(1400, 700);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(1335, 752);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(500, 75);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(150, 70);

  feed = createButton("Feed your Dog");
  feed.position(500, 45);
  feed.mousePressed(feedDog);

  canvas = createCanvas(1675, 899);
}

function draw() {  
  background(backgroundImage);

  food1.display();

  drawSprites();
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}