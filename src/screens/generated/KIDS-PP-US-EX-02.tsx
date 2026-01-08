import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_EX_02() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-EX-02" title="전문가회원 전환신청 추가정보입력" config={config} />
}
