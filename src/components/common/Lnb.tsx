import React, { useState, useMemo } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { lnbStyles } from '../../styles/ko/layout/Lnb.styles';
import { useAppSelector } from '@/store/hooks';

type SideItem = {
  key: string;
  label: string;
  disabled?: boolean;
  children?: SideItem[];
};

type LnbProps = {
  /** (옵션) 기존처럼 직접 SideItem[]을 넘기고 싶을 때 사용 */
  items?: SideItem[];
  /** 현재 페이지의 URL (예: location.pathname) */
  currentUrl?: string;
};

// menuStructor에서 현재 URL에 해당하는 LNB용 아이템 배열을 찾는 함수
const buildLnbItemsFromMenuStructor = (
  menuStructor: SideItem[],
  currentUrl: string,
): SideItem[] => {
  if (!menuStructor || menuStructor.length === 0) return [];

  // /ko 접두어 제거
  const normalize = (url: string) => url.replace(/^\/ko/, '');
  const target = normalize(currentUrl);

  type FindResult = { node: SideItem; parent: SideItem | null };

  const dfs = (items: SideItem[], parent: SideItem | null): FindResult | null => {
    for (const it of items) {
      const keyNorm = normalize(it.key);

      if (keyNorm === target || target.startsWith(keyNorm + '/')) {
        return { node: it, parent };
      }

      if (it.children && it.children.length > 0) {
        const found = dfs(it.children, it);
        if (found) return found;
      }
    }
    return null;
  };

  // 현재 URL과 일치하는 노드 찾기
  const findActiveNodeKey = (items: SideItem[]): string | null => {
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

  const activeKey = findActiveNodeKey(menuStructor);

  // SideItem을 깊은 복사하면서 disabled 설정하는 함수
  const cloneWithDisabled = (item: SideItem): SideItem => {
    const cloned: SideItem = {
      ...item,
      disabled: item.key === activeKey || item.disabled,
      children: item.children ? item.children.map(cloneWithDisabled) : undefined,
    };
    return cloned;
  };

  const found = dfs(menuStructor, null);
  if (!found) {
    // 못 찾으면 전체 구조를 그대로 복사하여 반환
    return menuStructor.map(cloneWithDisabled);
  }

  // 부모가 있으면 같은 레벨의 형제들을 LNB 루트로 사용
  if (found.parent && found.parent.children) {
    return found.parent.children.map(cloneWithDisabled);
  }

  // 루트에서 바로 찾은 경우 해당 노드만 루트로 사용
  return [cloneWithDisabled(found.node)];
};

function Lnb({ currentUrl, items }: LnbProps) {
  const { menuStructor } = useAppSelector((s) => s.menu);

  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpenKeys((s) => ({ ...s, [k]: !s[k] }));

  // items 프롭이 있으면 우선 사용, 없으면 menuStructor + currentUrl 기준으로 생성
  const resolvedItems: SideItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    return buildLnbItemsFromMenuStructor(menuStructor || [], currentUrl || '');
  }, [menuStructor, currentUrl, items]);

  const renderItems = (arr: SideItem[], depth = 0) => (
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
                  window.open(it.key, '_blank');
                  return;
                }
                const dest = it.key.startsWith('/ko/') ? it.key : '/ko' + it.key;
                window.location.href = dest;
              }}
              sx={lnbStyles.itemButton(depth, isOpen)}
            >
              <ListItemText 
                primary={it.label} 
                sx={lnbStyles.itemText(depth, isOpen)} 
              />
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