const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const weatherDisplay = document.querySelector('#weather-display');
const toggleBtn = document.querySelector('#toggle-btn');

searchInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

const fetchSearchInput = async (url) => {
  const units = toggleBtn.textContent === 'F' ? 'imperial' : 'metric';
  const urlSearch = `${url}&q=${searchInput.value}&units=${units}`;
  try {
    const response = await fetch(urlSearch, { mode: 'cors' });
    const weatherData = await response.json();

    const [temp, feelsLike, humidity, desc, icon] = [
      weatherData.main.temp,
      weatherData.main.feels_like,
      weatherData.main.humidity,
      weatherData.weather[0].description,
      weatherData.weather[0].icon,
    ];

    const weatherArray = [temp, feelsLike, humidity, desc, icon];
    weatherDisplay.textContent = weatherArray;
  } catch (error) {
    weatherDisplay.textContent = 'Invalid City';
  }
};

searchBtn.onclick = () => {
  fetchSearchInput(
    'http://api.openweathermap.org/data/2.5/weather?APPID=c3d23770339c61076d66d8d1ca1a5dba'
  );
};

toggleBtn.onclick = () => {
  const measurement = toggleBtn.textContent === 'F' ? 'C' : 'F';
  toggleBtn.textContent = measurement;
  if (weatherDisplay.textContent !== '') { searchBtn.click() };
};
