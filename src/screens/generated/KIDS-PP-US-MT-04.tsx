import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_MT_04() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-MT-04" title="내 업무 업무 신청 관리 승인" config={config} />
}
