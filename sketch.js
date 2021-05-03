var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feeddog;

//create feed and lastFed variable here
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeddog = createButton("Feed the dog");
  feeddog.position(700,95);
  feeddog.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedtime = database.ref("FeedTime");
  fedtime.on("value",function(data){
    lastFed = data.val();
  })
  fill("white");
  textSize(20)
  if(lastFed>=12){
    text("LAST FED = 12 NOON",250,30);
  }
  else if(lastFed == 0){
    text("LAST FED 12 = MIDNIGHT",250,30);
  }
  else{
    text("lastFed-"+lastFed,250,30)
  }

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var foodStock = foodObj.getFoodStock()
  if(foodStock<=0){
    foodObj.updateFoodStock(foodStock*0);
  }
  else{
    foodObj.updateFoodStock(foodStock-1)
  }
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour() 
  })
  //write code here to update food stock and last fed time
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
