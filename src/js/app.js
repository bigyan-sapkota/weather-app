const API_KEY = "f11184662b86ef1340b2cc2d5631fb4e";
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const iconImage = document.getElementById("iconImage");

// load last searched city from localStorage
window.addEventListener("load", () => {
  const lastCity = "kathmandu";

  if (lastCity) {
    fetchWeather(lastCity)
      .then(displayWeather)
      .catch(() => alert("Could not get data"));
  }
});

//
weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
    localStorage.setItem("lastCity", city);
  } catch (err) {
    alert("Failed to fetch weather. Try again later.");
  }
});

// fetch weather function
async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return await response.json();
}

function displayWeather(data) {
  cityName.textContent = data?.name;
  temperature.textContent = data?.main.temp;
  description.textContent = `Weather : ${data?.weather[0].description}`;
  iconImage.src = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png
`;

  // https://openweathermap.org/img/wn/10d@2x.png
  weatherInfo.classList.remove("hidden");
}
