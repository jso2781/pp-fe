import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import DepsLocation from "@/components/common/DepsLocation";
import ScreenShell from '../ScreenShell';

// 별도로 만든 약관 컴포넌트 임포트
// import { TermsDetail01, TermsDetail02, TermsDetail03, TermsDetail04 } from './TermsContent';
/* --- 약관 상세 컴포넌트들 --- */
const TermsDetail01 = () => (
  <div className="terms_inner_content">
    <h3>제1조 (목적)</h3>
    <p>이 약관은 사이트 이용자가 제공하는 모든 서비스의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.</p>
    <h3>제2조 (용어의 정의)</h3>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
    <p>1. "서비스"란 회사가 운영하는 웹사이트를 통해 제공되는 기능을 의미합니다.</p>
  </div>
);

const TermsDetail02 = () => (
  <div className="terms_inner_content">
    <p>회사는 다음과 같은 목적으로 개인정보를 수집 및 이용합니다.</p>
    <ul>
      <li>수집항목: 성명, 휴대전화번호, 이메일</li>
      <li>보유기간: 회원 탈퇴 시까지</li>
    </ul>
  </div>
);

const TermsDetail03 = () => (
  <div className="terms_inner_content">
    <p>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.</p>
  </div>
);

const TermsDetail04 = () => (
  <div className="terms_inner_content">
    <p>본 사이트에서 제공하는 모든 콘텐츠는 저작권법의 보호를 받습니다.</p>
  </div>
);
export default function KIDS_PP_US_JM_02() {
  const current = 1;
  const stepItems = [
    { title: '1단계', description: '회원 유형 선택' },
    { title: '2단계', description: '약관 동의' },
    { title: '3단계', description: '본인 인증' },
    { title: '4단계', description: '회원 정보 입력' },
    { title: '5단계', description: '가입 신청 완료' },
  ];

  // 모달 상태 (React.ReactNode 타입을 사용하여 컴포넌트를 직접 담음)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', content: null as React.ReactNode });

  // 체크박스 상태 개별 관리 (하드코딩)
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  // 전체 동의 로직
  const allChecked = checked1 && checked2 && checked3 && checked4;
  const handleAllAgree = (e: any) => {
    const status = e.target.checked;
    setChecked1(status); setChecked2(status); setChecked3(status); setChecked4(status);
  };

  // 모달 열기 함수
  const showModal = (title: string, content: React.ReactNode) => {
    setModalData({ title, content });
    setIsModalOpen(true);
  };

  return (
    <ScreenShell screenId="KIDS-PP-US-JM-02" title="약관동의" uiType="page">
      <div className="page_layout">
        <div className="sub_container">
          <div className="content_wrap">
            <div className="sub_content">
              <DepsLocation />
              <div className="content_view" id="content">
                <div className="pageCont_joinType member_page">
                  <div className="joinType_step">
                    <Steps current={current} items={stepItems} labelPlacement="vertical" />
                  </div>
                  <div className="step_content">
                    <h3 className="step_title">
                      <p className="step_count"><span>2단계</span> / 5단계 </p>
                      <p className="step_desc">{stepItems[current].description}</p>
                    </h3>

                    <div className="agree_terms">
                      <div className="all_agree">
                        <Checkbox onChange={handleAllAgree} checked={allChecked}>
                          <strong className="label">전체 동의합니다.</strong>
                        </Checkbox>
                      </div>

                      <ul className="terms_list">
                        <li className="terms_item">
                          <Checkbox className="terms_checkbox" checked={checked1} onChange={(e) => setChecked1(e.target.checked)}>
                            <span className="terms_link">이용약관</span> <span className="required">(필수)</span>
                          </Checkbox>
                          <button type="button" className="btn_terms_view" onClick={() => showModal('이용약관', <TermsDetail01 />)}>약관보기</button>
                        </li>
                        <li className="terms_item">
                          <Checkbox className="terms_checkbox" checked={checked2} onChange={(e) => setChecked2(e.target.checked)}>
                            <span className="terms_link">개인정보 수집 및 이용동의</span> <span className="required">(필수)</span>
                          </Checkbox>
                          <button type="button" className="btn_terms_view" onClick={() => showModal('개인정보 수집 및 이용동의', <TermsDetail02 />)}>약관보기</button>
                        </li>
                        <li className="terms_item">
                          <Checkbox className="terms_checkbox" checked={checked3} onChange={(e) => setChecked3(e.target.checked)}>
                            <span className="terms_link">개인정보 수집 및 이용동의</span> <span className="optional">(선택)</span>
                          </Checkbox>
                          <button type="button" className="btn_terms_view" onClick={() => showModal('개인정보 수집 및 이용동의(선택)', <TermsDetail03 />)}>약관보기</button>
                        </li>
                        <li className="terms_item">
                          <Checkbox className="terms_checkbox" checked={checked4} onChange={(e) => setChecked4(e.target.checked)}>
                            <span className="terms_link">저작권보호정책 및 정보공유 동의</span> <span className="required">(필수)</span>
                          </Checkbox>
                          <button type="button" className="btn_terms_view" onClick={() => showModal('저작권보호정책 및 정보공유 동의', <TermsDetail04 />)}>약관보기</button>
                        </li>
                      </ul>
                    </div>

                    <div className="btn_group between">
                      <Stack gap={8} >
                        <Button size="large">취소하기</Button>
                        <Button type="primary" size="large" disabled={!(checked1 && checked2 && checked4)}>동의하기</Button>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={modalData.title}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width={640}
        okText="확인"
        // cancelText="취소"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        styles={{
          header: {
              borderBottom: '1px solid #303336',
              paddingBottom: '15px',
              marginBottom: '15px',
            },
            body: {
              maxHeight: '450px',
              overflowY: 'auto',
            }
          }}
      >
        <div className="terms_modal_wrapper">
          {modalData.content}
        </div>
      </Modal>
    </ScreenShell>
  );
}