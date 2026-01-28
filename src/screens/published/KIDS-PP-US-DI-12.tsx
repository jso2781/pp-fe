import React from 'react'
import { Box, Typography, Stack, Pagination, Button} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ScreenShell from '../ScreenShell';
import { useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';

export default function KIDS_PP_US_DI_12() {

  //페이징
  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page') || 1);
  const { list, totalCount } = useAppSelector((s) => s.pst);
  const totalPages = Math.max(1, Math.ceil((totalCount || 1) / 10));


  //return <PopupTemplate screenId="KIDS-PP-US-DI-12" title="DUR 정보검색 제품 검색 시스템 팝업" config={config} />
return (
    <ScreenShell screenId="KIDS-PP-US-DI-12" title="DUR 정보검색 제품 검색 시스템 팝업" uiType="popup">
      
      <Box className="ingredient-popup-wrapper">
        <Box className="ingredient-result-header">
          <span className="label">성분명</span>
          <span className="name">aloperidol</span>
        </Box>

        <Box className="board-info" aria-label="검색결과">
          <Typography className="board-count">
            검색결과 
            <Typography component="span" className="count">1</Typography>
            건
          </Typography>
        </Box>


        {/* 테이블종류 1 */}
        <Box className="base-table-container">
          <Box className="table-responsive has-vscroll">
            <table className="base-table">
              <caption className="sr-only">성분명 정보</caption>
              <colgroup>
                <col />
                <col style={{ width: '30%' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">제품명</th>
                  <th scope="col">제약회사</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td>
                  <td>환인제약(주)</td>
                </tr>
                {/* 스크롤 테스트 용 */}
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
                <tr><td>페리돌정5밀리그램(할로페리돌)_(5mg/1정)</td><td>환인제약(주)</td></tr>
              </tbody>
            </table>
          </Box>
        </Box>

        {/* 테이블종류 2 */}
        <Box className="base-table-container">
          <Box className="table-responsive has-vscroll">
            <table className="base-table">
              <caption className="sr-only">성분명 정보</caption>
              <colgroup>
                <col style={{ width: '30%' }} /> 
                <col />
                <col style={{ width: '130px' }} /> 
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">중복주의 효능군</th>
                  <th scope="col">중복주의 계열</th>
                  <th scope="col">성분</th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>당뇨병용제</td>
                  <td className="tal">
                    <p>Group 3알파-</p>
                    <p>글루코시다제 저해제</p>
                    <p>(α-glucosidase inhibitors)</p>
                  </td>
                  <td>
                    <Box className="detail-info-row">
                      <p className="text">acrarbose</p>
                      <Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>
                        제품검색
                      </Button>
                    </Box>
                  </td>
                </tr>
                {/* 스크롤 테스트 용 */}
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
                <tr><td>당뇨병용제</td><td className="tal"><p>Group 3알파-</p><p>글루코시다제 저해제</p><p>(α-glucosidase inhibitors)</p></td><td><Box className="detail-info-row"><p className="text">acrarbose</p><Button variant="outlined02" size="xsmall" className="btn-detail" endIcon={<ChevronRightIcon />}>제품검색</Button></Box></td></tr>
              </tbody>
            </table>
          </Box>
        </Box>
        <Stack className="paging-wrap">
          <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
            const next = new URLSearchParams(searchParams);
            next.set('page', String(p));
            setSearchParams(next);
          }} />
        </Stack>
      </Box>


    </ScreenShell>
  );
}
