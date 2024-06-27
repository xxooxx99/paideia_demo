document.addEventListener("DOMContentLoaded", () => {
  const studentBtn = document.getElementById("studentBtn");
  const adultBtn = document.getElementById("adultBtn");

  if (studentBtn) {
      studentBtn.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = urls.paideiaStudent;
      });
  }

  if (adultBtn) {
      adultBtn.addEventListener("click", (e) => {
          e.preventDefault();
          window.location.href = urls.paideiaAdult;
      });
  }
});
