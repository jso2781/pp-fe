/**
 * 이상사례 통계 목록 조회
 */
export const selectStatisticsListApiPath = () => '/statistics/list'

/**
 * 이상사례 통계 상세 조회
 */
export const selectStatisticsDetailApiPath = (id: string) => `/statistics/${id}`

/**
 * 이상사례 통계 저장
 */
export const saveStatisticsApiPath = () => '/statistics/save'

/**
 * 이상사례 통계 삭제
 */
export const deleteStatisticsApiPath = () => '/statistics/delete'

/**
 * 이상사례 통계 생성 요청
 */
export const generateStatisticsApiPath = (id: string) => `/statistics/${id}/generate`

/**
 * 이상사례 통계 결과 다운로드
 */
export const downloadStatisticsApiPath = (id: string) => `/statistics/${id}/download`

/**
 * 대표 데이터셋 조회
 */
export const selectRprsDatasetApiPath = () => '/statistics/rprs-dataset'

/**
 * 대표 데이터셋 지정 (저장)
 */
export const saveRprsDatasetApiPath = () => '/statistics/rprs-dataset'

/**
 * 대표 데이터셋 포함 데이터셋 목록 조회
 */
export const selectDatasetsWithRprsApiPath = () => '/statistics/datasets-with-rprs'

/**
 * 포털 회원 역할/권한 조회
 */
export const selectUserRoleApiPath = () => '/statistics/user-role'
