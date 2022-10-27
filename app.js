const Tasks = document.querySelector(".tasks");
const Btn = document.querySelector(".btn");
const Alert = document.querySelector(".alert");
// const Colors = document.getElementById("color_select");
//
//  load the the init function when the window loads
window.onload = init;
// reads from from the local storage and
function init() {
  let stickiesArray = localStorage["stickiesArray"];
  if (!stickiesArray) {
    stickiesArray = [];
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  } else {
    stickiesArray = JSON.parse(stickiesArray);
  }
  for (let i = 0; i < stickiesArray.length; i++) {
    let key = stickiesArray[i];
    let value = JSON.parse(localStorage[key]);
    addStickyToDOM(key, value);
  }
  Btn.addEventListener("click", addItemToStorage);
}

// add sticky to local storage
function addItemToStorage(e) {
  e.preventDefault();
  let value = document.querySelector(".input").value;
  let time = new Date().getTime();
  let key = "Sticky_" + time;
  let stickiesArray = getStickiesStorage();
  if (value && key.substring(0, 6) === "Sticky") {
    let colorSelectOBj = document.getElementById("color_select");
    let index = colorSelectOBj.selectedIndex;

    let color = colorSelectOBj[index].value;

    let stickyOBJ = {
      value: value,
      color: color,
    };

    stickiesArray.push(key);
    localStorage.setItem(key, JSON.stringify(stickyOBJ));
    // localStorage.setItem(key, color);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    addStickyToDOM(key, stickyOBJ);

    document.querySelector(".input").value = "";

    Alert.innerText = alertDOM("success", { text: "Sticky added" });
    setTimeout(removeAlert, 2000);
  } else {
    Alert.innerText = alertDOM("failure", { text: "Please add a Sticky" });
    setTimeout(removeAlert, 2000);
  }
}
// add sticky to dom
function addStickyToDOM(key, stickyOBJ) {
  const sticky = document.createElement("li");
  sticky.classList.add("single__task");
  sticky.style.backgroundColor = stickyOBJ.color;
  sticky.setAttribute("id", key);
  const span = document.createElement("span");
  span.innerText = stickyOBJ.value;
  sticky.appendChild(span);
  Tasks.appendChild(sticky);
  sticky.addEventListener("click", deleteSticky);
}
// deleteSticky
function deleteSticky(e) {
  let key = e.target.id;
  if (e.target.tagName.toLowerCase() == "span") {
    key = e.target.parentNode.id;
  }
  localStorage.removeItem(key);
  let stickiesArray = getStickiesStorage();
  if (stickiesArray) {
    for (let i = 0; i < stickiesArray.length; i++) {
      if (key == stickiesArray[i]) {
        //
        stickiesArray.splice(i, 1);
      }
    }
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    removeStickyFromDOM(key);
  }
}
// remove sticky from dom
function removeStickyFromDOM(id) {
  const sticky = document.getElementById(id);
  sticky.parentNode.removeChild(sticky);
}
// get local storage function
function getStickiesStorage() {
  let stickiesArray = localStorage.getItem("stickiesArray");
  if (!stickiesArray) {
    stickiesArray = [];
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
  } else {
    stickiesArray = JSON.parse(stickiesArray);
  }
  return stickiesArray;
}
// alert dom
function alertDOM(state, msg) {
  let message = msg.text.toUpperCase();
  Alert.classList.add(state);

  return message;
}
// remove alert
function removeAlert() {
  Alert.innerText = "";
  Alert.classList.value = "alert";
}
