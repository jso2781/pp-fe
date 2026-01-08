import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_EC_01() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-EC-01" title="전문가 회원 전환 신청 소속선택" config={config} />
}
