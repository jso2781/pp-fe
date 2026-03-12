# 퍼블리싱 스니핏

## 스니핏 리스트
publishing-snippets/
├ layout
│  └ page-layout.tsx (LNB + 본문 기본 구조)
├ Tabs
│  ├ tabs-line.tsx (기본 라인형 탭)
│  ├ tabs-box.tsx (박스형 탭 + 패널 구성)
│  └ anchor-tabs.tsx (HTML 앵커 이동 탭)
├ Tables
│  ├ table-base.tsx (기본 테이블 - Row/Col Span 포함)
│  ├ table-variants.tsx (Type-2, Type-3 변형)
│  ├ table-scroll-x.tsx (모바일 가로 스크롤)
│  ├ table-scroll-y.tsx (모바일 세로 스크롤)
│  └ empty-state.tsx (데이터가 없는 경우)
├ form
│  ├ form-group.tsx (기본 폼 태그 구성)
│  ├ checkbox-radio.tsx (체크박스 및 라디오)
│  ├ switch.tsx (스위치 토글)
│  ├ file-upload.tsx (파일 첨부)
│  ├ button-base.tsx (기본 버튼 세트)
│  └ button-cms.tsx (CMS용 사이즈/정렬 컨트롤)
├ UI Elements
│  ├ loading-progress.tsx (선형 로딩바 & 메시지)
│  └ pagination.tsx (페이징 처구)
└ typography
   ├ list-bullet.tsx (블릿 리스트)
   ├ list-number.tsx (숫자 리스트)
   ├ list-description.tsx (dl/dt/dd 리스트 & 넘버)
   └ text-variants.tsx (일반 텍스트 & 아이콘 타입)


## 컨텐츠페이지.tsx 구조
**콘텐츠 페이지에서 사용하는 기본 레이아웃 구조입니다.**
```tsx
<Box className="page-layout">
  <Box className="sub-container">
    <Box className="content-wrap">

      {/* Lnb 영역 */}
      <Box className="lnb-wrap">
        <Box className="lnb-menu">
          <Typography component="h2" className="lnb-tit">
            <span>LNB 타이틀</span>
          </Typography>
          <Box className="lnb-list">
            <Lnb items={sideItems} />
          </Box>
        </Box>
      </Box>

      {/* 컨텐츠 본문 영역 */}
      <Box className="sub-content">
        {/* <DepsLocation /> */}
        <Box className="content-view" id="content">
          <Box className="page-content">
          {/* --- 본문 시작 --- */}

          {/* --- 본문 끝 --- */}
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
</Box>
```

## 탭 라인
**카테고리 전환을 위한 기본 라인형 탭 UI입니다.**
```tsx
<Box className="category-tabs" role="navigation" aria-label="기본 카테고리 선택">
  <Tabs
    value={activeCategory} 
    onChange={handleTabChange}
    variant="scrollable"
    scrollButtons="auto"
    selectionFollowsFocus
  >
    {Object.keys(categoryNaming).map((category) => (
      <Tab 
        key={`type1-${category}`} 
        value={category} 
        label={categoryNaming[category]} 
        id={`tab-type1-${category}`}
        aria-controls={`tabpanel-type1-${category}`}
      />
    ))}
  </Tabs>
</Box>
```

## 탭 박스
**탭 선택에 따라 콘텐츠 패널이 변경되는 박스형 탭 UI입니다.**
**사용 위치 : 홈>주요 업무>DUR 정보>내가 먹는 약의 DUR 정보**
```tsx
<Box className="category-tabs box-variant" role="navigation" aria-label="기본 카테고리 선택">
  <Tabs
    value={activeCategory} 
    onChange={handleTabChange}
    scrollButtons="auto"
    selectionFollowsFocus
  >
    {Object.keys(categoryNaming).map((category) => (
      <Tab 
        key={`type1-${category}`} 
        value={category} 
        label={categoryNaming[category]} 
        id={`tab-type1-${category}`}
        aria-controls={`tabpanel-type1-${category}`}
      />
    ))}
  </Tabs>
</Box>
{Object.keys(categoryNaming).map((category) => (
  <Box
    key={`panel-type1-${category}`}
    role="tabpanel" 
    id={`tabpanel-type1-${category}`} // Tab의 aria-controls와 매칭
    aria-labelledby={`tab-type1-${category}`} // 이 패널의 이름이 무엇인지 연결
    hidden={activeCategory !== category} // 선택되지 않은 패널은 숨김
    className="tab-panel-container"
  >
    {activeCategory === category && (
      <Box className="panel-content">
        <Typography className="sr-only">{categoryNaming[category]} 탭 컨텐츠 </Typography>
        <Box>
          {categoryNaming[category]} 내용이 출력됩니다.
        </Box>
      </Box>
    )}
  </Box>
))}
```

