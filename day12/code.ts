import { run, print, sum } from "../util.ts";

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const ls = input.split("\n").map((a) => a.split(" "));

  return;
};

const a = (str: string, nums: number[]) => {
  print(str, nums);
  const getNums = (str: string) => {
    return str.split(/\.+/g).map((a) => a.length);
  };
  
  return 0;
};

const b = (inp: string) =>
  a(
    inp.split(" ")[0],
    inp
      .split(" ")[1]
      .split(",")
      .map((a) => parseInt(a))
  );

const out = b(".??..??...?##. 1,1,3");
print(`${out} === ${4}`, out === 4);

await run(main, import.meta.url);
