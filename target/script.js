//Shuffling function

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    	array[currentIndex] = array[randomIndex];
    	array[randomIndex] = temporaryValue;
	}

	return array;
}

//Get the shuffled statements

var statements = shuffle(JSON.parse(originalStats));

//Setup values

var statNum = 0;
const statNumElement = document.getElementById("statement_num");
const statTextElement = document.getElementById("statement_text");

var scores = [0, 0, 0];
var balansers = [0, 0, 0];

//User clicks button to begin

function beginQuiz() {
	document.getElementById("instructions").style.display = "none";
	document.getElementById("statement").style.display = "block";

	statTextElement.innerHTML = statements[statNum];
}

//User reacts neutrally

function noReact() {
	var origNum = JSON.parse(originalStats).indexOf(statements[statNum]);
	var segment = Math.floor(3 * (statNum / statements.length));

	balansers[segment] += 0.05;

	statNum ++;

	if (statNum >= 30) {
		getScores();
	} else {
		statNumElement.innerHTML = "Statement " + (statNum + 1) + " of 30";
		statTextElement.innerHTML = statements[statNum];
	}
}

//User does not react neutrally

function react(reaction) {
	var origNum = JSON.parse(originalStats).indexOf(statements[statNum]);

	if (origNum < 5) {
		scores[0] -= reaction;
	} else if (origNum >= 5 && origNum < 10) {
		scores[0] += reaction;
	} else if (origNum >= 10 && origNum < 15) {
		scores[1] -= reaction;
	} else if (origNum >= 15 && origNum < 20) {
		scores[1] += reaction;
	} else if (origNum >= 20 && origNum < 25) {
		scores[2] -= reaction;
	} else if (origNum >= 25 && origNum < 30) {
		scores[2] += reaction;
	}

	statNum ++;

	if (statNum >= 30) {
		getScores();
	} else {
		statNumElement.innerHTML = "Statement " + (statNum + 1) + " of 30";
		statTextElement.innerHTML = statements[statNum];
	}
}

//Getting the final scores

function getScores() {
	for (var i = 0; i < scores.length; i ++) {
		scores[i] -= scores[i] * balansers[i];
	}

	var scoreHues = [
		120 * ((scores[0] + 20) / 40),
		120 * ((scores[1] + 20) / 40) + 120,
		120 * ((scores[2] + 20) / 40) + 240
	];

	var econColor = "hsl(" + scoreHues[0] + ", 100%, 30%)";
	var econElement = document.getElementById("econ");
	econElement.style.background = econColor;
	econElement.innerHTML = "Economy: " + scores[0]
	document.getElementById("outer").style.fill = econColor;

	var libColor = "hsl(" + scoreHues[1] + ", 100%, 30%)";
	var libElement = document.getElementById("lib");
	libElement.style.background = libColor;
	libElement.innerHTML = "Liberty: " + scores[1];
	document.getElementById("middle").style.fill = libColor;

	var socColor = "hsl(" + scoreHues[2] + ", 100%, 30%)";
	var socElement = document.getElementById("soc");
	socElement.style.background = socColor;
	socElement.innerHTML = "Society: " + scores[2];
	document.getElementById("inner").style.fill = socColor;

	alert(scores);
	document.getElementById("statement").style.display = "none";
	document.getElementById("target").style.display = "block";
}