## html 컨텐츠 앵커탭
**페이지 내부 섹션으로 이동하는 HTML 앵커 기반 탭 UI입니다.**
**사용 위치 : CMS 콘텐츠 페이지**
```tsx
<div className="category-anchor-tabs" aria-label="카테고리 이동">
  <ul className="tabs-list" role="tablist">
    <li className="tab-item" role="none">
      <a href="#anchor-sec1" id="tab1" className="tab-link active" role="tab" aria-selected="true" aria-controls="anchor-sec1">사전협의</a>
    </li>
    <li className="tab-item" role="none">
      <a href="#anchor-sec2" id="tab2" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec2">활용결과 등록</a>
    </li>
    <li className="tab-item" role="none">
      <a href="#anchor-sec3" id="tab3" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec3">시스템 이용 문의</a>
    </li>
    <li className="tab-item" role="none">
      <a href="#anchor-sec4" id="tab4" className="tab-link" role="tab" aria-selected="false" aria-controls="anchor-sec4">시스템시스템시스템 이용 문의</a>
    </li>
  </ul>
</div>
<div className="anchor-contents-area">
  <section id="anchor-sec1" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab1">
    <div className="inner-box">
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
      <p>사전협의 상세 내용... (내용 길게 생략)</p>
    </div>
  </section>
  <section id="anchor-sec2" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab2">
    <div className="inner-box">
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
      <p>활용결과 등록 상세 내용...</p>
    </div>
  </section>
  <section id="anchor-sec3" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab3">
    <div className="inner-box">
      <p>시스템 이용 문의 상세 내용...</p>
      <p>시스템 이용 문의 상세 내용...</p>
    </div>
  </section>
  <section id="anchor-sec4" className="tab-section" role="tabpanel" tabIndex={0} aria-labelledby="tab4">
    <div className="inner-box">
      <p>시스템 이용 문의 상세 내용...</p>
    </div>
  </section>
</div>
```

## 데이터 로딩
**데이터 로딩 시 표시되는 로딩 상태 UI입니다.**
```tsx
<Box className="loading-progress-box">
  <Typography className="loading-msg-top">
    DUR 정보 검색 결과 상세 정보를 불러오고 있습니다.
  </Typography> 
  <LinearProgress className="bar-style" />
  <Typography className="loading-msg-bottom">
    잠시만 기다려 주세요.
  </Typography>
</Box>
```

## 기본 테이블
**데이터 정보를 표시하는 기본 테이블 컴포넌트입니다.**
**기본 표형식 사용**
```tsx
<Box className="base-table-container">
  <Box className="base-table-meta">
    <p className="update-date">(2025.07.14 기준)</p>
  </Box>
  <Box className="table-responsive">
    <table className="base-table">
      <caption className="sr-only">테이블제목</caption>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '45%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>정보 유형</th>
          <th scope="col">정보 건수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowSpan={3}>금기성분 고시</th>
          <td>병용금기 (2004년~)</td>
          <td>1,450</td>
        </tr>
        <tr>
          <td>특정연령대금기 (2004년~)</td>
          <td>207</td>
        </tr>
        <tr>
          <td>임부금기 (2008년~)</td>
          <td>1,210</td>
        </tr>
        <tr>
          <th scope="row" className="th2">th타입2</th>
          <td>병용금기 (2004년~)</td>
          <td>1,450</td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>
```

## 테이블 type-2
**테이블 상단 라인이 강조된 스타일입니다**
```tsx
<Box className="base-table-container">
  <Box className="table-responsive">
    <table className="base-table table-type-2">
      <caption className="sr-only">테이블제목</caption>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '45%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>정보 유형</th>
          <th scope="col">정보 건수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowSpan={3}>금기성분 고시</th>
          <td>병용금기 (2004년~)</td>
          <td>1,450</td>
        </tr>
        <tr>
          <td>특정연령대금기 (2004년~)</td>
          <td>207</td>
        </tr>
        <tr>
          <td>임부금기 (2008년~)</td>
          <td>1,210</td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>
```

## 테이블 type-3
**테이블상단라인추가+양옆라인제거**
```tsx
<Box className="base-table-container">
  <Box className="table-responsive">
    <table className="base-table table-type-3">
      <caption className="sr-only">테이블제목</caption>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '45%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>정보 유형</th>
          <th scope="col">정보 건수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowSpan={3}>금기성분 고시</th>
          <td>병용금기 (2004년~)</td>
          <td>1,450</td>
        </tr>
        <tr>
          <td>특정연령대금기 (2004년~)</td>
          <td>207</td>
        </tr>
        <tr>
          <td>임부금기 (2008년~)</td>
          <td>1,210</td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>
```

