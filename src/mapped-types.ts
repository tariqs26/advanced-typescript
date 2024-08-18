export type Pick<T, Keep extends keyof T> = {
  [Key in keyof T as Key extends Keep ? Key : never]: T[Key]
}

export type Omit<T, Remove extends keyof T> = {
  [Key in keyof T as Key extends Remove ? never : Key]: T[Key]
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

type Events = {
  click: MouseEvent
  mousedown: MouseEvent
  keydown: KeyboardEvent
}

type On<T> = {
  [Key in keyof T as Key extends string ? `on${Capitalize<Key>}` : never]?: (
    e: T[Key]
  ) => void
}

const actions: On<Events> = {
  onClick: (e) => {
    e.clientX
    // ...
  },
  onKeydown: (e) => {
    e.key
    // ...
  },
}
