import { run, print, sum } from "../util.ts";

const main = async (input: string) => {
  // Code goes here
  const ls = input.split("\n");
  const w = ls[0].length,
    h = ls.length;

  const isColEmpty = (col: number) => {
    for (let i = 0; i < h; i++) {
      if (ls[i][col] !== ".") return false;
    }
    return true;
  };
  const isRowEmpty = (row: number) => {
    for (let i = 0; i < w; i++) {
      if (ls[row][i] !== ".") return false;
    }
    return true;
  };

  const goCols = (from: number, to: number) => {
    const [a, b] = [Math.min(from, to), Math.max(from, to)];
    let pol = 0;
    for (let i = a; i < b; i++) {
      pol += isColEmpty(i) ? 2 : 1;
    }
    return pol;
  };

  const goRows = (from: number, to: number) => {
    const [a, b] = [Math.min(from, to), Math.max(from, to)];
    let pol = 0;
    for (let i = a; i < b; i++) {
      pol += isRowEmpty(i) ? 2 : 1;
    }
    return pol;
  };

  const galaxies: [number, number][] = [];
  ls.forEach((row, rowId) => {
    row.split("").forEach((a, colId) => {
      if (a !== ".") galaxies.push([rowId, colId]);
    });
  });

  const returns: number[] = [];
  const g = [];
  print(input);
  print(w, h);

  for (let i = 0; i < galaxies.length; i++) {
    for (let o = i + 1; o < galaxies.length; o++) {
      const g1 = galaxies[i];
      const g2 = galaxies[o];
      const dc = goCols(g1[1], g2[1]);
      const dr = goRows(g1[0], g2[0]);
      returns.push(dc + dr);
      g.push([i + 1, o + 1]);

      print("DC", dc, dr);
    }
  }
  print(returns.map((r, i) => [g[i], r]));

  print("Running");
  return sum(returns);
};

await run(main, import.meta.url, "374");
