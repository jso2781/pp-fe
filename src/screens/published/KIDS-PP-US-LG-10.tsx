import React from 'react'
import PopupTemplate from '../templates/PopupTemplate'

export default function KIDS_PP_US_LG_10() {
  const config = {
    content: (
      <div className="popup-content">
        <div className="popup-desc">
          <p>비밀번호 변경이 완료되었습니다.</p>
          <p>이제 정상적으로 로그인이 가능합니다.</p>
          <p>지금 로그인 페이지로 이동하시겠습니까?</p>
        </div>
      </div>
    ),
    wrapClassName: 'modal-small',
    okText: "확인",
    cancelText: "취소",
    onOk: () => {
      
    },
    onCancel: () => {
    }
  }

  return <PopupTemplate screenId="KIDS-PP-US-LG-10" title="비밀번호 변경 완료" config={config} />
}
