//Declare global vars for facilitate accesibility
//User values
var userName;
//JSON values
var questions = [];
var actualQuestion;
var actualWord;
var actualResponse;
var actualResult;

//  Question values
var startingQuestion = 0;
var endingQuestion;

//  Letters
var item = "item";

//Final answers
var round = 1;
var incorrectAnswers = 0;
var nullAnswers = 0;
var correctAnswers = 0;

//STEPS
//1. First screen
function InitialModal() {
  userName = document.getElementById("name").value;
  if (userName == "") {
    alert("Por favor, inserta tu nombre, ¡queremos saber quién eres!");
  } else {
    document.querySelector("#startGame").style.display = "none";
    document.querySelector("#game").style.display = "block";
  }
}
//2. Execute the lookup in JSON
fetchQuestions();
function fetchQuestions() {
  //retrieve json question
  fetch("./script/question.json")
    .then((response) => response.json(), { mode: "cors" })
    .then((data) => {
      questions = data;
      showQuestion();
    });
}

//3. Get user Response when clicking in send
function getUserResponse() {
  //Get user response
  var response = document.getElementById("myText").value;
  if (response.length > 0) {
    return response.toLowerCase();
  } else {
    return "no_answer";
  }
}
//4. Check user answer with results
function checkResults() {
  //Compare both responses when clicks
  var userResponse = getUserResponse();
  //If user's answer = actualResponse
  if (userResponse === actualResponse) {
    correctResponse();
    //If user's answer  is blank
  } else if (userResponse === "no_answer") {
    blankResponse();
    //If user's answer != actualResponse
  } else {
    incorrectResponse();
    document.querySelector("#correctResponseValue").innerText =
      "La respuesta correcta es " + actualResponse;
  }
  //Delete user's response for next question and change color
  changeColor();
  document.getElementById("myText").value = ""; // ES LO MISMO QUE QUERYSELECTOR PERO SOLO COGE IDS
  document.querySelector(`#${item}`).classList.remove("item--null");

  //Add time for next question
  setTimeout(nextQuestion, 750);
}
function correctResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 1;
  correctAnswers = correctAnswers + 1;
}
function blankResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 0;
  //Change letter color
  nullAnswers = nullAnswers + 1;
}
function incorrectResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 2;
  //Change letter color
  incorrectAnswers = incorrectAnswers + 1;
}
//5. Goes to next question || shows actual one
function reload() {
  startingQuestion = 0;
  round++;
}
function changeColor() {
  if (questions.question[startingQuestion].result == 2) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--failure");
  } else if (questions.question[startingQuestion].result == 1) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--ok");
  } else {
  }
}

function nextQuestion() {
  setTimeout(
    (document.querySelector("#correctResponseValue").innerText = ""),
    1000
  );
  if (startingQuestion == endingQuestion - 1) {
    reload();
  } else {
    startingQuestion++;
  }
  showQuestion();
}
function showQuestion() {
  actualResult = questions.question[startingQuestion].result;
  endingQuestion = questions.question.length;
  isAllQuestionsAnswered();
  if (actualResult == 0) {
    // Next question functiom
    actualQuestion = questions.question[startingQuestion].question;
    actualWord = questions.question[startingQuestion].word;
    actualResponse = questions.question[startingQuestion].response;
    item = "item" + questions.question[startingQuestion].word;
    document.querySelector(`#${item}`).classList.add("item--null");
  } else {
    if (isAllQuestionsAnswered() == false) {
      nextQuestion();
    } else {
      summary();
    }
  }
  //set global vars values onto html
  document.querySelector("#question").innerText = actualQuestion;
}
function isAllQuestionsAnswered() {
  var answeredQuestion = questions.question.filter(function (question) {
    return question.result != 0;
  });
  // answeredQuestion == completed responses
  if (answeredQuestion.length == endingQuestion) {
    return true;
  } else {
    return false;
  }
}

//Timer
function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      summary();
      // timer = 0;
    }
  }, 1000);
}

window.onload = function () {
  var fiveMinutes = 60 * 10,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

//6. Final screen
function summary() {
  document.querySelector("#welcome").innerText = "Tus resultados, " + userName;
  document.querySelector("#game").style.display = "none";
  document.querySelector("#modal").style.display = "block";
  document.querySelector("#responsesok").innerText =
    "Respuestas correctas: " + correctAnswers;
  document.querySelector("#responsesnull").innerText =
    "Respuestas vacías: " + nullAnswers;
  document.querySelector("#responsesbad").innerText =
    "Respuestas incorrectas: " + incorrectAnswers;
  document.querySelector("#round").innerText = "Número de rondas:" + round;
}

function restart() {
  document.location.reload(true);
}
