async function getTotalDistance() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const rows = data.split("\n");

  const list1 = [];
  const list2 = [];
  rows.forEach((row) => {
    const [num1, num2] = row.split("   ").map((num) => parseInt(num));
    list1.push(num1);
    list2.push(num2);
  });
  list1.sort();
  list2.sort();

  let totalDistance = 0;
  for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }
  console.log(totalDistance);
}

getTotalDistance();
