const email = document.querySelector("#email");
const password = document.querySelector("#password");
const btnSignIn = document.querySelector("#btnSignIn");

btnSignIn.addEventListener("click", function (e) {
  e.preventDefault();
  signInUser();
});

async function signInUser() {
  const userEmail = email.value.trim();
  const userPassword = password.value.trim();

  if (!validateLoginForm(userEmail, userPassword)) {
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/users?email=${userEmail}&password=${userPassword}`
    );
    const users = await res.json();

    if (users.length > 0) {
      localStorage.setItem("loggedInUser", JSON.stringify(users[0]));
      window.location.href = "pages/home.html";
    } else {
      alert("Incorrect email or password.");
    }
  } catch (err) {
    alert("Something went wrong. Try again later.");
  }
}

/*validation */
function validateLoginForm(email, password) {
  if (!email || !password) {
    alert("Please fill in both email and password.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}
