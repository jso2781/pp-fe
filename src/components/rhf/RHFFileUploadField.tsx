import { Controller, useFormContext } from 'react-hook-form'
import { useZodSchema } from './ZodFormProvider'
import { isZodFieldRequired } from '@/lib/validation/zodRequired'
import FileUploadField, { type FileUploadFieldProps } from '@/components/form/FileUploadField'

type Props = Omit<FileUploadFieldProps, 'value' | 'onChange' | 'errorText'> & {
  name: string
}

export default function RHFFileUploadField({ name, ...props }: Props) {
  const { control } = useFormContext()
  const schema = useZodSchema()
  const required = isZodFieldRequired(schema, name)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FileUploadField
          {...props}
          required={required}
          value={(field.value ?? []) as File[]}
          onChange={(files) => field.onChange(files)}
          errorText={fieldState.error?.message}
        />
      )}
    />
  )
}
