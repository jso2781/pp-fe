/**
 * DialogContext 사용 예시 파일
 *
 * [배경 음영 없음] showDialog, showAlert, showConfirm
 *   - AlertExample, ConfirmExample, DialogExample
 *
 * [배경 음영 있음] showDialogBackdrop, showAlertBackdrop, showConfirmBackdrop
 *   - AlertBackdropExample, ConfirmBackdropExample, DialogBackdropExample
 *
 * [동시 사용] BothAtOnceExample — 두 종류는 상태를 공유하지 않아 동시에 띄워도 서로 영향 없음
 *
 * 사용: useDialog() 훅으로 위 함수들을 꺼내 사용.
 */

import { useDialog } from '@/contexts/DialogContext'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

/**
 * 예시 컴포넌트: showAlert 사용법
 */
export function AlertExample() {
  const { showAlert } = useDialog()
  const { t } = useTranslation()

  // 예시 1: 기본 사용 (메시지만)
  const handleBasicAlert = () => {
    showAlert('저장되었습니다.')
  }

  // 예시 2: 제목과 함께 사용
  const handleAlertWithTitle = () => {
    showAlert('저장되었습니다.', '성공')
  }

  // 예시 3: onConfirm 콜백 사용
  const handleAlertWithCallback = () => {
    showAlert(
      '저장되었습니다.',
      '성공',
      () => {
        console.log('확인 버튼 클릭됨')
        // 추가 작업 수행 (예: 페이지 이동, 상태 업데이트 등)
      }
    )
  }

  // 예시 4: i18n 사용
  const handleI18nAlert = () => {
    showAlert(
      t('saveSuccess') || '저장되었습니다.',
      t('success') || '성공',
      () => {
        console.log('저장 완료 후 처리')
      }
    )
  }

  // 예시 5: API 호출 후 성공 메시지
  const handleApiSuccess = async () => {
    try {
      // API 호출
      // await someApiCall()
      showAlert('데이터가 성공적으로 저장되었습니다.', '저장 완료')
    } catch (error) {
      showAlert('저장 중 오류가 발생했습니다.', '오류')
    }
  }

  return (
    <div>
      <Button onClick={handleBasicAlert}>기본 Alert</Button>
      <Button onClick={handleAlertWithTitle}>제목 포함 Alert</Button>
      <Button onClick={handleAlertWithCallback}>콜백 포함 Alert</Button>
      <Button onClick={handleI18nAlert}>i18n Alert</Button>
      <Button onClick={handleApiSuccess}>API 성공 Alert</Button>
    </div>
  )
}

/**
 * 예시 컴포넌트: showConfirm 사용법
 */
