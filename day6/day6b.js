async function calculateNumDistinctObstaclePositionsToLoop() {
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

  const visited = {};
  let [startRow, startCol] = findGuardStartingPosition();
  let direction = [-1, 0]; // Up

  const directionMap = {
    "(-1,0)": [0, 1], // Up -> Right
    "(0,1)": [1, 0], // Right -> Down
    "(1,0)": [0, -1], // Down -> Left
    "(0,-1)": [-1, 0], // Left -> Up
  };

  let [row, col] = [startRow, startCol];
  while (isInBounds(row, col)) {
    if (!visited[`${row},${col}`]) {
      visited[`${row},${col}`] = [direction[0], direction[1]];
    }

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

  // Cannot place an obstacle at the starting position
  delete visited[`${startRow},${startCol}`];

  let result = 0;
  // TODO: Also need to care about the direction the guard is facing when it reaches this position
  // TODO: For each position the guard will visit, check if placing an obstacle there will cause a loop

  for (const key in visited) {
    const [obstacleRow, obstacleCol] = key
      .split(",")
      .map((num) => parseInt(num));
    let direction = visited[key];
    direction[0] = parseInt(direction[0]);
    direction[1] = parseInt(direction[1]);

    MATRIX[obstacleRow][obstacleCol] = "#";

    // Start from the position immediately before hitting the new obstacle (saves some processing cycles vs. starting from the guard's starting position)
    let [row, col] = [obstacleRow - direction[0], obstacleCol - direction[1]];
    const visitedWithDirection = {};
    while (isInBounds(row, col)) {
      const key = `${row},${col},${direction[0]},${direction[1]}`;
      if (!visitedWithDirection[key]) {
        visitedWithDirection[key] = 0;
      }
      visitedWithDirection[key]++;
      // If the same position (in the same direction) is visited more than once, then the guard is in a loop
      if (visitedWithDirection[key] >= 2) {
        result++;
        break;
      }

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

    MATRIX[obstacleRow][obstacleCol] = ".";
  }

  console.log(result);
}

calculateNumDistinctObstaclePositionsToLoop();
