import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_CS_02() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-CS-02" title="고객센터 개인정보취급방침" config={config} />
}
