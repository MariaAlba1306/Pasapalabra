//Declare global vars for facilitate accesibility
//JSON values
var questions = [];
var actualQuestion;
var actualWord;
var actualResponse;

//variadito
var startingQuestion = 0;
var startingAnswer = 0;
var endQuestion = 6;

//Images correct/incorrect
var imgCorrect = "correct";
var imgIncorrect = "incorrect";

//Button display
var check = "check";

//Final answers
var correctAnswers = [];
var incorrectAnswers = [];
var nullAnswers = [];

//Round
var round = 1;

//STEPS
//1. Execute the lookup in JSON

fetchQuestions();

// ---> Functions
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
  actualQuestion = questions.question[startingQuestion].question;
  actualWord = questions.question[startingQuestion].word;
  actualResponse = questions.question[startingQuestion].response;

  //set global vars values onto html
  document.querySelector("#word").innerText = actualWord;
  document.querySelector("#question").innerText = actualQuestion;
  questionNumber();
  console.log("pregunta nº ", startingQuestion);
  console.log("respuesta nº ", startingQuestion);

  roundAnswers.push(questions.question[startingAnswer].word);
  console.log(roundAnswers);
}

//2. Get user Response when clicking in send
function getUserResponse() {
  //Get user response
  var response = document.getElementById("myText").value;
  if (response.length > 0) {
    return response.toLowerCase();
  } else {
    return "no_answer";
  }
}

//3. Check user answer with results
function checkResults() {
  //Compare both responses when clicks
  var userResponse = getUserResponse();

  //If user's answer = actualResponse
  if (userResponse === actualResponse) {
    console.log("respuesta: correcto"); //delete this. Added to see

    //Appear img if correct/incorrect
    document.querySelector(`#${imgCorrect}`).style.display = "flex";
    document.querySelector(`#${imgIncorrect}`).style.display = "none";

    //Add number to question count to go to next question
    if (!correctAnswers.includes(questions.question[startingAnswer].word)) {
      correctAnswers.push(questions.question[startingAnswer].word);
    }
    roundAnswers.correctAnswers.push(questions.question[startingAnswer].word);
    console.log(roundAnswers.correctAnswers);
    console.log("correct:", correctAnswers);

    //If user's answer  is blank
  } else if (userResponse === "no_answer") {
    console.log("respuesta:", userResponse);

    //Appear img if correct/incorrect
    document.querySelector(`#${imgIncorrect}`).style.display = "flex";
    document.querySelector(`#${imgCorrect}`).style.display = "none";

    if (!nullAnswers.includes(questions.question[startingAnswer].word)) {
      nullAnswers.push(questions.question[startingAnswer].word);
    }
    console.log("null:", nullAnswers);

    //If user's answer != actualResponse
  } else {
    console.log("respuesta incorrecta:", userResponse);

    if (!incorrectAnswers.includes(questions.question[startingAnswer].word)) {
      incorrectAnswers.push(questions.question[startingAnswer].word);
    }
    console.log("incorrect:", incorrectAnswers);
    //Appear img if correct/incorrect
    document.querySelector(`#${imgIncorrect}`).style.display = "flex";
    document.querySelector(`#${imgCorrect}`).style.display = "none";
  }
  //Delete user's response for next question
  document.getElementById("myText").value = "";

  //Add time for next question
  setTimeout(nextQuestion, 750);

  gatheringresults();
  finalCheck();
}
//4. Goes to next question

function nextQuestion() {
  //Next question functiom
  var NumberofQuestions = questions.question.length;
  questionNumber();
  //Delete img for next question
  document.querySelector(`#${imgCorrect}`).style.display = "none";
  document.querySelector(`#${imgIncorrect}`).style.display = "none";

  actualQuestion = questions.question[startingQuestion].question;
  actualWord = questions.question[startingQuestion].word;
  actualResponse = questions.question[startingQuestion].response;
  //set global vars values onto html
  document.querySelector("#word").innerText = actualWord;
  document.querySelector("#question").innerText = actualQuestion;
}

//FINAL CHECK AND RESTART

function gatheringresults() {
  userResponse = getUserResponse();
  startingQuestion;
  // gathering results
  if (userResponse === actualResponse) {
    startingAnswer++;
    startingQuestion++;
  } else if (userResponse === "no_answer") {
    startingQuestion++;
    startingAnswer++;
  } else {
    startingQuestion++;
    startingAnswer++;
  }
  reload();
  console.log("Pregunta nº ", startingQuestion);
  console.log("respuesta nº ", startingAnswer);
}

function finalCheck() {
  //Number of final results

  console.log("correctas:", correctAnswers);
  console.log("sin respuesta:", nullAnswers);
  console.log("incorrectas:", incorrectAnswers);
  document.querySelector("#responsesok").innerText =
    "correctas:" + correctAnswers;
  document.querySelector("#responsesnull").innerText = "null:" + nullAnswers;
  document.querySelector("#responsesbad").innerText =
    "incorrectas:" + incorrectAnswers;
  document.querySelector("#round").innerText = "round:" + round;
}

function questionNumber() {
  document.querySelector("#questionNumber").innerText = startingQuestion + 1;
}

function reload() {
  if (startingQuestion === endQuestion) {
    startingQuestion = 0;
    startingAnswer = 0;
    round++;
  }
}
