import { run, print, sum } from "../util.ts";

const calculateRace = (time: number, dist: number): number => {
  let ct = 0;

  for (let t = 0; t < time; t++) {
    const totalDist = (time - t) * t;
    if (totalDist > dist) ct++;
  }

  return ct;
};

const handle = async (times: number[], dists: number[]) => {
  let p = 1;
  for (let i = 0; i < times.length; i++) {
    const out = calculateRace(times[i], dists[i]);
    p *= out;
  }
  return p;
};

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const lines = input.split("\n");
  const ts = [lines[0].split(":")[1].trim().split(/\s+/g).join("")].map((s) =>
    parseInt(s)
  );
  const ds = [lines[1].split(":")[1].trim().split(/\s+/g).join("")].map((s) =>
    parseInt(s)
  );

  return handle(ts, ds);
};

await run(main, import.meta.url, "288");
