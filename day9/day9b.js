async function calculateChecksum() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const expandedData = [];

  // Note: A linked list here would make this more efficient for popping elements from start/middle of array
  // Represents [startIndex, size] of free space
  const freeSpaceList = [];
  // Represents [startIndex, size] of used space
  const usedSpaceList = [];

  let currentIndex = 0;
  for (let i = 0; i < data.length; i++) {
    const num = parseInt(data[i]);
    if (i % 2 == 0) {
      usedSpaceList.push([expandedData.length, num]);
      for (let j = 0; j < num; j++) {
        expandedData.push(currentIndex);
      }
      currentIndex++;
    } else {
      freeSpaceList.push([expandedData.length, num]);
      for (let j = 0; j < num; j++) {
        expandedData.push(".");
      }
    }
  }

  // Traverse through usedSpaceList in reverse order
  for (let i = usedSpaceList.length - 1; i >= 0; i--) {
    const [startIndex, size] = usedSpaceList[i];
    for (let j = 0; j < freeSpaceList.length; j++) {
      const [freeStartIndex, freeSize] = freeSpaceList[j];
      // Don't check for free spaces to the right of the used space
      if (freeStartIndex >= startIndex) {
        break;
      }

      // Can fit into this free space
      if (size <= freeSize) {
        for (let k = 0; k < size; k++) {
          expandedData[freeStartIndex + k] = expandedData[startIndex + k];
          expandedData[startIndex + k] = ".";
        }

        if (size == freeSize) {
          // Remove the space from freeSpaceList, it is all filled up
          freeSpaceList.splice(j, 1);
        } else {
          // Update the free size to reflect the new startIndex and size after partially filling it up
          freeSpaceList[j][0] += size;
          freeSpaceList[j][1] -= size;
        }
        break;
      }
    }
  }

  console.log(expandedData.join(""));

  let checksum = 0;
  for (let i = 0; i < expandedData.length; i++) {
    if (expandedData[i] !== ".") {
      checksum += expandedData[i] * i;
    }
  }

  console.log(checksum);
}

calculateChecksum();
