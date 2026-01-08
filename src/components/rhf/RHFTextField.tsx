import { Controller, useFormContext } from 'react-hook-form'
import { useZodSchema } from './ZodFormProvider'
import { isZodFieldRequired } from '@/lib/validation/zodRequired'
import TextField, { type TextFieldProps } from '@mui/material/TextField'

type Props = Omit<TextFieldProps, 'name'> & {
  name: string
}

/** Standard TextField for this app:
 * - size small / dense spacing (also reinforced via theme)
 * - shows zod validation errors automatically
 */
export default function RHFTextField({ name, ...props }: Props) {
  const { control } = useFormContext()
  const schema = useZodSchema()
  const required = isZodFieldRequired(schema, name)
  const merged: TextFieldProps = {
    required,
    fullWidth: true,
    margin: 'dense',
    size: 'small',
    ...props,
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...merged}
          {...field}
          value={field.value ?? ''}
          error={!!fieldState.error || merged.error}
          helperText={fieldState.error?.message ?? merged.helperText}
        />
      )}
    />
  )
}
