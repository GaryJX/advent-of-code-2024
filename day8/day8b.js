async function calculateNumAntinodeLocations() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  // Note: Windows specific to split by "\r\n" instead of "\n"
  const MATRIX = data.split("\r\n").map((row) => row.split(""));
  const ROWS = MATRIX.length;
  const COLS = MATRIX[0].length;

  const antennasMap = {};
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const char = MATRIX[i][j];
      if (char !== ".") {
        if (!antennasMap[char]) {
          antennasMap[char] = [];
        }
        antennasMap[char].push([i, j]);
      }
    }
  }

  let antinodeLocations = new Set();

  function isInBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  }

  for (const [_, positions] of Object.entries(antennasMap)) {
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        // Include the antennas in the antinode location set (as long as there are at least 2 antennas of the same frequency)
        antinodeLocations.add(`${positions[i][0]},${positions[i][1]}`);
        antinodeLocations.add(`${positions[j][0]},${positions[j][1]}`);

        const xDiff = positions[i][0] - positions[j][0];
        const yDiff = positions[i][1] - positions[j][1];

        // Try both directions extending out from a pair of antennas
        let [x1, y1] = [positions[i][0] + xDiff, positions[i][1] + yDiff];
        while (isInBounds(x1, y1)) {
          antinodeLocations.add(`${x1},${y1}`);
          x1 += xDiff;
          y1 += yDiff;
        }

        let [x2, y2] = [positions[j][0] - xDiff, positions[j][1] - yDiff];
        while (isInBounds(x2, y2)) {
          antinodeLocations.add(`${x2},${y2}`);
          x2 -= xDiff;
          y2 -= yDiff;
        }
      }
    }
  }

  console.log(antinodeLocations.size);
}

calculateNumAntinodeLocations();
