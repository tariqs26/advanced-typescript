export type Head<T extends unknown[]> = T extends [infer First, ...infer _]
  ? First
  : never

export type Tail<T extends unknown[]> = T extends [...infer _, infer Last]
  ? Last
  : never

export type Concat<T extends unknown[], V extends unknown[]> = [...T, ...V]

export type JoinValue = string | number | bigint | boolean | null | undefined

export type Join<T extends JoinValue[], Sep extends string> = T extends [
  infer First
]
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

export type Filter<T extends unknown[], P> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends P
    ? [First, ...Filter<Rest, P>]
    : Filter<Rest, P>
  : []

// Example usage

type HeadTest = Head<[number, boolean]> // number

type TailTest = Tail<[string, boolean, bigint]> // bigint

type ConcatTest = Concat<string[], number[]> // (string | number)[]

type JoinTest = Join<[1, 2, 3], "."> // "1.2.3"

type FilterTest = Filter<[1, 2, ""], number> // [1, 2]
