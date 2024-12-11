async function main() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");

  let nums = data.split(" ").map((num) => parseInt(num));
  const numsDict = {};
  nums.forEach((num) => {
    if (!(num in numsDict)) {
      numsDict[num] = 0;
    }
    numsDict[num]++;
  });

  const dp = { 0: [1] };

  function blink() {
    Object.entries(numsDict).forEach((entry) => {
      let [num, count] = entry;
      num = parseInt(num);

      // Nice to have optimization, but not a requirement, since computing the next number(s) is not too expensive
      if (num in dp) {
        for (const newNum of dp[num]) {
          if (!(newNum in numsDict)) {
            numsDict[newNum] = 0;
          }
          numsDict[newNum] += count;
        }
        numsDict[num] -= count;
        if (numsDict[num] == 0) {
          delete numsDict[num];
        }
        return;
      }

      const next = [];
      const numStr = num.toString();
      if (num === 0) {
        next.push(1);
      } else if (numStr.length % 2 == 0) {
        const power = Math.pow(10, numStr.length / 2);
        next.push(Math.floor(num / power));
        next.push(num % power);
      } else {
        next.push(num * 2024);
      }
      dp[num] = next;
      for (const newNum of dp[num]) {
        if (!(newNum in numsDict)) {
          numsDict[newNum] = 0;
        }
        numsDict[newNum] += count;
      }
      numsDict[num] -= count;
      if (numsDict[num] == 0) {
        delete numsDict[num];
      }
    });
  }

  for (let i = 0; i < 75; i++) {
    blink();
  }

  console.log(Object.values(numsDict).reduce((acc, val) => acc + val, 0));
}

main();
