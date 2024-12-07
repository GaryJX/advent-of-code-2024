async function getSumOfUncorruptedMuls() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  let totalSum = 0;
  let i = 0;
  while (i < data.length) {
    if (data.slice(i, i + 4) == "mul(") {
      const startIndex = i + 4;
      let endIndex = startIndex;
      while (endIndex < data.length && data[endIndex] != ")") {
        endIndex++;
      }
      if (endIndex == data.length) {
        break;
      }

      // Note: Better way would be manually check each character instead of this approach, which has more edge cases to cover
      const nums = data.slice(startIndex, endIndex).split(",");
      if (nums.length > 2) {
        i++;
        continue;
      }
      const num1 = parseInt(nums[0]);
      const num2 = parseInt(nums[1]);

      if (
        isNaN(num1) ||
        num1.toString() !== nums[0] ||
        isNaN(num2) ||
        num2.toString() !== nums[1]
      ) {
        i++;
        continue;
      }

      totalSum += num1 * num2;
    }
    i++;
  }

  console.log(totalSum);
}

getSumOfUncorruptedMuls();
