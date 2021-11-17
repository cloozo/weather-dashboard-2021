var todayDate = new Date();
var formatDate = moment(todayDate).format("dddd, MMMM DD, YYYY");
var clearHistoryEl = document.getElementById("clear-history");

var myApiKey = "7d54df55e5dc4636f3898ad56b7a11f8";
var citySearchInput = document.querySelector(".city_search_input");

var searchButton = document.querySelector(".btn_search");
var displayAll = document.querySelector("#display_all");
var errorMessage = document.querySelector("#errormessage");

//current Day
var timezone = document.getElementById("timezone");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uvIndex");
var ul_El = document.querySelector("ul");
var newLiElement;
var input_textEl;
//Day 1
var timezone1 = document.getElementById("timezone1");
var icon1 = document.getElementById("icon1");
var temp1 = document.getElementById("temp1");
var wind1 = document.getElementById("wind1");
var humidity1 = document.getElementById("humidity1");
var longitude1 = document.getElementById("longitude1");
var latitude1 = document.getElementById("latitude1");
var uvIndex1 = document.getElementById("uvIndex1");

// printing on screen on page load before clicking on button
var getLocalStorage = JSON.parse(localStorage.getItem("cityKey"));

if (getLocalStorage) {
  for (i = 0; i < getLocalStorage.length; i++) {
    // citySearchInput.value = getLocalStorage[getLocalStorage.length - 1]; // getting the last element of the array
    // create a button here
    var buttonSelectedElement = document.createElement("button");
    buttonSelectedElement.innerHTML = getLocalStorage[i];
    buttonSelectedElement.addEventListener(
      "click",
      function clickedFunction(e) {
        console.log("Yeah! I am clicked ", e.target.textContent);
        individualResultFunction(e.target.textContent);
      }
      //
    );
    buttonSelectedElement.setAttribute(
      "style",
      "color:black;text-transfor:uppercase; text-decoration: none;padding-left:10px;font-size: 18px; border: 1px solid grey; background:white;padding-top:5px;display:block;width:220px;text-decoration:none; height:40px; border-radius:4px;"
    );
    ul_El.appendChild(buttonSelectedElement);
  }
}

