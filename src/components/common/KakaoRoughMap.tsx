import React from 'react';

/**
 * 카카오 지도 퍼가기(RoughMap) - iframe 방식
 * document.write() 사용으로 SPA 직접 로드 시 브라우저 차단 → 별도 HTML을 iframe으로 로드
 */
const KakaoRoughMap: React.FC = () => {
  const mapSrc = `${import.meta.env.BASE_URL}kakao-roughmap.html`;
  return (
    <div className="conT314">
      <div className="conT314_box">
        <div className="conT314_inner">
          <iframe
            src={mapSrc}
            title="오시는 길 지도"
            style={{ width: '100%', maxWidth: 640, height: 360, border: 0 }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default KakaoRoughMap;
