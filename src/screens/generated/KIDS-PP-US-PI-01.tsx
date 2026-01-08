import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_PI_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-PI-01" title="이상사례 보고란" config={config} />
}
