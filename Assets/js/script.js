
var todayDate = new Date();
var formatDate = moment(todayDate).format('dddd, MMMM DD, YYYY')
var dateOutput = document.querySelector("#currentDay").innerHTML =`${formatDate}`;
var cityGetItem = null;
var clearHistoryEl = document.getElementById("clear-history");


//converting to military time
var currentHour = moment().format("H");

// console.log(currentHour);
//

var myApiKey = '91407228ad85e70eab72acdea5a12aa4' ;
var citySearchInput = document.querySelector(".city_search_input")
var buttonSearch = document.querySelector(".btn_search")
var displayAll = document.querySelector("#display_all")


//current Day 
var city_result =  document.getElementById("city_result")
var  city_name = document.getElementById("city_name")
var  timezone = document.getElementById("timezone")
var  icon =  document.getElementById("icon")
var temp =document.getElementById("temp")
var  wind =document.getElementById("wind")
var humidity =  document.getElementById("humidity")
var longitude = document.getElementById("longitude")
var latitude = document.getElementById("latitude")
var  uvIndex =  document.getElementById("uvIndex")

//Day 1

var  timezone1 = document.getElementById("timezone1")
var  icon1 =  document.getElementById("icon1")
var temp1 =document.getElementById("temp1")
var  wind1 =document.getElementById("wind1")
var humidity1 =  document.getElementById("humidity1")
var  uvIndex1 =  document.getElementById("uvIndex1")

// Day 2

var  timezone2 = document.getElementById("timezone2")
var  icon2 =  document.getElementById("icon2")
var temp2 =document.getElementById("temp2")
var  wind2 =document.getElementById("wind2")
var humidity2 =  document.getElementById("humidity2")
var  uvIndex2 =  document.getElementById("uvIndex2")

// Day 2

var  timezone3 = document.getElementById("timezone3")
var  icon3 =  document.getElementById("icon3")
var temp3=document.getElementById("temp3")
var  wind3=document.getElementById("wind3")
var humidity3=  document.getElementById("humidity3")
var  uvIndex3 =  document.getElementById("uvIndex3")
// Day 4

var  timezone4 = document.getElementById("timezone4")
var  icon4 =  document.getElementById("icon4")
var temp44=document.getElementById("temp4")
var  wind4 =document.getElementById("wind4")
var humidity4 =  document.getElementById("humidity4")
var  uvIndex4 =  document.getElementById("uvIndex4")
// Day 2

var  timezone5 = document.getElementById("timezone5")
var  icon5 =  document.getElementById("icon5")
var temp5 =document.getElementById("temp5")
var  wind5 =document.getElementById("wind5")
var humidity5 =  document.getElementById("humidity5")
var  uvIndex5 =  document.getElementById("uvIndex5")
citySearchInput.value =  cityGetItem ;
// attaching events to the  class name from html page

