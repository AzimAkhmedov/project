const authState = {
  user: null,
  isAuth: false,
  location: null,
};

const publicRoutes = ["/", "/pages/registration.html"];
function onMount(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

const getTokens = () => {
  const token = localStorage.getItem("user");
  if (token) {

    const user = JSON.parse(token);

    authState.user = user;
    authState.isAuth = true;

    if (publicRoutes.includes(window.location.pathname)) {
      window.location.href = "/pages/home.html";
    }
  }
};

onMount(getTokens);

async function registerUser(userData) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    response.json().then((data) => {
      console.log(data);
      if (!data.message) {
        console.log(data);
        authState.isAuth = true;
        authState.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "./pages/home.html";
      } else {
        alert(data.message);
      }
    });
  } catch (error) {
    alert(error);
    console.error("Registration failed:", error.response.data);
  }
}

async function loginUser(credentials) {
  try {
    const response = await fetch("http://localhost:8080/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    response.json().then((data) => {
      console.log(data);
      if (!data.message) {
        console.log(data);
        authState.isAuth = true;
        authState.user = data;
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "./pages/home.html";
      } else {
        alert(data.message);
      }
    });
  } catch (error) {
    alert(error);
    console.error("Login failed");
  }
}

function getAuthState() {
  return authState;
}


const logout = () => {
  authState.isAuth = false;
  authState.user = null;
  localStorage.removeItem("user");
  window.location.href = "/";
}

export { registerUser, loginUser, getAuthState, logout };
