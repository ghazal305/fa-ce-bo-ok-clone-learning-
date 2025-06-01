const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser) {
  window.location.href = "../index.html";
}

userName.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "../index.html";
});