buttonSearch.addEventListener("click", function searchButtonFunction(){

if (citySearchInput.value)
{
  
    city_result.innerHTML = citySearchInput.value;
  
    var city_inputElement = ' ' + document.querySelector(".city_search_input").value;
    if (localStorage.getItem('cityKey') === null ){ 
       localStorage.setItem('cityKey', '[]');
   
   }
   
   var previous_data = JSON.parse(localStorage.getItem('cityKey'));
   previous_data.push(city_inputElement)
   localStorage.setItem('cityKey', JSON.stringify(previous_data))




fetch('https://api.openweathermap.org/data/2.5/forecast?q='+citySearchInput.value+'&appid='+myApiKey)
//       https://api.openweathermap.org/data/2.5/forecast?q=miami&appid=91407228ad85e70eab72acdea5a12aa4
.then(response => response.json())
.then (data => {

  // localStorage.setItem('cityKey', citySearchInput.value );

    displayAll.style.display="block";
    city_name.innerHTML = data.city.name;
    console.log(data.city.name)
   

    timezone.innerHTML = data.city.timezone;
    console.log(data.city.timezone)
    icon.innerHTML  =` <img src="https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png"  /> `;

     console.log(data.list[0].weather[0].icon)
   
     temp.innerHTML = data.list[0].main.temp; 
     console.log(data.list[0].main.temp)

     wind.innerHTML = data.list[0].wind.speed;
     console.log(data.list[0].wind.speed);
    

     humidity.innerHTML = data.list[0].main.humidity;
     console.log(data.list[0].main.humidity);


     longitude.innerHTML = data.city.coord.lon;
     console.log(data.city.coord.lon);

    latitude.innerHTML = data.city.coord.lat;
     console.log(data.city.coord.lat);


     if (data.city.coord.value < 4 ) {
      uvIndex.innerHTML = "green";
  }
  else if (data.city.coord.value < 8) {
    uvIndex.innerHTML = "yellow";
  }
  else {
    uvIndex.innerHTML = "red";
  }




    //Day 1
    
    timezone1.innerHTML = data.city.timezone;
    console.log(data.city.timezone)

     icon1.innerHTML  =`  <img src="https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png"  /> `;
     console.log(data.list[1].weather[0].icon)

     temp1.innerHTML = data.list[1].main.temp; 
     console.log(data.list[1].main.temp)

     wind1.innerHTML = data.list[1].wind.speed;
     console.log(data.list[1].wind.speed);
    

     humidity1.innerHTML = data.list[1].main.humidity;
     console.log(data.list[1].main.humidity);


       //Day2
    
    timezone2.innerHTML = data.city.timezone;
    console.log(data.city.timezone)

     icon2.innerHTML  =`  <img src="https://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png"  /> `;
     console.log(data.list[2].weather[0].icon)

     temp2.innerHTML = data.list[2].main.temp; 
     console.log(data.list[1].main.temp)

     wind2.innerHTML = data.list[2].wind.speed;
     console.log(data.list[2].wind.speed);
    

     humidity2.innerHTML = data.list[2].main.humidity;
     console.log(data.list[2].main.humidity);

  //Day3
    
  timezone3.innerHTML = data.city.timezone;
  console.log(data.city.timezone)

   icon3.innerHTML  =`  <img src="https://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png"  /> `;
   console.log(data.list[3].weather[0].icon)

   temp3.innerHTML = data.list[3].main.temp; 
   console.log(data.list[3].main.temp)

   wind3.innerHTML = data.list[3].wind.speed;
   console.log(data.list[3].wind.speed);
  

   humidity3.innerHTML = data.list[3].main.humidity;
   console.log(data.list[3].main.humidity);

 //Day4
    
 timezone4.innerHTML = data.city.timezone;
 console.log(data.city.timezone)

  icon4.innerHTML  =`  <img src="https://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png"  /> `;
  console.log(data.list[4].weather[0].icon)

  temp4.innerHTML = data.list[4].main.temp; 
  console.log(data.list[4].main.temp)

  wind4.innerHTML = data.list[1].wind.speed;
  console.log(data.list[4].wind.speed);
 

  humidity4.innerHTML = data.list[4].main.humidity;
  console.log(data.list[4].main.humidity);
  


 //Day5
    
 timezone5.innerHTML = data.city.timezone;
 console.log(data.city.timezone)

  icon5.innerHTML  =`  <img src="https://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png"  /> `;
  console.log(data.list[5].weather[0].icon)

  temp5.innerHTML = data.list[5].main.temp; 
  console.log(data.list[5].main.temp)

  wind5.innerHTML = data.list[5].wind.speed;
  console.log(data.list[5].wind.speed);
 

  humidity5.innerHTML = data.list[5].main.humidity;
  console.log(data.list[5].main.humidity);

})

} 
// else{
//     if(!citySearchInput.value){
//     city_result.innerHTML = "Sorry! search box cannot be empty" };
// }


})
 
