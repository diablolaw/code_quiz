var questionList = [
  {
    question: "Javascript is an _______ language?",
    option: [
      "Object-Oriented",
      "Object-Based",
      "Procedural",
      "None of the above",
    ],
    answer: "Object-Oriented",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    option: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both A and B",
  },
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    option: [
      "getElementById",
      "getElementByClass",
      "Both A and B",
      "None of the above",
    ],
    answer: "Both A and B",
  },
  {
    question:
      "Which of the following methods can be used to display data in some form using Javascript?",
    option: [
      "document.write()",
      "console.log()",
      "window.alert()",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "How can a datatype be declared to be a constant type?",
    option: ["const", "var", "let", "constant"],
    answer: "const",
  },
];

var score = 0;
var i = 0;
var startBtn = document.querySelector("#startBtn");

function countDown() {
  var timeLeft = 180;
  window.timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      var timer = document.getElementById("timer");
      timer.textContent = timeLeft + " seconds remaining";
      timeLeft--;
    } else {
      endGame();
      clearInterval(timeInterval);
    }
  }, 1000);
}

function buildQuestion(i) {
  var question = document.createElement("h1");
  var node = document.createTextNode(questionList[i].question);
  question.appendChild(node);
  var container = document.createElement("div");
  container.setAttribute("id", "container");
  container.appendChild(question);

  for (var j = 0; j < 4; j++) {
    var choice = document.createElement("button");
    var choiceNode = document.createTextNode(questionList[i].option[j]);
    choice.setAttribute("class", "option");
    choice.appendChild(choiceNode);
    container.appendChild(choice);
  }
  var wrapper = document.getElementById("wrapper");
  wrapper.appendChild(container);
}
function answerQuestion() {
  var optionBtn = document.querySelectorAll(".option");
  optionBtn[0].addEventListener("click", function () {
    verifyAnswer(0);
  });
  optionBtn[1].addEventListener("click", function () {
    verifyAnswer(1);
  });
  optionBtn[2].addEventListener("click", function () {
    verifyAnswer(2);
  });
  optionBtn[3].addEventListener("click", function () {
    verifyAnswer(3);
  });
}

function saveScore() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var initial = document.querySelector("#initial");
  var user = {
    initials: initial.value.trim(),
    scores: score,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  var container = document.getElementById("container");
  container.remove();
  var display = document.createElement("div");
  display.setAttribute("class", "container");
  var result = document.createElement("table");
  var header = document.createElement("tr");
  var header1 = document.createElement("h1");
  header1.textContent = "Scores of all players";
  header.appendChild(header1);
  result.appendChild(header);
  users.forEach((e) => {
    var eachUser = document.createElement("tr");
    var userInitial = document.createElement("td");
    userInitial.textContent = e.initials;
    var userScore = document.createElement("td");
    userScore.textContent = e.scores;
    eachUser.appendChild(userInitial);
    eachUser.appendChild(userScore);
    result.appendChild(eachUser);
  });

  display.appendChild(result);
  var wrapper = document.getElementById("wrapper");
  wrapper.appendChild(display);
  console.log(wrapper);
}

function endGame() {
  clearInterval(timeInterval);
  var timer = document.getElementById("timer");
  timer.textContent = "";
  var result = document.createElement("h1");
  var node = document.createTextNode("Your final score is: " + score);
  result.appendChild(node);

  var inputBox = document.createElement("div");
  inputBox.setAttribute("class", "input-group");
  var label = document.createElement("label");
  label.textContent = "Enter Initials: ";
  var initial = document.createElement("input");
  initial.setAttribute("id", "initial");
  var saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.setAttribute("id", "saveBtn");
  inputBox.appendChild(label);
  inputBox.appendChild(initial);
  inputBox.appendChild(saveBtn);

  var container = document.createElement("div");
  container.setAttribute("id", "container");
  container.appendChild(result);
  container.appendChild(inputBox);
  var wrapper = document.getElementById("wrapper");
  wrapper.appendChild(container);

  saveBtn.addEventListener("click", saveScore);
}

function nextQuestion() {
  i++;
  var container = document.getElementById("container");
  container.remove();
  if (i < 5) {
    buildQuestion(i);
    answerQuestion();
  } else {
    endGame();
  }
}

function verifyAnswer(j) {
  var footer = document.createElement("footer");
  var result = document.createElement("p");
  var container = document.getElementById("container");
  if (questionList[i].option[j] === questionList[i].answer) {
    var node = document.createTextNode("Correct!");
    score = score + 20;
  } else {
    var node = document.createTextNode("Wrong!");
  }
  result.appendChild(node);
  footer.appendChild(result);
  container.appendChild(footer);
  setTimeout(nextQuestion, 500);
}

function startGame() {
  countDown();
  var startPage = document.getElementById("start-page");
  startPage.remove();
  buildQuestion(0);
  answerQuestion();
}
startBtn.addEventListener("click", startGame);
