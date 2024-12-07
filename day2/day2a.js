async function getNumSafeReports() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const reports = data.split("\n");

  let numSafeReports = 0;
  reports.forEach((report) => {
    const levels = report.split(" ").map((level) => parseInt(level));
    // The unsafe case where levels[0] == levels[1] is caught in the for loop below, so no need to check for it here
    const expectAllIncreasing = levels[0] < levels[1];

    for (let i = 0; i < levels.length - 1; i++) {
      const absoluteDiff = Math.abs(levels[i] - levels[i + 1]);
      if (absoluteDiff < 1 || absoluteDiff > 3) {
        // Unsafe as change is not gradual (i.e. between 1 and 3)
        return;
      }
      if (expectAllIncreasing) {
        if (levels[i] > levels[i + 1]) {
          // Unsafe as levels are not all increasing
          return;
        }
      } else {
        if (levels[i] < levels[i + 1]) {
          // Unsafe as levels are not all decreasing
          return;
        }
      }
    }

    numSafeReports += 1;
  });

  console.log(numSafeReports);
}

getNumSafeReports();
