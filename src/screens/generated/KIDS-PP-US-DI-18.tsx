import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_DI_16() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-DI-16" title="의견 제안" config={config} />
}
