import React from 'react'
import PopupTemplate from '../templates/PopupTemplate'

export default function KIDS_PP_US_LG_05() {
  const config = {
    content: (
      <div className="modal-content">
        <div className="modal-desc">
          <p>비밀번호가 5회이상 잘못입력되어, 비밀번호를 재설정 후 이용할 수 있습니다. 비밀번호를 재설정하시겠습니까? </p>
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

  return <PopupTemplate screenId="KIDS-PP-US-LG-05" title="비밀번호 5회 오류" config={config} />
}
