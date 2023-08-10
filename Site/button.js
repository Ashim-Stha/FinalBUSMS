const addEmp = document.getElementById("addEmp");
const modEmp = document.getElementById("modEmp");
const addBus = document.getElementById("addBus");
const modBus = document.getElementById("modBus");
const addCity = document.getElementById("addCity");
const modCity = document.getElementById("modCity");

const addRoute = document.getElementById("addRoute");
const modRoute = document.getElementById("modRoute");

const addStage = document.getElementById("addStage");
const modStage = document.getElementById("modStage");

const addCityStage = document.getElementById("addCityinStage");
const modCityStage = document.getElementById("modCityinStage");

addEmp.addEventListener("click", function () {
  window.location.href = "signup.html";
});

modEmp.addEventListener("click", function () {
  window.location.href = "ModifyEmployee.html";
});

addCityStage.addEventListener("click", function () {
  window.location.href = "CityInStage.html";
});

// modCityStage.addEventListener("click", function () {
//   window.location.href = "ModifyEmployee.html";
// });

addStage.addEventListener("click", function () {
  window.location.href = "StageAdd.html";
});

modStage.addEventListener("click", function () {
  window.location.href = "StageModify.html";
});

addBus.addEventListener("click", function () {
  window.location.href = "busRegister.html";
});

modBus.addEventListener("click", function () {
  window.location.href = "BusModify.html";
});

addAssign.addEventListener("click", function () {
  window.location.href = "addAssignment.html";
});

modAssign.addEventListener("click", function () {
  window.location.href = "modifyAssignment.html";
});

delAssign.addEventListener("click", function () {
  window.location.href = "AssignmentModify.html";
});

addCity.addEventListener("click", function () {
  window.location.href = "CityAdd.html";
});

modCity.addEventListener("click", function () {
  window.location.href = "CityModify.html";
});

addRoute.addEventListener("click", function () {
  window.location.href = "RouteAdd.html";
});

modRoute.addEventListener("click", function () {
  window.location.href = "RouteModify.html";
});
