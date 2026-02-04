type Result<TData, TError> =
  | { success: true; data: TData }
  | { success: false; error: TError }

const ok = <TData>(data: TData): Result<TData, never> => ({
  success: true,
  data,
})

// Infer reason as const for discriminated union narrowing
const err = <const TReason, TError extends { reason: TReason }>(
  error: TError,
): Result<never, TError> => ({ success: false, error })

const createProduct = (inputData: { name: string; description?: string }) => {
  if (inputData.name.trim().length > 500) {
    return err({
      reason: "invalid-data",
      description: "name must be less than 500 characters",
    })
  } else if (Math.random() > 0.5) {
    return err({ reason: "server-error", message: "Database unreachable" })
  }
  return ok("Product created successfully")
}

const res = createProduct({ name: "Apples" })

if (!res.success) {
  switch (res.error.reason) {
    case "invalid-data": {
      break
    }
    case "server-error": {
      break
    }
    default: {
      // Non-exhaustive check to ensure all error reasons are handled
      throw new Error(`Unhandled error ${res.error satisfies never}`)
    }
  }
}
