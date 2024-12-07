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

  const list1NumCounts = {};
  const list2NumCounts = {};
  list1.forEach((num) => {
    if (list1NumCounts[num]) {
      list1NumCounts[num]++;
    } else {
      list1NumCounts[num] = 1;
    }
  });
  list2.forEach((num) => {
    if (list2NumCounts[num]) {
      list2NumCounts[num]++;
    } else {
      list2NumCounts[num] = 1;
    }
  });

  let similarityScore = 0;
  for (let num in list1NumCounts) {
    if (list2NumCounts[num]) {
      similarityScore += num * list1NumCounts[num] * list2NumCounts[num];
    }
  }

  console.log(similarityScore);
}

getSimilarityScore();
