document.addEventListener("DOMContentLoaded", () => {
  const userNameDisplay = document.getElementById("userNameDisplay");
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    userNameDisplay.textContent = savedName;
  }

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

  document.getElementById('printButton').addEventListener('click', () => {
    let printModal = new bootstrap.Modal(document.getElementById('printModal'));
    printModal.show();
  });

  document.getElementById('confirmButton').addEventListener('click', () => {
    let printModal = bootstrap.Modal.getInstance(document.getElementById('printModal'));
    printModal.hide();
    let printerListModal = new bootstrap.Modal(document.getElementById('printerListModal'));
    printerListModal.show();
  });

  document.getElementById('cancelButton').addEventListener('click', () => {
    let printModal = bootstrap.Modal.getInstance(document.getElementById('printModal'));
    printModal.hide();
  });

  document.querySelector('.printer-option').addEventListener('click', (event) => {
    event.preventDefault();
    let printerListModal = bootstrap.Modal.getInstance(document.getElementById('printerListModal'));
    printerListModal.hide();

    // EPSON API 호출
    fetch('http://localhost:5002/print', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gptResponse: localStorage.getItem('gptResponse') })
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          alert('Error: ' + data.error);
        } else {
          let printSuccessModal = new bootstrap.Modal(document.getElementById('printSuccessModal'));
          printSuccessModal.show();
          document.body.classList.remove('modal-open');
          document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        }
      }).catch(error => {
        console.error('Error:', error);
        alert('An error occurred while trying to print.');
      });
  });

  document.querySelector('#printSuccessModal .btn-secondary').addEventListener('click', () => {
    let printSuccessModal = bootstrap.Modal.getInstance(document.getElementById('printSuccessModal'));
    printSuccessModal.hide();
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  });

  // GPT 응답을 가져와서 표시
  const gptResponse = localStorage.getItem('gptResponse');
  if (gptResponse) {
    document.getElementById('todayLearning').innerText = gptResponse;
  }
});
