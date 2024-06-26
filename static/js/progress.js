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
});
