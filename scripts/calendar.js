const calendarItems = document.querySelectorAll("time");

const calendarArrowLeft = document.getElementById("calendar-arrow-left");
const calendarArrowRight = document.getElementById("calendar-arrow-right");
const dateLabel = document.getElementById("date-label");
const flightContainer = document.getElementById("flights-container");

const schedule = document.getElementById("schedule");
dateLabel.innerHTML = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});
const calendarState = {
  shownDate: new Date(),
  selectedDate: new Date(),
  cities: [],
  flights: [],
};

const getState = () => calendarState;
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let yearNum = document.getElementById("yearNum");

let calendarArray = [];
// function renderMonths() {
//   allMonths.forEach(function (month, i) {
//     let months = document.querySelector(".months");
//     let monthSpan = document.createElement("span");

//     monthSpan.className = "each-month";
//     monthSpan.id = i + 1;
//     monthSpan.innerHTML = ` ${month} `;
//     months.append(monthSpan);

//     monthSpan.addEventListener("click", function (e) {
//       if (document.querySelector(".hidden-p")) {
//         let sel = document.querySelector(".selected");
//         sel.className = "each-month";
//       }
//       e.target.className = "selected";
//       let newp = document.createElement("p");
//       newp.className = "hidden-p";
//       newp.hidden = true;
//       monthSpan.append(newp);
//     });

//     document.addEventListener("click", function (e) {
//       if (e.target.className === "selected") {
//         e.preventDefault();
//         currentMonth = e.target.id - 1;
//         currentYear = currentYear;
//         renderCalendar(currentMonth, currentYear);
//       }
//     });
//   });
// }

let calendarTable = document.getElementById("calendar-body");
let dateTimeButtons = [];
const dayMarkup = (day, datetime) =>
  `
<div class="py-2">
<button
  name="date-time"
  type="button"
  value="${datetime}"
  class="mx-auto flex h-8 w-8 items-center ${
    new Date().toISOString().split("T")[0] === datetime ? "font-semibold" : ""
  } ${
    calendarState.selectedDate.toISOString().split("T")[0] === datetime
      ? " bg-gray-900 font-semibold text-white"
      : "hover:bg-gray-200"
  } justify-center rounded-full text-gray-400 "
>
  <time name="date-time" datetime="${datetime}">${day}</time>
</button>
</div>`;

function flightMarkUp(flight) {
  console.log(getState());
  const destination = calendarState.cities.find(
    (e) => e.city_id === flight.destinationID
  )?.cityName;
  const origin = calendarState.cities.find(
    (e) => e.city_id === flight.originID
  )?.cityName;
  return `<li
    class="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
  >
    <div class="flex-auto">
      <p class="text-gray-900">${origin} - ${destination}</p>
      <p class="mt-0.5">
        <time datetime="2022-01-21T13:00">${new Date(
          flight.departureDate
        ).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
          day: "numeric",
        })} 1:00 PM</time> 
      </p>
    </div>
    <div
      class="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
    >
      <div>
        <button
          type="button"
          class="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600"
          id="menu-0-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span class="sr-only">Open options</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>
        </button>
      </div>

      <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
      <div
        class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-0-button"
        tabindex="-1"
      >
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <a
            href="/pages/buyticket.html?flight_id=${flight.flight_id}"
            class="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-0-item-0"
            >Check page</a
          >
        </div>
      </div>
    </div>
  </li>`;
}
function getDaysInMonth(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return daysInMonth;
}

function renderCalendar(month, year) {
  const date = new Date();
  calendarTable.innerHTML = "";
  date.setMonth(month);
  date.setFullYear(year);
  calendarArray = [];
  for (let i = 1; i <= getDaysInMonth(date); i++) {
    const datetime = new Date(year, month, i + 1).toISOString().split("T")[0];
    calendarTable.innerHTML += dayMarkup(i, datetime);
    calendarArray.push(datetime);
  }
  dateTimeButtons = document.querySelectorAll("button[name='date-time']");
  dateTimeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      calendarState.selectedDate = new Date(calendarArray[index]);
      schedule.innerHTML = `Schedule for ${new Date(
        calendarState.selectedDate
      ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        day: "numeric",
      })}`;
      handleSearchFlights();
      renderCalendar(
        calendarState.selectedDate.getMonth(),
        calendarState.selectedDate.getFullYear()
      );
    });
  });
}

function renderFlights() {
  flightContainer.innerHTML = "";
  calendarState.flights.forEach((flight) => {
    flightContainer.innerHTML += flightMarkUp(flight);
  });
  if (calendarState.flights.length === 0) {
    flightContainer.innerHTML +=
      '<p class="text-center">No flights available</p>';
  }
}

calendarArrowLeft.addEventListener("click", () => {
  calendarState.shownDate.setMonth(calendarState.shownDate.getMonth() - 1);
  dateLabel.innerHTML = calendarState.shownDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  renderCalendar(
    calendarState.shownDate.getMonth(),
    calendarState.shownDate.getFullYear()
  );
});

calendarArrowRight.addEventListener("click", () => {
  calendarState.shownDate.setMonth(calendarState.shownDate.getMonth() + 1);
  dateLabel.innerHTML = calendarState.shownDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  renderCalendar(
    calendarState.shownDate.getMonth(),
    calendarState.shownDate.getFullYear()
  );
});

const renderAvaibleFlight = () => {};

const handleSearchFlights = () => {
  fetch(
    "http://localhost:8080/api/v1/flights/search_by_date/" +
      calendarState.selectedDate.toISOString().split("T")[0],
    {
      method: "GET",
    }
  ).then(async (response) => {
    calendarState.flights = await response.json();
    renderFlights();
  });
};

const handleFetchCities = () => {
  fetch("http://localhost:8080/api/v1/cities", {
    method: "GET",
  }).then(async (response) => {
    calendarState.cities = await response.json();
    console.log(calendarState.cities);
  });
};

renderCalendar(
  calendarState.shownDate.getMonth(),
  calendarState.shownDate.getFullYear()
);
handleFetchCities();
