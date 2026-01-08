import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_JM_05() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-JM-05" title="만14세미만가입 회원정보입력" config={config} />
}
