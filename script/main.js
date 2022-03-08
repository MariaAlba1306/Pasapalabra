//Connect Json with HTML

fetch("question.json")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#word").innerText = data.questionA.word;
  });

fetch("question.json")
  .then((response) => response.json())
  .then((data) => {
    document.querySelector("#question").innerText = data.questionA.questions[0];
  });

//Get responses from JSON
function getvals(hi) {
  return fetch("question.json")
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.questionA.response;
    });
}
let correctAnswer;
getvals().then((response) => (correctAnswer = "respuesta es" + response));

console.log(correctAnswer);
//Fill text box
function myFunction() {
  let response = document.getElementById("myText").value;
  if (response === "") {
    (response = "no response"), console.log(correctAnswer);
  } else {
    return response, console.log(response);
  }
}

//Compare both responses
function resultado() {
  if (myFunction() === correctAnswer) {
    console.log("correcto");
  } else {
    console.log("nocorrecto");
  }
}
