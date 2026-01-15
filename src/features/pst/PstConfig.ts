export type BoardGroup =
  | 'NEWS'     // 기관소식 (9)
  | 'TASK';    // 주요업무 (5)

export type BoardKey =
  | 'NewsNoticeList'
  | 'NewsJobNoticeList'
  | 'NewsDataRoomList'
  | 'NewsCardNewsList'
  ;

export interface BoardConfig {
  key: BoardKey;
  label: string;
  bbsId: string;
  group: BoardGroup;
}

export const BOARD_CONFIG_GROUP: Record<BoardKey, BoardConfig> = {
  // 기관소식 (9)
  NewsNoticeList: {
    key: 'NewsNoticeList',
    label: '공지사항',
    bbsId: 'BBS_COM_001',
    group: 'NEWS',
  },
  NewsJobNoticeList: {
    key: 'NewsJobNoticeList',
    label: '채용 게시판',
    bbsId: 'BBS_COM_002',
    group: 'NEWS',
  },
  NewsDataRoomList: {
    key: 'NewsDataRoomList',
    label: '자료실',
    bbsId: 'BBS_COM_005',
    group: 'NEWS',
  },
  NewsCardNewsList: {
    key: 'NewsCardNewsList',
    label: '카드뉴스',
    bbsId: 'BBS_GAL_001',
    group: 'NEWS',
  }
};