const apiKey = "2828a350e83c7c38ccae690ee2307399";
const weatherInfo = document.getElementById("weather-info");

document.getElementById("get-weather").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        displayWeather(await fetchWeather(url));
      },
      (error) => {
        weatherInfo.textContent = "Error fetching location!";
      }
    );
  } else {
    weatherInfo.textContent = "Geolocation not supported!";
  }
});

document.getElementById("get-city-weather").addEventListener("click", async () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    displayWeather(await fetchWeather(url));
  } else {
    weatherInfo.textContent = "Please enter a city!";
  }
});

async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      weatherInfo.textContent = "City not found!";
    }
  } catch (error) {
    weatherInfo.textContent = "Error fetching weather data!";
  }
}

function displayWeather(data) {
  if (data) {
    weatherInfo.innerHTML = `
      <h3>${data.name}</h3>
      <p>${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  }
}
