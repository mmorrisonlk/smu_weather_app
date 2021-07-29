// HTML Var
var cityNameInput = document.getElementById(`city-name-form`)
var citySearch = document.getElementById(`city-search`)
var searchBtn = document.getElementById(`search-button`)
var searchHistList = document.getElementById(`search-list`)
var currentWeatherEl = document.getElementById(`current-weather`)
var weatherForecastEl = document.querySelector(`.forecast-container`)
var currentDate = new Date().toLocaleDateString('en-US')

console.log(weatherForecastEl)

// weather url and API var
var url = `https://api.openweathermap.org/data/2.5/weather?q=`
var apiKey = `&appid=445334ff4b4a5bd010296351c9bf3d55`

// print search history
var print = function (cityHistory) {
  var searchList = document.createElement('li')
  searchList.textContent = cityHistory;
  searchHistList.appendChild(searchList)
}

// show search history list
var showCityHistory = function (name) {
  var cityHistoryInput = document.createElement(`li`)
  cityHistoryInput.textContent = name
  console.log(name)
  cityHistoryInput.addEventListener(`click`, function (click) {
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
      // console.log(data)
      let iconURL = "https://openweathermap.org/img/wn/" + icon + ".png";
      
      var heading = document.querySelector(".currentHeader");
      heading.textContent = data.name;
        
      var weatherIcon = document.querySelector(".weather-icon");
      weatherIcon.innerHTML = "(" + currentDate + ")" + " " + '<img src="' + iconURL + '"alt=Weather">'
    
      var temp = document.querySelector(".currentTemp");
      var cTemp = data.main.temp;
      // console.log(cTemp)
      var cToF = ((cTemp - 273.5) *1.8) + 32;
      // console.log(cToF)
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
          // console.log(data)
          uv.textContent = "UV Index:" + " " + data.daily[0].uvi;
          
          weatherForecastEl.innerHTML = ""
          // 5 day forecast title
          // var fiveForecastHead = document.querySelector("#forecast-label");
          // fiveForecastHead.innerHTML = '<h2>' + '5 Day Forecast' + '</h2>'
          
          // 5 day forecast call
          for (let index = 1; index < 6; index++) {
            console.log(data.daily[index].weather[0])
            var daily = new Date(data.daily[index].dt * 1000).toLocaleDateString('en-US');
            var dailyIcon = data.daily[index].weather[0].icon;
            var dailyIconURL = 'https://www.openweathermap.org/img/wn/' + dailyIcon + '.png';
            
            var forecastContainer = document.querySelector(".forecast-container");
            var element = document.createElement("div");
            element.innerHTML = '<h4>' + '<p>' + daily + '</p>' + '</h4>' + '<img src="' + dailyIconURL + '"alt="Weather Icons">' + '</p>' + '<p>' + "Temp: " + Math.round(data.daily[index].temp.max) + " ℉" + '</p>' + '<p>' + "Humid: " + data.daily[index].humidity + "%" + '</p>' + '</h6>'
            forecastContainer.appendChild(element)
            
            // var forecastIcon = document.querySelector(".forecastIconandDate");
            // forecastIcon.innerHTML = daily + " " + '<img src="' + dailyIconURL + '"alt="Weather">'
            
            // var forecastTemp = document.querySelector(".forecastTemp")
            // forecastTemp.textContent = "Temperature:" + " " + Math.round(data.daily[index].temp.max) + " " + "℉";
            
            // var forecastHumid = document.querySelector(".forecastHumid");
            // forecastHumid.textContent = "Humidity:" + " " + data.daily[index].humidity + "%";
            
            // weatherForecastEl.classList.add('five-day', 'p-3', 'mr-3', 'card')
            // weatherForecastEl.innerHTML = '<h4>' + '<p>' + daily + '</p>' + '</h4>' + '<img src="' + dailyIconURL + '"alt="Weather Icons">' + '</p>' + '<p>' + "Temp: " + Math.round(data.daily[index].temp.max) + " ℉" + '</p>' + '<p>' + "Humid: " + data.daily[index].humidity + "%" + '</p>' + '</h6>'
                  }
        });
    }))
};