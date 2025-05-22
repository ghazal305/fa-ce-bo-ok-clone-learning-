/*all variable */
const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");

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

months();
dayes();
years();
