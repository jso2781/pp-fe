import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_JM_08() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-JM-08" title="비밀번호 확인" config={config} />
}
