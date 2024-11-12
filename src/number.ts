// integers

type Odd = "1" | "3" | "5" | "7" | "9"

export type IsOdd<T extends number> = `${T}` extends `${infer _}${Odd}`
  ? true
  : false
