async function findNumXMAS() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  // Note: Windows specific to split by "\r\n" instead of "\n"
  const MATRIX = data.split("\r\n").map((row) => row.split(""));
  const ROWS = MATRIX.length;
  const COLS = MATRIX[0].length;

  const dfs = (i, j, char, direction = undefined) => {
    const outOfBounds = i < 0 || i >= ROWS || j < 0 || j >= COLS;
    if (outOfBounds || MATRIX[i][j] !== char) {
      return 0;
    }

    let directions;
    if (direction === undefined) {
      // The initial search (starting from X) can go in any direction
      directions = [
        [0, 1], // right
        [1, 1], // bottom right
        [1, 0], // bottom
        [1, -1], // bottom left
        [0, -1], // left
        [-1, -1], // top left
        [-1, 0], // top
        [-1, 1], // top right
      ];
    } else {
      // Subsequent letter searches must be in the same direction as its parent (i.e. the word must be in a straight line)
      directions = [direction];
    }

    let nextChar;
    if (char === "X") {
      nextChar = "M";
    } else if (char === "M") {
      nextChar = "A";
    } else if (char === "A") {
      nextChar = "S";
    } else if (char === "S") {
      return 1;
    }

    let result = 0;
    for (const [x, y] of directions) {
      result += dfs(i + x, j + y, nextChar, [x, y]);
    }
    return result;
  };

  let numXMAS = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      numXMAS += dfs(i, j, "X");
    }
  }

  console.log(numXMAS);
}

findNumXMAS();
