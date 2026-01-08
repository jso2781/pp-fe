import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_DI_14() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-DI-14" title="내가 먹는 약의 DUR 정보" config={config} />
}
