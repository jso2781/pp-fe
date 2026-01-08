import React from 'react'
import { Button, Stack } from '@mui/material';
import DepsLocation from "@/components/common/DepsLocation"
import ScreenShell from '../ScreenShell'

export default function KIDS_PP_US_JM_04() {
  const current = 2;

  const stepItems = [
    { title: '1단계', description: '회원 유형 선택' },
    { title: '2단계', description: '약관 동의' },
    { title: '3단계', description: '본인 인증' },
    { title: '4단계', description: '회원 정보 입력' },
    { title: '5단계', description: '가입 신청 완료' },
  ];

  // return <FormTemplate screenId="KIDS-PP-US-JM-04" title="본인 인증(14세 이상인 경우 3단계)" config={config} />

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-04" title="본인 인증(14세 이상인 경우 3단계)" uiType="page">
    <div className="page_layout">
      <div className="sub_container">
        <div className="content_wrap">

          {/* sub content :: s */}
          <div className="sub_content">
            <DepsLocation></DepsLocation>
            <div className="content_view" id="content">

              <div className="pageCont_joinType member_page">
                <div className="joinType_step">
                  <Steps
                    current={current}
                    items={stepItems}
                    labelPlacement="vertical"
                  />
                </div>
                <div className="step_content">
                  <h3 className="step_title">
                    <p className="step_count"><span>3단계</span> / 5단계 </p>
                    <p className="step_desc">{stepItems[current].description}</p>
                  </h3>
                </div>
                <div>
                  Any-ID 영역
                </div>
                <div className="btn_group between">
                  <Stack gap={8}>
                    <Button size="large">취소하기</Button>
                    <Button type="primary" size="large">다음단계</Button>
                  </Stack>
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
