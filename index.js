var Word = require("./word.js");
var inquirer = require('inquirer');

//Global varibles 

var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;


//This gets the selected word and uses the word constructor to create the word from a random 
// index of the array inside wordList. 
function startGame() {
    if (wordList.length<2) {
        wordList = ["THE OFFICE", "GAME OF THRONES", "PARKS AND RECREATION", "THE GOOD PLACE", "BOJACK HORSEMAN", "BREAKING BAD", "WESTWORLD", "NARCOS", "STRANGER THINGS", "BLACK MIRROR"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 8 letter guesses for TV shows!.\n")
    promptUser();
}


//This prompts users to pick a letter, If counter = 0 this will run the else statement and ask user if they want to play again.
//Player gets 8 guesses 
function promptUser() {
    if (counter < 8) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. "
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n");
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        playAgain();
    }
}



//Checks if the user input is correct and compares it to gameWord
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n");
            counter++;
            console.log(((8 - counter) + " guesses remaining"));
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n");
        promptUser();
    }
}


//If the user guess is correct, it will replace the correct letter with the "_",
//If the array is filled in, the game will prompt if you would like to play agian.
function rightGuess() {
    console.log("\nYou guessed correctly.\n");
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        // console.log(gameWord.showWord());
        console.log('\nYou win!!\n');
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        playAgain();
    }
    else {
        // playAgain();
        promptUser();

    }
}

//Prompts users if the want to play the game again.
function playAgain(){
    inquirer.prompt([
        {
            type : "confirm",
            name : "playAgain",
            message : "Do you want to play again?" 

        }
    ]).then(function(response){
        if(response.playAgain){
            startGame();
        } else{
            console.log("Thanks for playing!")
        }
    })
}

startGame();