import { useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';import ScreenShell from '../ScreenShell'
import type { TemplateBaseProps, FormTemplateConfig, FormFieldConfig, FormSectionConfig } from './templateTypes'

type Values = Record<string, unknown>

export default function FormTemplate({ screenId, title, config }: TemplateBaseProps<FormTemplateConfig>) {
  const fields: FormFieldConfig[] = useMemo(
    () =>
      config?.fields?.length
        ? config.fields
        : [
            { key: 'field1', label: '필드1', type: 'input', required: true, span: 12 },
            { key: 'field2', label: '필드2', type: 'select', options: [{ label: '선택', value: '' }], span: 12 },
            { key: 'field3', label: '날짜', type: 'date', span: 12 },
          ],
    [config],
  )

  const sections: FormSectionConfig[] = (config?.sections ?? []) as FormSectionConfig[]

  const [values, setValues] = useState<Values>(() => ({ ...(config?.initialValues ?? {}) }))
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (v: Values) => {
    const next: Record<string, string> = {}
    for (const f of fields) {
      if (!f.required) continue
      const raw = v[f.key]
      const isEmpty = f.type === 'checkbox' ? !raw : !String(raw ?? '').trim()
      if (isEmpty) next[f.key] = `${f.label}을(를) 입력하세요.`
    }
    return next
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    config?.onSubmit?.(values)
  }

  return (
    <ScreenShell screenId={screenId} title={title} uiType={config?.uiType || 'form'}>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Box component="form" onSubmit={onSubmit} noValidate>
            <Grid container spacing={2}>
              {fields.map((f) => (
                <Grid key={f.key} size={{ xs: 12, md: f.span || 12 }}>
                  <Field
                    field={f}
                    value={values[f.key]}
                    errorText={errors[f.key]}
                    onChange={(val) => setValues((p) => ({ ...p, [f.key]: val }))}
                  />
                </Grid>
              ))}
            </Grid>

            {sections.length ? (
              <>
                <Divider sx={{ my: 2 }} />
                {sections.map((sec) => (
                  <Card key={sec.key} variant="outlined" sx={{ borderRadius: 2, mb: 1.5 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                        {sec.title}
                      </Typography>
                      {sec.content}
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : null}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={() => (config?.onCancel ? config.onCancel() : setValues({ ...(config?.initialValues ?? {}) }))}>
                {config?.cancelLabel || '취소'}
              </Button>
              <Button variant="contained" type="submit">
                {config?.submitLabel || '저장'}
              </Button>
              {config?.extraActions}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </ScreenShell>
  )
}

function Field({
  field,
  value,
  errorText,
  onChange,
}: {
  field: FormFieldConfig
  value: unknown
  errorText?: string
  onChange: (v: unknown) => void
}) {
  const requiredMark = field.required ? ' *' : ''
  const label = `${field.label}${requiredMark}`

  if (field.type === 'select') {
    return (
      <FormControl fullWidth error={!!errorText} size="small">
        <FormLabel sx={{ mb: 0.5 }}>{label}</FormLabel>
        <Select value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} displayEmpty>
          {(field.options ?? []).map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value as any}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.type === 'radio') {
    return (
      <FormControl error={!!errorText}>
        <FormLabel sx={{ mb: 0.5 }}>{label}</FormLabel>
        <RadioGroup value={String(value ?? '')} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((opt) => (
            <FormControlLabel key={String(opt.value)} value={String(opt.value)} control={<Radio />} label={opt.label} />
          ))}
        </RadioGroup>
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <FormControl error={!!errorText}>
        <FormControlLabel
          control={<Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} />}
          label={label}
        />
        <FormHelperText>{errorText}</FormHelperText>
      </FormControl>
    )
  }

  return (
    <TextField
      size="small"
      label={label}
      value={String(value ?? '')}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      error={!!errorText}
      helperText={errorText}
      fullWidth
      type={field.type === 'date' ? 'date' : 'text'}
      InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
    />
  )
}
