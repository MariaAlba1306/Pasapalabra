//Declare global vars for facilitate accesibility
var questions = [];
var actualQuestion;
var actualWord;
var actualResponse;

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
  actualQuestion = questions.question.question
  actualWord = questions.question.word;
  actualResponse = questions.question.response;

  //set global vars values onto html
  document.querySelector("#word").innerText = actualWord
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
function checkResults() {
  var userResponse = getUserResponse();
  if (userResponse === actualResponse) {
    console.log("correcto");
  } else {
    console.log("no correcto o no contestado");
  }
}