## 테이블 모바일 스크롤 (가로)
**모바일에서 가로 스크롤이 필요한 테이블입니다.**
```tsx
<Box className="base-table-container">
  <Box className="table-responsive has-scroll">
    <table className="base-table">
      <caption className="sr-only">테이블제목</caption>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '45%' }} />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" colSpan={2}>정보 유형</th>
          <th scope="col">정보 건수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" rowSpan={3}>금기성분 고시</th>
          <td>병용금기 (2004년~)</td>
          <td>1,450</td>
        </tr>
        <tr>
          <td>특정연령대금기 (2004년~)</td>
          <td>207</td>
        </tr>
        <tr>
          <td>임부금기 (2008년~)</td>
          <td>1,210</td>
        </tr>
      </tbody>
    </table>
  </Box>
</Box>
```

## 테이블 모바일 스크롤 (세로)
**데이터가 많은 경우 세로 스크롤을 적용하는 테이블입니다.**
```tsx
<Box className="base-table-container">
  <Box className="table-responsive has-vscroll">
    <table className="base-table">
      <caption className="sr-only">테이블제목</caption>
      <colgroup>
        <col />
        <col style={{ width: '30%' }} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">정보 유형</th>
          <th scope="col">정보 건수</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>병용금기</td>
          <td>1,450</td>
        </tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
        <tr><td>특정연령대금기</td><td>207</td></tr>
      </tbody>
    </table>
  </Box>
</Box>
```

## 데이터없을경우
**데이터가 없는 경우 표시하는 UI입니다.**
```tsx
<Box className="no-data">
  <p>게시물이없습니다.</p>
</Box>
```

## 페이징
**페이지 목록을 이동하기 위한 페이징 컴포넌트입니다.**
```tsx
<Stack className="paging-wrap">
  <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next);
  }} />
</Stack>
```

## 폼태그
**기본 입력 폼 구성입니다.**
**회원가입, 문의 폼, 검색 폼 등 다양한 입력 UI에서 사용합니다**
```tsx
<Box className="bordered-box">
  <Box component="form" noValidate>
    <Box className="form-group-wrap">
      <Box className="form-item">
        <Typography component="label" htmlFor="password" className="label">
          새 비밀번호 
          <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
        </Typography>
        <TextField
          id="password"
          type="password"
          placeholder="숫자+영문+특수문자 조합 10자리 이상"
          size="large"
          fullWidth
          error={true}
          helperText="사용할수없는 비밀번호입니다."
          slotProps={{
            htmlInput: {
              'aria-required': 'true',
              //'aria-describedby': errors.password ? 'password-alert' : undefined,
              
            },
            formHelperText: {
              id: 'password-alert',
              className: 'error-alert',
              //role: errors.password ? 'alert' : undefined,
              //'aria-live': errors.password ? 'polite' : undefined,
            },
          }}
        />
      </Box>
      <Box className="form-item">
        <Typography component="label" htmlFor="loginId" className="label">
          아이디
          <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
        </Typography>
        <Stack direction="row" spacing={1} className="input-with-btn">
          <TextField
            id="loginId"
            placeholder="아이디를 입력하세요."
            size="large"
            fullWidth
            error={true}
            helperText="사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                //'aria-describedby': errors.loginId ? 'loginId-alert' : undefined,
                
              },
              formHelperText: {
                id: 'loginId-alert',
                className: 'error-alert',
                //role: errors.loginId ? 'alert' : undefined,
                //'aria-live': errors.loginId ? 'polite' : undefined,
              },
            }}
          />
          <Button variant="outlined" size="large" aria-label="아이디 중복확인" className="btn-form-util">중복확인</Button>
        </Stack>
      </Box>

      <Box className="flex-container flex-half">
        {/* 이름 (필수) */}
        <Box className="form-item">
          <Typography component="label" htmlFor="userName" className="label">
            이름
            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
          </Typography>
          <TextField
            id="userName"
            placeholder="이름을 입력하세요."
            size="large"
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
              },
            }}
            fullWidth
          />
        </Box>
        {/* 휴대폰번호 (필수) */}
        <Box className="form-item">
          <Typography component="label" htmlFor="phone" className="label">
            휴대폰번호
            <Box component="span" className="required" aria-label="필수입력">(필수)</Box>
          </Typography>
          <TextField
            id="phone"
            placeholder="숫자만 입력하세요."
            size="large"
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
              },
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Box className="form-item">
        <Typography component="label" htmlFor="reportMotive" className="label">
          부정행위를 알게 된 계기 <Box component="span" className="optional">(선택)</Box>
        </Typography>
        {/* 플레이스홀더 대신 가이드 텍스트 */}
        <Typography variant="caption" sx={{ color: '#8A949E', display: 'block', mb: 1, lineHeight: 1.4 }}>
          * 알게 된 계기, 일시, 장소 등을 최대한 상세히 작성해 주시면 처리에 도움이 됩니다.
        </Typography>
        <TextField
          id="reportMotive"
          placeholder="내용을 입력하세요."
          multiline
          rows={4}
          fullWidth
        />
      </Box>
    </Box>
  </Box>
</Box>
```

