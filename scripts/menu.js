import { getAuthState, logout } from "./auth.js";

const menu = document.getElementById("mobile-menu");
const toggleButton = document.getElementById("toggleButton");
const menuOpenedIcon = document.getElementById("menuOpenedIcon");
const menuClosedIcon = document.getElementById("menuClosedIcon");

const dropDownMenu = document.getElementById("user-menu");
const dropDownButton = document.getElementById("user-menu-button");

let isDropDownOpen = false;

const token = localStorage.getItem("auth");

const checkIsAuth = () => {
  isAuth = !!token;
};

const toggleMenu = () => {
  menuClosedIcon.classList.toggle("hidden");
  menuClosedIcon.classList.toggle("block");

  menuOpenedIcon.classList.toggle("hidden");
  menuOpenedIcon.classList.toggle("block");

  menu.classList.toggle("hidden");
  menu.classList.toggle("block");
};

const toggleDropDown = () => {
  dropDownMenu.classList.toggle("hidden");
  dropDownMenu.classList.toggle("block");
};

toggleButton.addEventListener("click", toggleMenu);
dropDownButton.addEventListener("click", toggleDropDown);


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
