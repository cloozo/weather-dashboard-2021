//5 day forcast
var fiveDaysForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=91407228ad85e70eab72acdea5a12aa4";
var currentWeather =
  "https://api.openweathermap.org/data/2.5/weather?q=miami&appid=91407228ad85e70eab72acdea5a12aa4";

var todayDate = new Date();
var formatDate = moment(todayDate).format("dddd, MMMM DD, YYYY");
// var dateOutput = document.querySelector("#currentDay").innerHTML =`${formatDate}`;
var cityGetItem = null;
var clearHistoryEl = document.getElementById("clear-history");

//converting to military time
// var currentHour = moment().format("H");

// console.log(currentHour);

var myApiKey = "91407228ad85e70eab72acdea5a12aa4";
var citySearchInput = document.querySelector(".city_search_input");
var buttonSearch = document.querySelector(".btn_search");
var displayAll = document.querySelector("#display_all");

//current Day
var city_result = document.getElementById("city_result");
var city_name = document.getElementById("city_name");
var timezone = document.getElementById("timezone");
var icon = document.getElementById("icon");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
// var longitude = document.getElementById("longitude");
// var latitude = document.getElementById("latitude");
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

citySearchInput.value = cityGetItem;
//
var getLocalStorage = JSON.parse(localStorage.getItem("cityKey"));
if (getLocalStorage != null && getLocalStorage != citySearchInput) {
  localStorage.getItem("cityKey", "[input_textEl]");
  for (i = 0; i < getLocalStorage.length; i++) {
    //   console.log(getLocalStorage[i]);
    //   input_textEl1 = document.createElement("input");
    //   newLiElement1 = getLocalStorage[i];
    var newLiElement1 = document.createElement("li");
    newLiElement1.innerHTML = getLocalStorage[i];
    newLiElement1.setAttribute(
      "style",
      "color:black; text-decoration: none;padding-left:10px;font-size: 18px; border: 1px solid grey; background:689ED3;padding-top:5px;  pointer-events: none;display:block; ;width:220px; height:40px; border-radius:4px;"
    );

    ul_El.appendChild(newLiElement1);
  }
} else {
  console.log("it is null");
}

//

buttonSearch.addEventListener("click", function searchButtonFunction() {
  if (citySearchInput.value) {
    var city_inputElement =
      " " + document.querySelector(".city_search_input").value;
    if (localStorage.getItem("cityKey") === null) {
      localStorage.setItem("cityKey", "[]");
    }

    var previous_data = JSON.parse(localStorage.getItem("cityKey"));
    previous_data.push(city_inputElement);
    localStorage.setItem("cityKey", JSON.stringify(previous_data));

    var errorMessage = document.querySelector("#errorMessage");
    var nameDisplay = document.querySelector("#name_display");

    input_textEl = document.createElement("input");
    newLiElement = previous_data;
    newLiElement = document.createElement("li");
    newLiElement.innerHTML = citySearchInput.value;
    newLiElement.setAttribute(
      "style",
      "color:black; text-decoration: none;padding-left:10px;font-size: 18px; border: 1px solid grey; background:689ED3;padding-top:5px;  pointer-events: none;display:block; ;width:220px; height:40px; border-radius:4px;"
    );

    ul_El.appendChild(newLiElement);

    // fetch('https://api.openweathermap.org/data/2.5/forecast?q='+citySearchInput.value+'&appid='+myApiKey)
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        citySearchInput.value +
        "&appid=" +
        myApiKey +
        "&units=imperial"
    )
      //       https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=91407228ad85e70eab72acdea5a12aa4
      .then((response) => response.json())
      .then((data) => {
        // localStorage.setItem('cityKey', citySearchInput.value );

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
});
