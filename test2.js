//Declare global vars for facilitate accesibility
//JSON values
var questions = [];
var question;
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
// var incorrectAnswers = play.responses[0].incorrectAnswers;
// var nullAnswers = play.responses[0].nullAnswers;

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

  // var filteredResults = questions.filter(function (entry) {
  //   entry.question.word == "A";
  // });
  // console.log(filteredResults);
}
function initValues() {
  //refresh global variables
  document.querySelector("#welcome").innerText = "Bienvenido" + userName;

  actualQuestion = questions.question[startingQuestion].question;
  actualWord = questions.question[startingQuestion].word;
  actualResponse = questions.question[startingQuestion].response;
  actualResult = questions.question[startingQuestion].result;
  question = questions.question;

  endingQuestion = questions.question.length;

  item = "item" + questions.question[startingQuestion].word;

  //set global vars values onto html
  document.querySelector("#question").innerText = actualQuestion;

  //roundAnswers.push(questions.question[startingQuestion].word);
  //console.log(roundAnswers);
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
  //Add time for next question
  setTimeout(nextQuestion, 750);
  summary();
}
function correctResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 1;
  //Change letter color

  //document
  // .querySelector(".circle .item")
  // .eq(questions.question[startingQuestion].word)
  //  .addClass("item--failure");

  //Add number to question count to go to next question
}
function blankResponse() {
  getUserResponse();
  //  questions.question[startingQuestion].result = 0;
  questions.question[startingQuestion].result = 0;
  //Change letter color
}
function incorrectResponse() {
  getUserResponse();
  questions.question[startingQuestion].result = 2;
  //Change letter color
}

//4. Goes to next question
function reload() {
  round++;
  startingQuestion = 0;
  actualResult = questions.question[startingQuestion].result;

  question.forEach((question) => {
    console.log(question);
  });
}
function changeColor() {
  if (questions.question[startingQuestion].result == 2) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--failure");
  } else if (questions.question[startingQuestion].result == 1) {
    document.querySelector(`#${item}`).classList.remove("item");
    document.querySelector(`#${item}`).classList.add("item--ok");
  } else {
    document.querySelector(`#${item}`).classList.remove("item-null");
    document.querySelector(`#${item}`).classList.add("item--null");
  }
}

function showQuestion() {
  console.log("Hi");
  actualQuestion = questions.question[startingQuestion].question;
  actualWord = questions.question[startingQuestion].word;
  actualResponse = questions.question[startingQuestion].response;
  item = "item" + questions.question[startingQuestion].word;
  //set global vars values onto html
  document.querySelector("#question").innerText = actualQuestion;
}
function showNextQuestion() {
  if (startingQuestion > questions.length - 1) {
    startingQuestion = 0;
  }
  startingQuestion = 0;
  console.log(questions.question[startingQuestion].result);
  if (questions.question[startingQuestion].result != 1) {
    showQuestion();
  } else {
    startingQuestion++;
    var remainingWords = questions.question.filter((result) => result == 0);
  }
  showNextQuestion;
}
function nextQuestion() {
  if (startingQuestion == endingQuestion - 1) {
    reload();
  }
  if (
    questions.question[startingQuestion].result != 1 ||
    questions.question[startingQuestion].result != 2
  ) {
  } else {
    startingQuestion++;
    var remainingWords = questions.filter((question) => question.result == 0);
    nextQuestion();
  }
  // question.forEach((question) => {
  //   if (question.result > 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });
  // if (question == true) {
  //   startingQuestion;
  // } else {
  //   startingQuestion++;
  // }
  // startingQuestion++;
  // actualResult = questions.question[startingQuestion + 1].result;

  // if (actualResult == 0) {
  //   startingQuestion;
  // } else {
  //   startingQuestion + 1;
  // }

  actualQuestion = questions.question[startingQuestion].question;
  actualWord = questions.question[startingQuestion].word;
  actualResponse = questions.question[startingQuestion].response;
  item = "item" + questions.question[startingQuestion].word;
  //set global vars values onto html
  document.querySelector("#question").innerText = actualQuestion;
}
//FINAL CHECK AND RESTART

function summary() {
  //Number of final results
  // document.querySelector("#responsesok").innerText =
  //   "correctas:" + correctAnswers;
  // document.querySelector("#responsesnull").innerText = "null:" + nullAnswers;
  // document.querySelector("#responsesbad").innerText =
  //   "incorrectas:" + incorrectAnswers;
  // document.querySelector("#round").innerText = "round:" + round;
  // console.log(questions.question);
}
var resultados = [
  {
    word: "A",
    test: 3,
  },
  {
    word: "B",
    test: 1,
  },
  {
    word: "C",
    test: 0,
  },
];
var contador = 0;
var test = resultados[contador].test;
var final = resultados[contador].word;

// function hi() {
//   resultados.forEach(function (resultado) {
//     if (resultado.test > 0) {
//       contador++;
//       console.log(final);
//       console.log(contador);
//     } else {
//       contador;
//     }
//   });
// }

// function createSomeCards() {
//   //Foreach
//   console.log(test);
//   if (test == 0) {
//     contador;
//   } else {
//     contador++;
//   }
//   forEach (i = 0; i < 6; i++) {
//     console.log(test);
//   }
// }
