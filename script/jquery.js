//Declare global vars for facilitate accesibility
//User values
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

var userName = $("#name").val();
//STEPS
//1. First screen
$(document).ready(function () {
  $("#buttonName").click(function () {
    $("input:text").val();

    if ($("input:text").val() === "") {
      alert("Por favor, inserta tu nombre, ¡queremos saber quién eres!");
    } else {
      $("#startGame").css("display", "none");
      $("#game").css("display", "block");
      timer();
    }
  });
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
      $(`#${item}`).addClass("item--null");
    } else {
      if (isAllQuestionsAnswered() == false) {
        nextQuestion();
      } else {
        summary();
      }
    }
    //set global vars values onto html
    $("#question").html(actualQuestion);
  }

  //3. Get user Response when clicking in send
  $(".responseButton").click(function () {
    response = $("#myText").val();
    $(`#${item}`).removeClass("item--null");
    $("#myText").val("");
    if (response.length > 0) {
      response.toLowerCase();
    } else {
      response = "no_answer";
    }
    if (response === actualResponse) {
      console.log("correcto");
      questions.question[startingQuestion].result = 1;
      correctAnswers = correctAnswers + 1;
      $(`#${item}`).removeClass("item--null");
      $(`#${item}`).addClass("item--ok");
    } else if (response === "no_answer") {
      questions.question[startingQuestion].result = 0;
      //Change letter color
      nullAnswers = nullAnswers + 1;
    } else {
      $("#correctResponseValue").html(
        "La respuesta correcta es " + actualResponse
      );
      $(`#${item}`).removeClass("item--null");
      $(`#${item}`).addClass("item--failure");
    }
    setTimeout(nextQuestion, 750);
  });
  // ES LO MISMO QUE QUERYSELECTOR PERO SOLO COGE IDS
  //5. Goes to next question || shows actual one
  function reload() {
    startingQuestion = 0;
    round++;
  }
  function nextQuestion() {
    setTimeout($("#correctResponseValue").val(""), 1000);
    if (startingQuestion == endingQuestion - 1) {
      reload();
    } else {
      startingQuestion++;
    }
    showQuestion();
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

  function timer() {
    var fiveMinutes = 60 * 1;
    // $("#time").html(display);
    display = document.querySelector("#time");
    startTimer(fiveMinutes, display);
  }
  function summary() {
    $("#game").css("display", "none");
    $("#modal").css("display", "block");
    $("#welcome").html("Tus resultados, " + userName);
    $("#responsesok").html("Respuestas correctas: " + correctAnswers);
    $("#responsesnull").html("Respuestas vacías: " + nullAnswers);
    $("#responsesbad").html("Respuestas incorrectas: " + incorrectAnswers);
    $("#round").html("Número de rondas: " + round);
  }
});
