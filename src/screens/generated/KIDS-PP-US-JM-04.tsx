import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_JM_04() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-JM-04" title="본인 인증(14세 이상인 경우 3단계)" config={config} />
}
