//Letter constructor, If the user guesses a letter it is passed into char
//It will run through the words.js and check if that char is correct



function Letter(char) {
    this.char = char;
    this.guessed = false;
    this.display = function () {
        if (this.char === " ") {
            return " ";
        } else if (!this.guessed) {
            return "_";
        } else {
            return this.char;
        }
    }
    this.check = function (userGuess) {
        if (userGuess === this.char) {
            this.guessed = true;
        }
    }


}






module.exports = Letter;