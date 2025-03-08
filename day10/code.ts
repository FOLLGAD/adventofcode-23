import { run, print, sum } from "../util.ts";

const m = {
  F: [
    [1, 0],
    [0, 1],
  ],
  "7": [
    [-1, 0],
    [0, 1],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  L: [
    [1, 0],
    [-1, 0],
  ],
};
const n = {
  F: "SE",
  "7": "WS",
  J: "NW",
  L: "NE",
  "|": "NS",
  "-": "WE",
  S: "SWEN",
  ".": "",
};
const invert = (s: string) => {
  return s
    .split("")
    .map((a) => ({ S: "N", N: "S", W: "E", E: "W" }[a]))
    .join("");
};

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const map = input.trim().split("\n");
  const w = map[0].length,
    h = map.length;

  let s: [number, number] | null = null;
  for (let x = 0; x < w; x++)
    for (let y = 0; y < h; y++) if (map[y][x] == "S") s = [x, y];

  const q: [[number, number], number][] = [[s, 0]];
  const visited = new Set<string>();

  const hash = (h) => {
    const [x, y] = h;
    return x + ":" + y;
  };
  const getMap = (o) => {
    const [x, y] = o;
    return y >= h || y < 0 || x >= w || x < 0 ? null : map[y][x];
  };
  // 4,2
  let item = null;
  const vislist: [number, number][] = [];
  while (q.length > 0) {
    const [currPos, c] = q.shift();
    if (!currPos) break;
    if (visited.has(hash(currPos))) {
      continue;
    }
    vislist.push([currPos, c]);
    item = c;
    visited.add(hash(currPos));
    const char = getMap(currPos);
    const dirs = n[char];

    let rejc = 0;

    for (const dir of dirs.split("")) {
      let nextPos: [number, number] | null = null;
      if (dir == "S") {
        nextPos = [currPos[0], currPos[1] + 1];
      }
      if (dir == "N") {
        nextPos = [currPos[0], currPos[1] - 1];
      }
      if (dir == "W") {
        nextPos = [currPos[0] - 1, currPos[1]];
      }
      if (dir == "E") {
        nextPos = [currPos[0] + 1, currPos[1]];
      }

      if (!nextPos) continue;

      const mmm = getMap(nextPos);
      if (!mmm) continue;
      if (invert(n[mmm]).includes(dir)) {
        if (!visited.has(hash(nextPos))) {
          q.push([nextPos, c + 1]);
        } else {
          rejc++;
        }
      }
      //   print("R", rejc);
    }
  }

  const l = vislist.reduce((l, [p, c]) => {
    l[c] ||= [];
    l[c].push(p);
    return l;
  }, [] as [number, number][]);
  const all = [
    ...l.map((a) => a[0]),
    ...l
      .map((a) => a[1])
      .filter((a) => !!a)
      .reverse(),
  ];

  const groups: Set<string>[] = [new Set(), new Set()];

  all.forEach((elem, i, arr) => {
    let prevI;
    if (i == 0) prevI = arr.length - 1;
    else prevI = i - 1;

    let lastPos = arr[prevI];
    let diffX = lastPos[0] - elem[0];
    let diffY = lastPos[1] - elem[1];

    if (diffX !== 0) {
      groups[0].add(hash([elem[0], elem[1] + diffX]));
      groups[1].add(hash([elem[0], elem[1] - diffX]));
    }
    if (diffY !== 0) {
      groups[0].add(hash([elem[0] - diffY, elem[1]]));
      groups[1].add(hash([elem[0] + diffY, elem[1]]));
    }

    const nextI = i % arr.length;
    lastPos = arr[nextI];
    diffX = lastPos[0] - elem[0];
    diffY = lastPos[1] - elem[1];

    if (diffX !== 0) {
      groups[0].add(hash([elem[0], elem[1] + diffX]));
      groups[1].add(hash([elem[0], elem[1] - diffX]));
    }
    if (diffY !== 0) {
      groups[0].add(hash([elem[0] - diffY, elem[1]]));
      groups[1].add(hash([elem[0] + diffY, elem[1]]));
    }
  });
  const unhash = (s: string) => s.split(":").map((a) => parseInt(a));

  const fill = (set: Set<string>) => {
    const visited: Set<string> = new Set(
      vislist.map((a) => a[0]).map((a) => hash(a))
    );
    const real = new Set<string>();
    const q = [...set.values()].filter((a) => !visited.has(a)).map(unhash);
    while (q.length > 0) {
      const pos = q.shift()!;
      if (visited.has(hash(pos)) || !getMap(pos)) continue;
      visited.add(hash(pos));
      real.add(hash(pos));
      for (let x = -1; x <= 1; x++)
        for (let y = -1; y <= 1; y++)
          if (
            !(x == 0 && y == 0) &&
            !visited.has(hash([pos[0] + x, pos[1] + y]))
          )
            q.push([pos[0] + x, pos[1] + y]);
    }
    return real;
  };
  const f = groups.map(fill);
  print(vislist);
  print(f);

  const m = map.map((s) => s.slice());

  for (const [b, _] of vislist) {
    print(b);
    const str = m[b[1]].split("");
    str[b[0]] = "_";
    m[b[1]] = str.join("");
  }

  const noBorders =
    f.find((a) => {
      const borders = [...a.values()]
        .map((a) => a.split(":").map((a) => parseInt(a)))
        .some(([x, y]) => x == 0 || y == 0 || x == w || y == h);
      if (!borders && a.size !== 0) return true;
      return false;
    }) ?? new Set();
  const b =
    f.find((a) => {
      const borders = [...a.values()]
        .map((a) => a.split(":").map((a) => parseInt(a)))
        .some(([x, y]) => x == 0 || y == 0 || x == w || y == h);
      if (!borders && a.size !== 0) return false;
      return true;
    }) ?? new Set();

  for (const h of noBorders.values()) {
    const b = unhash(h);
    const str = m[b[1]].split("");
    if (str[b[0]] === "_") throw new Error("BRUH");
    str[b[0]] = "X";
    m[b[1]] = str.join("");
  }
  for (const h of b.values()) {
    const b = unhash(h);
    const str = m[b[1]].split("");
    if ("_X".includes(str[b[0]])) throw new Error("BRUH");
    str[b[0]] = "Z";
    m[b[1]] = str.join("");
  }
  print(
    m
      .join("\n")
      .replace(/X/g, "")
      .replace(/Z/g, "")
      .replace(/_/g, "")
      .replace(/\n/g, "")
  );

  return noBorders.size;
};

await run(main, import.meta.url, "8");