export function ConfirmExample() {
  const { showConfirm } = useDialog()
  const { t } = useTranslation()

  // 예시 1: 기본 사용 (메시지만)
  const handleBasicConfirm = () => {
    showConfirm('정말 삭제하시겠습니까?')
  }

  // 예시 2: 제목과 함께 사용
  const handleConfirmWithTitle = () => {
    showConfirm('정말 삭제하시겠습니까?', '삭제 확인')
  }

  // 예시 3: onConfirm만 사용 (취소는 기본 동작)
  const handleConfirmOnly = () => {
    showConfirm(
      '정말 삭제하시겠습니까?',
      '삭제 확인',
      () => {
        console.log('삭제 실행')
        // 실제 삭제 로직
      }
    )
  }

  // 예시 4: onConfirm과 onCancel 모두 사용
  const handleConfirmWithBothCallbacks = () => {
    showConfirm(
      '변경사항이 저장되지 않았습니다.\n정말 나가시겠습니까?',
      '나가기 확인',
      () => {
        console.log('확인 클릭 - 페이지 이동')
        // 페이지 이동 로직
      },
      () => {
        console.log('취소 클릭 - 현재 페이지 유지')
        // 취소 시 아무 작업도 하지 않음
      }
    )
  }

  // 예시 5: 데이터 삭제 확인
  const handleDeleteConfirm = () => {
    showConfirm(
      '이 데이터를 삭제하면 복구할 수 없습니다.\n정말 삭제하시겠습니까?',
      '삭제 확인',
      async () => {
        try {
          // await deleteApi(id)
          console.log('삭제 완료')
          // 삭제 성공 후 목록 새로고침 등
        } catch (error) {
          console.error('삭제 실패:', error)
        }
      },
      () => {
        console.log('삭제 취소')
      }
    )
  }

  // 예시 6: i18n 사용
  const handleI18nConfirm = () => {
    showConfirm(
      t('deleteConfirmMessage') || '정말 삭제하시겠습니까?',
      t('deleteConfirm') || '삭제 확인',
      () => {
        // 삭제 로직
      },
      () => {
        // 취소 로직
      }
    )
  }

  // 예시 7: 로그아웃 확인
  const handleLogoutConfirm = () => {
    showConfirm(
      '로그아웃 하시겠습니까?',
      '로그아웃',
      () => {
        // 로그아웃 처리
        // dispatch(logout())
      },
      () => {
        // 취소 시 아무 작업도 하지 않음
      }
    )
  }

  return (
    <div>
      <Button onClick={handleBasicConfirm}>기본 Confirm</Button>
      <Button onClick={handleConfirmWithTitle}>제목 포함 Confirm</Button>
      <Button onClick={handleConfirmOnly}>확인만 콜백</Button>
      <Button onClick={handleConfirmWithBothCallbacks}>확인/취소 콜백</Button>
      <Button onClick={handleDeleteConfirm}>삭제 확인</Button>
      <Button onClick={handleI18nConfirm}>i18n Confirm</Button>
      <Button onClick={handleLogoutConfirm}>로그아웃 확인</Button>
    </div>
  )
}

/**
 * 예시 컴포넌트: showDialog 사용법 (고급 옵션)
 */
export function DialogExample() {
  const { showDialog } = useDialog()
  const { t } = useTranslation()

  // 예시 1: 기본 옵션 사용
  const handleBasicDialog = () => {
    showDialog({
      message: '기본 다이얼로그입니다.',
    })
  }

  // 예시 2: Alert 타입 (확인 버튼만)
  const handleAlertDialog = () => {
    showDialog({
      message: '저장되었습니다.',
      title: '성공',
      type: 'alert',
      confirmText: '확인',
      onConfirm: () => {
        console.log('확인 클릭')
      },
    })
  }

  // 예시 3: Confirm 타입 (확인/취소 버튼)
  const handleConfirmDialog = () => {
    showDialog({
      message: '정말 삭제하시겠습니까?',
      title: '삭제 확인',
      type: 'confirm',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        console.log('삭제 실행')
      },
      onCancel: () => {
        console.log('취소')
      },
    })
  }

  // 예시 4: 커스텀 버튼 텍스트
  const handleCustomButtonText = () => {
    showDialog({
      message: '변경사항을 저장하시겠습니까?',
      title: '저장 확인',
      type: 'confirm',
      confirmText: '저장',
      cancelText: '저장 안 함',
      onConfirm: () => {
        console.log('저장 실행')
      },
      onCancel: () => {
        console.log('저장 취소')
      },
    })
  }

  // 예시 5: i18n과 함께 사용
  const handleI18nDialog = () => {
    showDialog({
      message: t('saveConfirmMessage') || '저장하시겠습니까?',
      title: t('saveConfirm') || '저장 확인',
      type: 'confirm',
      confirmText: t('save') || '저장',
      cancelText: t('cancel') || '취소',
      onConfirm: () => {
        // 저장 로직
      },
      onCancel: () => {
        // 취소 로직
      },
    })
  }

  // 예시 6: 여러 줄 메시지
  const handleMultiLineDialog = () => {
    showDialog({
      message: '다음 항목들이 삭제됩니다:\n- 항목 1\n- 항목 2\n- 항목 3\n\n정말 삭제하시겠습니까?',
      title: '삭제 확인',
      type: 'confirm',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: () => {
        console.log('삭제 실행')
      },
    })
  }

  // 예시 7: API 호출과 함께 사용
  const handleApiDialog = async () => {
    try {
      // API 호출
      // const result = await someApiCall()
      
      showDialog({
        message: '데이터가 성공적으로 저장되었습니다.',
        title: '저장 완료',
        type: 'alert',
        confirmText: '확인',
        onConfirm: () => {
          // 저장 완료 후 추가 작업 (예: 페이지 이동)
          // navigate('/somewhere')
        },
      })
    } catch (error) {
      showDialog({
        message: '저장 중 오류가 발생했습니다.',
        title: '오류',
        type: 'alert',
        confirmText: '확인',
      })
    }
  }

  // 예시 8: 조건부 다이얼로그
  const handleConditionalDialog = (hasChanges: boolean) => {
    if (hasChanges) {
      showDialog({
        message: '저장하지 않은 변경사항이 있습니다.\n정말 나가시겠습니까?',
        title: '나가기 확인',
        type: 'confirm',
        confirmText: '나가기',
        cancelText: '취소',
        onConfirm: () => {
          // 페이지 이동
        },
        onCancel: () => {
          // 현재 페이지 유지
        },
      })
    } else {
      // 변경사항이 없으면 바로 이동
      // navigate('/somewhere')
    }
  }

  return (
    <div>
      <Button onClick={handleBasicDialog}>기본 Dialog</Button>
      <Button onClick={handleAlertDialog}>Alert Dialog</Button>
      <Button onClick={handleConfirmDialog}>Confirm Dialog</Button>
      <Button onClick={handleCustomButtonText}>커스텀 버튼 텍스트</Button>
      <Button onClick={handleI18nDialog}>i18n Dialog</Button>
      <Button onClick={handleMultiLineDialog}>여러 줄 메시지</Button>
      <Button onClick={handleApiDialog}>API 호출 예시</Button>
      <Button onClick={() => handleConditionalDialog(true)}>조건부 Dialog</Button>
    </div>
  )
}

