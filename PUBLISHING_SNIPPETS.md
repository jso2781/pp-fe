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
```tsx
**Header**
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
**Footer**
```

## 탭 라인
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
```tsx
<Box className="no-data">
  <p>게시물이없습니다.</p>
</Box>
```

## 페이징
```tsx
Stack className="paging-wrap">
  <Pagination count={totalPages} page={pageIndex} onChange={(_, p) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next);
  }} />
</Stack>
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

## 체크박스
```tsx

```

## 라디오
```tsx

```

## 폼태그
```tsx

```

## 버튼
```tsx

```

## 파일첨부
```tsx

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
