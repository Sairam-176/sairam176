
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");

const resultSummaryContainer = document.querySelector(".result-container");

const resultContainer = document.querySelector(".result-box");

let questionCounter= 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let resultSummary = [];
var correct =0;
var wrong = 0;
//let resultSummaryWrong = [];



//push the questions into Available Questions Array
function setAvailableQuestions(){
	const totalQuestion = quiz.length;
	for(let i=0;i<totalQuestion;i++){
		availableQuestions.push(quiz[i])
	}
}

//Set queestion number and questions and options
function getNewQuestion(){
	//set question number
	questionNumber.innerHTML ="Question " + (questionCounter + 1) +" of "+ quiz.length;
	
	//set question Text
	//get randomquestions
	const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
	
	currentQuestion = questionIndex;
	questionText.innerHTML=currentQuestion.q;
	
	//get the position of QuestionIndex from th availableQuestion Array;
	const index1 = availableQuestions.indexOf(questionIndex); 
	availableQuestions.splice(index1,1);
	//console.log(questionIndex)
	//console.log(availableQuestions)
	//set options
	//get the length of options
	const optionLen = currentQuestion.options.length
	
	//push options into availableOptions Array
	for(let i=0;i<optionLen;i++){
		availableOptions.push(i)
	}
	optionContainer.innerHTML = '';
	let animationDelay = 0.2;
	//create options in Html
	for(let i=0;i<optionLen; i++){
		//random option
		const option1Index = availableOptions[Math.floor(Math.random() * availableOptions.length)];
		//Get the position of optionIndex from the AvailableOptions
		const index2 = availableOptions.indexOf(option1Index);
		// remove the optionIndex from the AvailableOptions , so that the option does not repeat
		availableOptions.splice(index2,1);
		
		
		
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[option1Index];
		option.id = option1Index;
		option.style.animationDelay = animationDelay + 's';
		animationDelay = animationDelay + 0.2;
		option.className= "option";
		optionContainer.appendChild(option)
		option.setAttribute("onclick","getResult(this)");
	}
	
	questionCounter++
	
	
}
//get the result of current attempt question
function getResult(element){
	var answer={};
	const id = parseInt(element.id);
	//get the answer by comparing the id of  clicked option
	
	if(id === currentQuestion.answer){
		correct = correct +1
		element.classList.add("correct");
		answer.q = currentQuestion.q;
		answer.selected = currentQuestion.options[currentQuestion.answer];
		answer.actual = currentQuestion.options[currentQuestion.answer];
		resultSummary.push(answer);
	}
	else{
		wrong = wrong +1;
		
		element.classList.add("correct");
		answer.q = currentQuestion.q;
		answer.selected = currentQuestion.options[id];
		answer.actual = currentQuestion.options[currentQuestion.answer];
		resultSummary.push(answer);
	}
	//console.log(resultSummary);
	unclickableOptions();
}
//make all the options unclikable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
	const optionLen = optionContainer.children.length;
	for(let i=0;i<optionLen;i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function next(){
	if(questionCounter === quiz.length){
		
		
		resultContainer.querySelector(".total-correct").innerHTML = correct;
		resultContainer.querySelector(".total-wrong").innerHTML = wrong;
		resultContainer.querySelector(".total-score").innerHTML = correct;
		
		var x = document.getElementById("quiz")
		x.style.display = "none";
		
		var x = document.getElementById("result")
		 x.style.display = "block";
		console.log("quiz over");
		
		var textTable = document.getElementById("test-results");
		
		var nHTML = '';
		for(let i=0; i< resultSummary.length ;i++){
			
			var ques = "<div class = 'q1'><b>Question : </b>" + resultSummary[i].q + "</br></div>" + "<div class = 'an1'><b>Answer :</b> " + resultSummary[i].selected + "</br></div>" + "<div class = 'an2'><b>Actual Answer : </b>" + resultSummary[i].actual + "</br></div>"
			
			nHTML = nHTML +  '<div>' + ques + '</div> </br>';
		}
		
		textTable.innerHTML = nHTML;
	}
	else{
		getNewQuestion();
	}
}

function startExam(){
	var x = document.getElementById("home")
	x.style.display = "none";
	
	var y = document.getElementById("quiz")
	y.style.display = "block";
	
	getNewQuestion();
}

window.onload=function(){
	//First we will set all Questions in availble Questions Array
	setAvailableQuestions();
	var myJSON = JSON.stringify(availableQuestions);
	console.log(myJSON)
	
	//Second we will call getNewQeuestion(); Function
	//getNewQuestion();
	
}