// --- 배경 음영 있는 모달 (showDialogBackdrop, showAlertBackdrop, showConfirmBackdrop) ---

/**
 * 예시: showAlertBackdrop (배경 음영 있음, X 버튼/바깥 클릭으로 닫기)
 * - 중요한 알림, 블로킹 메시지에 적합
 */
export function AlertBackdropExample() {
  const { showAlertBackdrop } = useDialog()
  const { t } = useTranslation()

  const handleImportantAlert = () => {
    showAlertBackdrop('중요한 공지사항입니다. 배경이 어두워져 사용자 주의를 끕니다.', '중요 알림')
  }

  const handleWithCallback = () => {
    showAlertBackdrop(
      '처리가 완료되었습니다.',
      '완료',
      () => console.log('확인 후 다음 작업')
    )
  }

  return (
    <Stack gap={1}>
      <Typography variant="subtitle2">배경 음영 있음 (Alert)</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Button variant="contained" onClick={handleImportantAlert}>중요 Alert (Backdrop)</Button>
        <Button variant="outlined" onClick={handleWithCallback}>콜백 포함 (Backdrop)</Button>
      </Stack>
    </Stack>
  )
}

/**
 * 예시: showConfirmBackdrop (배경 음영 있음)
 * - 삭제/나가기 등 중요 확인에 적합
 */
export function ConfirmBackdropExample() {
  const { showConfirmBackdrop } = useDialog()

  const handleDelete = () => {
    showConfirmBackdrop(
      '이 작업은 되돌릴 수 없습니다. 정말 진행하시겠습니까?',
      '최종 확인',
      () => console.log('확인'),
      () => console.log('취소')
    )
  }

  const handleLeave = () => {
    showConfirmBackdrop(
      '저장하지 않은 내용이 있습니다.\n정말 나가시겠습니까?',
      '나가기',
      () => console.log('나가기'),
      () => console.log('취소')
    )
  }

  return (
    <Stack gap={1}>
      <Typography variant="subtitle2">배경 음영 있음 (Confirm)</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Button variant="contained" color="error" onClick={handleDelete}>삭제 확인 (Backdrop)</Button>
        <Button variant="outlined" onClick={handleLeave}>나가기 확인 (Backdrop)</Button>
      </Stack>
    </Stack>
  )
}

