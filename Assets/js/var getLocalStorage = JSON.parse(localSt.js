var getLocalStorage = JSON.parse(localStorage.getItem("cityKey"));
console.log(getLocalStorage);
if (localStorage.getItem("cityKey") === null) {
  localStorage.setItem("cityKey", "[input_textEl]");
}

for (i = 0; i < getLocalStorage.length; i++) {
  //   console.log(getLocalStorage[i]);
  //   input_textEl1 = document.createElement("input");
  //   newLiElement1 = getLocalStorage[i];
  var newLiElement1 = document.createElement("li");
  newLiElement1.innerHTML = getLocalStorage[i];
  newLiElement1.setAttribute(
    "style",
    "color:black; text-decoration: none;padding-left:10px;font-size: 25px; border: 1px solid grey; background:lightblue;  pointer-events: none;display:block;  margin: 0 auto;width:230px"
  );

  ul_El.appendChild(newLiElement1);
}
