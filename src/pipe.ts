export function pipe<A, B>(fn: (a: A) => B) {
  const run = (a: A) => fn(a)

  run.pipe = <C>(fn2: (b: B) => C) => pipe((a: A) => fn2(fn(a)))

  return run
}

const stringToDateAndTime = pipe(Date.parse)
  .pipe((n) => new Date(n))
  .pipe((d) => d.toISOString())
  .pipe((s) => s.split("T"))
  .pipe(([date, time]) => ({ date, time }))

console.log(stringToDateAndTime("Apr 1, 2023"))
