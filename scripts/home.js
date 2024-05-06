import { getAuthState, logout } from "./auth.js";

const userProfile = document.querySelectorAll('p[name="user-profile"]');
const admin = document.getElementById("admin-panel");
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

admin.innerHTML = getAuthState().user.role === "Admin" ? "Admin Panel" : "";

admin.addEventListener("click", () => {
    if (getAuthState().user.role === "Admin") {
        window.location.href = "/pages/admin.html";
    }
})