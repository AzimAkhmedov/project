import { getAuthState, logout } from "./auth.js";

const userProfile = document.querySelectorAll('p[name="user-profile"]');

const search = document.getElementById("search");

const logoutButton = document.querySelectorAll('button[name="logout"');
userProfile.forEach((e) => {
  e.innerHTML = getAuthState().user.fullname;
});
logoutButton.forEach((e) => {
  e.addEventListener("click", () => {
    logout();
  });
});

