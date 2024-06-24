document.addEventListener('DOMContentLoaded', () => {
  const userNameDisplay = document.getElementById('userNameDisplay');
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    userNameDisplay.textContent = savedName;
  }

  const buttons = {
    homeButton: '/paideia/paideia.html',
    graphButton: '/graph/graph.html',
    progressButton: '/progress/progress.html',
    settingButton: '/set/setting.html',
  };

  for (let [id, url] of Object.entries(buttons)) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = url;
      });
    }
  }
});
