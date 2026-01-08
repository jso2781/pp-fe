import PageTitle from '@/components/common/PageTitle'
import BoardEditor from '@/components/board/BoardEditor'
import BoardPreview from '@/components/board/BoardPreview'

export default function BoardWrite() {
  return (
    <div className="page board-write">
      <PageTitle title="bulletin board writing" subtitle="The text you entered is immediately confirmed in the preview on the right." />
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
