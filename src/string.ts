export type Prefix<Pre extends string> = `${Pre}${string}`

export type PostFix<Post extends string> = `${string}${Post}`

export type Concat<Str1 extends string, Str2 extends string> = `${Str1}${Str2}`

type Whitespace = " " | "\n" | "\t"

export type TrimStart<Str extends string> =
  Str extends `${Whitespace}${infer Rest}` ? TrimStart<Rest> : Str

export type TrimEnd<Str extends string> =
  Str extends `${infer Rest}${Whitespace}` ? TrimEnd<Rest> : Str

export type Trim<Str extends string> = TrimStart<TrimEnd<Str>>

type Replace<
  Str extends string,
  From extends string,
  To extends string
> = From extends ""
  ? Str
  : Str extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${After}`
  : Str

export type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = From extends ""
  ? Str
  : Str extends `${infer Before}${From}${infer After}`
  ? `${Before}${To}${ReplaceAll<`${After}`, From, To>}`
  : Str

export type Autocomplete<Str extends string> = Str | (string & {})

// Example usage

type ApiPrefix = Prefix<`api/v${number}/`>
const api1: ApiPrefix = "api/v1/..."
// const api2: ApiPrefix = "api" // Error

type ConcatTest = Concat<"Hello", "World"> // "HelloWorld"

type TestTrimStart = TrimStart<" \n\t  user"> // "user"
type TestTrimEnd = TrimEnd<"user    "> // "user"
type TestTrim = Trim<" user  "> // "user"

type RemoveVersion<Str extends string> = Replace<Str, `V${number}`, "">

type UserWithoutVersion = RemoveVersion<"userV1"> // "user"
