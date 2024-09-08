//Variables
import formatData from "./helper.js";

const level = localStorage.getItem("level") || "easy";

const url = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;

const correctBonus = 1;
const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const allEndingBtns = document.querySelector("#ending-buttons");
const nextBtn = document.querySelector("#next-button");
const finishBtn = document.querySelector("#finish-button");
const questionNum = document.querySelector("#question-number");

let questinIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;
//functions

const fetchData = async () => {
  const response = await fetch(url);
  const json = await response.json();
  formattedData = formatData(json.results);
  formatData(json.results);
  start();
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNum.innerText = questinIndex + 1;
  const { question, answers, correctAnswerIndex } = formattedData[questinIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  const isCorrect = index === correctAnswer ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += correctBonus;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questinIndex++;

  if (questinIndex === formattedData.length - 1) {
    nextBtn.classList.add("endGame");
    finishBtn.style.display = "none";
    nextBtn.innerText = "See the result";
    allEndingBtns.style.justifyContent = "center";
  }

  if (questinIndex < formattedData.length) {
    isAccepted = true;
    removeClasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("result.html");
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

//Event listeners

window.addEventListener("load", fetchData);

nextBtn.addEventListener("click", nextHandler);

finishBtn.addEventListener("click", finishHandler);

answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
