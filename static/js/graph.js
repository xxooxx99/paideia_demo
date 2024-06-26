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
});
