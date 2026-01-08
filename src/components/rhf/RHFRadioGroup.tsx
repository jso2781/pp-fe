import { Controller, useFormContext } from 'react-hook-form'
import { useZodSchema } from './ZodFormProvider'
import { isZodFieldRequired } from '@/lib/validation/zodRequired'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'

type Option = { value: string; label: React.ReactNode }

type Props = {
  name: string
  label?: React.ReactNode
  options: Option[]
  row?: boolean
}

export default function RHFRadioGroup({ name, label, options, row }: Props) {
  const { control } = useFormContext()
  const schema = useZodSchema()
  const required = isZodFieldRequired(schema, name)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <RadioGroup row={row} {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value)}>
            {options.map((opt) => (
              <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
            ))}
          </RadioGroup>
          {fieldState.error?.message && <FormHelperText>{fieldState.error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}
