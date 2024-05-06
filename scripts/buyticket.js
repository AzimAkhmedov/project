handleFetchFlight = async () => {
  fetch("http://localhost:8080/api/v1/flights", {
    method: "GET",
  }).then(async (response) => {
    const data = await response.json();
    console.log(data);
    calendarState.flights = data;
    renderFlights();
  });
};


