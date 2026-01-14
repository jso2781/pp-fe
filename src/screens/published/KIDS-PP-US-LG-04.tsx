import React from 'react'
import { Typography } from '@mui/material';
import PopupTemplate from '../templates/PopupTemplate'

export default function KIDS_PP_US_LG_04() {
  const config = {
    content: (
      <div className="modal-content">
        <div className="popup-status">
          <div className="status-row">
            <Typography component="span" variant="body2"  className="label">로그아웃까지 남은 시간 : </Typography>
            <Typography component="span" variant="body2"  className="time">04분 58초</Typography>
          </div>
        </div>
        <div className="modal-desc">
          <p>잠시 후 자동으로 로그아웃될 예정입니다.</p>
          <p>로그인 시간을 연장하시겠습니까?</p>
        </div>
      </div>
    ),
    wrapClassName: 'modal-small',
    okText: "로그인 연장",
    cancelText: "로그아웃",
    onOk: () => {
      console.log("연장 버튼 클릭");
    },
    onCancel: () => {
      console.log("로그아웃 버튼 클릭");
    }
  }

  return <PopupTemplate screenId="KIDS-PP-US-LG-04" title="자동 로그아웃 안내" config={config} />
}