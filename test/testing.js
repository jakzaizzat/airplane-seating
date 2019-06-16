var chai = require("chai");
var method = require("../method");

var assert = chai.assert;
var expect = chai.expect;

describe("Input Validation", function() {
  it("Return invalid if the first line of input file is not valid array", function() {
    var firstLine = "[ [2,3], [3,4],";

    var tested = method.validate2dArray(firstLine);

    expect(tested.status).to.be.equal(false);
  });

  it("Return valid if the first line of input file is a valid array", function() {
    var firstLine = "[ [2,3], [3,4], [3,2], [4,3] ] ";

    var tested = method.validate2dArray(firstLine);

    expect(tested.status).to.be.equal(true);
  });

  it("Return invalid if Passenger not an integer", function() {
    var passenger = 30.3;
    var tested = method.validatePassenger(passenger);
    expect(tested.status).to.be.equal(false);
  });

  it("Return invalid if Passenger not an integer", function() {
    var passenger = 30;
    var tested = method.validatePassenger(passenger);
    expect(tested.status).to.be.equal(true);
  });
});

describe("Draw Seats", function() {
  var arrSeats = [[2, 3], [3, 4], [3, 2], [4, 3]];
  var maxRow = 0;

  var drawResult = method.drawSeats(arrSeats, maxRow);
  it("The first input should be 2D Array", function() {
    assert.isAbove(
      drawResult.drawSeatsArr.length,
      0,
      "It should return an array of lane"
    );
  });

  it("It should return maximum row of entire lane", function() {
    assert.isAbove(drawResult.maxRow, 0, "Maximum should be greater than 0");
  });

  it("It should assign passenger category in the array", function() {
    var filterResult = drawResult.drawSeatsArr[0].filter(seat => {
      return seat == "Window" || seat == "Aisle" || seat == "Middle";
    });

    assert.isAbove(
      filterResult.length,
      0,
      "It should a have at least one element of Windiow, Aisle, Middle"
    );
  });
});

describe("Assing Passenger method", function() {
  var assingedSeats = [
    ["Window", "Middle", "Aisle", "Window", "Middle", "Aisle"],
    [
      "Aisle",
      "Middle",
      "Middle",
      "Aisle",
      "Aisle",
      "Middle",
      "Middle",
      "Aisle",
      "Aisle",
      "Middle",
      "Middle",
      "Aisle"
    ],
    ["Aisle", "Aisle", "Aisle", "Aisle", "Aisle", "Aisle"],
    [
      "Aisle",
      "Middle",
      "Window",
      "Aisle",
      "Middle",
      "Window",
      "Aisle",
      "Middle",
      "Window",
      "Aisle",
      "Middle",
      "Window"
    ]
  ];

  var params = {
    arrSeats: [[2, 3], [3, 4], [3, 2], [4, 3]],
    passengers: 30,
    passengersStarting: 1,
    maxRow: 3
  };

  it("All Aisle label will replace with number", function() {
    var results = method.assignPassenger("Aisle", assingedSeats, params);
    var pass = true;
    results.drawSeatsArr.forEach(result => {
      var filter = result.filter(item => {
        return filter === "Aisle";
      });

      if (filter.length > 0) {
        pass = false;
      }
    });

    expect(pass).to.be.equal(true);
  });

  it("All Middle label will replace with number", function() {
    var results = method.assignPassenger("Middle", assingedSeats, params);
    var pass = true;
    results.drawSeatsArr.forEach(result => {
      var filter = result.filter(item => {
        return filter === "Middle";
      });

      if (filter.length > 0) {
        pass = false;
      }
    });
    expect(pass).to.be.equal(true);
  });

  it("All Window label will replace with number", function() {
    var results = method.assignPassenger("Window", assingedSeats, params);
    var pass = true;
    results.drawSeatsArr.forEach(result => {
      var filter = result.filter(item => {
        return filter === "Window";
      });

      if (filter.length > 0) {
        pass = false;
      }
    });
    expect(pass).to.be.equal(true);
  });

  it("If the passenger less than available seats, there are empty seats with 'x' mark", function() {
    var nameArr = ["Aisle", "Window", "Middle"];
    for (var i = 0; i < nameArr.length; i++) {
      var result = method.assignPassenger(nameArr[i], assingedSeats, params);
      params = result.params;
      assingedSeats = result.drawSeatsArr;
    }

    var pass = true;
    assingedSeats.forEach(result => {
      var filter = result.filter(item => {
        return filter === "x";
      });

      if (filter.length > 0) {
        pass = false;
      }
    });
    expect(pass).to.be.equal(true);
  });
});
