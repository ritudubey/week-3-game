function loadPage()
{
	onLoad();
}
window.onload=loadPage;

var fruits = ['apple', 'orange', 'banana', 'tomato', 'guava', 'cantelope', 'cherry', 'avocado', 'apricot', 'strawberry', 'pineapple', 'pear', 'mango'];
var vegetables = ['okra','cabbage', 'potato', 'broccoli', 'asparagus', 'turnip', 'pumpkin', 'eggplant' ,'onion', 'spinach', 'pepper'];
var words = [];
var wins = 0;
var losses = 0;
var guesses = 0;
var guessesAllowed = 0;
var correctGuesses = 0;
var alphabets = /^[A-z]+$/;
var lettersTyped = [];
var displayMask = "";
var gameover=false;
var computerRandomNumber=0;
var computerGuess="";



function main(){
	document.getElementById('mainPage').style.display = "block";
	document.getElementById('gamePage').style.display = "none";
}


function pickedfruit(){
	computerRandomNumber = Math.floor(Math.random()*fruits.length);
	computerGuess = fruits[computerRandomNumber];
	document.getElementById('mainPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";
	document.getElementById('categoryName').innerHTML = "Fruit";
	hangman();

}

function pickedvegetable(){
	computerRandomNumber = Math.floor(Math.random()*vegetables.length);
	computerGuess = vegetables[computerRandomNumber];
	document.getElementById('mainPage').style.display = "none";
	document.getElementById('gamePage').style.display = "block";
	document.getElementById('categoryName').innerHTML = "Vegetable";
	hangman();
}

var onLoad = function() {

	main();
}

var hangman = function() {
	displayComputerGuess(computerGuess);

	guessesAllowed = 7;
	document.getElementById("GuessesAllowId").innerHTML= guessesAllowed;

}

function displayComputerGuess(word, lettersGuessed, displayCorrectAns){
	displayMask="";
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
					displayMask +='<font color="#FF0000">' + computerGuess[i] + '</font>';
				}else {
					displayMask +='_';
				}
			}else{
				displayMask +=computerGuess[i];
			}

		}
	}else{
		for(i=0;i<computerGuess.length;i++){
			displayMask +='_';
		}
	}
	document.getElementById("curWordId").innerHTML= displayMask;
}

function clearPriorWord(){
	lettersTyped=[];
	computerGuess=[];
	displayMask=[];
	correctGuesses=0;
	guessesAllowed=0;
	document.getElementById("curWordId").innerHTML= displayMask;
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

function displayAlert(str){
	var alertDiv = document.createElement('div');

	alertDiv.setAttribute('class', 'uicontainer');
	alertDiv.setAttribute('id', 'alertDivId');

	alertDiv.innerHTML="<p>" + str + "</p>";
	var parentDiv1 = document.getElementById('message1');
	parentDiv1.appendChild(alertDiv);
	
	var parentDiv2 = document.getElementById('message2');
	var button = document.createElement('button');
	button.setAttribute('id', 'buttonId');
	button.setAttribute('class', 'btn btn-default uicontainer');
	button.innerHTML="<p>" +"Play Again ? Press Me" +"</p>";
	button.onclick = buttonClickFunction;
	parentDiv2.appendChild(button);
}

function buttonClickFunction(){
	var element = document.getElementById('alertDivId');
	element.parentNode.removeChild(element);
	var button = document.getElementById('buttonId');
	button.parentNode.removeChild(button);
	clearPriorWord();

	var parentImageDiv = document.getElementById('hangmanimage');
	var c = parentImageDiv.children;
	var image = c[0];
	image.setAttribute('src', 'assets/images/hangwons.gif');


	if(document.getElementById('categoryName').innerHTML === "Vegetable")
		pickedvegetable();
	else
		pickedfruit();
	hangman();
}


document.onkeyup = function(event) {

	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	//check if valid char
	var result = alphabets.test(userGuess);
	if(result === false && gameover=== false) {
		alert('Enter a valid alphabet!! '+ userGuess + ' is not valid');
		return;
	}

	//check if user previously picked this letter
	var dupl = checkIfDuplicate(userGuess);
	//if yes, then ignore the pick
	if(dupl === true){
		return;
	}

	//add letter to lettersTyped
	lettersTyped.push(userGuess);
	displayLettersTyped(lettersTyped);

	//check if letter is part of current word
	var letterfound = checkIfGoodGuess(userGuess);

	//if yes, update display of word
	if (letterfound === true) {
		displayComputerGuess(computerGuess, lettersTyped, false);	

	//check if word complete?
	if(displayMask.indexOf('_') === -1){
			//if yes, display you won, increment wins
			wins++;
			document.getElementById("numWinsId").innerHTML= wins;
			gameover=true;
			displayAlert("You guessed correct!!!");
			
			var parentImageDiv = document.getElementById('hangmanimage');
			var c = parentImageDiv.children;
			var image = c[0];
			image.setAttribute('src', 'assets/images/hangwons.gif');

		}
		return;

	}


	document.getElementById("GuessesAllowId").innerHTML= guessesAllowed;

	var parentImageDiv = document.getElementById('hangmanimage');
	var c = parentImageDiv.children;
	var image = c[0];
	
	switch(guessesAllowed){
		case 7: 
		image.setAttribute('src', 'assets/images/hangfrm7.gif');
		break;
		case 6: 
		image.setAttribute('src', 'assets/images/hangfrm6.gif');
		break;
		case 5: 
		image.setAttribute('src', 'assets/images/hangfrm5.gif');
		break;
		case 4: 
		image.setAttribute('src', 'assets/images/hangfrm4.gif');
		break;
		case 3: 
		image.setAttribute('src', 'assets/images/hangfrm3.gif');
		break;
		case 2: 
		image.setAttribute('src', 'assets/images/hangfrm2.gif');
		break;
		case 1: 
		image.setAttribute('src', 'assets/images/hangfrm1.gif');
		break;
		case 0: 
		image.setAttribute('src', 'assets/images/hungmans.gif');
		break;
	}
	
	//decrement guessesAllowed
	guessesAllowed--;

	//check if guesses are remaining
	if(guessesAllowed < 0){
		gameover=true;
		losses++;
		document.getElementById("numLossesId").innerHTML= losses;
		displayComputerGuess(computerGuess, lettersTyped, true);
		displayAlert("Sorry no more tries!!!");
		return;
	}
}