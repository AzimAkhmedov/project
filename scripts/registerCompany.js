import { getAuthState } from "./auth.js";

const companyName = document.getElementById("companyName");
const country = document.getElementById("country");
const form = document.getElementById("submit");
const companyState = {
  companyName: "",
  countryId: "",
  countries: [],
};

const getCompanyId = () => {
  const company_id = localStorage.getItem("company_id");
  if (company_id) {
    window.location.href = "./admin.html";
  }
};
function onMount(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

const fetchCountries = async () => {
  const response = await fetch("http://localhost:8080/api/v1/countries", {
    method: "GET",
  });
  const data = await response.json();
  if (!data.message) {
    companyState.countries = data;
    renderOptions();
  }
};

const renderOptions = () => {
  companyState.countries.forEach((el) => {
    const option = document.createElement("option");
    option.value = el.country_id;
    option.innerHTML = el.countryName;
    country.appendChild(option);
  });
};

const addEmployee = async (companyID, userId) => {
  const response = await fetch("http://localhost:8080/api/v1/add_employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyID: companyID,
      userID: userId,
    }),
  });
  const data = await response.json();
  if (!data.message) {
    window.location.href = "./admin.html";
  }
};

const registerCompany = async () => {
  const response = await fetch("http://localhost:8080/api/v1/add_company", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName: companyState.companyName,
      countryID: +companyState.countryId,
    }),
  });
  const data = await response.json();

  if (data.company_id) {
    localStorage.setItem("company_id", data.company_id);
    await addEmployee(data.company_id, getAuthState().user.id);
  }
};

fetchCountries();

country.addEventListener("change", (e) => {
  companyState.countryId = e.target.value;
});

companyName.addEventListener("input", (e) => {
  companyState.companyName = e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  registerCompany();
});

onMount(getCompanyId);