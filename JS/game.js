const url =
  "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
let formatedData = null;
const loader = document.getElementById("loader");
const container = document.getElementById("container");

const fetchData = async () => {
  const response = await fetch(url);
  const json = await response.json();
  formatedData = json;
  start();
};

const start = () => {
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
