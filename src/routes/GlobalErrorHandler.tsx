import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setInternalServerError } from "@/features/ui/uiSlice";

export default function GlobalErrorHandler ({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { internalServerError } = useAppSelector(s => s.ui);
  const navigate = useNavigate();

  useEffect(() => {
    if(internalServerError){
      navigate(`/pp/ko/InternalServerError`, { replace: true });
      dispatch(setInternalServerError(false));
    }
  }, [internalServerError]);

  return (<>{children}</>);
}