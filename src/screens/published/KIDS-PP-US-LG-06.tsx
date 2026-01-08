import React from 'react'
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_LG_06() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return (
    <ScreenShell screenId="KIDS-PP-US-LG-06" title="아이디 찾기" uiType="page">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
            {/* sub content :: s */}
            <div className="sub_content">
              <DepsLocation></DepsLocation>
              <div className="content_view" id="content">

                <div className="pageCont_idPwFind member_page">
                  <p className="guide_text">아이디를 찾을 방법을 선택해주세요.</p>  
                  <div className="AnyID_area">
                    Any-ID 영역
                  </div>
                  <div className="caution_area">
                    <p className="caution_title">유의사항</p>
                    <ul className="caution_list">
                      <li>주민등록번호가 변경된 경우에는 콜센터로 연락 또는 신규 회원가입해서 이용할 수 있습니다.</li>
                      <li>신규 회원가입 이용 시 변경 전 주민등록번호로 신청한 회원정보는 확인이 불가능합니다.</li>
                      <li>전문가 회원일 경우에는 가입한 여러개의 아이디가 노출됩니다.</li>
                    </ul>
                  </div>
                </div>
                
              </div>
              {/* content_view :: e */}
            </div>
            {/* sub content :: e */}
          </div>
        </div>
      </div>
    </ScreenShell>
  )
}
