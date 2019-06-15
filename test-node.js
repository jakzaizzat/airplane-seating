module.exports = {
  drawSeats: function(arrSeats, maxRow) {
    var lane = arrSeats.length;

    var drawSeatsArr = [];
    arrSeats.forEach((seat, index) => {
      var eachSeat = "";

      // Loop Row & Column
      var tempArr = [];
      for (var row = 0; row < seat[0]; row++) {
        if (row > maxRow) {
          maxRow = row;
        }
        for (var col = 0; col < seat[1]; col++) {
          var typeofSeats = "Aisle";

          // Check is it middle seaat
          if (col !== 0 && col !== seat[1] - 1) {
            typeofSeats = "Middle";
          }

          // Check is it window seat
          if (
            (index === 0 && col == 0) ||
            (index === lane - 1 && col === seat[1] - 1)
          ) {
            typeofSeats = "Window";
          }

          // Maybe its Asle seat
          eachSeat += "[" + typeofSeats + "] ";
          tempArr.push(typeofSeats);
        }
        eachSeat += "\n";
      }

      drawSeatsArr.push(tempArr);
    });

    var result = {
      drawSeatsArr: drawSeatsArr,
      maxRow: maxRow
    };
    return result;
  },

  assignPassenger: function(name, drawSeatsArr, params) {
    var rowChecked = 1;
    var params = params;
    for (var i = 1; i <= params.maxRow + 1; i++) {
      drawSeatsArr.forEach((seat, index) => {
        var changeLane = false;
        var column = params.arrSeats[index][1];

        while (!changeLane) {
          var indexFound = seat.indexOf(name) + 1;
          var currentRow = Math.ceil(indexFound / column);
          if (rowChecked !== currentRow) {
            changeLane = true;
          }

          if (indexFound && !changeLane) {
            drawSeatsArr[index][indexFound - 1] = params.passengersStarting;
            if (params.passengersStarting < 30) {
              params.passengersStarting++;
            } else {
              params.passengersStarting = "x";
            }
          } else {
            changeLane = true;
          }
        }
      });
      rowChecked++;
    }

    var result = {
      drawSeatsArr: drawSeatsArr,
      params: params
    };
    return result;
  }
};
