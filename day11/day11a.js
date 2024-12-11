async function main() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  let nums = data.split(" ").map((num) => parseInt(num));

  function blink() {
    const newNums = [];
    for (let i = 0; i < nums.length; i++) {
      const numStr = nums[i].toString();
      if (nums[i] == 0) {
        newNums.push(1);
      } else if (numStr.length % 2 == 0) {
        newNums.push(parseInt(numStr.slice(0, numStr.length / 2)));
        newNums.push(parseInt(numStr.slice(numStr.length / 2)));
      } else {
        newNums.push(nums[i] * 2024);
      }
    }
    nums = newNums;
  }

  for (let i = 0; i < 25; i++) {
    blink();
  }

  console.log(nums.length);
}

main();
