import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { insertDgstfnExmn } from "@/features/dgstfn/DgstfnExmnThunks";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const option = EVAL_OPTIONS.find((o) => o.id === selectedId);
    if(option == null || menuSn == null) return;
    dispatch(insertDgstfnExmn({menuSn, dgstfnScr: option.score ?? 0 }));
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
          <Button type="submit" variant="contained" className="evaluation-btn">
            {t("submit")}
          </Button>
        </Box>
      </fieldset>
    </Box>
  );
}