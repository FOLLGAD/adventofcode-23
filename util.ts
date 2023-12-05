import path from "path";
import { fileURLToPath } from "url";

export const print = console.log;

export const equal = (arr1: any, arr2: any) => {
  if (isNaN(arr1?.length) || arr1.length != arr2?.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (typeof arr1[i] == "object") {
      if (!equal(arr1[i], arr2[i])) return false;
    } else if (arr1[i] != arr2[i]) return false;
  }
  return true;
};

export const sum = (arr: number[]) =>
  arr.reduce((a, b) => Number(a) + Number(b), 0);

export const run = async (
  fn: (input: string) => Promise<any>,
  url: string,
  testValue?: string
) => {
  const isTest = process.argv[2] === "test";

  const dirOfEntryFile = path.dirname(fileURLToPath(url));
  const file = isTest ? "test.txt" : "input.txt";
  const input = Bun.file(path.join(dirOfEntryFile, file));
  const text = await input.text();

  const result = await fn(text);
  if (isTest) {
    console.assert(
      result == testValue,
      `Expected ${testValue} but got ${result}`
    );
  }
  print(result);
  return result;
};
