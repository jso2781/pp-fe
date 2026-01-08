import React from 'react'
import ListTemplate from '../templates/ListTemplate'

export default function KIDS_PP_US_IS_01() {
  // TODO: searchFields/columns/sampleData/onSearch/onCreate 등을 채우세요.
  const config = {
  hint: '검색 조건과 그리드 컬럼을 화면 설계서에 맞게 정의하세요.'
}

  return <ListTemplate screenId="KIDS-PP-US-IS-01" title="통합검색 결과" config={config} />
}
