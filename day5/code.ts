import { run, print, sum, equal } from "../util.ts";

const main = async (input: string) => {
  const lines = input.split("\n");
  const seeds = lines.shift()?.split(":")[1].trim().split(" ")!;
  const maps: any[] = [];
  let results = seeds.map((s) => parseInt(s));
  let handled = results.map((a) => false);

  for (const line of lines) {
    if (line.includes("map:")) {
      handled = handled.map((a) => false);
    } else if (line.length > 0) {
      const [dest, source, range] = line.split(" ").map((s) => parseInt(s));
      for (let s = 0; s < results.length; s++) {
        if (handled[s]) continue;
        if (results[s] >= source && results[s] < source + range) {
          // print(results[s], results[s] - source + dest);
          results[s] = results[s] - source + dest;
          handled[s] = true;
        }
      }
    }
  }
  return Math.min(...results);
};

const divideSeedRange = (
  [seedIdx, seedRange]: number[],
  [sourceIdx, sourceRange]: number[]
): number[][] => {
  // potential splitpoints:
  // sourceIdx, sourceIdx+sourceRange
  const newSeeds: number[][] = [];
  let cursor = seedIdx;
  if (sourceIdx > seedIdx && sourceIdx < seedIdx + seedRange) {
    newSeeds.push([cursor, sourceIdx - cursor]);
    cursor = sourceIdx;
  }
  if (
    sourceIdx + sourceRange > seedIdx &&
    sourceIdx + sourceRange < seedIdx + seedRange
  ) {
    newSeeds.push([cursor, sourceIdx + sourceRange - cursor]);
    cursor = sourceIdx + sourceRange;
  }
  newSeeds.push([cursor, seedIdx + seedRange - cursor]);

  const sumrange = newSeeds.map((s) => s[1]);
  console.assert(sum(sumrange) == seedRange);

  // console.log(seedIdx, seedRange, sourceIdx, destIdx, sourceRange);
  // console.log(out.join(" - "));
  // print("-----------");

  return newSeeds;
};

const part2 = async (input: string) => {
  const lines = input.split("\n");
  const seeds = lines
    .shift()
    ?.split(":")[1]
    .trim()
    .split(" ")
    .map((a) => parseInt(a))!;

  let seedRanges: number[][] = [];

  for (let s = 0; s < seeds.length; s++) {
    const k = (s / 2) | 0;
    seedRanges[k] ||= [];
    seedRanges[k].push(seeds[s]);
  }
  const groups = lines.join("\n").split("\n\n");
  for (const g of groups) {
    // print("GROUP", g.trim().split("\n")[0]);
    const copy = seedRanges.slice().map((a) => a.slice());
    seedRanges = [];
    const ls = g.trim().split("\n").slice(1);
    for (let cn = 0; cn < copy.length; cn++) {
      let c = copy[cn];
      let out: any = null;
      for (const l of ls) {
        const [dst, src, rng] = l.split(" ").map((s) => parseInt(s));
        out = divideSeedRange(c, [src, rng]);
        if (out.length > 1) {
          copy.splice(cn, 1);
          cn -= 1;
          copy.push(...out);
          break;
        }
      }
    }

    const out = copy.map(([seedIdx, seedRange]) => {
      for (const l of ls) {
        const [dst, src, rng] = l.split(" ").map((s) => parseInt(s));
        if (seedIdx == src) {
          return [dst, seedRange];
        }
        if (src <= seedIdx && seedIdx + seedRange <= src + rng) {
          return [seedIdx - src + dst, seedRange];
        }
      }
      return [seedIdx, seedRange];
    });
    seedRanges = out;
    // print(out);
  }

  let min = Math.min(...seedRanges.map((s) => s[0]));
  return min;
};

// tests
console.assert(equal([1, 2, 3], [1, 2, 3]));
console.assert(!equal([1, 2, 3], [2, 2, 3]));
console.assert(
  !equal(
    [
      [1, 2],
      [2, 3],
    ],
    [
      [2, 3],
      [1, 2],
    ]
  )
);

console.assert(
  equal(divideSeedRange([50, 100], [60, 20]), [
    [50, 10],
    [60, 20],
    [80, 70],
  ])
);
console.assert(equal(divideSeedRange([50, 100], [20, 1000]), [[50, 100]]));
console.assert(equal(divideSeedRange([50, 100], [50, 100]), [[50, 100]]));
console.assert(
  equal(divideSeedRange([50, 50], [90, 1]), [
    [50, 40],
    [90, 1],
    [91, 9],
  ])
);

await run(main, import.meta.url, "35");
await run(part2, import.meta.url, "46");
