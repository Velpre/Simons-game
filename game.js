const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];


const header = document.getElementById("level-title");
let level = 1;
let started = true;
// Setter i gang spillet med random tastatur klikk - event keydown
document.addEventListener("click", ()=>{
  if(started){
    nextSequence();
  }
  started = false
});


function nextSequence(){
  // Lager random nummer som velger en av angitte farger/knapper og lagrer valget i array
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Lager audio objekt til den random knappen som ble valgt ovenfor
  let startSound = new Audio("./sounds/" + randomChosenColour + ".mp3");

  // Lager animation for random knappen og spiller av riktig lyd for den knappen
  let startButton = document.getElementById(randomChosenColour);
  startButton.classList.add("flash");
  playSound(startSound);

  // Endrer header og øker level med 1
  header.innerHTML = "Level " + level;
  level ++;
  setTimeout(function(){startButton.classList.remove("flash")},300)
  // Restarter userClickedPattern array
  userClickedPattern = [];
}


document.querySelectorAll(".btn").forEach(btn =>{
  btn.addEventListener("click", (e)=>{
    let userChosenColour = e.target.id;
    let currentTarget = e.currentTarget;
    userClickedPattern.push(userChosenColour);
    chosenButtonSound = new Audio("./sounds/" + userChosenColour + ".mp3")
    playSound(chosenButtonSound);
    animatePress(currentTarget);
    setTimeout(function(){currentTarget.classList.remove("pressed")}, 100);
    checkAnswer(userClickedPattern.length - 1);
  })
});

// Funksjonen som tar imot audio objekt og spiller den av
function playSound(name){
  name.play();
}

function animatePress(currentColour){
  currentColour.classList.add("pressed");
}


// Sjekker bruker svar

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("true")

    if(gamePattern.length == userClickedPattern.length ){
      setTimeout(nextSequence, 1000);
      currentLevel = 0;
      userClickedPattern = [];

    }
  }else{
    header.innerHTML = "Game Over, Press Blue Screen to Restart"
    console.log("wrong");
    // Spiller av wrong lyd
    const wrongSound = new Audio("./sounds/wrong.mp3")
    playSound(wrongSound);
    // Legger til wrong class og fjerner den etter 200ms
    document.getElementsByTagName("body")[0].classList.add("game-over");
    setTimeout(function(){document.getElementsByTagName("body")[0].classList.remove("game-over")},200);
    // Endrer header

    // Starter på nytt - restarter alle verdier
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern= [];
  userClickedPattern = [];
  setTimeout(function(){started=true;}, 1000);
}
