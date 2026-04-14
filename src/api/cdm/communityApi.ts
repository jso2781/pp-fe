import https from '@/api/axiosInstance'

/** 파일 다운로드 (CDM 서버 프록시 경유 — /community/** 경로로 CDM 서버 라우팅) */
export async function downloadFileViaProxy(atchFileId: string, fileNm: string): Promise<void> {
  if (!atchFileId) return;
  const res = await https.get(`/community/file/download/${atchFileId}`, { responseType: 'blob' });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileNm || atchFileId;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
