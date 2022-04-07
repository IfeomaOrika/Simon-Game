//colour sequence array
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level); //change the h13 to say "Level 0".
    nextSequence();
    started = true;
  }
});


//jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  
  var userChosenColour = $(this).attr("id"); 
  /*So if the Green button was clicked, userChosenColour will equal its id which is "green". Same for other colours.
  This variable stores the id of the button that got clicked.
  The keyword this to refer to the button object that triggered the click.
  The attr() function in jQuery to find out the value of any of the attributes of an object*/
  
  
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1); //after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function checkAnswer(currentLevel) {
//check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence(); //nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
        }, 1000); //Call nextSequence() after a 1000 millisecond delay
      }
    } else {
      playSound("wrong"); //play this sound if the user got one of the answers wrong.
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart"); // if the user got the answer wrong.
//in the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      setTimeout(function () {
        $("body").removeClass("game-over");//you should end up with a flash effect
      }, 200);

      startOver(); //if the user gets the sequence wrong.
    }
}

// get next colour and next level
function nextSequence() {
  userClickedPattern = [];
  level++;  //increase the level by 1 every time nextSequence()
  $("#level-title").text("Level " + level); // update the h1 with this change in the value of level.

  //random number from 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  //select random color from buttonColours array
  var randomChosenColour = buttonColours[randomNumber];
  // append to empty array game pattern
  gamePattern.push(randomChosenColour);
  //animate button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound for random hosen colour
  playSound(randomChosenColour);
}

//add the pressed class from the css class to the button that gets clicked inside animatePress().
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100); // remove the pressed class after a 100 milliseconds.
}

//when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0; // start at level 0
  gamePattern = [];
  started = false; // to toggle to true once the game starts and if it's true, then further key presses should not trigger nextSequence().
}
