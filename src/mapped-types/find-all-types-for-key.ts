type FindAllTypesForKey<
  SearchIn,
  Key extends PropertyKey
> = SearchIn extends object
  ?
      | (Key extends keyof SearchIn ? SearchIn[Key] : never)
      | {
          [P in keyof SearchIn]: FindAllTypesForKey<SearchIn[P], Key>
        }[keyof SearchIn]
  : never

type User = {
  id: number
  account: {
    id: string
  }
  file: {
    id: Date
  }
}

type Id = FindAllTypesForKey<User, "id">
