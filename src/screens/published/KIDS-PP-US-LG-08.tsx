import React from 'react'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_LG_08() {
  // TODO: fields/initialValues/onSubmit 등을 채우세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  // return <FormTemplate screenId="KIDS-PP-US-LG-08" title="비밀번호 찾기" config={config} />
  return (
    <ScreenShell screenId="KIDS-PP-US-LG-08" title="비밀번호 찾기" uiType="page">
      <div className="page-layout">
        <div className="sub-container">
          <div className="content-wrap">
            {/* sub content :: s */}
            <div className="sub-content">
              <DepsLocation></DepsLocation>
              <div className="content-view" id="content">

                <div className="pageCont_idPwFind member_page">
                  <p className="guide_text">비밀번호 재설정을 위해 본인 확인을 진행합니다. </p>  
                  <div className="AnyID_area">
                    Any-ID 영역
                  </div>
                  <div className="caution_area">
                    <p className="caution_title">유의사항</p>
                    <ul className="caution_list">
                      <li>KIDS의 회원 계정에 등록된 인증서로만 비밀번호 재설정이 가능합니다.</li>
                      <li>본인 명의가 아닌 휴대전화 사용으로 직접 비밀번호 재설정이 어려운 경우는 콜센터로 연락주세요.</li>
                      <li>14세 미민의 일반 회원일 경우 보호자 동의 시 인증한 본인 인증 정보로만 찾기가 가능합니다.</li>
                    </ul>
                  </div>
                </div>
                
              </div>
              {/* content-view :: e */}
            </div>
            {/* sub content :: e */}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
