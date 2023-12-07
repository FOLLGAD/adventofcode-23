import { run, print, sum } from "../util.ts";

const part2 = true;
const c = part2
  ? "A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J".split(", ")
  : "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2".split(", ");

const getValue = (hand: string) => {
  const cards: { string: number } = hand
    .split("")
    .reduce(
      (prev, val) => ({ ...prev, [val]: prev[val] ? prev[val] + 1 : 1 }),
      {} as { string: number }
    );
  const keys = Object.keys(cards);
  const sets = keys
    .filter((a) => (part2 ? a != "J" : true))
    .map((k) => cards[k]);
  let m = Math.max(...sets, 0);
  
//   if (hand === "JJJJJ") {
//     print(hand, m, sets)
//   }

  let jokerd = false;
  if (part2 && "J" in cards) {
    jokerd = true;
    const jokers = cards["J"] as number;

    delete cards["J"];
    keys.splice(keys.indexOf("J"), 1);
    // print(m, jokers);
    m += jokers;
  }

  if (m >= 5) {
    return 10;
  }
  if (m == 4) return 9;
  if (keys.length == 2) {
    // Full house
    return 8;
  }
  if (m == 3) {
    return 7;
  }
  if (sets.filter((a) => a == 2).length == 2) return 6; // Two pair
  if (m == 2) return 5;
  return 0;
};

const compare = (hand1, hand2) => {
  const h1 = getValue(hand1);
  const h2 = getValue(hand2);

  if (h1 == h2) {
    const s1 = hand1;
    const s2 = hand2;
    for (let i = 0; i < s1.length; i++) {
      const i1 = c.indexOf(s1[i]);
      const i2 = c.indexOf(s2[i]);
      if (i1 !== i2) return i2 - i1;
    }
  } else return h1 - h2;

  return 0;
};

const main = async (input: string) => {
  // Code goes here
  print("Running");
  const lines = input.split("\n");
  const cards = lines
    .map((s) => s.split(" "))
    .map((a) => ({ card: a[0], bet: a[1] }));

  const out = cards.sort((a, b) => compare(a.card, b.card));
  print(out);
  const outs = out.map(({ bet }, i) => parseInt(bet) * (i + 1));
  return sum(outs);
};

await run(main, import.meta.url, part2 ? "5905" : "6440");
