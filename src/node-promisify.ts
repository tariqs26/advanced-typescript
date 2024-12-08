type NodePromisifyCallback =
  | ((err?: any) => void)
  | ((err: any, result: any) => void)

export type NodePromisify<Fn extends Function> = Fn extends (
  ...args: [...infer Args, infer Cb extends NodePromisifyCallback]
) => void
  ? (
      ...args: Args
    ) => Promise<Parameters<Cb>["length"] extends 2 ? Parameters<Cb>[1] : void>
  : never

type Test1 = NodePromisify<(time: number, cb: (err: Error) => void) => {}> // (time: number) => Promise<void>
type Test2 = NodePromisify<(cb: (err: Error, result: string) => void) => {}> // () => Promise<string>
type Test3 = NodePromisify<
  (name: string, cb: (err: Error, result: string) => void) => {}
> // (name: string) => Promise<string>
