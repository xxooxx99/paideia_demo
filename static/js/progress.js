document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    homeButton: urls.homeButton,
    graphButton: urls.graphButton,
    progressButton: urls.progressButton,
    settingButton: urls.settingButton,
  };

  for (let [id, url] of Object.entries(buttons)) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = url;
      });
    }
  }

  const todayDetails = document.getElementById("todayDetails");
  const todayLearning = document.getElementById("todayLearning");
  const todayQuiz = document.getElementById("todayQuiz");
  const quizToggle = document.getElementById("quiz");

  todayLearning.style.display = "block";
  todayQuiz.style.display = "none";

  if (todayDetails) {
    todayDetails.addEventListener("toggle", () => {
      if (todayDetails.open) {
        todayLearning.style.display = "block";
      } else {
        todayLearning.style.display = "none";
        todayQuiz.style.display = "none"; // 퀴즈 내용도 숨기기
      }
    });
  }
  if (todayQuiz) {
    const quizContent = todayQuiz.textContent;
    const quizLines = quizContent.split("\n");
    let formattedQuiz = "";
    for (let line of quizLines) {
      if (line.startsWith("Question:")) {
        formattedQuiz += `<strong>${line}</strong><br>`;
      } else if (line.startsWith("Answer:")) {
        formattedQuiz += `${line}<br><br>`;
      }
    }
    todayQuiz.innerHTML = formattedQuiz;
  }

  if (quizToggle) {
    quizToggle.addEventListener("click", () => {
      todayLearning.style.display = "none";
      todayQuiz.style.display = "block";
    });
  }

  async function fetchLearningData() {
    try {
      const response = await fetch("http://localhost:5001/api/learning_data");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      displayLearningData(data.learning_data);
    } catch (error) {
      console.error("Error fetching learning data:", error);
    }
  }

  async function fetchArticles(learningDataId) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/articles/${learningDataId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  function displayLearningData(learningData) {
    const container = document.getElementById("learning-data");
    container.innerHTML = "<h2>Learning Data</h2>";
    learningData.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = `ID: ${item.id}, Topic: ${item.topic}, Created At: ${item.created_at}`;
      div.style.cursor = "pointer";
      div.onclick = () => fetchArticles(item.id);
      container.appendChild(div);
    });
  }

  function displayArticles(articles) {
    const container = document.getElementById("articles");
    container.innerHTML = "<h2>Articles</h2>";
    articles.forEach((article) => {
      const div = document.createElement("div");
      div.textContent = article.content;
      container.appendChild(div);
    });
  }

  // Fetch and display learning data on page load
  fetchLearningData();
});
