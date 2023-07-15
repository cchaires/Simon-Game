var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var isOn = false;

function nextSequence() {
    var randnumber = Math.floor(Math.random() * buttonColours.length);
    return randnumber;
}

function playGame() {
    var randomChosenColour = buttonColours[nextSequence()];
    $('#' + randomChosenColour).addClass('pressed');
    setTimeout(() => $('#' + randomChosenColour).removeClass('pressed'), 400);
    
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
}
playGame();



// var music = new Audio('sounds/'+ randomChosenColour + '.mp3');
var music = new Audio('sounds/green.mp3');
music.play();















