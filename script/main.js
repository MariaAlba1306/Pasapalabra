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
function sum() {
  StartingQuestion++;
  console.log(StartingQuestion);
}
function NextQuestion() {
  var NumberofQuestions = questions.question.length;
  StartingQuestion;
  document.querySelector(`#${imgCorrect}`).style.display = "none";
  document.querySelector(`#${imgIncorrect}`).style.display = "none";

  //refresh global variables
  actualQuestion = questions.question[StartingQuestion].question;
  actualWord = questions.question[StartingQuestion].word;
  actualResponse = questions.question[StartingQuestion].response;
  document.querySelector("#word").innerText = actualWord;
  document.querySelector("#question").innerText = actualQuestion;

  //set global vars values onto html
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
    document.getElementById("myText").value = "";
    sum();
    setTimeout(NextQuestion, 750);
  } else {
    console.log("no correcto o no contestado");
    //Appear img if correct/incorrect
    document.querySelector(`#${imgIncorrect}`).style.display = "flex";
    document.querySelector(`#${imgCorrect}`).style.display = "none";
    document.getElementById("myText").value = "";
  }
}
