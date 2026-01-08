import { useAppSelector } from '@/store/hooks'

export default function BoardPreview() {
  const { title, content } = useAppSelector((s) => s.board.editor)

  return (
    <section className="board-preview" aria-label="미리보기">
      <h3>미리보기</h3>
      <div className="board-preview__title">{title || '(제목 없음)'}</div>
      <div className="board-preview__content">
        {content
          ? content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))
          : '입력된 내용이 없습니다.'}
      </div>
    </section>
  )
}
