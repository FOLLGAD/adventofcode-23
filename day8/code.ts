import { run, print, sum } from "../util.ts";
// 21:31
// 21:42 🌟
// 22:04 🌟🌟
function primeFactors(n) {
  const factors: number[] = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const ls = input.split("\n");
  const dirs = ls
    .shift()!
    .split("")
    .map((a) => ({ L: 0, R: 1 }[a]));

  const startPoints: string[] = [];

  const lookup = ls
    .map((a) => a.trim())
    .filter((a) => !!a)
    .reduce((map, line) => {
      const [from, to] = line.split(" = ");
      if (from.endsWith("A")) startPoints.push(from);
      return {
        ...map,
        [from]: to.slice(1, -1).split(", "),
      };
    }, {});

  print(lookup);

  // calc the time to do a loop for each starting point
  let circleTimes = startPoints.map((current) => {
    let counter = 0;
    while (!current.endsWith("Z")) {
      const d = dirs[counter % dirs.length];
      current = lookup[current][d];
      counter++;
    }
    return counter;
  });

  // calc the prime factors
  const c = circleTimes.map(primeFactors).reduce((obj, val) => {
    const me = {};
    for (let item of val) {
      me[item] ||= 0;
      me[item]++;
    }
    for (let a of Object.keys(me)) {
      obj[a] = Math.max(obj[a] || 0, me[a]);
    }
    return obj;
  }, {});

  // find the LCM of all circleTimes
  let k = Object.entries(c).reduce(
    (a, [num, exp]) => a * Math.pow(parseInt(num), exp),
    1
  );
  return k;
};

await run(main, import.meta.url, "6");
