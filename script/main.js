//Declare global vars for facilitate accesibility
var questions = [];
var actualQuestion;
var actualWord;
var actualResponse;
var StartingQuestion = 0;

fetchQuestions();

function fetchQuestions() {
  //retrieve json question
  fetch("./script/question.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      initValues();
    });
}

function initValues() {
  //refresh global variables
  actualQuestion = questions.question[0].question;
  actualWord = questions.question[0].word;
  actualResponse = questions.question[0].response;

  //set global vars values onto html
  document.querySelector("#word").innerText = actualWord;
  document.querySelector("#question").innerText = actualQuestion;
}

function NextQuestion() {
  var NumberofQuestions = questions.question.length;

  for (var i = 0; i < NumberofQuestions; i++) {
    //refresh global variables
    actualQuestion = questions.question[i].question;
    actualWord = questions.question[i].word;
    actualResponse = questions.question[i].response;
  }
  console.log("value of i : ", i);
  //set global vars values onto html
  document.querySelector("#word").innerText = actualWord;
  document.querySelector("#question").innerText = actualQuestion;
}

//Get user response
function getUserResponse() {
  var response = document.getElementById("myText").value;
  if (response.length > 0) {
    return response;
  }
}

//Compare both responses when clicks
//Appear img if correct/incorrect
var imgCorrect = "correct";
var imgIncorrect = "incorrect";

function checkResults() {
  var userResponse = getUserResponse();
  if (userResponse === actualResponse) {
    console.log("correcto");
    //Appear img if correct/incorrect
    document.querySelector(`#${imgCorrect}`).style.display = "flex";
    document.querySelector(`#${imgIncorrect}`).style.display = "none";
    NextQuestion();
  } else {
    console.log("no correcto o no contestado");
    //Appear img if correct/incorrect
    document.querySelector(`#${imgIncorrect}`).style.display = "flex";
    document.querySelector(`#${imgCorrect}`).style.display = "none";
  }
}
