type JSONObject<TObj> = {
  // remove key[value] pair where value is not valid JSON
  // [T] extends [never] instead of T extends never
  // as you cannot check if never extends never (defaults to never)
  [Key in keyof TObj as [JSONValue<TObj[Key]>] extends [never]
    ? never
    : Key]: JSONValue<TObj[Key]>
}

type JSONValue<TValue> = TValue extends string | number | boolean | null
  ? TValue
  : TValue extends { toJSON(): infer R }
    ? R
    : TValue extends undefined | Function
      ? never
      : TValue extends object
        ? JSONObject<TValue>
        : never

type Stringified<TObj> = string & { source: TObj } // branded type (add more information to primitive types)

declare namespace JSON {
  function stringify<TValue>(
    value: TValue,
    replacer?: null | undefined,
    space?: string | number,
  ): Stringified<TValue>
  function parse<TValue>(
    text: Stringified<TValue>,
    reviver?: null | undefined,
  ): JSONValue<TValue>
}

const value = JSON.stringify({
  foo: 1,
  bar: () => {
    console.log("foo")
  },
  baz: undefined,
  status: {
    toJSON() {
      return "idle"
    },
  },
})

const parsed = JSON.parse(value)

parsed.foo // type: number
parsed.status // type: "idle" (more specific than string)
// @ts-expect-error: Property 'b' does not exist on type ...
parsed.b
// @ts-expect-error: Property 'bar' does not exist on type ...
parsed.bar
