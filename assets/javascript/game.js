function loadPage()
{
	onLoad();
}
window.onload=loadPage;


//var words = ['apple', 'orange', 'banana', 'cabbage', 'potato'];
var words = ['cabbage', 'potato'];
var wins = 0;
var losses = 0;
var guesses = 0;
var guessesAllowed = 0;
var correctGuesses = 0;
var alphabets = /^[A-z]+$/;
var lettersTyped = [];
var computerGuess = [];
var displayMask = [];
var gameover=false;


function displayComputerGuess(word, lettersGuessed, displayCorrectAns){
	if(lettersGuessed != undefined && lettersGuessed.length >0 ){

		for(i=0;i<computerGuess.length;i++){
			var found=false;
			for(j=0;j<lettersGuessed.length;j++){
				if(lettersGuessed[j]==computerGuess[i]){
					found=true;
					break;
				}
			}
			if(found == false){
				if(displayCorrectAns != undefined && displayCorrectAns === true){
					displayMask[i]='<font color="#FF0000">' + computerGuess[i] + '</font>';
					//<font color="#FF0000">f</font>
				}else {
					displayMask[i]='_';
				}
			}else{
				displayMask[i]=computerGuess[i];
			}

		}
	}else{
		for(i=0;i<computerGuess.length;i++){
			displayMask[i]='_';
		}
	}
	document.getElementById("curWordId").innerHTML= displayMask;
	// document.getElementById("curWordId2").innerHTML= word;
}

function clearPriorWord(){
	lettersTyped=[];
	computerGuess=[];
	displayMask=[];
	correctGuesses=0;
	guessesAllowed=0;
	document.getElementById("curWordId").innerHTML= displayMask;
	// document.getElementById("curWordId2").innerHTML= computerGuess;
	document.getElementById("letterGuessedId").innerHTML= lettersTyped;
}


function displayLettersTyped(lettersTyped){
	document.getElementById("letterGuessedId").innerHTML= lettersTyped;
}



var checkIfDuplicate =function(userGuess){
	var found = false;
	for(var i=0; i<lettersTyped.length; i++){
		if(userGuess == lettersTyped[i]){
			found= true;
			break;
		}
	}
	return found;
}

var checkIfGoodGuess = function(userGuess){
	var found = false;
	for(var i=0; i<computerGuess.length; i++){
		if(userGuess == computerGuess[i]){
			found= true;
			correctGuesses++;
			break;
		}
	}
	return found;
}

function printHtmlReport(){
	var html = "<p>Press r, p or s to start playing.</p>"
	html += "<p>Wins: " + wins + "</p>"; 
	html += "<p>Losses: " + losses + "</p>";
	html += "<p>Ties: " + ties + "</p>";

	document.querySelector("#game").innerHTML = html;
}

var onLoad = function() {
		//alert('Inside onload function')
		var computerRandomNumber = Math.floor(Math.random() * words.length);

		var randomWord = words[computerRandomNumber];
	//convert into char array;
	for(i=0;i<randomWord.length;i++){
		computerGuess.push(randomWord[i]);
	}

	//draw dashes for the length of the word
	displayComputerGuess(computerGuess);

	guessesAllowed = computerGuess.length+2;
	document.getElementById("GuessesAllowId").innerHTML= guessesAllowed;
}



document.onkeyup = function(event) {

	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	if(gameover ===true) {
		gameover = false;
		clearPriorWord();
		onLoad();
		return;
	}

	//check if valid char
	var result = alphabets.test(userGuess);
	if(result == false && gameover=== false) {
		alert('Enter a valid alphabet!! '+ userGuess + ' is not valid');
		return;
	}

	//check if user previously picked this letter
	var dupl = checkIfDuplicate(userGuess);
	//if yes, then ignore the pick
	if(dupl == true){
		return;
	}

	//add letter to lettersTyped
	lettersTyped.push(userGuess);
	displayLettersTyped(lettersTyped);

	//check if letter is part of current word
	var letterfound = checkIfGoodGuess(userGuess);

	//if yes, update display of word
	if (letterfound == true) {
		displayComputerGuess(computerGuess, lettersTyped, false);	

	//check if word complete?
	if(displayMask.indexOf('_') == -1){
			//if yes, display you won, increment wins
			alert("You guessed correct!!!");
			wins++;
			document.getElementById("numWinsId").innerHTML= wins;
		}

	}

	//decrement guessesAllowed
	guessesAllowed--;
	document.getElementById("GuessesAllowId").innerHTML= guessesAllowed;

	//check if guesses are remaining
	if(guessesAllowed < 1){
		gameover=true;
		alert("Sorry no more tries");
		losses++;
		document.getElementById("numLossesId").innerHTML= losses;
		displayComputerGuess(computerGuess, lettersTyped, true);
		return;
	}
}