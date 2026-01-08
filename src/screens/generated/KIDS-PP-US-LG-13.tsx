import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_LG_13() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-LG-13" title="본인 인증 Any-ID 모바일신분증인증" config={config} />
}
