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

// Example usage

type User = {
  id: number
  name: string
}

type UserId = Pick<User, "id">

type UserWithoutName = Omit<User, "name">

type UserWithoutNameOrId = Omit<User, "id" | "name">
