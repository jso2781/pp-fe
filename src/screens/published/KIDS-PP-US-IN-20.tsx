import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../ScreenShell';

export default function KIDS_PP_US_IN_20() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '인권경영선언문' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-IN-20" title="인권경영선언문" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>인권경영선언문</span>
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

                  <section className="pageCont-EthicsAnn">
                    <div className="announcement-area">
                      <h3 className="ann-title">인권경영선언문</h3>
                      <div className="ann-intro">
                        <p>우리는 의약품 안전관리를 통한 국민건강 증진을 선도하고 모든 경영활동에서 인권경영을 적극 실천한다.</p>
                        <p>이를 위해 우리는 임직원이 준수해야 할 가치판단과 행동의 기준으로 다음과 같이 인권경영을 선언한다.</p>
                      </div>
                      <ul className="ann-list">
                        <li><strong>하나,</strong> 우리는 세계인권선언 등 인권에 대한 국제기준 및 규범을 지지하고 준수한다.</li>
                        <li><strong>하나,</strong> 우리는 인간의 존엄과 가치를 경영활동의 최우선의 가치로 한다.</li>
                        <li><strong>하나,</strong> 우리는 성별, 지역, 학력, 종교, 장애, 나이 등의 이유로 차별하지 않는다.</li>
                        <li><strong>하나,</strong> 우리는 안전하고 위생적인 근무환경을 제공한다.</li>
                        <li><strong>하나,</strong> 우리는 결사 및 단체교섭의 자유를 보장한다.</li>
                        <li><strong>하나,</strong> 우리는 어떠한 형태의 강제노동과 아동노동을 허용하지 않는다.</li>
                        <li><strong>하나,</strong> 우리는 모든 협력회사, 지역사회 등 이해관계자를 공정하게 대우하고, 인권경영을 실천하도록 지원한다.</li>
                        <li><strong>하나,</strong> 우리는 고객의 개인생활이 침해가 되지 않도록 고객의 인권을 보호한다.</li>
                        <li><strong>하나,</strong> 우리는 국내외 환경관련 법규를 준수하고 환경보호와 오염방지를 위해 노력한다.</li>
                        <li><strong>하나,</strong> 우리는 인권침해를 사전에 예방하며, 적극적인 구제를 위해 노력한다.</li>
                      </ul>
                      <div className="ann-pledge">
                        우리는 임직원 및 이해관계자 모두의 인권을 보호하고 증진하기 위해 노력하며, <br />
                        인권경영의 정착과 확산을 위해 최선을 다할 것을 다짐한다.
                      </div>
                      <p className="ann-signature">한국의약품안전관리원</p>
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
