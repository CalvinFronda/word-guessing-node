var Letter = require('./letters.js');

//If a letter is passed into the "arr" this is given the object to be compaired 

function Word(arr){
    this.arr = arr;
    this.testWord = [];
    this.makeWord = function(){
        for(var i = 0; i < arr.length; i++){
            var word = new Letter(arr[i]);
            this.testWord.push(word);
        }
    }
    this.showWord = function(){
        var wordDisplay = [];
       
        for( var i =0; i < this.testWord.length; i ++){
            wordDisplay.push(this.testWord[i].display());
        }
        
        return wordDisplay.join(" ");
        
    }
    this.checkGuess = function(myGuess){
        for (var i =0; i < this.testWord.length; i++){
            this.testWord[i].check(myGuess);
        }
    }
}



module.exports = Word;