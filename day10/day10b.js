async function calculateSumTrailheadRatings() {
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

  function dfs(i, j, num, visitedMap) {
    if (!isInBounds(i, j) || MATRIX[i][j] !== num) {
      return;
    }

    if (num == 9) {
      if (!visitedMap[`${i},${j}`]) {
        visitedMap[`${i},${j}`] = 0;
      }
      visitedMap[`${i},${j}`]++;
      return;
    }

    for (const [dx, dy] of direction) {
      dfs(i + dx, j + dy, num + 1, visitedMap);
    }
  }

  let result = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const num = MATRIX[i][j];
      if (num === 0) {
        var visitedMap = {};
        dfs(i, j, num, visitedMap);
        result += Object.values(visitedMap).reduce(
          (acc, currentValue) => acc + currentValue,
          0
        );
      }
    }
  }
  console.log(result);
}

calculateSumTrailheadRatings();
