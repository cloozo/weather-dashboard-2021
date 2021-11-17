if (!citySearchInput.value) {
  console.log("can't be left blank");
  errorMessage.innerHTML = "Sorry. the field cannot be left blank";
  errorMessage.setAttribute("style", "color:red");
} else if (citySearchInput.value && citySearchInput.value != "zombie") {
  if (!localStorage.getItem("cityKey")) {
    localStorage.setItem("cityKey", "[]");
  }
  var previous_data = JSON.parse(localStorage.getItem("cityKey"));
  if (previous_data.includes(citySearchInput.value)) {
    console.log("this city already exists");
    return;
  }

  previous_data.push(citySearchInput.value);
  localStorage.setItem("cityKey", JSON.stringify(previous_data));

  // input_textEl = document.createElement("input");

  newLiElement = previous_data;
  newLiElement = document.createElement("li");

  newLiElement.innerHTML = citySearchInput.value;

  newLiElement.setAttribute(
    "style",
    "color:purple; text-decoration: none;padding-left:10px;font-size: 18px; border: 1px solid grey; background:yellow;padding-top:5px;display:block;width:220px; height:40px; border-radius:4px;"
  );
  //

  //
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
} else {
  console.log(
    "Sorry! The city " + citySearchInput.value + " is not in the database"
  );
  errorMessage.innerHTML =
    "Sorry! The city " + citySearchInput.value + " is not in the database";
  errorMessage.setAttribute("style", "color:red");
}
