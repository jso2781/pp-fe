import i18n from '@/i18n/i18n';
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectMenuList } from "@/features/auth/MenuThunks";
import { getSsoInfo } from "@/features/auth/AnyIdThunks";

export default function MenuGate({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.menu);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;

    async function ensureMenus() {
      try {
        // 첫 진입 시 SSO 정보는 항상 1회 조회 (persist 메뉴 유무와 무관)
        dispatch(getSsoInfo());
        // 이미 persist로 메뉴가 들어와 있으면 selectMenuList 생략
        if (!list || list.length === 0) {
          await dispatch(selectMenuList({langSeCd: i18n.language === 'ko' ? 'KOR' : 'ENG'})).unwrap?.();
        }
      } catch (e) {
        // 실패해도 앱이 아예 안 뜨면 곤란하니,
        // 여기서 정책을 정하세요:
        //  - ready를 true로 해서 fallback 메뉴/빈 메뉴로 진행
        //  - 혹은 에러 화면을 띄우기
      } finally {
        alive && setReady(true);
      }
    }

    ensureMenus();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 앱 최초 1회

  if (!ready || loading) return <>{fallback}</>;
  return <>{children}</>;
}