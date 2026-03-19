import React, { useState, useMemo } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { lnbStyles } from '../../styles/ko/layout/Lnb.styles';
import { useAppSelector } from '@/store/hooks';
import { LnbItem } from '@/features/auth/MenuTypes'
import { useLocation, useNavigate } from 'react-router-dom';
import { getLangFromPathname, langPath } from '@/routes/lang';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { openExternalInNamedWindow } from '@/utils/externalWindow';

type LnbProps = {
  /** (옵션) 기존처럼 직접 LnbItem[]을 넘기고 싶을 때 사용 */
  items?: LnbItem[];
  /** 현재 페이지의 URL (예: location.pathname) */
  currentUrl?: string;
};

// menuStructor에서 현재 URL에 해당하는 LNB용 아이템 배열을 찾는 함수
const buildLnbItemsFromMenuStructor = (
  lnbStructor: LnbItem[],
  currentUrl: string,
): LnbItem[] => {
  if (!lnbStructor || lnbStructor.length === 0) return [];

  // /pp/ko 또는 /ko 접두어 제거
  const normalize = (url: string) => url.replace(/^\/(?:pp\/)?(ko|en|ja|zh)(\/|$)/, '$2') || '/';
  const target = normalize(currentUrl);

  type FindResult = { node: LnbItem; ancestors: LnbItem[] };

  const dfs = (items: LnbItem[], ancestors: LnbItem[]): FindResult | null => {
    for (const it of items) {
      const keyNorm = normalize(it.key);

      if (keyNorm === target || target.startsWith(keyNorm + '/')) {
        return { node: it, ancestors };
      }

      if (it.children && it.children.length > 0) {
        const found = dfs(it.children, [...ancestors, it]);
        if (found) return found;
      }
    }
    return null;
  };

  // 현재 URL과 일치하는 노드 찾기
  const findActiveNodeKey = (items: LnbItem[]): string | null => {
    for (const it of items) {
      const keyNorm = normalize(it.key);
      if (keyNorm === target || target.startsWith(keyNorm + '/')) {
        return it.key;
      }
      if (it.children && it.children.length > 0) {
        const found = findActiveNodeKey(it.children);
        if (found) return found;
      }
    }
    return null;
  };

  const activeKey = findActiveNodeKey(lnbStructor);

  // SideItem을 깊은 복사하면서 disabled 설정하는 함수
  const cloneWithDisabled = (item: LnbItem): LnbItem => {
    const cloned: LnbItem = {
      ...item,
      disabled: item.key === activeKey || item.disabled,
      children: item.children ? item.children.map(cloneWithDisabled) : undefined,
    };
    return cloned;
  };

  const found = dfs(lnbStructor, []);
  if (!found) {
    // 못 찾으면 전체 구조를 그대로 복사하여 반환
    return lnbStructor.map(cloneWithDisabled);
  }

  // 항상 GNB 대메뉴(1뎁스) 기준으로 LNB를 구성:
  // 매칭 노드가 속한 1뎁스(=첫 조상)의 children(2뎁스 목록)을 루트로 사용
  const topDepth1 = found.ancestors[0] ?? found.node;
  if (topDepth1.children && topDepth1.children.length > 0) {
    return topDepth1.children.map(cloneWithDisabled);
  }

  // 루트에서 바로 찾은 경우 해당 노드만 루트로 사용
  return [cloneWithDisabled(found.node)];
};

function Lnb({ currentUrl, items }: LnbProps) {
  const { lnbStructor } = useAppSelector((s) => s.menu);
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = getLangFromPathname(location.pathname);

  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpenKeys((s) => ({ ...s, [k]: !s[k] }));

  // items 프롭이 있으면 우선 사용, 없으면 lnbStructor + currentUrl 기준으로 생성
  const resolvedItems: LnbItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    return buildLnbItemsFromMenuStructor(lnbStructor || [], currentUrl || '');
  }, [lnbStructor, currentUrl, items]);

  const renderItems = (arr: LnbItem[], depth = 0) => (
    <List 
      component="ul" 
      disablePadding 
      sx={depth === 0 ? lnbStyles.container : { width: '100%' }}
    >
      {arr.map((it) => {
        const active = location.pathname === it.key || location.pathname.startsWith(it.key + '/');
        const hasChildren = !!it.children?.length;
        const disabled = !!it.disabled;

        // 현재 메뉴의 열림 상태를 변수
        const isOpen = !!openKeys[it.key];

        return (
          <ListItem 
            key={it.key} 
            component="li" 
            disablePadding 
            sx={{ 
              display: 'block',
              ...lnbStyles.listItem(depth) 
            }}
          >
            <ListItemButton
              selected={active}
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                if (hasChildren) return toggle(it.key);
                if (it.key.startsWith('http')) {
                  openExternalInNamedWindow(it.key);
                  return;
                }
                const dest = langPath(it.key, currentLang);
                navigate(dest);
              }}
              sx={lnbStyles.itemButton(depth, isOpen)}
            >
              <ListItemText 
                primary={it.label} 
                sx={lnbStyles.itemText(depth, isOpen)} 
              />
              {/* 외부 링크면 새창 아이콘 표시 */}
              {it.key.startsWith('http') && !hasChildren && (
                <OpenInNewIcon 
                  sx={{ 
                    fontSize: '16px',
                    marginLeft: '4px',
                    verticalAlign: 'middle',
                    color: 'inherit'
                  }} 
                />
              )}                  
              {hasChildren ? (
                openKeys[it.key] ? 
                  <ExpandLess sx={{ fontSize: 30 }} /> : 
                  <ExpandMore sx={{ fontSize: 30 }} />
              ) : null}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={isOpen} timeout={0} unmountOnExit>
                <Box component="div" sx={lnbStyles.collapseBox}>
                  {renderItems(it.children!, depth + 1)}
                </Box>
              </Collapse>
            )}
          </ListItem>
        );
      })}
    </List>
  );

  return <Box sx={lnbStyles.container}>{renderItems(resolvedItems)}</Box>;
}

export default Lnb;