// This function runs when the search button is clicked
searchButton.addEventListener("click", function () {
  // input value is blank
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearchInput.value +
      "&appid=" +
      myApiKey +
      "&units=imperial"
  )
    //
    .then((response) => response.json())
    .then((data) => {
      if (!citySearchInput.value) {
        errorMessage.innerHTML = "Sorry. the field cannot be left blank";
        errorMessage.setAttribute("style", "color:red");
      } else if (data.cod != "404") {
        // errorMessage.innerHTML =
        // "City search for: " + citySearchInput.value + " has been found!";
        errorMessage.setAttribute("style", "color:green");
        cityIsFound(citySearchInput.value);
      } else if (citySearchInput.value && citySearchInput.value != data) {
        errorMessage.innerHTML =
          "Sorry. " + citySearchInput.value + " cannot be found";
        errorMessage.setAttribute("style", "color:red");
      }

      //
    });
  //

  //
});
// This function will run if the city is found in Database
function cityIsFound() {
  if (!citySearchInput.value) {
    console.log("can't be left blank");
    errorMessage.innerHTML = "Sorry. the field cannot be left blank";
    errorMessage.setAttribute("style", "color:red");
  } else if (citySearchInput.value) {
    if (!localStorage.getItem("cityKey")) {
      localStorage.setItem("cityKey", "[]");
    }
    var previous_data = JSON.parse(localStorage.getItem("cityKey"));
    if (previous_data.includes(citySearchInput.value)) {
      console.log("this city already exists");
      individualResultFunction(citySearchInput.value);
      return;
    }
    //
    previous_data.push(citySearchInput.value);
    localStorage.setItem("cityKey", JSON.stringify(previous_data));
    newLiElement = previous_data;
    newLiElement = document.createElement("button");
    newLiElement.innerHTML = citySearchInput.value;
    newLiElement.addEventListener("click", function clickedFunction(e) {
      console.log("Yeah! I am clicked ", e.target.textContent);
      individualResultFunction(e.target.textContent);
    });

    newLiElement.setAttribute(
      "style",
      "color:black;text-transform:uppercase; text-decoration: none;padding-left:10px;font-size: 18px; border: 1px solid grey; background:white;padding-top:5px;display:block;width:220px; height:40px; text-decoration:none;border-radius:4px;"
    );
    ul_El.appendChild(newLiElement);
    //
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        citySearchInput.value +
        "&appid=" +
        myApiKey +
        "&units=imperial"
    )
      //
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // check if the input data is found in array

        displayAll.style.display = "block";
        city_name.innerHTML = data.name;

        //
        d = new Date();
        localTime = d.getTime();
        localOffset = d.getTimezoneOffset() * 60000;
        utc = localTime + localOffset;
        var cityTimezone = utc + 1000 * data.timezone;
        nd = new Date(cityTimezone);
        //
        timezone.innerHTML = moment(nd).format("MM-DD-YYYY");
        icon.innerHTML = ` <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"  /> `;

        temp.innerHTML = data.main.temp;
        wind.innerHTML = data.wind.speed;
        humidity.innerHTML = data.main.humidity;
        // longitude.innerHTML = data.coord.lon;
        // latitude.innerHTML = data.coord.lat;

        fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            data.coord.lat +
            "&lon=" +
            data.coord.lon +
            "&appid=" +
            myApiKey
        )
          .then((response) => response.json())
          .then((data) => {
            uvIndex.innerHTML = data.daily[0].uvi;
            if (data.daily[0].uvi <= 2) {
              uvIndex.setAttribute("style", "background:white; width:200px");
            } else if (data.daily[0].uvi <= 5) {
              uvIndex.setAttribute("style", "background:yellow;width:200px");
            } else {
              uvIndex.setAttribute("style", "background:red; width:200px");
            }

            // favorable, moderate, or severe
          });
      });

    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearchInput.value +
        "&appid=" +
        myApiKey +
        "&units=imperial"
    )
      //
      .then((response) => response.json())
      .then((data1) => {
        displayAll.style.display = "block";
        //

        //Day 1
        icon1.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[1].weather[0].icon}.png"  /> `;
        timezone1.innerHTML = moment(data1.list[1].dt_txt).format("MM-DD-YYYY");
        // var currentHour = moment().format("H");
        temp1.innerHTML = data1.list[1].main.temp;
        wind1.innerHTML = data1.list[1].wind.speed;
        humidity1.innerHTML = data1.list[1].main.humidity;

        //Day 2
        icon2.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[9].weather[0].icon}.png"  /> `;
        timezone2.innerHTML = moment(data1.list[9].dt_txt).format("MM-DD-YYYY");
        temp2.innerHTML = data1.list[9].main.temp;
        wind2.innerHTML = data1.list[9].wind.speed;
        humidity2.innerHTML = data1.list[9].main.humidity;

        //Day 3
        icon3.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[17].weather[0].icon}.png"  /> `;
        timezone3.innerHTML = moment(data1.list[17].dt_txt).format(
          "MM-DD-YYYY"
        );
        temp3.innerHTML = data1.list[17].main.temp;
        wind3.innerHTML = data1.list[17].wind.speed;
        humidity3.innerHTML = data1.list[17].main.humidity;

        //Day 4
        icon4.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[25].weather[0].icon}.png"  /> `;
        timezone4.innerHTML = moment(data1.list[25].dt_txt).format(
          "MM-DD-YYYY"
        );
        temp4.innerHTML = data1.list[25].main.temp;
        wind4.innerHTML = data1.list[25].wind.speed;
        humidity4.innerHTML = data1.list[25].main.humidity;

        //Day 5
        icon5.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[33].weather[0].icon}.png"  /> `;
        timezone5.innerHTML = moment(data1.list[33].dt_txt).format(
          "MM-DD-YYYY"
        );
        temp5.innerHTML = data1.list[33].main.temp;
        wind5.innerHTML = data1.list[33].wind.speed;
        humidity5.innerHTML = data1.list[33].main.humidity;
      });
  }
}
// This function will run when the selected items is chosen