## 체크박스
```tsx
<Box className="form-item-row">
  <Typography className="label">
    체크박스 가로형
    <Box component="span" className="required">(필수)</Box>
  </Typography>
  <Box className="group-container">
    <Box className="form-item">
      <FormControlLabel
        className="chk-field"
        control={<Checkbox id="chk-r1" />}
        label={<Typography component="label" htmlFor="chk-r1">체크1</Typography>}
      />
    </Box>
    <Box className="form-item">
      <FormControlLabel
        className="chk-field"
        control={<Checkbox id="chk-r2" />}
        label={<Typography component="label" htmlFor="chk-r2">체크2</Typography>}
      />
    </Box>
  </Box>
</Box>
{/* 체크박스 세로형 */}
<Box className="form-item-row-vertical">
  <Typography className="label">
    체크박스 세로형
    <Box component="span" className="required">(필수)</Box>
  </Typography>
  <Box className="group-container">
    <Box className="form-item">
      <FormControlLabel
        className="chk-field"
        control={<Checkbox id="chk-v1" />}
        label={<Typography component="label" htmlFor="chk-v1">항목1</Typography>}
      />
    </Box>
    <Box className="form-item">
      <FormControlLabel
        className="chk-field"
        control={<Checkbox id="chk-v2" />}
        label={<Typography component="label" htmlFor="chk-v2">항목2</Typography>}
      />
    </Box>
  </Box>
</Box>
```

## 라디오
```tsx
<Box className="form-item-row">
  <Typography className="label">
    라디오 가로형
    <Box component="span" className="required">(필수)</Box>
  </Typography>
  <RadioGroup row className="radio-group-container">
    <Box className="form-item">
      <FormControlLabel
        className="rdo-field"
        value="1"
        control={<Radio id="rdo-r1" />}
        label={<Typography component="label" htmlFor="rdo-r1">선택1</Typography>}
      />
    </Box>
    <Box className="form-item">
      <FormControlLabel
        className="rdo-field"
        value="2"
        control={<Radio id="rdo-r2" />}
        label={<Typography component="label" htmlFor="rdo-r2">선택2</Typography>}
      />
    </Box>
  </RadioGroup>
</Box>
{/* 라디오 세로형 */}
<Box className="form-item-row-vertical">
  <Typography className="label">
    라디오 세로형
    <Box component="span" className="required">(필수)</Box>
  </Typography>
  <RadioGroup className="radio-group-container">
    <Box className="form-item">
      <FormControlLabel
        className="rdo-field"
        value="1"
        control={<Radio id="rdo-v1" />}
        label={<Typography component="label" htmlFor="rdo-v1">선택1</Typography>}
      />
    </Box>
    <Box className="form-item">
      <FormControlLabel
        className="rdo-field"
        value="2"
        control={<Radio id="rdo-v2" />}
        label={<Typography component="label" htmlFor="rdo-v2">선택2</Typography>}
      />
    </Box>
  </RadioGroup>
</Box>
```

## 스위치
```tsx
<Stack direction="row" alignItems="center" spacing={2} className="switch_group">
  <BaseSwitch.Root
    className="base_switch_root"
    checked={isCheck}
    onCheckedChange={(checked) => setIsCheck(checked)}
  >
    <BaseSwitch.Thumb className="base_switch_thumb" />
  </BaseSwitch.Root>
  <Typography component="p" className="switch_label">
    {isCheck ? '사용 중' : '미사용'}
  </Typography>
</Stack>
```

