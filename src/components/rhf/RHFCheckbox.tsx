import { Controller, useFormContext } from 'react-hook-form'
import { useZodSchema } from './ZodFormProvider'
import { isZodFieldRequired } from '@/lib/validation/zodRequired'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel, { type FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Stack from '@mui/material/Stack'

type Props = Omit<FormControlLabelProps, 'control' | 'label'> & {
  name: string
  label: React.ReactNode
  helperText?: string
}

export default function RHFCheckbox({ name, label, helperText, ...props }: Props) {
  const { control } = useFormContext()
  const schema = useZodSchema()
  const required = isZodFieldRequired(schema, name)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Stack spacing={0.5}>
          <FormControlLabel
            {...props}
            label={
              <span>
                {label}
                {required ? <span aria-hidden="true"> *</span> : null}
              </span>
            }
            control={<Checkbox checked={!!field.value} onChange={(_, v) => field.onChange(v)} />}
          />
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
