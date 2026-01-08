import React from 'react'
import { Typography } from '@mui/material';
import PopupTemplate from '../templates/PopupTemplate'

export default function KIDS_PP_US_LG_16() {
  const config = {
    content: (
      <div className="popup_content">
        <div className="popup_desc">
          <p>회원님께서 비밀번호를 변경하신지 90일이 이상 경과되어 안내해드립니다.</p>
          <p>비밀번호를 변경하시려면 지금 변경 버튼을 클릭해주세요.</p>
        </div>
      </div>
    ),
    okText: "지금 번경",
    cancelText: "나중에 변경",
    onOk: () => {
    },
    onCancel: () => {
    }
  }

  return <PopupTemplate screenId="KIDS-PP-US-LG-16" title="비밀번호 변경안내" config={config} />
}