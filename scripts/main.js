document.addEventListener('DOMContentLoaded', function(){
  var matrix = [[0, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]];
  generateGrid(matrix);

  function generateGrid(matrix){
    var $table = document.querySelector('#grid');
    $table.innerHTML = '';
    // matrix => [0, 0, 0]
    //           [1, 1, 1]
    //           [0, 0, 0]

    matrix.forEach(function(row){ // first time, row => [0, 0, 0]
      // create a tr for the row
      var $tr = document.createElement('tr');
      row.forEach(function(cell){ // first time, cell => 0
        // cell goes into a new td
        // that td goes into a tr
        var $td = createTableCell(cell);
        $td.textContent = cell;
        $tr.appendChild($td);
        // alternative:
        // $tr.appendChild( createTableCell(cell) );
      });
      // add that tr to the table
      $table.appendChild($tr);
    });
  }

  function createTableCell(value){
    var $td = document.createElement('td');
    // Apply alive or dead class to the td
    if(value === 1){
      $td.classList.add('alive');
    } else {
      $td.classList.add('dead');
    }
    return $td;
  }


  function livingNeighborCount(x, y){
    var neighbor = 0;
     for (var i = x - 1; i <= x + 1; i++) {
       if(i < 0 || i > (matrix.length - 1)) {
       }
       else {
       for (var j= y -1; j <= y + 1; j++) {
        if ( j < 0 || j > (matrix[i].length-1) || (j === y && i === x)) {
        }
        else { // return "";
          if (matrix[i][j] === 1) {
            neighbor += 1;
          }
        }
      }
    }
  }
     return neighbor;
}


  function calculateNextState(currentState){
    var nextState = [];
    currentState.forEach(function(currentRow, x){
      var nextRow = [];
      currentRow.forEach(function(currentCell, y){
        var nextCellState;
        var count = livingNeighborCount(x, y);
            if (count < 2) {
             nextCellState = 0;
          }
            if (count === 2 || count === 3) {
             nextCellState  = 1;
          }
            if (count > 3) {
              nextCellState = 0;
          }
            if (count === 3) {
              nextCellState = 1;
          }


        // Rule 1. Less than 2 neighbors = die of loneliness
        // Rule 2. Things stay the same unless they change (inertia)
        // Rule 3. More than 3 neighbors = death by overpopulation
        // Rule 4. Exactly 3 neighbors = birth
        nextRow.push(nextCellState );
      });
      nextState.push(nextRow);
    });
    return nextState;
  }
    function addCells(matrix, calculateNextState) {

    }

  document.querySelector("#tick").addEventListener('click', function(){
    // Tick button has been pressed
    matrix = calculateNextState(matrix);
    generateGrid(matrix);

  });
});
