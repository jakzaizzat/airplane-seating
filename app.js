var method = require("./method");
var fs = require("fs");

var express = require("express");
var port = process.env.PORT || 3001;

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.listen(port, function() {
  console.log("Example app listening on port !");
});

app.post("/", function(req, res) {
  // Validate Passenger
  var passengersTest = method.validatePassenger(req.body.passengers);
  if (!passengersTest.status) {
    res.send(passengersTest.message);
    return;
  }

  var passengers = passengersTest.data;

  // Validate 2D Array Seats
  var seatsTest = method.validate2dArray(req.body.array);
  if (!seatsTest.status) {
    res.send(seatsTest.message);
    return;
  }

  var arrSeats = seatsTest.data;

  var result = execute(arrSeats, passengers);

  res.send(result);
});

function execute(arrSeats, passengers) {
  var lane = arrSeats.length;

  var passengersStarting = 1;
  var maxRow = 0;

  var nameArr = ["Aisle", "Window", "Middle"];

  // Draw the seats first
  var drawResult = method.drawSeats(arrSeats, maxRow);

  drawSeatsArr = drawResult.drawSeatsArr;
  maxRow = drawResult.maxRow;

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

  return method.drawFinalResult(drawSeatsArr, arrSeats);
}
