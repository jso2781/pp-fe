import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import DepsLocation from '@/components/common/DepsLocation';
import Lnb from '@/components/common/Lnb';
import ScreenShell from '../../ScreenShell';

export default function KIDS_PP_US_IN_05() {
  // --- lnb ---
  const sideItems = useMemo(() => [
    { 
      key: '/', 
      label: '조직도' 
    },
  ], []);

  const teamData = [
    { rank: '팀장', name: '임교순', tel: '02-2172-6850', job: '의약품통합정보관리팀 업무 총괄' },
    { rank: '차장', name: '임준호', tel: '02-2172-6863', job: '위기대응 의료제품정보시스템 운영관리' },
    { rank: '차장', name: '최형훈', tel: '02-2172-3829', job: '의약품통합정보시스템 운영관리, 의약품 안전정보관리시스템 구축 지원' },
    { rank: '과장', name: '엄현섭', tel: '02-2172-6729', job: '의약품통합정보시스템 운영관리, 서버·인프라관리, 장애관리' },
    { rank: '과장', name: '문정아', tel: '02-2172-6890', job: '규제과학 첨단바이오의약품 장기추적조사 전산망 운영 및 기능개선, 개인정보보호' },
    { rank: '과장', name: '김창수', tel: '02-2172-3870', job: '위기대응 의료제품정보시스템 전산망 운영 및 기능개선, 정보보안' },
    { rank: '과장', name: '조현주', tel: '02-2172-3844', job: '의약품통합정보시스템 기획행정, 장애인 접근성 개선 사업관리' },
    { rank: '과장', name: '권지은', tel: '02-2172-6872', job: '의약품통합정보시스템 기획행정, 장애인 접근성 개선 사업관리' },
    { rank: '과장', name: '주성환', tel: '02-2172-6838', job: '위기대응 의료제품정보시스템 사용자 교육·홍보 및 기준관리' },
    { rank: '과장', name: '공인식', tel: '02-2172-6859', job: '규제과학 첨단바이오의약품 장기추적조사 전산망 운영 및 기능개선' },
    { rank: '대리', name: '정유진', tel: '02-2172-6869', job: '의약품통합정보시스템 품질관리, 자료제공, 개인정보보호 등' },
    { rank: '대리', name: '정원일', tel: '02-2172-6817', job: '의약품통합정보시스템 운영관리, 서버·인프라 관리, 장애관리, 연계관리 등' },
    { rank: '대리', name: '노경준', tel: '02-2172-6855', job: '의약품통합정보시스템 기획행정, 장애인 접근성 사업관리' },
    { rank: '대리', name: '조현기', tel: '02-2172-6843', job: '위기대응 의료제품정보시스템 사용자 교육·홍보 및 기준관리' },
    { rank: '대리', name: '강민수', tel: '02-2172-3869', job: '위기대응 의료제품정보시스템 사용자 교육·홍보 및 기준관리' },
    { rank: '대리', name: '정문희', tel: '02-2172-3827', job: '의약품통합정보시스템 민원상담 관리' },
    { rank: '대리', name: '김희수', tel: '02-2172-3840', job: '장애인 접근성 개선 사업관리' },
    { rank: '대리', name: '문지희', tel: '02-2172-3841', job: '장애인 접근성 개선 사업(교육, 홍보, 실태조사)' },
    { rank: '대리', name: '김은수', tel: '02-2172-3836', job: '장애인 접근성 개선 사업(교육, 홍보, 실태조사)' },
    { rank: '대리', name: '고나연', tel: '02-2172-3821', job: '장애인 접근성 개선 사업(교육, 홍보, 실태조사)' },
    { rank: '대리', name: '홍원기', tel: '02-2172-6870', job: '규제과학 첨단바이오의약품 장기추적조사 전산망 운영 및 기능개선,개인정보보호 등' },
    { rank: '대리', name: '김혜림', tel: '02-2172-6889', job: '의약품통합정보시스템 민원대응' },
    { rank: '대리', name: '채수정', tel: '02-2172-6822', job: '의약품통합정보시스템 품질관리, 자료 제공 등' },
    { rank: '대리', name: '김동훈', tel: '02-2172-6840', job: '' },
    { rank: '대리', name: '손채은', tel: '02-2172-6892', job: '' },
    { rank: '대리', name: '윤지원', tel: '02-2172-6882', job: '' },
    { rank: '대리', name: '정인우', tel: '02-2172-6815', job: '' },
    { rank: '주임', name: '박지현', tel: '', job: '의약품통합정보시스템 민원상담(1544-9563)' },
    { rank: '주임', name: '한미희', tel: '', job: '의약품통합정보시스템 민원상담(1544-9563)' },
    { rank: '주임', name: '김애경', tel: '', job: '의약품통합정보시스템 민원상담(1544-9563)' },
    { rank: '주임', name: '유진희', tel: '', job: '의약품통합정보시스템 민원상담(1544-9563)' },
  ];
  return (
    <ScreenShell screenId="KIDS-PP-US-IN-05" title="조직도" uiType="cms">
      
      <Box className="page-layout">
        <Box className="sub-container">
          <Box className="content-wrap">

            {/* Lnb 영역 */}
            <Box className="lnb-wrap">
              <Box className="lnb-menu">
                <Typography component="h2" className="lnb-tit">
                  <span>조직도</span>
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

                 <section className="pageCont-AboutOrg">
                  <div className="org-tree">
                    {/* 최상단: 원장 및 이사회/감사팀 */}
                    <div className="org-top-section">
                      <div className="node-boss">
                        <a href="javascript:void(0);" className="node-link" onClick={() => {/* 부서정보 핸들러 */}}>원장</a>
                      </div>
                      
                      <div className="board-audit-group">
                        <div className="node-board">
                          <a href="javascript:void(0);" className="node-link">이사회</a>
                        </div>
                        <div className="node-audit">
                          <a href="javascript:void(0);" className="node-link">감사팀</a>
                        </div>
                      </div>
                    </div>

                    {/* 본부 및 팀 목록 영역 */}
                    <div className="org-division-row">
                      
                      {/* 1. 기획경영본부 */}
                      <div className="division-column">
                        <div className="division-header">
                          <a href="javascript:void(0);" className="node-link">기획경영본부</a>
                        </div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item"><a href="javascript:void(0);">전략기획팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">혁신경영팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">교육홍보팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">정보화팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">의약품통합정보관리팀</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* 2. 의약품안전정보본부 */}
                      <div className="division-column">
                        <div className="division-header">
                          <a href="javascript:void(0);" className="node-link">의약품안전정보본부</a>
                        </div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item"><a href="javascript:void(0);">안전정보관리팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">약물역학빅데이터팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">DUR정보팀</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* 3. 의약품안전조사본부 */}
                      <div className="division-column">
                        <div className="division-header">
                          <a href="javascript:void(0);" className="node-link">의약품안전조사본부</a>
                        </div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item"><a href="javascript:void(0);">의약품부작용피해구제팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">첨단바이오규제과학팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">임상시험안전지원팀</a></li>
                          </ul>
                        </div>
                      </div>

                      {/* 4. 마약류통합정보관리본부 */}
                      <div className="division-column">
                        <div className="division-header">
                          <a href="javascript:void(0);" className="node-link">마약류통합정보관리본부</a>
                        </div>
                        <div className="team-container">
                          <ul className="team-list">
                            <li className="team-item"><a href="javascript:void(0);">마약류시스템운영팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">마약류제도지원팀</a></li>
                            <li className="team-item"><a href="javascript:void(0);">마약류정보분석팀</a></li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 부서 정보가 뿌려질 영역 */}
                  <div className="org-info-display">
                    <h3 className="info-title">부서 정보</h3>
                    <Box className="base-table-container">
                      <Box className="table-responsive">
                        <table className="base-table table-type-2">
                          <caption className="sr-only">조직 및 업무 안내</caption>
                            <colgroup>
                              <col style={{ width: '10%' }} />
                              <col style={{ width: '10%' }} />
                              <col style={{ width: '20%' }} />
                              <col style={{ width: 'auto' }} />
                            </colgroup>
                            <thead>
                              <tr>
                                <th scope="col">직책</th>
                                <th scope="col">성명</th>
                                <th scope="col">전화번호</th>
                                <th scope="col">주요업무</th>
                              </tr>
                            </thead>
                            <tbody>
                            {teamData.map((member, index) => (
                              <tr key={`member-${index}`}>
                                <td>{member.rank}</td>
                                <td>{member.name}</td>
                                <td>{member.tel}</td>
                                <td className="tal">
                                  {member.job || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Box>
                    </Box>
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