/**
 * 예시: showDialogBackdrop (배경 음영 있음, DialogOptions 전체 사용)
 */
export function DialogBackdropExample() {
  const { showDialogBackdrop } = useDialog()

  const handleCustom = () => {
    showDialogBackdrop({
      message: '배경 음영이 있는 커스텀 다이얼로그입니다. X 버튼과 바깥 클릭으로 닫을 수 있습니다.',
      title: 'Backdrop Dialog',
      type: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: () => console.log('확인'),
      onCancel: () => console.log('취소'),
    })
  }

  return (
    <Stack gap={1}>
      <Typography variant="subtitle2">배경 음영 있음 (Dialog)</Typography>
      <Button variant="contained" onClick={handleCustom}>showDialogBackdrop</Button>
    </Stack>
  )
}

/**
 * 예시: no-backdrop와 backdrop 동시 사용
 * - 두 종류는 상태를 공유하지 않으므로 동시에 띄워도 서로 영향 없음
 */
export function BothAtOnceExample() {
  const { showAlert, showAlertBackdrop } = useDialog()

  const handleNoBackdrop = () => {
    showAlert('배경 음영 없는 알림입니다.', 'No Backdrop')
  }

  const handleBackdrop = () => {
    showAlertBackdrop('배경 음영 있는 알림입니다.', 'With Backdrop')
  }

  const handleBoth = () => {
    showAlert('먼저: 배경 없음 (뒤에 보임)', '1. No Backdrop')
    showAlertBackdrop('나중: 배경 있음 (앞에 표시, 서로 독립)', '2. With Backdrop')
  }

  return (
    <Stack gap={2}>
      <Typography variant="subtitle2">no-backdrop / backdrop 동시 사용 (상태 독립)</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Button variant="outlined" onClick={handleNoBackdrop}>No Backdrop</Button>
        <Button variant="contained" onClick={handleBackdrop}>With Backdrop</Button>
        <Button variant="contained" color="secondary" onClick={handleBoth}>두 개 동시에 띄우기</Button>
      </Stack>
    </Stack>
  )
}

/**
 * 실제 프로젝트에서 사용하는 예시: Login.tsx
 */
export function LoginExample() {
  const { showAlert } = useDialog()
  const { t } = useTranslation()

  const handleLogin = async () => {
    try {
      // 로그인 API 호출
      // const result = await loginApi(credentials)
      
      // 성공 시
      showAlert(
        t('loginSuccess') || '로그인되었습니다.',
        t('success') || '성공',
        () => {
          // 로그인 성공 후 홈으로 이동
          // navigate('/ko')
        }
      )
    } catch (error: any) {
      // 에러 처리
      const errorInfo = typeof error === 'string' ? JSON.parse(error) : error
      if (errorInfo?.code === -1) {
        showAlert(
          t('serverErrorMessage') || '서버 오류가 발생했습니다.',
          t('error') || '오류'
        )
      } else {
        showAlert(
          t('loginFailed') || '로그인에 실패했습니다.',
          t('error') || '오류'
        )
      }
    }
  }

  return null // 실제 컴포넌트 내용
}

/**
 * 실제 프로젝트에서 사용하는 예시: 삭제 기능
 */
export function DeleteExample() {
  const { showConfirm } = useDialog()
  const { t } = useTranslation()

  const handleDelete = (id: number) => {
    showConfirm(
      t('deleteConfirmMessage') || '정말 삭제하시겠습니까?',
      t('deleteConfirm') || '삭제 확인',
      async () => {
        try {
          // await deleteApi(id)
        //   showAlert(
        //     t('deleteSuccess') || '삭제되었습니다.',
        //     t('success') || '성공'
        //   )
          // 목록 새로고침
        } catch (error) {
        //   showAlert(
        //     t('deleteFailed') || '삭제에 실패했습니다.',
        //     t('error') || '오류'
        //   )
        }
      },
      () => {
        // 취소 시 아무 작업도 하지 않음
      }
    )
  }

  return null // 실제 컴포넌트 내용
}
