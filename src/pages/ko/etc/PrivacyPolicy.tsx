/**
 * 화면ID: KIDS-PP-US-CS-02
 * 화면명: 개인정보취급방침
 * 화면경로: /etc/PrivacyPolicy
 * 화면설명: 개인정보취급방침
 */
import { useEffect } from 'react';
import DepsLocation from '@/components/common/DepsLocation';
import RenderTrmsStt from '@/pages/ko/etc/components/RenderTrmsStt';
import { Box } from '@mui/material';

export default function PrivacyPolicy() {

  // 목차 클릭 시 해당 본문으로 링크
  const goToScroll = (className: string) => {
    const element = document.querySelector(`.${className}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box className="page-layout">
      <Box className="sub-container">
        <Box className="content-wrap">

          {/* 컨텐츠 본문 영역 */}
          <Box className="sub-content">
            <DepsLocation />
            <Box className="content-view" id="content">
              <Box className="page-content">
              {/* --- 본문 시작 --- */}

                <RenderTrmsStt trmsSttCd='STT_PRVC' isList={true}/>
                {/* <RenderTrmsStt
                  trmsSttCd="STT_PRVC"
                  isList={true}
                  onLoaded={(ids: string[]) => {
                    if (ids.length > 0) {
                      const el = document.querySelector(`.${ids[0]}`);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }}
                /> */}
{/* 테스트용 */}
{/* 
<div
  style={{
    backgroundColor: "#fff",
    border: "1px solid #d9d9d9",
    padding: "10px 20px",
    float: "none",
  }}
>
  <ul
    style={{
      width: "85%",
      margin: "20px auto 0px",
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
      listStyle: "none",
    }}
  >
    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy1")}>
        <img
          alt="개인정보의 처리목적"
          className="privacyIcon"
          src="/img/privacy/privacyIcon01.png"
          title="회원가입 및 서비스 제공, 서비스 개선목적 활용 등"
        />{" "}
        개인정보의 처리목적
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy2")}>
        <img
          alt="개인정보의 처리 및 보유기간"
          className="privacyIcon"
          src="/img/privacy/privacyIcon02.png"
          title="회원탈퇴 시, 수집일로부터 10년, 3년 등"
        />{" "}
        개인정보의 처리 및 보유기간
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy3")}>
        <img
          alt="개인정보의 제3자 제공"
          className="privacyIcon"
          src="/img/privacy/privacyIcon03.png"
          title="개인정보의 제공가능한 경우 안내, 정보주체 동의에 의한 제3자 제공 시, 고지사항 등"
        />{" "}
        개인정보의 제3자 제공
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy4")}>
        <img
          alt="개인정보처리의 위탁"
          className="privacyIcon"
          src="/img/privacy/privacyIcon04.png"
          title="사이트운영 및 회원관리, 민원처리 등"
        />{" "}
        개인정보처리의 위탁
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy5")}>
        <img
          alt="정보주체의 권리․의무 및 행사방법"
          className="privacyIcon"
          src="/img/privacy/privacyIcon05.png"
          title="정보주체의 권리․의무 및 행사방법"
        />{" "}
        정보주체의 권리․의무 및 행사방법
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy6")}>
        <img
          alt="처리하는 개인정보 항목"
          className="privacyIcon"
          src="/img/privacy/privacyIcon06.png"
          title="성명, 생년월일, 전화번호, 주소 등"
        />{" "}
        처리하는 개인정보 항목
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy7")}>
        <img
          alt="개인정보의 파기"
          className="privacyIcon"
          src="/img/privacy/privacyIcon07.png"
          title="개인정보의 파기"
        />{" "}
        개인정보의 파기
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy8")}>
        <img
          alt="개인정보의 안전성 확보조치"
          className="privacyIcon"
          src="/img/privacy/privacyIcon08.png"
          title="개인정보의 안전성 확보조치"
        />{" "}
        개인정보의 안전성 확보조치
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy9")}>
        <img
          alt="개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항"
          className="privacyIcon"
          src="/img/privacy/privacyIcon09.png"
          title="개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항"
        />{" "}
        개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy10")}>
        <img
          alt="개인정보보호책임자"
          className="privacyIcon"
          src="/img/privacy/privacyIcon10.png"
          title="개인정보보호책임자"
        />{" "}
        개인정보보호책임자
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy11")}>
        <img
          alt="개인정보 열람청구"
          className="privacyIcon"
          src="/img/privacy/privacyIcon11.png"
          title="개인정보 열람청구"
        />{" "}
        개인정보 열람청구
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy12")}>
        <img
          alt="권익침해 구제방법"
          className="privacyIcon"
          src="/img/privacy/privacyIcon12.png"
          title="권익침해 구제방법"
        />{" "}
        권익침해 구제방법
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy13")}>
        <img
          alt="개인정보의 추가적인 이용·제공의 기준"
          className="privacyIcon"
          src="/img/privacy/privacyIcon13.png"
          title="개인정보의 추가적인 이용·제공의 기준"
        />{" "}
        개인정보의 추가적인 이용·제공의 기준
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy14")}>
        <img
          alt="만 14세미만 아동의 개인정보 처리에 관한 사항"
          className="privacyIcon"
          src="/img/privacy/privacyIcon14.png"
          title="만 14세미만 아동의 개인정보 처리에 관한 사항"
        />{" "}
        만 14세미만 아동의 개인정보 처리에 관한 사항
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy15")}>
        <img
          alt="가명처리 시 가명처리에 관한 사항"
          className="privacyIcon"
          src="/img/privacy/privacyIcon15.png"
          title="가명처리 시 가명처리에 관한 사항"
        />{" "}
        가명처리 시 가명처리에 관한 사항
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy16")}>
        <img
          alt="개인정보 관리수준 진단 결과"
          className="privacyIcon"
          src="/img/privacy/privacyIcon16.png"
          title="개인정보 관리수준 진단 결과"
        />{" "}
        개인정보 보호수준 평가 결과
      </a>
    </li>

    <li
      style={{
        width: "45%",
        marginBottom: "30px",
        position: "relative",
        boxSizing: "border-box",
        display: "list-item",
        textAlign: "-webkit-match-parent",
        cursor: "pointer",
      }}
    >
      <a onClick={() => goToScroll("Privacy17")}>
        <img
          alt="개인정보 처리방침 변경"
          className="privacyIcon"
          src="/img/privacy/privacyIcon17.png"
          title="개인정보 처리방침 변경"
        />{" "}
        개인정보 처리방침 변경
      </a>
    </li>
  </ul>
</div>

<h4 className="Privacy1">
  <img
    alt="개인정보의 처리목적"
    className="privacyIcon"
    src="/img/privacy/privacyIcon01.png"
    title="회원가입 및 서비스 제공, 서비스 개선목적 활용 등"
  />
  제1조(개인정보의 처리목적)
</h4>
<p>
  1. 안전원은 다음의 목적을 위하여 개인정보를 처리하며, 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
</p>
<p>
  가. 회원가입 및 서비스 제공
  <br />
  - 의약품 유해사례입력과 입력한 내역 조회를 위한 개인 식별 차원에서 간단한 개인정보(이메일, 이름, 비밀번호)를 입력 받아 처리합니다.
  <br />
  - 민원인의 신원 확인, 민원업무 접수 및 처리 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등의 목적으로 개인정보를 처리합니다.
  <br />
  - 안전원에 대한 의견제안, 원시자료 요청, DUR정보 의견제안 등의 목적으로 개인정보를 처리합니다.
  <br />
  - 안전원 뉴스레터 정기구독 신청자에 대한 뉴스레터 발송 등의 목적으로 개인정보를 처리합니다.
</p>
<p>
  나. 서비스 개선목적 활용
  <br />
  - 시스템에 대한 접속빈도 파악 또는 시스템 내의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
</p>

<h4 className="Privacy2">
  <img
    alt="개인정보의 처리 및 보유기간"
    className="privacyIcon"
    src="/img/privacy/privacyIcon02.png"
    title="회원탈퇴 시, 수집일로부터 10년, 3년 등"
  />
  제2조(개인정보의 처리 및 보유기간)
</h4>
<p>
  1. 안전원은 법령에 따른 개인정보 보유 이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유 합니다.
</p>
<p>각각의 개인정보 처리 및 보유기간은 다음과 같습니다.</p>
<p>
  이용자 개인정보는 원칙적으로 개인정보의 처리목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대하여는 아래의 사유로 명시한 기간 동안 보존하며, 표 상단의 전체보기를 누르시면 등록·공개하는 전체 개인정보파일을 확인하실 수 있습니다.
</p>
<button
  className="btn-blue"
  style={{ marginLeft: "92%" }}
  type="button"
  onClick={() =>
    (window.location.href =
      "https://www.privacy.go.kr/front/wcp/dcl/per/personalInfoFileSrhList.do?searchInsttCode=B552894&searchInsttNm=한국의약품안전관리원")
  }
>
  전체보기
</button>

<p><b>1.1. 정보주체의 동의를 받지 않고 운영하는 개인정보파일</b></p>
<p>안전원은 다음의 개인정보 항목을 정보주체의 동의 없이 처리하고 있습니다.</p>

<table className="intro">
  <colgroup>
    <col style={{ width: "3%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "20%" }} />
    <col style={{ width: "45%" }} />
    <col style={{ width: "15%" }} />
  </colgroup>
  <tbody>
    <tr>
      <th className="left">순번</th>
      <th>개인정보파일의 명칭</th>
      <th>개인정보처리시스템</th>
      <th className="col-left">운영근거/처리목적</th>
      <th className="right">보유기간</th>
    </tr>
    <tr>
      <td className="left"><cite>1</cite></td>
      <td><cite>지역의약품안전센터 연락처</cite></td>
      <td><cite>-</cite></td>
      <td className="col-left">
        <cite>
          (운영목적) 지역의약품안전센터 주소록 관리
          <br />
          <br />
          (운영근거) 개인정보 보호법 제15조 제1항 제4호, 공공기록물 관리에 관한 법률 시행령 [별표1] 30년 보존의 1번
        </cite>
      </td>
      <td className="right"><cite>30년</cite></td>
    </tr>
    <tr>
      <td className="left">2</td>
      <td className="subject">의약품부작용 신고 및 상담 내역</td>
      <td>의약품부작용신고센터 접수시스템</td>
      <td className="col-left">
        (운영목적)의약품 등으로 인한 부작용 및 안전 정보 수집
        <br />
        <br />
        (운영근거) 약사법 제68조의4제3호, 개인정보보호법 제15조제1항제3호
      </td>
      <td className="right">10년</td>
    </tr>
    <tr>
      <td className="left">3</td>
      <td className="subject">지역의약품안전센터 연락처(국내이상사례보고시스템)</td>
      <td>국내이상사례보고시스템</td>
      <td className="col-left">
        운영근거) 개인정보 보호법 제15조 제1항 4호, 공공기록물 관리에 관한 법률 시행령 [별표1] 30년 보존의 1번
        <br />
        <br />
        (운영목적) 지역의약품안전센터 주소록 관리
      </td>
      <td className="right">30년</td>
    </tr>
    <tr>
      <td className="left">4</td>
      <td className="subject">국외 이상사례보고자료(국외이상사례보고시스템)</td>
      <td>국외이상사례보고시스템</td>
      <td className="col-left">
        운영근거) 약사법 제68조의 8(부작용 등의 보고)
        <br />
        <br />
        (운영목적)의약품등 이상사례 보고수집 및 분석
      </td>
      <td className="right">영구</td>
    </tr>
  </tbody>
</table>

<h4 className="Privacy3">
  <img
    alt="개인정보의 제3자 제공"
    className="privacyIcon"
    src="/img/privacy/privacyIcon03.png"
    title="개인정보의 제공가능한 경우 안내, 정보주체 동의에 의한 제3자 제공 시, 고지사항 등"
  />
  제3조(개인정보의 제3자 제공)
</h4>
<p>
  1. 안전원은 정보주체의 개인정보를 원칙적으로 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서 처리하며, 이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 제5호부터 9호까지의 경우는 공공기관의 경우로 한정합니다.
</p>
<p>
  &nbsp;&nbsp;1) 정보주체로부터 별도의 동의를 받는 경우
  <br />
  &nbsp;&nbsp;2) 다른 법률에 특별한 규정이 있는 경우
  <br />
  &nbsp;&nbsp;3) 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우
  <br />
  &nbsp;&nbsp;4) 삭제 &lt;2023. 6. 1.&gt;
  <br />
  &nbsp;&nbsp;5) 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의 심의·의결을 거친 경우
  <br />
  &nbsp;&nbsp;6) 조약, 그 밖의 국제협정의 이행을 위하여 외국정보 또는 국제기구에 제공하기 위하여 필요한 경우
  <br />
  &nbsp;&nbsp;7) 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우
  <br />
  &nbsp;&nbsp;8) 법원의 재판업무 수행을 위하여 필요한 경우
  <br />
  &nbsp;&nbsp;9) 형 및 감호, 보호처분의 집행을 위하여 필요한 경우
  <br />
  &nbsp;&nbsp;10) 공중위생 등 공공의 안전과 안녕을 위하여 긴급히 필요한 경우
</p>
<p>
  2. 안전원은 개인정보를 제3자에게 제공하는 경우 다음의 항목을 정보주체에게 알린 후 동의를 받겠습니다.
  <br />
  &nbsp;&nbsp;1) 제공받는 자의 성명(법인 또는 단체인 경우에는 그 명칭)과 연락처
  <br />
  &nbsp;&nbsp;2) 제공받는 자의 개인정보 이용 목적, 제공 하는 개인정보의 항목
  <br />
  &nbsp;&nbsp;3) 개인정보를 제공 받는 자의 개인정보 보유 및 이용기간(제공 시에는 제공 받는 자의 보유 및 이용 기간을 말한다.)
  <br />
  &nbsp;&nbsp;4) 동의를 거부할 수 있다는 사실 및 동의 거부에 따른 불이익이 있는 경우에는 그 불이익의 내용
</p>

<h4 className="Privacy4">
  <img
    alt="개인정보처리의 위탁"
    className="privacyIcon"
    src="/img/privacy/privacyIcon04.png"
    title="사이트운영 및 회원관리, 민원처리 등"
  />
  제4조(개인정보처리의 위탁)
</h4>
<p>1. 안전원은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
<p>
  -위탁자: 한국의약품안전관리원
  <br />
  -수탁자: ㈜에스엠티정보기술
  <br />
  -위탁내용: 사이트운영 및 회원관리, 민원처리, 기타 기술지원을 위한 회원정보 접근 등
  <br />
  -위탁기간 : 2025년 1월 1일 ~ 2025년 12월 31일
</p>
<p>
  -위탁자 : 한국의약품안전관리원
  <br />
  -수탁자 : ㈜아이티아이즈
  <br />
  -위탁내용 : 의약품안전정보관리시스템 통합구축(1차)
  <br />
  -위탁기간 : 2025년 7월 28일 ~ 프로젝트 종료일까지
</p>
<p>
  -위탁자 : 한국의약품안전관리원
  <br />
  -수탁자 : ㈜미소테크
  <br />
  -위탁내용 : 의약품안전정보관리시스템 통합구축(1차)
  <br />
  -위탁기간 : 2025년 7월 28일 ~ 프로젝트 종료일까지
</p>
<p>
  -위탁자 : 한국의약품안전관리원
  <br />
  -수탁자 : ㈜웨이버스
  <br />
  -위탁내용 : 의약품안전정보관리시스템 통합구축(1차)
  <br />
  -위탁기간 : 2025년 7월 28일 ~ 프로젝트 종료일까지
</p>
<p>
  -위탁자 : 한국의약품안전관리원
  <br />
  -수탁자 : ㈜씨엠제이씨
  <br />
  -위탁내용 : 의약품안전정보관리시스템 통합구축(1차)
  <br />
  -위탁기간 : 2025년 7월 28일 ~ 프로젝트 종료일까지
</p>
<p>
  2. 안전원은 위탁계약 체결 시, ｢개인정보 보호법｣ 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 안전성 확보조치, 재위탁 제한, 수탁자에 대한 관리‧감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
</p>
<p>
  3. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리 방침을 통하여 공개하도록 하겠습니다.
</p> */}


                

              {/* --- 본문 끝 --- */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
