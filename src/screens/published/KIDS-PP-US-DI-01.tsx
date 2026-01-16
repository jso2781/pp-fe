/* import React from 'react'
import FormTemplate from '../templates/FormTemplate'

export default function KIDS_PP_US_DI_01() {
  // TODO: uiType이 모호합니다. 템플릿/구성을 수정하세요.
  const config = {
  // fields: [{ key:'', label:'', type:'input', required:true }]
  submitLabel: '저장'
}

  return <FormTemplate screenId="KIDS-PP-US-DI-01" title="DUR 이해" config={config} />
}
 */
import React, { useMemo } from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import ScreenShell from '../ScreenShell';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';

export default function KIDS_PP_US_DI_01() {
  
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/1', 
      label: 'DUR 정보',
      children: [
        { key: '/1/1', label: 'DUR 정보 검색' },
        { key: '/1/2', label: '내가 먹는 약의 DUR 정보' },
        { key: '/1/3', label: '의약품 적정사용 정보집' },
        { key: '/1/4', label: '알림 게시판' },
        { key: '/1/5', label: '의견 제안' },
      ] 
    },
    { 
      key: '/2', 
      label: '피해구제',
      children: [
        { key: '/2/1', label: '피해구제 제도' },
        { key: '/2/2', label: '피해구제 신청방법' },
        { key: '/2/3', label: '공지사항' },
      ]
    },
    { 
      key: '/3', 
      label: '첨단바이오 포커스' 
    },
    { 
      key: '/4', 
      label: '마약류안전정보지' 
    },
  ], []);

  return (
    <ScreenShell screenId="KIDS-PP-US-DI-01" title="DUR 이해" uiType="page">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>DUR 정보</span>
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


                  <Box component="section" className="dur-intro">
                    <Box className="dur-description">
                      <Typography component="p" className="dur-text">
                        <strong className="highlight">의약품 적정사용(Drug Utilization Review, 이하 DUR)</strong>은 
                        의약품을 병용하거나 소아·노인·임부·수유부에게 투여 시 주의해야 할 정보를 사전에 알리고, 
                        정해진 기준에 따라 약물 사용이 적절하게 이뤄지는지 점검하고 평가하는 
                        <strong className="highlight">제도</strong>입니다.
                      </Typography>
                      <Typography component="p" className="dur-text">
                        부적절한 약물 사용을 사전에 방지함으로써 <strong className="highlight">부작용을 예방</strong>하고 
                        환자에게 제공하는 <strong className="highlight">의료서비스의 질을 향상</strong>시키며 
                        의약품을 <strong className="highlight">안전하게 사용</strong>할 수 있는 환경을 조성하는데 그 목적이 있습니다.
                      </Typography>
                    </Box>

                    <Typography component="h3" className="section-title">
                      DUR 정보 제공 흐름
                    </Typography>
                    <Typography component="p" className="flow-description">
                      현재 한국의약품안전관리원에서 개발한 DUR 정보는 식품의약품안전처 고시 및 공고 등의 형태로 전 국민에게 제공되고, 
                      건강보험심사평가원 DUR 전산시스템(의약품안전사용서비스)를 통해 의료현장에 제공됩니다.
                    </Typography>
                    
                    <Box className="dur-image-wrapper">
                      <img 
                        src="/img/dur-intro_img01.png" 
                        alt="한국의약품안전관리원 개발 정보가 식약처 고시를 거쳐 심평원 DUR 시스템으로 의료현장에 제공되는 과정" 
                      />
                    </Box>

                    <Typography variant="h5" component="h3" className="section-title">
                      DUR 정보 정의
                    </Typography>
                    
                    <List component="ul" className="dur-check-list">
                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">1. 병용금기 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          <strong>두 가지 이상의 의약품</strong>을 함께 사용하는 경우, 치료 효과의 변화 또는 심각한 부작용 발생 등의 우려가 있어 동시에 사용하지 않아야 하는 유효성분의 조합
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">2. 특정연령대 금기 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          소아, 노인 등 특정연령대의 환자가 사용함에 있어 안전성이 확보되지 않았거나 심각한 부작용 발생 등의 우려가 있어 사용하지 않아야 하는 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">3. 임부금기 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          태아에게 매우 심각한 위해성(태아기형 또는 태아독성 등)을 유발하거나 유발할 가능성이 높아 임부에게 사용하는 것이 권장되지 않는 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">4. 용량주의 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          성인에게 특정 용량 초과 시 효과의 증가는 기대하기 어렵고 용량의존적 부작용 발생 가능성이 높아져 1일 최대용량에 대한 주의가 필요한 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">5. 투여기간주의 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          특정 투여기간 초과 시 효과의 증가는 기대하기 어렵고 부작용 발생 가능성이 높아져 1회 최대 투여기간에 대한 주의가 필요한 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">6. 효능군중복주의 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          약리기전이 동일하거나 유사한 효능군 내에서 중복 투여할 때 추가적인 효과의 증가는 기대하기 어렵고 부작용 발생 가능성이 높아져 주의가 필요한 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">7. 노인주의 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          노인에서 부작용 발생 빈도 증가 등의 우려가 있어 주의가 필요한 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">8. 수유부주의 성분</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          수유 중의 소아에게 부작용 발생 등의 우려가 있어 수유부에게 사용 시 주의가 필요한 유효성분
                        </Typography>
                      </ListItem>

                      <ListItem component="li" className="dur-check-item">
                        <Typography component="span" className="dur-check-item__title">9. 분할주의 의약품</Typography>
                        <Typography component="span" className="dur-check-item__desc">
                          단위의 제형을 분할하여 복용할 경우 약효를 기대하기 어려운 의약품
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>


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