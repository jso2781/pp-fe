import { createContext, useContext } from 'react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'
import type { ZodTypeAny } from 'zod'

const ZodSchemaContext = createContext<ZodTypeAny | null>(null)

export function useZodSchema() {
  return useContext(ZodSchemaContext)
}

export function ZodFormProvider<TFieldValues>({
  schema,
  methods,
  children,
}: {
  schema: ZodTypeAny
  methods: UseFormReturn<TFieldValues>
  children: React.ReactNode
}) {
  return (
    <ZodSchemaContext.Provider value={schema}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ZodSchemaContext.Provider>
  )
}
