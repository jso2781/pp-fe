import DepsLocation from "@/components/common/DepsLocation";
import Lnb from "@/components/common/Lnb";
import { Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";


export default function AboutCleanDetail () {
  const location = useLocation();
  
  const currentUrl = location.pathname;

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* Lnb 영역 */}
          <Box className="lnb-wrap">
            <Box className="lnb-menu">
              <Typography component="h2" className="lnb-tit">
                <span>윤리경영</span>
              </Typography>
              <Box className="lnb-list">
                <Lnb currentUrl={currentUrl} />
              </Box>
            </Box>
          </Box>

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}

                <section className="pageCont-">
                  <Box className="bordered-box">
                    <Box className="form-view-page">
                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          이름 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">홍길동</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          휴대전화번호 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">010-1234-5678</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          이메일 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">gidong_hong99@gmail.com</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고사항 제목 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">공금 횡령 및 부정 청탁 관련 신고</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위자 이름 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">김철수 외 2명</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 시기 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">2025년 12월 말부터 현재까지</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 장소 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">본사 3층 재무실 및 외부 식당</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 내용 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value multiline">
                          해당 행위자는 법인카드를 사적으로 이용하였으며, 관련 증빙 서류를 허위로 작성한 정황이 있습니다.
                        </Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고인 외 알고 있는 사람: 목격자 포함 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">이영희 대리</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고내용을 확인할 수 있는 방법 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">내부 회계 장부</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위를 알게 된 계기 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value multiline">직접 목격함</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위의 횟수 및 기간 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">약 3개월간</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 5 }}></Box>
                  <Box className="bordered-box">
                    <Box className="form-group-wrap summary-grid">
                      <Box className="summary-item">
                        <Typography component="dt" className="label">제출일시</Typography>
                        <Typography component="dd" className="view-value">2026-03-31 12:34</Typography>
                      </Box>
                      <Box className="summary-item">
                        <Typography component="dt" className="label">진행상태</Typography>
                        <Typography component="dd" className="view-value">처리완료</Typography>
                      </Box>
                      <Box className="summary-item">
                        <Typography component="dt" className="label">처리일시</Typography>
                        <Typography component="dd" className="view-value">2026-04-01 12:34</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="btn-group between">
                    <Button variant="outlined02" size="large">취소하기</Button>
                    <Button variant="contained" size="large">제출하기</Button>
                  </Box>
                </section> 



              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}