import { Controller, useFormContext } from 'react-hook-form'
import { useZodSchema } from './ZodFormProvider'
import { isZodFieldRequired } from '@/lib/validation/zodRequired'
import { Stack, Switch, Typography, FormHelperText } from '@mui/material'

type Props = {
  name: string
  label: React.ReactNode
  helperText?: string
}

export default function RHFSwitch({ name, label, helperText }: Props) {
  const { control } = useFormContext()
  const schema = useZodSchema()
  const required = isZodFieldRequired(schema, name)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2" fontWeight={700}>
              {label}{required ? ' *' : ''}
            </Typography>
            <Switch checked={!!field.value} onChange={(_, v) => field.onChange(v)} />
            <Typography variant="body2" color="text.secondary">
              {field.value ? 'ON' : 'OFF'}
            </Typography>
          </Stack>
          {(helperText || fieldState.error?.message) && (
            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}
