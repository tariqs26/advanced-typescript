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
