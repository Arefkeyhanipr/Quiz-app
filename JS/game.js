//Variables
import formatData from "./helper.js";

const url =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData = null;

const loader = document.getElementById("loader");

const container = document.getElementById("container");

const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");

let questinIndex = 0;
let correctAnswer = null;
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
  const { question, answers, correctAnswerIndex } = formattedData[questinIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

//Event listeners
window.addEventListener("load", fetchData);
