import { run, print, sum } from "../util.ts";

const main = async (input: string) => {
  // Code goes here

  const lines = input.split("\n");
  const partNums: number[] = [];
  let gears = new Map<string, number[]>();
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    for (let j = 0; j < line.length; j++) {
      if (isNaN(parseInt(line[j]))) continue;

      const startIdx = j;
      while (!isNaN(parseInt(line[j]))) {
        j++;
      }

      const num = parseInt(line.slice(startIdx, j));

      let added = false;

      for (
        let k = Math.max(lineIdx - 1, 0);
        k <= Math.min(lineIdx + 1, lines.length - 1);
        k++
      ) {
        const adjacentLine = lines[k].slice(Math.max(startIdx - 1, 0), j + 1);
        for (let g = 0; g < adjacentLine.length; g++) {
          const key = k + ":" + (g + Math.max(startIdx - 1, 0));
          if (adjacentLine[g] == "*") {
            const v = gears.get(key);
            if (v) {
              v.push(num);
            } else {
              gears.set(key, [num]);
            }
          }
        }
        if (adjacentLine.match(/[^0-9.]/g)?.length) {
          if (!added) partNums.push(num);
          added = true;
        }
      }
    }
  }

  const realGears = [...gears].map((a) => a[1]).filter((a) => a.length == 2);
  const ratios = (realGears.map(([a, b]) => a * b));

  return sum(ratios);
};

await run(main, import.meta.url, "4361");
