// HTML Var
var cityNameInput = document.getElementById(`city-name-form`)
var citySearch = document.getElementById(`city-search`)
var searchBtn = document.getElementById(`search-button`)
var searchHistList = document.getElementById(`search-list`)
var currentWeatherEl = document.getElementById(`current-weather`)
var weatherForecastEl = document.querySelector(`.forecast-container`)
var currentDate = new Date().toLocaleDateString('en-US')

// weather url and API var
var url = `https://api.openweathermap.org/data/2.5/weather?q=`
var apiKey = `&appid=8d2d1058eec9accebef78f8687d8ea63`

// print search history
var print = function (cityHistory) {
  var searchList = document.createElement('li')
  searchList.textContent = cityHistory;
  searchHistList.appendChild(searchList)
}

// show search history list
var showCityHistory = function (name) {
  var cityHistory = document.createElement(`li`)
  cityHistory.textContent = name
  console.log(name)
  cityHistory.addEventListener(`click`, function (click) {
    currentWeatherEl.innerHTML = ``
    weatherForecastEl.innerHTML = ``
    getCurrentWeather(click.target.textContent)
  })
};

// button click to search
cityNameInput.addEventListener(`submit`, function (e) {
  e.preventDefault();
  var cityInput = citySearch.value
  weatherForecastEl.innerHTML = "";
  print(cityInput)
  getCurrentWeather(cityInput)
});

// requesting weather data
var getCurrentWeather = function (cityName) {
  var currentURL = url + cityName + apiKey;
  console.log(currentURL)
  fetch(currentURL)
    .then(function (response) {
      return response.json();
    })
    .then((function (data) {
      let icon = data.weather[0].icon;
      let iconURL = "https://openweathermap.org/img/wn/" + icon + ".png";
      
      var heading = document.querySelector(".currentHeader");
      heading.textContent = data.name;
        
      var weatherIcon = document.querySelector(".weather-icon");
      weatherIcon.innerHTML = "(" + currentDate + ")" + " " + '<img src="' + iconURL + '"alt=Weather">'
    
      var temp = document.querySelector(".currentTemp");
      var cTemp = data.main.temp;
      var cToF = ((cTemp - 273.5) *1.8) + 32;
      temp.textContent = "Temperature:" + " " + Math.round(cToF) + " " + "℉";
      
      var humidity = document.querySelector(".currentHumid");
      humidity.textContent = "Humidity:" + " " + data.main.humidity + "%";
      
      var speed = document.querySelector(".currentSpeed");
      speed.textContent = "Wind Speed:" + " " + data.wind.speed + " " + "MPH";
      
      var uvURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=current,minutely,hourly,alerts&units=imperial' + apiKey;
      
      console.log(uvURL)
      fetch(uvURL).then(function (response) {
          return response.json()
        })
        .then(function (data) {
          var uv = document.querySelector(".currentUV");
          uv.textContent = "UV Index:" + " " + data.daily[0].uvi;
          
          weatherForecastEl.innerHTML = ""

          for (let index = 1; index < 6; index++) {
            console.log(data.daily[index].weather[0])
            var daily = new Date(data.daily[index].dt * 1000).toLocaleDateString('en-US');
            var dailyIcon = data.daily[index].weather[0].icon;
            var dailyIconURL = 'https://www.openweathermap.org/img/wn/' + dailyIcon + '.png';
            
            var forecastContainer = document.querySelector(".forecast-container");
            var element = document.createElement("div", class{"col-2"});
            element.innerHTML = '<h4>' + '<p>' + daily + '</p>' + '</h4>' + '<img src="' + dailyIconURL + '"alt="Weather Icons">' + '</p>' + '<p>' + "Temp: " + Math.round(data.daily[index].temp.max) + " ℉" + '</p>' + '<p>' + "Humid: " + data.daily[index].humidity + "%" + '</p>' + '</h6>'
            forecastContainer.appendChild(element)
                  }
        });
    }))
};