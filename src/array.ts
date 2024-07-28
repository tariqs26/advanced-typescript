type Concat<T extends unknown[], V extends unknown[]> = [...T, ...V]

type JoinValue = string | number | bigint | boolean | null | undefined

type Join<T extends JoinValue[], Sep extends string> = T extends [infer First]
  ? First
  : T extends [infer First extends JoinValue, infer Second extends JoinValue]
  ? `${First}${Sep}${Second}`
  : T extends [
      infer First extends JoinValue,
      infer Second extends JoinValue,
      ...infer Rest extends JoinValue[]
    ]
  ? `${First}${Sep}${Second}${Sep}${Join<Rest, Sep>}`
  : ""

// Example usage

type ConcatTest = Concat<string[], number[]> // (string | number)[]

type TestJoin = Join<[1, 2, 3], "."> // "1.2.3"
