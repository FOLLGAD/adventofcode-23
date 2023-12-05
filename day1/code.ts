import { run, print, sum } from "../util.ts";

const main = async (input: string) => {
  // Code goes here
  const lines = input.split("\n").map((l) => {
    const matches = l.match(/\d/g)!;
    return matches[0] + matches[matches?.length - 1];
  });
  print(lines);

  return sum(lines.map((l) => parseInt(l)));
};

const nums = [
  null,
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const part2 = async (input: string) => {
  const oldInput = input;
  const inputs = nums
    .filter((a) => a !== null)
    .concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const lines = input.split("\n").map((l) => {
    let firstIdx = Infinity;
    let firstInp = "";
    for (const inp of inputs) {
      const idx = l.indexOf(inp!);
      if (idx !== -1 && idx < firstIdx) {
        firstIdx = idx;
        firstInp = inp!;
      }
    }
    let lastIdx = -1;
    let lastInp = "";
    for (const inp of inputs) {
      const idx = l.lastIndexOf(inp!);
      if (idx !== -1 && idx > lastIdx) {
        lastIdx = idx;
        lastInp = inp!;
      }
    }
    print(l, firstInp, lastInp);
    firstInp = nums.includes(firstInp) ? nums.indexOf(firstInp) : firstInp;
    lastInp = nums.includes(lastInp) ? nums.indexOf(lastInp) : lastInp;
    print(l, firstInp, lastInp);
    print("---");

    return firstInp + "" + lastInp;
  });
  print(lines, lines.length);

  const l1 = input.split("\n");
  const l2 = oldInput.split("\n");
  for (let i = 0; i < l1.length; i++) {
    print(l2[i], l1[i], lines[i]);
  }

  return sum(lines.map((l) => parseInt(l)));
};

await run(part2, import.meta.url);
