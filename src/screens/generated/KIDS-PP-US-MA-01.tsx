import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_MA_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-MA-01" title="메인" config={config} />
}
