import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTitle, setContent } from '@/features/board/boardSlice'

export default function BoardEditor() {
  const dispatch = useAppDispatch()
  const { title, content } = useAppSelector((s) => s.board.editor)

  return (
    <div className="board-editor">
      <label className="form-field">
        <span>제목</span>
        <input
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
          placeholder="제목을 입력하세요"
        />
      </label>

      <label className="form-field">
        <span>본문</span>
        <textarea
          value={content}
          onChange={(e) => dispatch(setContent(e.target.value))}
          placeholder="본문 내용을 입력하세요"
          rows={10}
        />
      </label>
    </div>
  )
}
