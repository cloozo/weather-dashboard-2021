// get the class name from html page
var myApiKey = '91407228ad85e70eab72acdea5a12aa4' ;
var citySearchInput = document.querySelector(".city_search_input")
var buttonSearch = document.querySelector(".btn_search")


var city_result =  document.getElementById("city_result")
var  city_name = document.getElementById("city_name")
var  timezone = document.getElementById("timezone")
var  icon =  document.getElementById("icon")
var temp =document.getElementById("temp")
var  wind =document.getElementById("wind")
var humidity =  document.getElementById("humidity")
var  uvIndex =  document.getElementById("uvIndex")


// attaching events to the  class name from html page
buttonSearch.addEventListener("click", function searchButtonFunction(){

if (citySearchInput.value)
{
    city_result.innerHTML = citySearchInput.value;
console.log(`Search Result for ${citySearchInput.value}`);
fetch('https://api.openweathermap.org/data/2.5/weather?q='+citySearchInput.value+'&appid='+myApiKey)
.then(response => response.json())
.then (data => {
console.log(data)
    city_name.innerHTML = data.name;
    timezone.innerHTML = data.timezone;
    icon.innerHTML = data.weather.icon;
    temp.innerHTML = data.main.temp;
    wind.innerHTML = data.wind.speed;
    humidity.innerHTML = data.main.humidity;
  
})
} else{
    
    city_result.innerHTML = "Sorry! search box cannot be empty";
}


})
 
