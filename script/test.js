//Declare global vars for facilitate accesibility
//User values
var userName;
//JSON values
var questions = [];
var actualQuestion;
var actualWord;
var actualResponse;
var actualResult;
var restantQuestion;
var pregunta;

//variadito
var startingQuestion = 0;
var numberOfQuestions;
var endingQuestion;

//Images correct/incorrect
var imgCorrect = "correct";
var imgIncorrect = "incorrect";
var item = "item";
var wordResult = "wordResult";
//Button display
var check = "check";

//Round
var round = 1;
//Final answers
var incorrectAnswers = 0;
var nullAnswers = 0;
var correctAnswers = 0;

//STEPS
function InitialModal() {
  userName = document.getElementById("name").value;
  if (userName == "") {
    alert("Nombre obligatorio");
  } else {
    document.querySelector("#startGame").style.display = "none";
    document.querySelector("#game").style.display = "block";
  }
  document.querySelector("#welcome").innerText = "Bienvenido, " + userName;
}

//1. Execute the lookup in JSON
fetchQuestions();
// ---> Functions
function fetchQuestions() {
  //retrieve json question
  fetch("./script/question.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      showQuestion();
    });

  // var filteredResults = questions.filter(function (entry) {
  //   entry.question.word == "A";
  // });
  // console.log(filteredResults);
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
    correctResponse();
    //If user's answer  is blank
  } else if (userResponse === "no_answer") {
    blankResponse();
    //If user's answer != actualResponse
  } else {
    incorrectResponse();
  }
  //Delete user's response for next question
  changeColor();
  document.getElementById("myText").value = "";
  document.querySelector(`#${item}`).classList.remove("item--null");

  //Add time for next question
  setTimeout(nextQuestion, 750);
}
function correctResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 1;
  correctAnswers = correctAnswers + 1;

  //Change letter color

  //document
  // .querySelector(".circle .item")
  // .eq(questions.question[startingQuestion].word)
  //  .addClass("item--failure");

  //Add number to question count to go to next question
}
function blankResponse() {
  console.log(startingQuestion);
  getUserResponse();
  //  questions.question[startingQuestion].result = 0;
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

//4. Goes to next question
function reload() {
  // if (isAllQuestionsAnswered() == false) {
  startingQuestion = 0;
  round++;
  // } else {
  //   document.querySelector("#game").style.display = "none";
  //   document.querySelector("#modal").style.display = "block";
  //   summary();
  // }
}
function changeColor() {
  if (questions.question[startingQuestion].result == 2) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--failure");
  } else if (questions.question[startingQuestion].result == 1) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--ok");
  } else {
    // document.querySelector(`#${item}`).classList.remove("item-null");
    // document.querySelector(`#${item}`).classList.add("item--null");
  }
}

function nextQuestion() {
  if (startingQuestion == endingQuestion - 1) {
    reload();
  } else {
    startingQuestion++;
    console.log(`#${item}`);
  }
  showQuestion();
}
function showQuestion() {
  console.log(startingQuestion);
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

//FINAL CHECK AND RESTART
function isAllQuestionsAnswered() {
  var answeredQuestion = questions.question.filter(function (question) {
    return question.result != 0;
  });
  console.log(answeredQuestion.length);
  // answeredQuestion == completed responses
  if (answeredQuestion.length == endingQuestion) {
    return true;
  } else {
    return false;
  }
}
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
  var fiveMinutes = 60 * 1,
    display = document.querySelector("#time");
  startTimer(fiveMinutes, display);
};

function summary() {
  document.querySelector("#game").style.display = "none";
  document.querySelector("#modal").style.display = "block";

  document.querySelector("#responsesok").innerText =
    "correctas:" + correctAnswers;
  document.querySelector("#responsesnull").innerText = "null:" + nullAnswers;
  document.querySelector("#responsesbad").innerText =
    "incorrectas:" + incorrectAnswers;
  document.querySelector("#round").innerText = "round:" + round;
}
