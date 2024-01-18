let currentQuestionIndex = 0;
let answers = [];
let questions;
let partyScores;

function loadQuestionsAndScores() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data.questions;
      partyScores = data.party_scores;
      loadQuestion(currentQuestionIndex);
    })
    .catch((error) => console.error("Fout bij het laden van data:", error));
}

function createAnswerButtons(options) {
  const buttonsContainer = document.getElementById("answerButtons");
  buttonsContainer.innerHTML = "";

  const optionKeys = ["Eens", "Geen Mening", "Oneens"];

  optionKeys.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.className = option.replace(" ", "");
    button.onclick = function () {
      answerQuestion(options[option]);
    };
    buttonsContainer.appendChild(button);
  });
}

function loadQuestion(index) {
  if (!questions || index >= questions.length) {
    console.error("Vragen zijn niet geladen of index is buiten bereik.");
    return;
  }

  let question = questions[index];
  document.getElementById("questionTitle").innerText = question.question;
  document.getElementById("questionDetail").innerText =
    question.question_detail;
  document.getElementById("currentQuestionNumber").innerText = index + 1;
  document.getElementById("backButton").style.display =
    index === 0 ? "none" : "block";

  createAnswerButtons(question.options);
}

function answerQuestion(answer) {
  answers[currentQuestionIndex] = answer;
  console.log(`Question ${currentQuestionIndex + 1}: ${answer}`);

  if (currentQuestionIndex === questions.length - 1) {
    showContinueOrResultOptions();
  } else {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  }
}

function showContinueOrResultOptions() {
  document.getElementById("questionContainer").style.display = "none";
  document.getElementById("continueOrResult").style.display = "block";
  document.getElementById("backButton").style.display = "none";
}

function continueAnswering() {
  document.getElementById("questionContainer").style.display = "block";
  document.getElementById("continueOrResult").style.display = "none";
  loadQuestion(currentQuestionIndex);
}

function calculateResults() {
  let scores = {};

  for (let party in partyScores) {
    scores[party] = 0;
  }

  let answeredQuestions = 0;

  answers.forEach((userAnswer, index) => {
    if (userAnswer !== null) {
      answeredQuestions++;
      let question = questions[index];
      let questionId = question.stelling_id;

      if (typeof questionId === "object") {
        questionId = questionId.stance;
      }

      for (let party in partyScores) {
        let partyAnswer = partyScores[party][questionId];
        if (partyAnswer === userAnswer.toString()) {
          scores[party] += 1;
        }
      }
    }
  });

  console.log("answeredQuestions:", answeredQuestions);

  for (let party in scores) {
    scores[party] = ((scores[party] / answeredQuestions) * 100).toFixed(2);
    console.log(`scores[${party}]: ${scores[party]}`);
  }

  return scores;
}

function viewResults() {
  let scores = calculateResults();
  displayResults(
    Object.keys(scores)
      .sort((a, b) => scores[b] - scores[a])
      .slice(0, 3),
    scores
  );
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
}

loadQuestionsAndScores();

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  let results = [];

  for (let i = 1; i <= 3; i++) {
    let party = params.get(`party${i}`);
    let percentage = parseFloat(params.get(`percentage${i}`)); // Parse as float
    if (party && !isNaN(percentage)) {
      results.push(`${party}: ${percentage.toFixed(2)}% overeenkomst`);
    }
  }

  return results;
}
function displayResults(topParties, scores) {
  let url = "results.html?";
  topParties.forEach((party, index) => {
    let percentage = ((scores[party] / questions.length) * 100).toFixed(2);
    url += `party${index + 1}=${party}&percentage${index + 1}=${percentage}&`;
  });

  window.location.href = url;
}
