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

  async function fetchArticles(learningDataId) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/articles/${learningDataId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched articles:", data.articles);
      displayArticles(data.articles, learningDataId);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  async function fetchLearningData() {
    try {
      const response = await fetch("http://localhost:5001/api/learning_data");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched learning data:", data.learning_data);
      const limitedData = data.learning_data.slice(0, 5);
      displayLearningData(limitedData);
    } catch (error) {
      console.error("Error fetching learning data:", error);
    }
  }

  function displayLearningData(learningData) {
    const container = document.getElementById("accordionExample");
    if (!container) {
      console.error("Accordion container not found");
      return;
    }
    container.innerHTML = ""; // Clear existing content
    learningData.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "accordion-item";

      div.innerHTML = `
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}" aria-expanded="false"
                    aria-controls="collapse${index}">
                    ${item.topic} (ID: ${item.id}, Created At: ${item.created_at})
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div id="articles-${item.id}">Loading articles...</div>
                </div>
            </div>
        `;

      container.appendChild(div);

      const button = div.querySelector(".accordion-button");
      if (button) {
        button.addEventListener("click", () => {
          console.log(
            `Accordion button clicked for learningDataId: ${item.id}`
          );
          fetchArticles(item.id);
        });
      } else {
        console.error("Accordion button not found:", button);
      }
    });
  }

  function displayArticles(articles, learningDataId) {
    const container = document.getElementById(`articles-${learningDataId}`);
    if (container) {
      container.innerHTML = "";
      articles.forEach((article) => {
        const div = document.createElement("div");
        div.textContent = article.content;
        container.appendChild(div);
      });
    } else {
      console.error(
        `Container not found for learningDataId: ${learningDataId}`
      );
    }
  }

  fetchLearningData();
});
