async function calculateSumTrailheadScores() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  // Note: Windows specific to split by "\r\n" instead of "\n"
  const MATRIX = data
    .split("\r\n")
    .map((row) => row.split("").map((char) => parseInt(char)));
  const ROWS = MATRIX.length;
  const COLS = MATRIX[0].length;

  function isInBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  }

  const direction = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  function dfs(i, j, num, visitedSet) {
    if (!isInBounds(i, j) || MATRIX[i][j] !== num) {
      return 0;
    }

    if (num == 9) {
      if (visitedSet.has(`${i},${j}`)) {
        return 0;
      }
      visitedSet.add(`${i},${j}`);
      return 1;
    }

    let result = 0;
    for (const [dx, dy] of direction) {
      result += dfs(i + dx, j + dy, num + 1, visitedSet);
    }
    return result;
  }

  let result = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const num = MATRIX[i][j];
      if (num === 0) {
        result += dfs(i, j, num, new Set());
      }
    }
  }
  console.log(result);
}

calculateSumTrailheadScores();
