import PageTitle from '@/components/common/PageTitle'
import BoardEditor from '@/components/board/BoardEditor'
import BoardPreview from '@/components/board/BoardPreview'

export default function BoardWrite() {
  return (
    <div className="page board-write">
      <PageTitle title="게시판 글쓰기" subtitle="입력한 본문은 우측 미리보기에서 바로 확인됩니다." />
      <div className="two-col">
        <div className="two-col__left">
          <BoardEditor />
        </div>
        <div className="two-col__right">
          <BoardPreview />
        </div>
      </div>
    </div>
  )
}
