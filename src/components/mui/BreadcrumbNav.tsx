import * as React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';

export type BreadcrumbItem = { title?: React.ReactNode, label?: React.ReactNode; href?: string };

export function BreadcrumbNav({
  items,
  separator = '›',
  className,
}: {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}) {
  if (!items?.length) return null;
  const lastIndex = items.length - 1;

  return (
    <Breadcrumbs separator={separator} className={className} aria-label="breadcrumb">
      {items.map((it, idx) => {
        const isLast = idx === lastIndex;
        if (isLast || !it.href) {
          return (
            <Typography key={idx} color="text.primary" variant="body2">
              {it.label}
            </Typography>
          );
        }
        return (
          <Link key={idx} href={it.href} underline="hover" color="inherit" variant="body2">
            {it.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
