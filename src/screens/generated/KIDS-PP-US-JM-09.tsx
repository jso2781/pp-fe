import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_JM_09() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-JM-09" title="회원정보 수정" config={config} />
}
