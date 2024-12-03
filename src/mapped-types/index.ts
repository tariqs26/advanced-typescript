export type Pick<T, Keep extends keyof T> = {
  [Key in Keep]: T[Key]
}

export type Omit<T, Remove extends keyof T> = {
  [Key in Exclude<keyof T, Remove>]: T[Key]
}

export type Partial<T, Deep extends boolean = false> = {
  [Key in keyof T]?: Deep extends false
    ? T[Key]
    : T[Key] extends object
    ? Partial<T[Key], Deep>
    : T[Key]
}

export type Readonly<T, Deep extends boolean = false> = {
  readonly [Key in keyof T]: Deep extends false
    ? T[Key]
    : T[Key] extends object
    ? Readonly<T[Key], Deep>
    : T[Key]
}

export type Merge<F, S> = {
  [Key in keyof F | keyof S]: Key extends keyof S
    ? S[Key]
    : F[Key extends keyof F ? Key : never]
}
