import https from '@/api/axiosInstance'
import {
  selectItemPageApiPath,
  selectForeignItemPageApiPath,
  selectIngredientPageApiPath,
  selectForeignIngredientPageApiPath,
  selectClassIngredientPageApiPath,
  selectMeddraLltPageApiPath,
  selectMeddraPtPageApiPath,
  selectMeddraSocPageApiPath,
} from '@/api/adverse/statistics/CodeSearchApiPaths'
import type { CodeSearchPageRVO, CodeSearchType } from './CodeSearchTypes'

const searchWithPage = async (
  path: string,
  keyword: string | null,
  page: number,
  size: number,
  version?: string,
): Promise<CodeSearchPageRVO> => {
  const params: Record<string, string | number> = { page, size }
  if (keyword) params.keyword = keyword
  if (version) params.version = version
  const res = await https.get(path, { params })
  return res.data
}

/**
 * 코드검색 타입별 페이지 조회 함수 반환
 */
export const getSearchWithPageFunction = (
  type: CodeSearchType,
): ((keyword: string | null, page: number, size: number, version?: string) => Promise<CodeSearchPageRVO>) => {
  switch (type) {
    case 'item':
      return (kw, p, s) => searchWithPage(selectItemPageApiPath(), kw, p, s)
    case 'foreignItem':
      return (kw, p, s, v) => searchWithPage(selectForeignItemPageApiPath(), kw, p, s, v)
    case 'ingredient':
      return (kw, p, s) => searchWithPage(selectIngredientPageApiPath(), kw, p, s)
    case 'foreignIngredient':
      return (kw, p, s, v) => searchWithPage(selectForeignIngredientPageApiPath(), kw, p, s, v)
    case 'classIngredient':
      return (kw, p, s) => searchWithPage(selectClassIngredientPageApiPath(), kw, p, s)
    case 'llt':
      return (kw, p, s, v) => searchWithPage(selectMeddraLltPageApiPath(), kw, p, s, v)
    case 'pt':
      return (kw, p, s, v) => searchWithPage(selectMeddraPtPageApiPath(), kw, p, s, v)
    case 'soc':
      return (kw, p, s, v) => searchWithPage(selectMeddraSocPageApiPath(), kw, p, s, v)
    default:
      throw new Error(`Unknown code search type: ${type}`)
  }
}

/**
 * 코드검색 타입 라벨 반환
 */
export const getCodeTypeLabel = (type: CodeSearchType): string => {
  switch (type) {
    case 'item': return '의약품(품목)'
    case 'foreignItem': return '국외 의약품(품목)'
    case 'ingredient': return '성분'
    case 'foreignIngredient': return '국외 성분'
    case 'classIngredient': return '계통성분'
    case 'llt': return 'MedDRA LLT'
    case 'pt': return 'MedDRA PT'
    case 'soc': return 'MedDRA SOC'
    default: return '코드'
  }
}
