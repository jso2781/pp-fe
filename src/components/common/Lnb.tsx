import React, { useState } from 'react';
import { Box, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { lnbStyles } from './Lnb.styles';

type SideItem = {
  key: string;
  label: string;
  disabled?: boolean;
  children?: SideItem[];
};

function Lnb({ items }: { items: SideItem[] }) {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpenKeys((s) => ({ ...s, [k]: !s[k] }));

  const renderItems = (arr: SideItem[], depth = 0) => (
    <List disablePadding>
      {arr.map((it) => {
        const active = location.pathname === it.key || location.pathname.startsWith(it.key + '/');
        const hasChildren = !!it.children?.length;
        const disabled = !!it.disabled;

        return (
          <Box key={it.key}>
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
              sx={lnbStyles.itemButton(depth)} // 스타일 적용
            >
              <ListItemText 
                primary={it.label} 
                sx={lnbStyles.itemText(depth)} // 스타일 적용
              />
              {hasChildren ? (
                openKeys[it.key] ? 
                  <ExpandLess sx={{ fontSize: 30 }} /> : 
                  <ExpandMore sx={{ fontSize: 30 }} />
              ) : null}
            </ListItemButton>

            {hasChildren && (
              <Collapse in={!!openKeys[it.key]} timeout={0} unmountOnExit>
                <Box sx={lnbStyles.collapseBox}>
                  {renderItems(it.children!, depth + 1)}
                </Box>
              </Collapse>
            )}
          </Box>
        );
      })}
    </List>
  );

  return <Box sx={lnbStyles.container}>{renderItems(items)}</Box>;
}

export default Lnb;