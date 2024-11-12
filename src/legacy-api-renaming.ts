import type { ReplaceAll } from "./string"
import type { Tuple } from "./tuple"

type LegacyApi = {
  legacy_nameV1: string
  legacy_nameV2: string
  legacy_nameV3: string
  legacy_timstampV1: number
  new_timestampV1: number
  legacy_userV1: {
    legacy_uuidV1: string
    legacy_uuid_V2: string
    legacy_firstnameV1: string
  }
}

type Replacement = Tuple<2, string>

export type Replace<
  Str extends string,
  Replacements extends Replacement[]
> = Replacements extends [
  [infer From extends string, infer To extends string],
  ...infer Rest extends Replacement[]
]
  ? Replace<ReplaceAll<Str, From, To>, Rest>
  : Str

type DeepReplace<T, mappings extends Replacement[]> = {
  [Key in keyof T as Key extends string
    ? Replace<Key, mappings>
    : never]: DeepReplace<T[Key], mappings>
}

type Replacements = [
  ["legacy_", ""],
  ["new_", ""],
  [`V${number}`, ""],
  ["timstamp", "timestamp"],
  ["uuid_", "id"],
  ["uuid", "id"]
]

type UpdatedApi = DeepReplace<LegacyApi, Replacements>

const updatedApi: UpdatedApi = {
  name: "Updated API",
  timestamp: 1232,
  user: {
    id: "1",
    firstname: "Linus",
  },
}
