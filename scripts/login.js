import { loginUser } from "./auth.js";
const passportInput = document.getElementById("passport");
const passwordInput = document.getElementById("password");

const registrationForm = {
  passportNumber: "",
  password: "",
};

passportInput.addEventListener("input", (event) => {
  console.log(event.target.value);
  registrationForm.passportNumber = event.target.value;
});
passwordInput.addEventListener("input", (event) => {
  registrationForm.password = event.target.value;
});

document.getElementById("submit").addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser(registrationForm);
});
