// fetch("api.openweathermap.org/data/2.5/forecast?q="{Dallas}"&appid="{8d2d1058eec9accebef78f8687d8ea63})
const APIkey = "8d2d1058eec9accebef78f8687d8ea63";
fetch("api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + APIkey)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));