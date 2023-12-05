const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let score = 0;
  
  const lines = data
  .split("\n")
  .map((l) => l.split(":")[1])
  .map((a) => a.split("|").map((b) => b.trim()));

  const array = lines.map(() => 1);

  for (let i = 0; i < lines.length; i++) {
    line = lines[i];
    const winning = line[0].split(/\s+/g).map((a) => parseInt(a));
    const mine = line[1].split(/\s+/g).map((a) => parseInt(a));
    console.log(winning, mine);
    let matches = 0;
    for (let num of mine) {
      if (winning.includes(num)) {
        matches += 1;
      }
    }
    if (matches > 0) {
      for (let x = 1; x < matches+1; x++) {
        console.log(`${i+1} adds ${array[i]} to ${i + x+1}`);
        array[i + x] += array[i];
      }
    }
}
    console.log(array)
  // sum of array:
  console.log(array.reduce((a, b) => a + b, 0));
});
