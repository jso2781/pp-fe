import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_DI_13() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-DI-13" title="의약품 적정사용 정보집" config={config} />
}
