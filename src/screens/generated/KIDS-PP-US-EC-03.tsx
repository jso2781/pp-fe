import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_EC_03() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-EC-03" title="전문가회원 전환신청 신청 완료" config={config} />
}
