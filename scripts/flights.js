const modal = document.getElementById("modal");
const modalToggle = document.getElementById("flight-modal-toggle");

const table = document.querySelector("tbody");

const x = document.getElementById("x");
const flightsState = {
  flights: [],
  flightForm: {},
  cities: [],
};

const modalState = {
  open: false,
};

modalToggle.addEventListener("click", () => {
  modalState.open = !modalState.open;
  modal.classList.toggle("hidden");
});

x.addEventListener("click", () => {
  modalState.open = false;
  modal.classList.add("hidden");
});

const renderFlights = (flights) => {
  const origin = flightsState.cities.find(
    (city) => city.city_id === flights.originID
  );
  const destination = flightsState.cities.find(
    (city) => city.city_id === flights.destinationID
  );
  console.log(flightsState.cities, origin, destination);
  return `<tr>
    <td
      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
    >
     ${flights.flight_id}
    </td>
    <td
      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
    >
     ${
       Math.floor(flights.duration / 60) +
       " hours " +
       (flights.duration % 60 ? (flights.duration % 60) + " minutes" : "")
     }
    </td>
    <td
      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
    >
     ${origin?.cityName ?? ""}
    </td>
    <td
      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
    >
      ${destination?.cityName ?? ""}
    </td>
    <td
    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
  >
    ${flights.availableEconomySeats ?? ""}
  </td>
  <td
    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
  >
    ${flights.availableBusinessSeats ?? ""}
  </td>
    <td
      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
    >
      <a
        href="#"
        class="text-indigo-600 hover:text-indigo-900"
        >Edit<span class="sr-only"
          >, Lindsay Walton</span
        ></a
      >
    </td>
  </tr>`;
};
const fetchCities = async () => {
  const response = await fetch("http://localhost:8080/api/v1/cities", {
    method: "GET",
  });
  flightsState.cities = await response.json();
};
const id = localStorage.getItem("company_id");
fetchCities().then(async () => {
  await fetchFlightsById(id);
  flightsState.flights.forEach((flight) => {
    console.log(flightsState.cities);
    table.innerHTML += renderFlights(flight);
  });
});

const fetchFlightsById = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/flights/search_by_company_id/${id}`
  );
  const flight = await response.json();
  flightsState.flights = flight;
};
