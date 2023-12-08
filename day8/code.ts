import { run, print, sum } from "../util.ts";
// 21:31
// 21:42 🌟
// 
const main = async (input: string) => {
  // Code goes here
  print("Running");
  const ls = input.split("\n");
  const dirs = ls
    .shift()!
    .split("")
    .map((a) => ({ L: 0, R: 1 }[a]));

  const lookup = ls
    .map((a) => a.trim())
    .filter((a) => !!a)
    .reduce((map, line) => {
      const [from, to] = line.split(" = ");
      return {
        ...map,
        [from]: to.slice(1, -1).split(", "),
      };
    }, {});

  print(lookup);
  let current = "AAA";
  let counter = 0;
  while (current !== "ZZZ") {
    const d = dirs[counter % dirs.length];
    print(current, d);
    current = lookup[current][d];
    counter++;
  }
  return counter;
};

await run(main, import.meta.url, "2");
