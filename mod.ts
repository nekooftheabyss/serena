type WeightPattern = "halving" | "fibonacci";

export function chooseHalving<ArrayType>(arr: ArrayType[]): ArrayType {
  const iter = arr.values();
  iter.next();
  let result;
  while (result = iter.next().value) {
    if (Math.random() > 0.5) return result;
  }
  return arr[0];
}

export function _chooseFibonacci<ArrayType>(arr: ArrayType[]): ArrayType {
  const iter = arr.values();
  let chanceArr = _fibonacci([0.4, 0.22], arr.length - 1).reverse();
  chanceArr = chanceArr.map((x) => x);
  iter.next()
  for (let i = arr.length; i > 0; --i) {
    const val = iter.next().value
    if (Math.random() < chanceArr[i]) return val;
  }
  return arr[0]
}

function _fibonacci1(n: number[]): number[] {
  if (n.length < 2) return [];
  if (n.at(-1) === 0) return n;
  const newstuff = (n.at(-2) || 0) + (n.at(-1) || -1);
  if (newstuff < 0) return n;
  return _fibonacci1([...n, newstuff]);
}

function _fibonacci(n: number[], req: number): number[] {
  if (n.length < 2) return [];
  let [a, b] = n;
  for (req; req > 0; --req) {
    n.push(a - b);
    a = b;
    b = n.at(-1) || n[n.length - 1];
  }
  return n;
}

console.log(_fibonacci([0.4, 0.22], 99))