var method = require("./test-node");

// Output
// Mapping function

var arrSeats = [[2, 3], [3, 4], [3, 2], [4, 3]];
var passengers = 30;

var lane = arrSeats.length;

var passengersStarting = 1;
var maxRow = 0;

// Draw the seats first

var drawResult = method.drawSeats(arrSeats, maxRow);

drawSeatsArr = drawResult.drawSeatsArr;
maxRow = drawResult.maxRow;

//console.log(drawSeatsArr);
var nameArr = ["Aisle", "Window", "Middle"];

var params = {
  arrSeats: arrSeats,
  passengers: passengers,
  passengersStarting: 1,
  maxRow: maxRow
};
for (var i = 0; i < nameArr.length; i++) {
  var result = method.assignPassenger(nameArr[i], drawSeatsArr, params);
  params = result.params;
  drawSeatsArr = result.drawSeatsArr;
}

console.log(drawSeatsArr);
