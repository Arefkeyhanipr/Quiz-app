import formatData from "./helper.js";

const url =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formattedData = null;
const loader = document.getElementById("loader");
const container = document.getElementById("container");

const fetchData = async () => {
  const response = await fetch(url);
  const json = await response.json();
  formattedData = formatData(json.results);
  formatData(json.results);
  start();
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
