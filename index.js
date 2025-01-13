//variable to store game pattern
var gamePattern=[];

//variable to store user click Pattern-don't need at all.
//var userClickedPattern=[];

//variable random number
var randomNumber;

// create a new variable to store the random choosen color
var randomChosenColour;

//create button color array

var buttonColours=["red","blue","green","yellow"];

//create level variable to start at level 0;
var level=0;

//create a new variable to indicate whether game is over (can be used to check in progress)
var gameOver=true;

/*create a new variable to store current level step done by user. Need to reset to 0 if
User advanced to next level or game is over.
*/
var currentLevelStep=0;

/* create a function to check user mouse input match with current round progress*/
function checkUserLevelStep(userInput,currentLevel){

    if(gamePattern[currentLevelStep]===userInput){
        currentLevelStep++;
        //alert ("you got it right");
        if (currentLevelStep===currentLevel) //check if already reached the current level limit
        {
            nextSequence();
        }
    } else
    {
        //alert ("you failed");
        playSound("wrong");
        $("h1").text("Game Over at Level "+ level +". Press any key/start button to try again!");
        $("p").text("Correct Squence should be: "+ gamePattern); //show the correct sequence to the user
        $("body").toggleClass("game-over"); //make the body background red to alert user
        gameOver=true;//update gameover to true
        level=0; //reset level to zero
        gamePattern=[];//reset game pattern, so the whole game start again!
    }    
    
}


//create play sound function with input parameter name (based on button color name)
function playSound(name){

    var newAudio = new Audio('./sounds/'+name+'.mp3');
    newAudio.play();
}

//animate the press (can be system generated or user pressed)
function animatePress(currentColour)
{
//Flash it with modifying the CSS transition duration and use timeout 500 ms=0.5s to untoggle it!
    $("#"+currentColour).toggleClass("pressed");
    setTimeout(function(){$("#"+currentColour).toggleClass("pressed");},500);
}


// Create a random sequence number function
function nextSequence(){
    level++;
    currentLevelStep=0; //reset the current Level Step to 0
    randomNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("h1").text("Level " + level);
    //playCurrentlevelIntro(level);
    setTimeout(playCurrentlevelIntro,1000,level);
}

// create a function to play current level intro
function playCurrentlevelIntro (level)
{
    $("p").text("Level "+ level + " steps show in progess. Don't click on any above buttons!");
    for (var x=0; x<level; x++){

        
        //animatePress(gamePattern[x]);
        //run the animatePress function with delay, the delay is increased in milliseconds as x is increased.
        setTimeout(animatePress,(x+1)*2000,gamePattern[x]); //display as 2000 milliseconds gap. 3000 is too slow.
        setTimeout(playSound,(x+1)*2000,gamePattern[x]);
        // $("#"+gamePattern[x]).toggleClass("pressed");
       // setTimeout(function(){$("#"+gamePattern[x]).toggleClass("pressed");},500);
    }
    setTimeout(function(){$("p").text("Done. Please clicks on the above buttons in order as shown before.");},(level+1) * 2000);
}

//var randomNumber=nextSequence();

// create a new variable to store the random choosen color
//var randomChosenColour=buttonColours[randomNumber];

//add randomchosencolour to the game pattern
//gamePattern.push(randomChosenColour);

// animate the system generated press
//animatePress(randomChosenColour);

//Play Audio based on the randomChosen Color
//playSound(randomChosenColour);

//Store the usered clicked button based on the mouse down event
var userChosenColour;

$(".btn").on("click",function(){

    userChosenColour=this.attributes.id.nodeValue;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    //userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    
    //Check only if the game is NOT over yet.
    if (gameOver===false){
    
        checkUserLevelStep(userChosenColour,level);
    }
}
);

//Press keyboard key to detect the start of game?
$(document).on("keydown",function(){
    
    if (gameOver===true){
        gameOver=false;
        $("p").text("");//remove the correct answer from last failed game.
        $("body").removeClass("game-over");// remove it for reset game if game over scenario just happened
        playSound("start");
        nextSequence();
            
    } else
    {
        alert("Don't press any keyboard keys while the current game challenge is in progress!")
    }
}   
);

//Start button functionality to detect the start of game?
$("#start").on("click",function(){

    
    animatePress("start");
    
    if (gameOver===true){
        gameOver=false;
        $("p").text("");//remove the correct answer from last failed game.
        $("body").removeClass("game-over");// remove it for reset game if game over scenario just happened
        playSound("start");
        nextSequence();
            
    } else
    {
        alert("Don't press the start button while the current game challenge is in progress!")
    }

}
);
