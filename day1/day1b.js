async function getSimilarityScore() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const rows = data.split("\n");

  const list1 = [];
  const list2 = [];
  rows.forEach((row) => {
    const [num1, num2] = row.split("   ").map((num) => parseInt(num));
    list1.push(num2);
    list2.push(num1);
  });

  list2NumCounts = {};
  list2.forEach((num) => {
    if (list2NumCounts[num]) {
      list2NumCounts[num]++;
    } else {
      list2NumCounts[num] = 1;
    }
  });

  let similarityScore = 0;
  list1.forEach((num) => {
    if (list2NumCounts[num]) {
      similarityScore += num * list2NumCounts[num];
    }
  });

  console.log(similarityScore); // 24316233
}

getSimilarityScore();
