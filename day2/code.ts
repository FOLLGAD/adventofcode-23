import { run, print, sum } from "../util.ts";

const inp = {
  r: 12,
  g: 13,
  b: 14,
};

const main = async (input: string) => {
  // Code goes here
  const nums = input.split("\n").map((l) => {
    const r =
      l
        .match(/(\d+) red/g)
        ?.map((a) => a.split(" ")[0])
        .map((a) => parseInt(a)) || [];
    const g =
      l
        .match(/\d+ green/g)
        ?.map((a) => a.split(" ")[0])
        .map((a) => parseInt(a)) || [];
    const b =
      l
        .match(/\d+ blue/g)
        ?.map((a) => a.split(" ")[0])
        .map((a) => parseInt(a)) || [];

    return { r: Math.max(...r), g: Math.max(...g), b: Math.max(...b) };
  });

  let arr = nums.map((a) => 0);
  const pow = nums.map((a) => a.r * a.g * a.b);
  for (let n = 0; n < nums.length; n++) {
    const num = nums[n];
    if (num.r > inp.r || num.g > inp.g || num.b > inp.b) {
    } else {
      arr[n] += 1;
    }
  }
  print(arr);

  const ids = arr.map((a, i) => (i + 1) * a);

  return sum(pow);
};

await run(main, import.meta.url);
