import { registerUser } from "./auth.js";
const passportInput = document.getElementById("passport");
const passwordInput = document.getElementById("password");
const fullnameInput = document.getElementById("fullname");
const citizenshipInput = document.getElementById("citizenship");
const passwordRepeatInput = document.getElementById("password-check");
const registrationForm = {
  passportNumber: "",
  password: "",
  citizenship: "",
  fullname: "",
  role: "User",
};
let passwordCheck = "";
passportInput.addEventListener("input", (event) => {
  registrationForm.passportNumber = event.target.value;
});
passwordInput.addEventListener("input", (event) => {
  registrationForm.password = event.target.value;
});
fullnameInput.addEventListener("input", (event) => {
  registrationForm.fullname = event.target.value;
});
citizenshipInput.addEventListener("input", (event) => {
  registrationForm.citizenship = event.target.value;
});
passwordRepeatInput.addEventListener("input", (event) => {
  passwordCheck = event.target.value;
});

document.getElementById("submit").addEventListener("submit", (e) => {
  e.preventDefault();
  if (registrationForm.password !== passwordCheck) {
    alert("Passwords do not match");
    return;
  }
  if (registrationForm.password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  }
  registerUser(registrationForm);
});
