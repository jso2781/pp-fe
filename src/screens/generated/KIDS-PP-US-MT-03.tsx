import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_MT_03() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-MT-03" title="내 업무 업무 신청 관리 상세" config={config} />
}
