import type { LnbItem, LnbPathResult } from './MenuTypes';

/** pathname에서 locale(/ko, /en) 제거 후 경로만 반환 */
export function normalizePathForMatch(pathname: string): string {
  const normalized = pathname.replace(/^\/(ko|en)(\/|$)/, '$2') || '/';
  return normalized;
}

/** 단일 노드가 현재 경로와 일치하는지 (자신 또는 하위 경로) */
function nodeMatchesPath(node: LnbItem, normalizedPath: string): boolean {
  if (node.menuNpagNm) return false;
  const keyNorm = normalizePathForMatch(node.key);
  return normalizedPath === keyNorm || (keyNorm !== normalizedPath && normalizedPath.startsWith(keyNorm + '/'));
}

/**
 * lnbStructor 트리에서 pathname에 해당하는 노드를 찾고,
 * breadcrumb 경로와 LNB 섹션 제목(중메뉴)을 반환한다.
 */
export function getLnbInfoByPath(lnbStructor: LnbItem[] | null | undefined, pathname: string): LnbPathResult {
  const empty: LnbPathResult = { breadcrumb: [], sectionTitle: null, current: null };
  if (!lnbStructor || lnbStructor.length === 0) return empty;

  const normalizedPath = normalizePathForMatch(pathname);

  type SearchResult = { node: LnbItem; ancestors: LnbItem[] };
  let best: SearchResult | null = null;

  function dfs(items: LnbItem[], ancestors: LnbItem[]): void {
    for (const it of items) {
      if (!nodeMatchesPath(it, normalizedPath)) {
        if (it.children?.length) dfs(it.children, [...ancestors, it]);
        continue;
      }
      const candidate: SearchResult = { node: it, ancestors: [...ancestors, it] };
      if (!best || it.key.length > best.node.key.length) best = candidate;
      if (it.children?.length) dfs(it.children, [...ancestors, it]);
    }
  }

  dfs(lnbStructor, []);

  if (!best) return empty;

  const { node, ancestors }: SearchResult = best;
  const breadcrumb: { label: string; key: string }[] = ancestors.map((a) => ({ label: a.label, key: a.key }));

  // LNB는 항상 GNB 대메뉴(1뎁스) 기준으로 구성하므로 섹션 제목도 1뎁스 라벨 사용
  const sectionTitle = ancestors.length > 0 ? ancestors[0].label : node.label;

  return {
    breadcrumb,
    sectionTitle,
    current: node,
  };
}
