export type Tuple<
  Length extends number,
  Type,
  Acc extends Array<Type> = []
> = Length extends Acc["length"]
  ? Readonly<Acc>
  : Tuple<Length, Type, [...Acc, Type]>

type RgbTuple = Tuple<3 | 4, number | string>
