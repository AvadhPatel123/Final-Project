//Creating an array containing coordinates of each position on the board
posArray = {
  '00':[[520, 650],[180, 305]],
  '10':[[520, 650],[305, 450]],
  '20':[[520, 650],[450, 580]],

  '01':[[650, 800],[180, 305]],
  '11':[[650, 800],[305, 450]],
  '21':[[650, 800],[450, 580]],

  '02':[[800, 930],[180, 305]],
  '12':[[800, 930],[305, 450]],
  '22':[[800, 930],[450, 580]]
}

//Establishing an object which is meant for what is on the game board
board2 = [];

//Establishing an object which is the game board itself
board = [
[/* [0][0], [0][1], [0][1] */],
[/* [1][0], [1][1], [1][2] */],
[/* [2][0], [2][1], [2][2] */]
];

let winner;

//This function creates the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

//This function draws the playable game board on the webpage
function draw() {
  background(0, 255, 91);
  
  noStroke();
  fill("black");
  createGrid();


//The portion of the code reads who has won and displays text saying who won
  if(winner == 'o'){
    posArray = {};
    textSize(100);
    text("O is the Winner!!!!!!!!", windowWidth/4 - 65, 3 * windowHeight/4 + 145);
    fill('white');
  }
  else if(winner == 'x'){
    posArray = {};
    textSize(100);
    text("X is the Winner!!!!!!!!", windowWidth/4 - 65, 3 * windowHeight/4 + 145);
    fill(62, 193, 249);
  }
  


  for(let i = 0; i < board2.length; i++){
    board2[i].display();
  }

  
  
}

//This function creates the gameboard
function createGrid(){

  rect(windowWidth/2 - 75, windowHeight/4, 7, 400); //Vertical Middle Left
  rect(windowWidth/2 + 75, windowHeight/4, 7, 400); //Vertical Middle Right
  rect(windowWidth/2 - 204, windowHeight/4, 7, 400); //Vertical Outside Left
  rect(windowWidth/2 + 203, windowHeight/4, 7, 400); //Vertical Outside Right
  rect(windowWidth/4 + 163, windowHeight/2 - 55, 400, 7); //Horizontal Middle Top
  rect(windowWidth/4 + 163, windowHeight/2 + 90, 400, 7); //Horizontal Middle Bottom
  rect(windowWidth/4 + 156, windowHeight/4 - 6, 414, 7); //Horizontal Outside Top
  rect(windowWidth/4 + 156, 3 * windowHeight/4 + 43, 414, 7); //Horizontal Outside Bottom
}


//This class established the two different players "x" and "o"
class Teams{
  
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.type = type;
    
  }
  
  display(){
    if(this.type == 0){
      
      push();
      translate(this.x, this.y);
      rotate(PI/4);
      fill(62, 193, 249);
      rect(-47, -13, 80, 8);
      rect(-13, -47, 8, 80);
      pop();
      
      
    }
    else if(this.type== 1){
      
      push();
      translate(this.x, this.y);
      fill("white");
      circle(0, 0, 80);
      pop();
      
      
    }
  }
  
}


//This funciton places "x" and "o" in their desired spot through mouse click.  It also has code that alternates turns between two players.
function mousePressed(){

  for (let coords in posArray){
    let x1 = posArray[coords][0][0];
    let x2 = posArray[coords][0][1];
    let y1 = posArray[coords][1][0];
    let y2 = posArray[coords][1][1];

    if(x1 <= mouseX && mouseX <= x2 && y1 <= mouseY && mouseY <= y2){

      let midX = (x1 + x2)/2;
      let midY = (y1 + y2)/2;

      let type = board2.length % 2;

      board2.push(new Teams(midX, midY, type));
      board[coords[0]][coords[1]] = type;

      delete posArray[coords[0] + coords[1]];

      if(board2.length >= 5){
        ifWinner();
      }


    }
  }
}


//This function has algorithms that it goes through to see in which way a certainn player has won the game
function ifWinner(){

  let sum;

  //Horizontal Winnner Check
  for(let i = 0; i < 3; i++){
     sum = board[i][0] + board[i][1] + board[i][2];
    if(sum == 0){
      winner = 'x';
    }
    else if(sum == 3){
      winner = 'o';
    }
  }


  //Vertical Winner Check
  for(let i = 0; i < 3; i++){
     sum = board[0][i] + board[1][i] + board[2][i];
    if(sum == 0){
      winner = 'x';
    }
    else if(sum == 3){
      winner = 'o';
    }
  }


  //Diagonal Winner Check
     sum = board[0][0] + board[1][1] + board[2][2];
    if(sum == 0){
      winner = 'x';
    }
    else if(sum == 3){ 
      winner = 'o';
    }
  


  //Diagonal 2 Winner Check
     sum = board[0][2] + board[1][1] + board[2][0];
    if(sum == 0){
      winner = 'x';
    }
    else if(sum == 3){
      winner = 'o';
    }
}