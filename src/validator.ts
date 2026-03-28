const isnt = (value: unknown, expectedTypeName: string) =>
  new Error(`\`${value}\` is not a ${expectedTypeName}`)

function assertIsNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") throw isnt(value, "number")
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw isnt(value, "string")
}

export type Parser<T> = { parse: (value: unknown) => T }

export const v = {
  number: () => ({
    parse(value: unknown) {
      assertIsNumber(value)
      return value
    },
  }),
  string: () => ({
    parse(value: unknown) {
      assertIsString(value)
      return value
    },
  }),
  object<T, S extends Record<string, Parser<T>>>(schema: S) {
    function validate(value: unknown): asserts value is {
      [K in keyof S]: ReturnType<S[K]["parse"]>
    } {
      if (!value || typeof value !== "object" || Array.isArray(value))
        throw isnt(arguments, "object")

      for (const key of Object.keys(schema)) {
        if (key in value) {
          schema[key].parse((value as any)[key])
        } else {
          throw new Error(`Key: \`${key}\` is required`)
        }
      }
    }

    return {
      parse(value: unknown) {
        validate(value)
        return value
      },
    }
  },
}

// { foo: string }
v.object({ foo: v.string() }).parse({ foo: "bar" })
