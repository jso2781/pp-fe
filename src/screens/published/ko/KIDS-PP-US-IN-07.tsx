import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_07() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '고객헌장' 
    },
  ], []);

  // none,blcok 탭
  useEffect(() => {
    const injectTabEvents = () => {
      // 1. 컨텐츠 영역 안에서 탭과 섹션을 찾습니다.
      const contentArea = document.getElementById('content');
      if (!contentArea) return;

      const tabs = contentArea.querySelectorAll('.category-link-tabs .tab-link');
      const sections = contentArea.querySelectorAll('section');

      if (tabs.length === 0 || sections.length === 0) return;

      // 2. 초기 상태 설정 (첫 번째 섹션만 보이게)
      sections.forEach((sec, idx) => {
        if (sec instanceof HTMLElement) {
          sec.style.display = idx === 0 ? 'block' : 'none';
        }
      });

      // 3. 각 탭에 클릭 이벤트 부여
      tabs.forEach((tab, index) => {
        const tabBtn = tab as HTMLElement;
        
        // 중복 방지를 위해 기존 onclick 제거 후 새로 할당
        tabBtn.onclick = (e) => {
          e.preventDefault();

          // 모든 탭 active 제거 및 현재 탭 추가
          tabs.forEach(t => t.classList.remove('active'));
          tabBtn.classList.add('active');

          // 모든 섹션 숨기고 해당 인덱스 섹션만 표시
          sections.forEach((sec, idx) => {
            if (sec instanceof HTMLElement) {
              sec.style.display = idx === index ? 'block' : 'none';
            }
          });
        };
      });
    };

    // [실행 1] 페이지 로드 시 즉시 실행
    injectTabEvents();

    // [실행 2] MutationObserver: #content 내부 HTML이 바뀌는 순간(CMS 로드) 감지
    const observer = new MutationObserver(() => {
      injectTabEvents();
    });

    const targetNode = document.getElementById('content');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-07" title="고객헌장" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>고객헌장</span>
                </Typography>
                <Box className="lnb-list">
                  <Lnb items={sideItems} />
                </Box>
              </Box>
            </Box>

            {/* 컨텐츠 본문 영역 */}
            <Box className="sub-content">
              <DepsLocation />
              <Box className="content-view" id="content">
                <Box className="page-content">
                {/* --- 본문 시작 --- */}

                  <div className="category-link-tabs" aria-label="카테고리 이동">
                    <ul className="tabs-list" role="tablist">
                      <li className="tab-item"><a href="#" className="tab-link active">고객헌장</a></li>
                      <li className="tab-item"><a href="#" className="tab-link">핵심서비스 이행표준</a></li>
                      <li className="tab-item"><a href="#" className="tab-link">고객응대 서비스 이행표준</a></li>
                    </ul>
                  </div>
                  <section className="pageCont-AboutCharter">
                    <h3 className="section-title">CS MISSION</h3>
                    <div className="section-desc sec01">
                      국민 건강증진을 위한 고객 중심의 의약품 안전관리 서비스 제공
                    </div>
                    <h3 className="section-title">CS VISION</h3>
                    <div className="section-desc sec02">
                      국민이 신뢰할 수 있는 의약품 안전관리 전문기관
                    </div>
                    <h3 className="section-title">고객헌장</h3>
                    <div className="section-desc sec03">
                      <p className="txt">한국의약품안전관리원은, 의약품 등의 안전과 관련한 <br/>
                      각종 정보의 수집, 관리, 분석,평가 및 제공 업무를 효율적이고 <br/>
                      체계적으로 수행하여 국민 건강 증진 및 사회적 가치 실현에 앞장서겠습니다.</p>
                      <ul className="promise-list">
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 <span className="txt-2">고객이 신뢰할 수 있는</span> 의약품등 <span className="txt-2">안전관리 업무를 수행</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 실효성 높은 의약품등 <span className="txt-2">안전 정보를 수집 및 분석하여 제공</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 <span className="txt-2">소중한 고객의 의견</span>을 적극적으로 <span className="txt-2">업무 개선에 반영</span>하겠습니다.</p>
                        </li>
                        <li>
                          <span className="num">하나,</span>
                          <p>우리는 국민 건강 증진에 기여하는 <span className="txt-2">사회적 책임을 성실히 수행</span>하겠습니다.</p>
                        </li>
                      </ul>
                      <p className="txt">이러한 약속을 지키기 위해,<br/>구체적인 서비스 이행 기준을 마련하고, 한국의약품안전관리원 임직원들은 성실하게 지킬 것을 약속드립니다.</p>
                    </div>
                  </section>

                  <section className="pageCont-ServiceStandard">
                    <h3 className="section-title">핵심서비스 이행표준</h3>
                    <div className="section-desc sec01">
                      <dl className="standard-list">
                        <dt>1. 신뢰할 수 있는 의약품등 안전관리</dt>
                        <dd>
                          <p className="text-bullet">대국민 의약품안정보시스템을 99%이상의 가동률로 안정적으로 이용할 수 있도록 하겠습니다.</p>
                          <p className="text-bullet">의약품 부작용 보고 원시자료의제공 승인 이후 30일 이내에 제공하겠습니다.</p>
                          <p className="text-bullet">마약류통합관리시스템의 무중단운영 원칙을 준수하며, 시스템장애 발생을 최소화하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>2. 실효성 높은 의약품등 안전정보 제공</dt>
                        <dd>
                          <p className="text-bullet">대국민 의약품안정보시스템을 99%이상의 가동률로 안정적으로 이용할 수 있도록 하겠습니다.</p>
                          <p className="text-bullet">의약품 부작용 보고 원시자료의제공 승인 이후 30일 이내에 제공하겠습니다.</p>
                          <p className="text-bullet">마약류통합관리시스템의 무중단운영 원칙을 준수하며, 시스템장애 발생을 최소화하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>3. 고객 중심의 업무 개선</dt>
                        <dd>
                          <p className="text-bullet">피해구제 신청인의 편의성 제고를위하여 진료기록부 제출 서류 항목을 3종으로 간소화하겠습니다.</p>
                          <p className="text-bullet">의약품 안전 사용의 인식제고를 위해 홍보물 등을 지속적으로 배포하여 의약품 안전사용 환경을 구축하는데 기여하겠습니다.</p>
                          <p className="text-bullet">년간 50회 이상의 모니터링을 통하여 변경된 허가 사항이 반영된 최신 DUR(의약품 적정 사용) 정보를 제공하겠습니다.</p>
                          <p className="text-bullet">마약류통합관리시스템 사용자의 편의성을 위하여 년 4회 이상 시스템 기능 개선을 추진 및 반영하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>4. 국민 건강 증진 기여</dt>
                        <dd>
                          <p className="text-bullet">다양한 홍보 콘텐츠 및 매체를 활용하여 의약품부작용피해구제제도의 대 국민 인지도를 제고하겠습니다.</p>
                          <p className="text-bullet">약물역학조사 대상의 약물 성분을 100개 이상으로 확대하여 안전한 의약품을 사용할 수 있는 정보를 제공하겠습니다</p>
                        </dd>
                      </dl>
                    </div>
                  </section>

                  <section className="pageCont-ServiceStandard">
                    <h3 className="section-title">고객응대 서비스 이행표준</h3>
                    <div className="section-desc sec01">
                      <dl className="standard-list">
                        <dt>1. 신뢰할 수 있는 의약품등 안전관리</dt>
                        <dd>
                          <span className="sub-tit">1) 방문하시는 경우</span>
                          <p className="text-bullet">대국민 의약품안정보시스템을 99%이상의 가동률로 안정적으로 이용할 수 있도록 하겠습니다.</p>
                          <p className="text-bullet">의약품 부작용 보고 원시자료의제공 승인 이후 30일 이내에 제공하겠습니다.</p>
                          <p className="text-bullet">마약류통합관리시스템의 무중단운영 원칙을 준수하며, 시스템장애 발생을 최소화하겠습니다.</p>
                        </dd>
                        <dd>
                          <span className="sub-tit">2) 전화하시는 경우</span>
                          <p className="text-bullet">인사말과 소속, 이름을 정확하게 밝히고 고객의 의견을 경청하여 친절하게 응대하겠습니다.</p>
                          <p className="text-bullet">고객의 문의에 이해하기 쉬운 용어로 충분한 설명과 문제를 파악하고 해결하기 위해 노력하겠습니다.</p>
                          <p className="text-bullet">다른 직원에게 연결하여야 하는 경우, 고객에게 양해를 구한 후 담당직원을 정확히 알려드리고 연결해 드리겠습니다.</p>
                          <p className="text-bullet">전화 통화가 끝났을 때에는 정중히 마무리 인사를 하고, 고객이 먼저 끊은신 후 수화기를 내려놓겠습니다. </p>
                        </dd>
                        <dd>
                          <span className="sub-tit">3) 온라인으로 상담하시는 경우</span>
                          <p className="text-bullet">우리원 홈페이지 등을 통해 불편사항과 문의사항을 상시 접수 하겠습니다.</p>
                          <p className="text-bullet">인터넷 상담 및 민원이 없는지 수시로 확인하고, 업무일 기준 7일 이내에 답변하겠습니다.</p>
                          <p className="text-bullet">온라인으로 문의하신 의견은 성실히 검토하여 반드시 결과를 알려드리겠습니다.</p>
                          <p className="text-bullet">다양하고 정확한 정보를 고객이 쉽게 이용할 수 있도록 제공하겠습니다.</p>
                        </dd>
                        <dd>
                          <span className="sub-tit">4) 서면(FAX, 우편)으로 의견을 제시하는 경우</span>
                          <p className="text-bullet">서면으로 제출된 의견에 대해서는 담당자가 접수하고, 접수 결과를 알려드리겠습니다.</p>
                          <p className="text-bullet">서면으로 내용 확인이 어려울 경우에는 당사자 문의 또는 관련기관 확인을 통해 사실 관계를 명확히 검토하겠습니다.</p>
                        </dd>
                        <dd>
                          <span className="sub-tit">5) 고객정보 보호와 알권리 보장</span>
                          <p className="text-bullet">고객의 정보보호를 위해 공공기관의 ”개인정보 보호에 관한 법률”을 준수하겠습니다.</p>
                          <p className="text-bullet">개인의 정보는 외부에 유출되지 않도록 주기적으로 안전관리 점검을 실시하겠습니다.</p>
                          <p className="text-bullet">정보공개제도를 충실히 이행하여 고객의 알권리를 충족하고 행정업무의 투명성을 확보하겠습니다.</p>
                          <p className="text-bullet">우리원의 주요 업무현황을 홈페이지에 공개하여 항상 열람이 가능하도록 하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>2. 고객참여 및 의견제시</dt>
                        <dd>
                          <span className="sub-tit">1) 고객의견 제시 및 답변</span>
                            <p className="text-bullet">고객님의 문의, 건의, 불편 사항 등을 홈페이지&lt;알림마당&gt; 메뉴의 &lt;고객의 소리&gt;, &lt;Q&amp;A&gt;, &lt;민원신청&gt;을 통해 수렴하겠습니다.</p>
                            <p className="text-bullet">
                              고객님께서 불편 사항에 대해 개선을 요구하거나 의견을 주실 때에는 성명과 E-mail, 연락처, 주소를 정확하게 기재하여 주시기 바랍니다.
                            </p>
                            <div className="sub-text-group">
                                <p>※ 홈페이지: www.drugsafe.or.kr</p>
                                <p>※ 전화: 02-2172-6700</p>
                                <p>※ 팩스: 02-2172-6701</p>
                                <p>※ 우편: (14051) 경기도 안양시 동안구 부림로 169번길 30, 5층 한국의약품안전관리원</p>
                            </div>
                            <p className="text-bullet">고객님께서 제시해주신 모든 의견에 대해 가능한 즉시 답변드릴 수 있도록 노력하겠으며, 즉시 답변이 어려운 경우 최대한 빠른 기한 내에 답변하겠습니다.</p>
                            <div className="sub-text-group">
                              <p>※ 고객의소리(VOC) 처리 기준 (업무일 기준)</p>
                              <p>- 단순질의 / 건의 등 홈페이지 민원 답변: 7일 이내</p>
                              <p>- 서면 민원, 국민신문고 이첩민원 답변: 7일 이내</p>
                            </div>
                            <p className="text-bullet">업무 성격상 처리기간이 지연될 경우에는, 중간처리 상황과 처리 예정 기한을 알려드리겠습니다.</p>
                        </dd>
                        <dd>
                          <span className="sub-tit">2) 고객의견 반영 및 개선</span>
                          <p className="text-bullet">우리원에서 제공하는 서비스에 대해 개선이 필요하다고 생각하시는 경우에는 언제든지 전화, 인터넷, 서면 등으로 의견을 제시해 주시기 바랍니다.</p>
                          <p className="text-bullet">홈페이지, 방문, 전화, 문의 등의 채널을 통하여 수렴된 고객님의 의견을 한국의약품안전관리원의 제도와 서비스 개선에 반영하고, 그 개선 실적을 홈페이지에 공개하겠습니다.</p>
                          <p className="text-bullet">고객의 소리함으로 수렴된 고객님들의 소중한 의견은 최대한 업무 개선에 반영하고, 개선 결과를 별도로 통보 및 개선 실적을 홈페이지에 공지하겠습니다.</p>
                          <p className="text-bullet">고객께서 제시해 주신 의견에 대하여 채택 여부를 검토하여 알려드리고, 채택된 제안에 대해 소정의 보상을 드리겠습니다.</p>
                          <p className="text-bullet">고객에게 제공하는 서비스 수준을 주기적으로 평가하고 미흡사항에 대하여 보완, 개선해 나가기 위하여 고객만족도 조사를 실시하고 그 결과를 우리원 홈페이지에 공지하겠습니다.</p>
                        </dd>
                      </dl>
                      <dl className="standard-list">
                        <dt>3. 잘못된 서비스에 대한 시정 및 보상조치</dt>
                        <dd className="other-case">
                          <p className="text-bullet">직원의 불친절한 서비스 내용의신고시 해당 내용을 조사하여 처리결과를 알려드리겠습니다.</p>
                          <p className="text-bullet">부당한 업무 처리로 고객에게 피해를 주는 행위를 근절함으로써 신뢰받는 기관 문화를 조성하겠습니다.</p>
                          <p className="text-bullet">서비스 이행기준을 주기적으로 평가하여 내부 업무 개선에 반영하고, 우리원 홈페이지에 공지하겠습니다.</p>
                        </dd>
                      </dl>
                    </div>
                  </section>

                {/* --- 본문 끝 --- */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScreenShell>
  );
}
