// variables to keep track of quiz
var currentQuestionArray = 0;
var time = 75;
var timerId;

// accessing the DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startGame = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");





function startQuiz() {
    // when the start button is clicked
    // this will hide the start screen because it is currently visible
    var startScreenEl = document.getElementById("startScreen");
    startScreenEl.setAttribute("class", "hide");
    // the questions div, which currently has a class of hide will have the class removed to reveal the question
    questionsEl.removeAttribute("class");
    // the time will begin going down by 1 second intervals
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    // this grabs the current question from the array, which is currently at position zero AKA the first question
    var currentQuestion = questions[currentQuestionArray];
    // grabs the div that contains the questions-title id and updates the text content with the title of the current
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    // clear out question previous question's choices
    choicesEl.innerHTML = "";
    // this loops though the various choices and creates a button for each of them
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // add a click event listener to each choice
        choiceNode.onclick = questionClick;

        // append all the choices to the DOM
        choices.appendChild(choiceNode);
    });   
}

function questionClick() {
    // check to see if the if the user's answer does not equal the current question's answer
    // penalize 15 seconds if they are wrong
    if (this.value !== questions[currentQuestionArray].answer) {
        time -= 15;
        // sets the time to 0 once it reaches 0 because it would have continued to run in the negatives
        if (time < 0) {
            time = 0;
        }

        // adjust the time to the above values if the conditions are met
        timerEl.textContent = time;

        feedbackEl.textContent = "WRONG, Airball!";
    } else {
        feedbackEl.textContent = "CORRECT, Score!"
    }
    
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to the next question after a choice is clicked
    currentQuestionArray++;

    // if the questions array ends, the quiz ends. if not get the next question
    if (currentQuestionArray === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stops the clock
    clearInterval(timerId);

    // brings up the end game screen by removing the hide class
    var endScreenEl = document.getElementById("end-screen")
    endScreenEl.removeAttribute("class");

    // shows your final score
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

function saveHighscore() {
    // get entered values and trim white space
    var initials = initialsEl.value.trim();

    //check to see if a value was actually entered
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        // pull left over time and store initials as the new score
        var userScore = {
            score: time,
            initials: initialsEl
        };

        // save the new score to local storage
        highscores.push(userScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // take the user to the next page
        window.location.href = "highscores.html";
    }
}

// once the user hits the 'enter' key run
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// click to submit score
submitBtn.onclick = saveHighscore;

// click to start quiz
startGame.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;