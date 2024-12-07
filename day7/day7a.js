async function calculateSumOfPossibleEquations() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const rows = data.split("\r\n");

  let result = 0;
  for (const row of rows) {
    const [targetSumStr, nums] = row.split(": ");
    const targetSum = parseInt(targetSumStr);
    const numList = nums.split(" ").map((num) => parseInt(num));

    function dfs(currentSum, nextIndexToUse) {
      if (nextIndexToUse === numList.length) {
        return targetSum === currentSum;
      }
      if (currentSum > targetSum) {
        return false;
      }

      return (
        dfs(currentSum + numList[nextIndexToUse], nextIndexToUse + 1) ||
        dfs(currentSum * numList[nextIndexToUse], nextIndexToUse + 1)
      );
    }

    if (dfs(numList[0], 1)) {
      result += targetSum;
    }
  }
  console.log(result);
}

calculateSumOfPossibleEquations();
