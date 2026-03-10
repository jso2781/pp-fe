import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { insertDgstfnExmn } from "@/features/dgstfn/DgstfnExmnThunks";
import { useDialog } from '@/contexts/DialogContext';

const EVAL_OPTIONS = [
  { id: 'v-good' as const, score: 5 },
  { id: 'good' as const, score: 4 },
  { id: 'normal' as const, score: 3 },
  { id: 'bad' as const, score: 2 },
  { id: 'v-bad' as const, score: 1 },
];

export type DgstfnExnmProps = {
  menuSn?: number | null;
};

export default function DgstfnExnm({ menuSn }: DgstfnExnmProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showAlert } = useDialog();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // 다른 메뉴(화면)로 이동 시 라디오 선택을 초기 상태로 리셋
  useEffect(() => {
    setSelectedId(null);
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const option = EVAL_OPTIONS.find((o) => o.id === selectedId);
    if(option == null || menuSn == null) return;

    try{
      // 제출 버튼 (처리중...) 상태 표시
      // setIsLoading(true);

      // 만족도 조사 제출 처리 API 호출
      const insertCnt = await dispatch(insertDgstfnExmn({menuSn, dgstfnScr: option.score ?? 0 })).unwrap();

      if(insertCnt > 0){
        showAlert(t('dgstfnExnmSuccessMessage'), t('success'));
        setSelectedId(null); // 제출 성공 시 라디오 선택 초기화
      }else{
        showAlert(t('dgstfnExnmFailedMessage'), t('error'));
      }

    }catch(error){
      // API 호출 실패 시 오류 처리
      console.error('Password confirmation failed:', error);
    }finally{
      // 제출 버튼 (처리중...) 상태 해제
      // setIsLoading(false);
    }

  };

  return (
    <Box className="evaluation-box" component="form" onSubmit={handleSubmit}>
      <fieldset className="evaluation-fieldset">
        <legend className="evaluation-legend">{t("dgstfnExnmTitle")}</legend>
        <Box className="evaluation-group">
          {EVAL_OPTIONS.map((item) => (
            <div key={item.id} className="evaluation-item">
              <input
                type="radio"
                id={item.id}
                name="page-eval"
                value={item.id}
                className="a11y-radio"
                checked={selectedId === item.id}
                onChange={() => setSelectedId(item.id)}
              />
              <label htmlFor={item.id} className="evaluation-label">
                {t(
                  item.id === 'v-good' ? "verySatisfied" :
                  item.id === 'good' ? "satisfied" :
                  item.id === 'normal' ? "normal" :
                  item.id === 'bad' ? "unsatisfied" : "veryUnsatisfied"
                )}
              </label>
            </div>
          ))}
          <Button
            type="submit"
            variant="contained"
            className="evaluation-btn"
            disabled={isLoading}
          >
            {isLoading ? t('processing') : t('submit')}
          </Button>
        </Box>
      </fieldset>
    </Box>
  );
}