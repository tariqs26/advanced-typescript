export type Pick<
  T extends Record<PropertyKey, unknown>,
  Keep extends keyof T
> = {
  [Key in keyof T as Key extends Keep ? Key : never]: T[Key]
}

export type Omit<
  T extends Record<PropertyKey, unknown>,
  Remove extends keyof T
> = {
  [Key in keyof T as Key extends Remove ? never : Key]: T[Key]
}

type Events = {
  click: MouseEvent
  mousedown: MouseEvent
  keydown: KeyboardEvent
}

type On<T extends object> = {
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
