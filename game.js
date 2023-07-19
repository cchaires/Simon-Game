var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isOn = false;
var userLevel = 0; // To keep track of the user's progress

function animationSquare(selectr) {
  const soundSrc = selectr.data('sound')
  selectr.addClass('pressed');
  new Audio(soundSrc).play();
  setTimeout(() => selectr.removeClass('pressed'), 200);
}

// Function to pick a random color from buttonColours
function nextSequence() {
  var randnumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randnumber];
  const randomSelectr = $('#' + randomChosenColour); 
  return randomChosenColour;
}

// Function that plays the CPU pattern
const playingPattern = async function () { 
  for (const item of gamePattern) {
    await sleep(1000);
    animationSquare($('#' + item));
    console.log(item);
  } 
}

// Function that plays the game
function playGame() {
  $('h1').text('Lets go!🎉\nLevel: '+userLevel);
  if (gamePattern.length > 0 && userLevel > 0) {
    playingPattern();
  }
  let colorpicked = nextSequence();
  if (userLevel == 0){
    animationSquare($('#' + colorpicked));
  }
  gamePattern.push(colorpicked);
  console.log(gamePattern);
  // Attach a click event listener to each button only when the game is on
  if (isOn) {
    $('.btn').on('click', function() {
      animationSquare($('#' + this.id));
      userClickedPattern.push(this.id);
      console.log('User Pattern: ' + userClickedPattern);
      
      // Check if user's clicked pattern matches gamePattern length
      if (userClickedPattern.length === gamePattern.length) {
        checkAnswer(userClickedPattern); // If it does, check the answer
        $('.btn').off('click'); // Turn off click event listener to prevent further clicks
      }
    });
  }
}

//slow down animation in order to be more visible to the user.
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Attach a keydown event listener to the document
$(document).on('keydown', function (event) {
  if (event.key == 'a' && !isOn) {
    isOn = true;
    playGame();
  }
});

// Check if the user has clicked on a pattern 
function checkAnswer(pattern) {
  console.log('CA User Level: ' + userLevel);
  console.log('CA UserClick: ' + userClickedPattern + '\nCA Gamepattern: ' + gamePattern);
  for (let i = 0; i < gamePattern.length; i++){
    if (userClickedPattern[i] === gamePattern[i]) {
      console.log('Correct click!');
    } else {
      console.log('Wrong click!');
      // Handle incorrect clicks (e.g., show a game-over message)
      new Audio('sounds/wrong.mp3').play()
      endGame();
      return; // Exit the function early if the user makes a mistake
    }
  }

  // If the user's click matches the current level, check if they have finished the sequence
  if (userClickedPattern.length === gamePattern.length) {
    console.log('\nUserLevel: ' + userLevel);
    console.log('You have completed the sequence!');
    // Continue the game by playing the next button for the CPU and updating the level for both CPU and user
    userLevel++;
    console.log('User Level: ' + userLevel);
    setTimeout(function () {
      userClickedPattern = []; // Reset the user's input pattern for the next round
      playGame();
    }, 1000);
  }
}

// Function that ends the game, and restores the user's & game input pattern
function endGame() {
  // Display a game-over message or perform any other necessary actions
  $('h1').text('💣 Game over! Your final score is: ' + (userLevel - 1)+'\nPress A Key to Start Again! 👌🏼'); // Show the user's final score (level - 1 because it counts the next level)
  // Reset the game to start a new round
  $('body').addClass('game-over');
  setTimeout(() => $('body').removeClass('game-over'), 600);
  userLevel = 0;
  gamePattern = [];
  userClickedPattern = [];
  isOn = false; // Depending on your game logic, you might need to reset the isOn variable as well.
}