## 파일첨부
```tsx
<Box className="attach-file-box">
  <FileUploadField
    value={uploadedFiles}
    onChange={setUploadedFiles} 
    accept=".pdf,.png,.jpg,.jpeg"
    multiple={false}
    maxFiles={5}
    maxFileSizeMB={10}
    maxTotalSizeMB={10}
    helperText="PDF, PNG, JPG 형식의 10MB 이하의 파일을 업로드해주세요."
  />
  
  {uploadedFiles.length > 0 && (
    <Box className="file-viewer">
      <Stack direction="row" className="uploader-info">
        <Typography component="p" className="file-count">
          <Box component="span">{uploadedFiles.length}개</Box>
        </Typography>
        <Button
          size="xsmall"
          variant="outlined02"
          onClick={handleDeleteAllFiles}
          sx={{ textTransform: 'none' }}
        >
          전체 파일 삭제
        </Button>
      </Stack>
      <Box className="file-list">
        {uploadedFiles.map((file, index) => (
          <Box key={index} className="file-item">
            <Typography>
              {file.name} [
              {file.name.split('.').pop()?.toLowerCase()}, {formatFileSize(file.size)}]
            </Typography>
            <Button 
              className="btn-delete-circle" 
              size="small"
              onClick={() => handleDeleteFile(index)}
              title="삭제" 
            >
              <span aria-hidden="true">×</span>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )}
</Box>
```


## 버튼
**서비스 전반에서 사용하는 기본 버튼 컴포넌트입니다.**
```tsx
<Button variant="contained">기본버튼 contained</Button>
<Button variant="contained02">기본버튼 contained02</Button>

<Button variant="outlined">라인버튼 outlined</Button>
<Button variant="outlined02">라인버튼 outlined02</Button>
<Button variant="outlined03">라인버튼 outlined03</Button>
<Button variant="outlined04">라인버튼 outlined04</Button>
```

**버튼 크기를 조절하는 사이즈 옵션입니다.**
```tsx
<Button variant="contained" size="xsmall">xsmall</Button>
<Button variant="contained" size="small">small</Button>
<Button variant="contained" size="medium">medium</Button>
<Button variant="contained" size="large">large</Button>
```

**아이콘 및 기능에 따라 사용하는 버튼 유형입니다.**
```tsx
<Button 
  variant="text" 
  className="btn-link" 
  endIcon={<ChevronRightIcon />}
  size="small"
>
  링크버튼
</Button>
<Button 
  variant="outlined" 
  className="btn-detail" 
  endIcon={<ChevronRightIcon />}
  size="small"
>
  상세보기
</Button>
<Button 
  variant="text" 
  className="btn-download"
  startIcon={<DownloadIcon />}
  size="small"
>
  다운로드
</Button>
```

**게시판 하단버튼(오른쪽,가운데,양쪽,좌/우 그룹정렬)**
**게시판 하단 버튼 정렬 클래스**
- btn-group : 기본 정렬
- btn-group right : 오른쪽 정렬
- btn-group center : 가운데 정렬
- btn-group between : 좌우 정렬
- left-group : 왼쪽 버튼 그룹
- right-group : 오른쪽 버튼 그룹
```tsx
<Box className="btn-group">
  <Button variant="contained02" size="large">
    목록
  </Button>
</Box>

<Box className="btn-group right">
  <Button variant="outlined02" size="large">
    취소하기
  </Button>
  <Button variant="contained" size="large">
    확인
  </Button>
</Box>

<Box className="btn-group center">
  <Button variant="outlined02" size="large">
    취소하기
  </Button>
  <Button variant="contained" size="large">
    확인
  </Button>
</Box>

<Box className="btn-group between">
  <Button variant="outlined02" size="large">취소하기</Button>
  <Button variant="contained" size="large">수정</Button>
</Box>

<Box className="btn-group between">
  <Box className="left-group">
    <Button variant="contained02" size="large">
      목록
    </Button>
  </Box>
  <Box className="right-group">
    <Button variant="outlined02" size="large">
      취소
    </Button>
    <Button variant="contained" size="large">
      수정
    </Button>
  </Box>
</Box>
```

## 버튼 CMS html 사이즈
```tsx

```

## 버튼 CMS html 컨트롤 (클래스 - center, right)
```tsx

```

## 버튼 CMS html
```tsx

```

## 타이틀아래 텍스트 구성
```tsx

```

## 리스트 블릿
```tsx

```

## 리스트 넘버
```tsx

```

## dl 리스트
```tsx

```

## dl 넘버리스트
```tsx

```

## 텍스트타입
```tsx

```

## 텍스트 아이콘타입
```tsx

```

## 웹,모바일 이미지
```tsx

```

## 
```tsx

```

## 
```tsx

```

## 
```tsx

```

## 
```tsx

```

## 
```tsx

```

## 
```tsx

```









**문서 작성일**: 2026년
**프로젝트**: pp-fe
**버전**: 0.1.0
