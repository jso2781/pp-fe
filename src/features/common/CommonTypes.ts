/**
 * LNB 아이템 타입 
 */
export interface SideItem {
  key: string
  label: string
  disabled?: boolean
  children?: SideItem[];
}