async function calculateNumDistinctGuardPositions() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  // Note: Windows specific to split by "\r\n" instead of "\n"
  const MATRIX = data.split("\r\n").map((row) => row.split(""));
  const ROWS = MATRIX.length;
  const COLS = MATRIX[0].length;

  function findGuardStartingPosition() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (MATRIX[i][j] === "^") {
          return [i, j];
        }
      }
    }
  }

  function isInBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  }

  const visited = new Set();
  let [row, col] = findGuardStartingPosition();
  let direction = [-1, 0]; // Up

  const directionMap = {
    "(-1,0)": [0, 1], // Up -> Right
    "(0,1)": [1, 0], // Right -> Down
    "(1,0)": [0, -1], // Down -> Left
    "(0,-1)": [-1, 0], // Left -> Up
  };

  while (isInBounds(row, col)) {
    visited.add(`${row},${col}`);

    // Hit an obstacle, turn right
    while (
      isInBounds(row + direction[0], col + direction[1]) &&
      MATRIX[row + direction[0]][col + direction[1]] === "#"
    ) {
      direction = directionMap[`(${direction[0]},${direction[1]})`];
    }

    row = row + direction[0];
    col = col + direction[1];
  }

  console.log(visited.size);
}

calculateNumDistinctGuardPositions();
