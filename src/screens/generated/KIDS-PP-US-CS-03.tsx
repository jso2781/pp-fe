import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_CS_03() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-CS-03" title="고객센터 고정형 영상정보처리기기 운영·관리 방침" config={config} />
}
