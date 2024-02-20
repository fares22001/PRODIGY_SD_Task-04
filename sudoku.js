function solveSudoku() {
  var sudoku = [];
  for (var i = 0; i < 9; i++) {
    sudoku.push([]);
    for (var j = 0; j < 9; j++) {
      var cellValue = document
        .getElementById("cell-" + i + "-" + j)
        .value.trim();
      sudoku[i].push(cellValue === "" ? 0 : parseInt(cellValue));
    }
  }

  if (solve(sudoku)) {
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        document.getElementById("cell-" + i + "-" + j).value = sudoku[i][j];
      }
    }
  } else {
    alert("No solution exists!");
  }
}

function solve(grid) {
  var emptyCell = findEmptyCell(grid);
  if (!emptyCell) {
    return true;
  }

  var row = emptyCell[0];
  var col = emptyCell[1];

  for (var num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (solve(grid)) {
        return true;
      }

      grid[row][col] = 0;
    }
  }

  return false;
}

function findEmptyCell(grid) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function isSafe(grid, row, col, num) {
  return (
    !usedInRow(grid, row, num) &&
    !usedInCol(grid, col, num) &&
    !usedInBox(grid, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(grid, row, num) {
  return grid[row].includes(num);
}

function usedInCol(grid, col, num) {
  for (var i = 0; i < 9; i++) {
    if (grid[i][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(grid, startRow, startCol, num) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return true;
      }
    }
  }
  return false;
}

// Populate initial Sudoku grid
var sudokuContainer = document.getElementById("sudoku-container");
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    var inputCell = document.createElement("input");
    inputCell.setAttribute("id", "cell-" + i + "-" + j);
    inputCell.setAttribute("class", "input-cell");
    inputCell.setAttribute("type", "text");
    inputCell.setAttribute("maxlength", "1");
    inputCell.setAttribute("pattern", "[1-9]");
    sudokuContainer.appendChild(inputCell);
  }
}
