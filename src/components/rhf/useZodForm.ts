import { useForm, type UseFormProps, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ZodTypeAny } from 'zod'

export function useZodForm<TFieldValues extends FieldValues>(
  schema: ZodTypeAny,
  options: UseFormProps<TFieldValues>,
) {
  return useForm<TFieldValues>({
    ...options,
    resolver: zodResolver(schema),
  })
}
