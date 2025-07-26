const apiKey = "b7cbdc030e34264d4433f79288650723"; // Get it from https://openweathermap.org/api

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorEl = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  errorEl.textContent = "";
  card.style.display = "none";

  if (city === "") {
    errorEl.textContent = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"b7cbdc030e34264d4433f79288650723"}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then(data => {
      document.getElementById("cityName").textContent = data.name;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("feelsLike").textContent = data.main.feels_like;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      card.style.display = "block";
    })
    .catch(err => {
      errorEl.textContent = err.message;
    });
}