function individualResultFunction(cityName) {
  //
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      myApiKey +
      "&units=imperial"
  )
    //
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // check if the input data is found in array

      displayAll.style.display = "block";
      city_name.innerHTML = data.name;

      //
      d = new Date();
      localTime = d.getTime();
      localOffset = d.getTimezoneOffset() * 60000;
      utc = localTime + localOffset;
      var cityTimezone = utc + 1000 * data.timezone;
      nd = new Date(cityTimezone);
      //
      timezone.innerHTML = moment(nd).format("MM-DD-YYYY");
      icon.innerHTML = ` <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"  /> `;

      temp.innerHTML = data.main.temp;
      wind.innerHTML = data.wind.speed;
      humidity.innerHTML = data.main.humidity;
      // longitude.innerHTML = data.coord.lon;
      // latitude.innerHTML = data.coord.lat;

      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          data.coord.lat +
          "&lon=" +
          data.coord.lon +
          "&appid=" +
          myApiKey
      )
        .then((response) => response.json())
        .then((data) => {
          uvIndex.innerHTML = data.daily[0].uvi;
          if (data.daily[0].uvi <= 2) {
            uvIndex.setAttribute("style", "background:green; width:200px");
          } else if (data.daily[0].uvi <= 5) {
            uvIndex.setAttribute("style", "background:yellow;width:200px");
          } else {
            uvIndex.setAttribute("style", "background:red; width:200px");
          }

          // favorable, moderate, or severe
        });
    });

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      myApiKey +
      "&units=imperial"
  )
    //
    .then((response) => response.json())
    .then((data1) => {
      displayAll.style.display = "block";
      //

      //Day 1
      icon1.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[1].weather[0].icon}.png"  /> `;
      timezone1.innerHTML = moment(data1.list[1].dt_txt).format("MM-DD-YYYY");
      // var currentHour = moment().format("H");
      temp1.innerHTML = data1.list[1].main.temp;
      wind1.innerHTML = data1.list[1].wind.speed;
      humidity1.innerHTML = data1.list[1].main.humidity;

      //Day 2
      icon2.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[9].weather[0].icon}.png"  /> `;
      timezone2.innerHTML = moment(data1.list[9].dt_txt).format("MM-DD-YYYY");
      temp2.innerHTML = data1.list[9].main.temp;
      wind2.innerHTML = data1.list[9].wind.speed;
      humidity2.innerHTML = data1.list[9].main.humidity;

      //Day 3
      icon3.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[17].weather[0].icon}.png"  /> `;
      timezone3.innerHTML = moment(data1.list[17].dt_txt).format("MM-DD-YYYY");
      temp3.innerHTML = data1.list[17].main.temp;
      wind3.innerHTML = data1.list[17].wind.speed;
      humidity3.innerHTML = data1.list[17].main.humidity;

      //Day 4
      icon4.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[25].weather[0].icon}.png"  /> `;
      timezone4.innerHTML = moment(data1.list[25].dt_txt).format("MM-DD-YYYY");
      temp4.innerHTML = data1.list[25].main.temp;
      wind4.innerHTML = data1.list[25].wind.speed;
      humidity4.innerHTML = data1.list[25].main.humidity;

      //Day 5
      icon5.innerHTML = ` <img src="https://openweathermap.org/img/w/${data1.list[33].weather[0].icon}.png"  /> `;
      timezone5.innerHTML = moment(data1.list[33].dt_txt).format("MM-DD-YYYY");
      temp5.innerHTML = data1.list[33].main.temp;
      wind5.innerHTML = data1.list[33].wind.speed;
      humidity5.innerHTML = data1.list[33].main.humidity;
    });
}

//
