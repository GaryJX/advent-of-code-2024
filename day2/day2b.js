function checkIsReportSafeWithOneRemovedLevel(levels, indexToRemove) {
  const newLevels = [
    ...levels.slice(0, indexToRemove),
    ...levels.slice(indexToRemove + 1),
  ];

  // The unsafe case where newLevels[0] == newLevels[1] is caught in the for loop below, so no need to check for it here
  const expectAllIncreasing = newLevels[0] < newLevels[1];

  for (let i = 0; i < newLevels.length - 1; i++) {
    const absoluteDiff = Math.abs(newLevels[i] - newLevels[i + 1]);
    if (absoluteDiff < 1 || absoluteDiff > 3) {
      // Unsafe as change is not gradual (i.e. between 1 and 3)
      return false;
    }
    if (expectAllIncreasing) {
      if (newLevels[i] > newLevels[i + 1]) {
        // Unsafe as levels are not all increasing
        return false;
      }
    } else {
      if (newLevels[i] < newLevels[i + 1]) {
        // Unsafe as levels are not all decreasing
        return false;
      }
    }
  }
  return true;
}

async function getNumSafeReports() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const reports = data.split("\n");

  let numSafeReports = 0;
  reports.forEach((report) => {
    const levels = report.split(" ").map((level) => parseInt(level));
    let isSafe = false;
    for (let i = 0; i < levels.length; i++) {
      // There is probably a more efficient approach that doesn't involve checking removing each level
      if (checkIsReportSafeWithOneRemovedLevel(levels, i)) {
        isSafe = true;
        break;
      }
    }

    if (isSafe) {
      numSafeReports += 1;
    }
  });

  console.log(numSafeReports);
}

getNumSafeReports();
