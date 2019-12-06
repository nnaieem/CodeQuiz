// variables to keep track of quiz
var currentQuestionArray = 0;
var time = 75;
var timerId;

// accessing the DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startGame = document.getElementById("start")

// accessing the DOM for highscores
// var submitBtn = document.getElementById("submit");
// var initialsEl = document.getElementById("initials");
// var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startScreenEl = document.getElementById("startScreen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerID = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionArray];
    var titleEl = document.getElementById("questions-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choices.appendChild(choiceNode);
    })      
}

function questionClick() {
    if (this.value !== questions[currentQuestionArray].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;

        feedbackEl.textContent = "WRONG, Airball!";
    } else {
        feedbackEl.textContent = "CORRECT, Score!"
    }
    
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    currentQuestionArray++;

    if (currentQuestionArray === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen")
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}
