async function findNumCrossMAS() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  // Note: Windows specific to split by "\r\n" instead of "\n"
  const MATRIX = data.split("\r\n").map((row) => row.split(""));
  const ROWS = MATRIX.length;
  const COLS = MATRIX[0].length;

  const dfs = (i, j, char, direction) => {
    const outOfBounds = i < 0 || i >= ROWS || j < 0 || j >= COLS;
    if (outOfBounds || MATRIX[i][j] !== char) {
      return false;
    }

    let nextChar;
    if (char === "M") {
      nextChar = "A";
    } else if (char === "A") {
      nextChar = "S";
    } else if (char === "S") {
      return true;
    }

    return dfs(i + direction[0], j + direction[1], nextChar, direction);
  };

  const directions = [
    [1, 1], // bottom right
    [1, -1], // bottom left
    [-1, -1], // top left
    [-1, 1], // top right
  ];
  const visited = new Set();

  let numCrossMAS = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      for (const direction of directions) {
        if (dfs(i, j, "M", direction)) {
          visited.add(`${i},${j},${direction[0]},${direction[1]}`);
        }
      }
    }
  }

  for (const visit of visited) {
    visited.delete(visit);
    const [i, j, x, y] = visit.split(",").map((num) => parseInt(num));
    const midI = i + x;
    const midJ = j + y;

    // Get the perpendicular directions
    const directions = [
      [x, -y],
      [-x, y],
    ];

    // Check if there is a MAS in either perpendicular direction (only one is possible)
    for (const [x2, y2] of directions) {
      if (visited.has(`${midI + x2},${midJ + y2},${-x2},${-y2}`)) {
        numCrossMAS++;
        visited.delete(`${midI + x2},${midJ + y2},${-x2},${-y2}`);
      }
    }
  }

  console.log(numCrossMAS);
}

findNumCrossMAS();
