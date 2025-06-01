/*all variable */
const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

const firstName = document.querySelector("#f-name");
const lastName = document.querySelector("#l-name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const btnSignUp = document.querySelector("#btnSignUp");

const newUser = {
  firstName: firstName.value,
  lastName: lastName.value,
  email: email.value,
  password: password.value,
};

btnSignUp.addEventListener("click", function (e) {
  e.preventDefault();

  const newUser = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  if (validateForm(newUser)) {
    createUser(newUser);
  }
});

/*date of birth*/
/*    dayes    */
function dayes() {
  for (let i = 1; i <= 31; i++) {
    const optionDay = document.createElement("option");
    optionDay.value = i;
    optionDay.textContent = i;
    daySelect.appendChild(optionDay);
  }
}

/*    month    */
function months() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach(function (month, index) {
    const optionMonth = document.createElement("option");
    optionMonth.value = index + 1;
    optionMonth.textContent = month;
    monthSelect.appendChild(optionMonth);
  });
}
/*    year    */
function years() {
  const currentYear = 2025;
  for (let i = currentYear; i >= 1950; i--) {
    const optionYear = document.createElement("option");
    optionYear.value = i;
    optionYear.textContent = i;
    yearSelect.appendChild(optionYear);
  }
}

/*create users */
async function createUser(userData) {
  try {
    const res = await fetch(
      "https://legendary-spring-archeology.glitch.me/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (res.ok) {
      clearForm();
      window.location.href = "../index.html";
    }
  } catch (err) {
    alert("error");
  }
}
/*clear function */
function clearForm() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
}

/*validation */
function validateForm(user) {
  const { firstName, lastName, email, password } = user;

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all required fields.");
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return false;
  }

  return true;
}

/*birth date call */
months();
dayes();
years();
