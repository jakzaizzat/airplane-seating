var method = require("./method");

var fs = require("fs");

try {
  fs.readFile("input.txt", "utf-8", (err, file) => {
    const lines = file.split("\n");

    // Validate 2D Array Seats
    var seatsTest = method.validate2dArray(lines[0]);
    if (!seatsTest.status) {
      console.log(seatsTest.message);
      return;
    }

    var arrSeats = seatsTest.data;

    // Validate Passenger
    var passengersTest = method.validatePassenger(lines[1]);
    if (!passengersTest.status) {
      console.log(passengersTest.message);
      return;
    }
    var passengers = passengersTest.data;

    // Run main function
    execute(arrSeats, passengers);
  });
} catch (err) {
  console.log("Message: ", err.stack);
}

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

  method.drawFinalResult(drawSeatsArr, arrSeats);
}
