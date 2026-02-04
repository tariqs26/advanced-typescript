type FormatSpecifiers = { [key in "d" | "i"]: number } & { s: string } & {
  [key in "o" | "O"]: object
}

type ExtractFormatSpecifiers<
  Str,
  Args extends unknown[] = []
> = Str extends `${infer _}%${infer Specifier}${infer Rest}`
  ? Specifier extends keyof FormatSpecifiers
    ? ExtractFormatSpecifiers<Rest, [...Args, FormatSpecifiers[Specifier]]>
    : ExtractFormatSpecifiers<Rest, Args>
  : Args

type MessageValueTypes =
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | bigint
  | object

declare var console: Omit<Console, "log"> & {
  log: <T extends MessageValueTypes>(
    message?: T,
    ...args: T extends string
      ? [...ExtractFormatSpecifiers<T>, ...unknown[]]
      : unknown[]
  ) => void
}

// @ts-expect-error: type mismatch, expected string rather than number
console.log("Hello %s", 10)
console.log("Hello %s %d", "world", 20) // ok
