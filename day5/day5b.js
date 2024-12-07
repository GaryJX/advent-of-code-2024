function topologicalSort(pages, pageRulesMap) {
  const visited = new Set();
  const stack = [];

  function dfs(page) {
    visited.add(page);
    for (const prereq of pageRulesMap[page] ?? []) {
      if (pages.includes(prereq) && !visited.has(prereq)) {
        dfs(prereq);
      }
    }
    // Push to stack after visiting all prereqs
    stack.push(page);
  }

  for (const page of pages) {
    if (!visited.has(page)) {
      dfs(page);
    }
  }

  // Reverse the stack in order to get the topological order
  return stack.reverse();
}

async function findMiddlePageSumOfCorrectlyOrderedUpdates() {
  const fs = require("fs/promises");
  const data = await fs.readFile("./input.txt", "utf8");
  const rows = data.split("\r\n");
  let breakIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === "") {
      breakIndex = i;
      break;
    }
  }
  const pageRules = rows.slice(0, breakIndex);
  const pageRulesMap = {};
  for (const rule of pageRules) {
    const [prereq, page] = rule.split("|");
    if (!pageRulesMap[page]) {
      pageRulesMap[page] = [];
    }
    pageRulesMap[page].push(prereq);
  }

  let result = 0;
  const updates = rows.slice(breakIndex + 1);
  for (const update of updates) {
    let isValid = true;
    let pages = update.split(",");
    const prereqs = new Set();
    for (const page of pages) {
      if (prereqs.has(page)) {
        isValid = false;
        break;
      }
      for (const prereq of pageRulesMap[page]) {
        prereqs.add(prereq);
      }
    }

    if (!isValid) {
      // Sort `pages` topologically
      pages = topologicalSort(pages, pageRulesMap);
      result += parseInt(pages[Math.floor(pages.length / 2)]);
    }
  }
  console.log(result);
}

findMiddlePageSumOfCorrectlyOrderedUpdates();
