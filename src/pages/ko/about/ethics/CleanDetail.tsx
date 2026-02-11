/**
 * 화면ID: KIDS-PP-US-IN-19
 * 화면명: 클린신고센터 상세
 * 화면경로: /ko/about/ethics/CleanDetail
 * 화면설명: 클린신고센터 상세
 */
import DepsLocation from "@/components/common/DepsLocation";
import Lnb from "@/components/common/Lnb";
import type { DshstyDclrRVO } from "@/features/dclr/DshstyDclrTypes";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


export default function CleanDetail () {
  const location = useLocation();
  const navigate = useNavigate()

  if(!location.state) return <>잘못된 접근</>;

  const dshstyDclrRVO = location.state as DshstyDclrRVO;
  
  const currentUrl = location.pathname;

  const handleListClick = () => {
    navigate('/ko/about/ethics/CleanCenter');
  }

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
              <p className="fs-20 fw-700" style={{margin: "0 0 25px 10px"}}>클린신고서 상세 정보</p>
                <section className="pageCont-">
                  <Box className="bordered-box">
                    <Box className="form-view-page">
                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          이름 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.encptMbrFlnm}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          휴대전화번호 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.encptMbrTelno ?? ' '}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          이메일 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.encptMbrEmlNm || <>&nbsp;</>}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고사항 제목 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dclrTtlNm}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위자 이름 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dshstyActrFlnm}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 시기 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dshstyActPipCn}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 장소 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dshstyActPlcCn}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위 내용 <Box component="span" className="required">(필수)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value multiline">
                        {dshstyDclrRVO.dshstyActCn}
                        </Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고인 외 알고 있는 사람: 목격자 포함 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.addIdntfIdfrNm || <>&nbsp;</>}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          신고내용을 확인할 수 있는 방법 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dclrCnIdntyMthdCn || <>&nbsp;</>}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위를 알게 된 계기 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value multiline">{dshstyDclrRVO.dshstyActIdntfRsnCn || <>&nbsp;</>}</Typography>
                      </Box>

                      <Box className="form-item">
                        <Typography component="dt" className="label">
                          부정행위의 횟수 및 기간 <Box component="span" className="optional">(선택)</Box>
                        </Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO.dshstyActPrdCn || <>&nbsp;</>}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 5 }}></Box>
                  <Box className="bordered-box">
                    <Box className="form-group-wrap summary-grid">
                      <Box className="summary-item">
                        <Typography component="dt" className="label">제출일시</Typography>
                        <Typography component="dd" className="view-value">{dshstyDclrRVO?.regDt?.split('.')[0]}</Typography>
                      </Box>
                      <Box className="summary-item">
                        <Typography component="dt" className="label">진행상태</Typography>
                        <Typography component="dd" className="view-value">접수완료</Typography>
                      </Box>
                      <Box className="summary-item">
                        <Typography component="dt" className="label">처리일시</Typography>
                        <Typography component="dd" className="view-value">-</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="btn-group between">
                    <Button variant="outlined02" size="large" onClick={handleListClick}>목록</Button>
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
