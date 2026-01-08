import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_EP_02() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-EP-02" title="오류안내 500 에러안내" config={config} />
}
