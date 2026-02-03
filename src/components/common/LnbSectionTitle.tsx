import { useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { getLnbInfoByPath } from '@/features/auth/MenuUtils';

/**
 * LNB 영역의 중메뉴 제목(lnb-tit span)을 pathname + lnbStructor 기준으로 표시한다.
 * 하드코딩 없이 현재 경로에 맞는 섹션 라벨을 보여준다.
 */
export default function LnbSectionTitle() {
  const { pathname } = useLocation();
  const { lnbStructor } = useAppSelector((s) => s.menu);
  const { sectionTitle } = getLnbInfoByPath(lnbStructor, pathname);

  return <span>{sectionTitle ?? ''}</span>;
}
