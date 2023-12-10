import { run, print, sum } from "../util.ts";
// 19:26:30
// 19:38:57
// 19:44:28

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const ls = input.split("\n").map((a) => a.split(" ").map((a) => parseInt(a)));
  const vals = ls.map((his) => {
    let hs = [his];
    while (!hs[hs.length - 1].every((a) => a == 0)) {
      const last = hs[hs.length - 1];
      const newp: number[] = [];
      for (let i = 0; i < last.length - 1; i++) {
        newp.push(last[i + 1] - last[i]);
      }
      hs.push(newp);
    }
    return hs;
  });
  let c = 0;
  let f = 0; // part2
  const newVals = vals.slice(); // part2
  const v = vals.map((val, o) => {
    for (let i = val.length - 1 - 1; i >= 0; i--) {
      const currRow = val[i];
      const prevRow = val[i + 1];
      c = currRow[currRow.length - 1] + prevRow[prevRow.length - 1];
      f = currRow[0] - prevRow[0]; // part2
      val[i].push(c);
      val[i][-1] = f; // part2
      newVals[o][i] = [f, ...newVals[o][i]]; // part2
    }
    return [c, f];
  });
  print(newVals);
  return sum(v.map(([a, b]) => b)); // part2
  return sum(v.map(([c, f]) => c));
};

await run(main, import.meta.url, "114");
