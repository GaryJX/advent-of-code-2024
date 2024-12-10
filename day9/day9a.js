async function calculateChecksum() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const expandedData = [];

  let currentIndex = 0;
  for (let i = 0; i < data.length; i++) {
    const num = parseInt(data[i]);
    if (i % 2 == 0) {
      for (let j = 0; j < num; j++) {
        expandedData.push(currentIndex);
      }
      currentIndex++;
    } else {
      for (let j = 0; j < num; j++) {
        expandedData.push(".");
      }
    }
  }

  let leftIndex = 0;
  let rightIndex = expandedData.length - 1;

  while (leftIndex <= rightIndex) {
    while (leftIndex <= rightIndex && expandedData[leftIndex] !== ".") {
      leftIndex++;
    }

    while (leftIndex <= rightIndex && expandedData[rightIndex] === ".") {
      rightIndex--;
    }

    if (leftIndex <= rightIndex) {
      expandedData[leftIndex] = expandedData[rightIndex];
      expandedData[rightIndex] = ".";
      leftIndex++;
      rightIndex--;
    }
  }

  let checksum = 0;
  for (let i = 0; i < expandedData.length; i++) {
    if (expandedData[i] !== ".") {
      checksum += expandedData[i] * i;
    }
  }

  console.log(checksum);
}

calculateChecksum();
