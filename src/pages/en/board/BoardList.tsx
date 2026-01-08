import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import type { RowClickedEvent } from 'ag-grid-community'
import PageTitle from '@/components/common/PageTitle'
import AgGridTable from '@/components/grid/AgGridTable'
import { fetchBoardList } from '@/features/board/boardThunks'

export default function BoardList() {
  const dispatch = useAppDispatch()
  const { list, loading, error } = useAppSelector((s) => s.board)

  useEffect(() => {
    dispatch(fetchBoardList())
  }, [dispatch])

  const columnDefs = useMemo(
    () => [
      { headerName: 'ID', field: 'id', maxWidth: 120 },
      { headerName: 'Title', field: 'title' },
      { headerName: 'Writer', field: 'writer', maxWidth: 180 },
      { headerName: 'Registration Date', field: 'createdAt', maxWidth: 180 }
    ],
    []
  )

  return (
    <div className="page board-list">
      <PageTitle title="Bulletin Board List" />
      {error ? <div className="alert alert--error">{error}</div> : null}
      <AgGridTable
        rowData={list}
        columnDefs={columnDefs}
        loading={loading}
        onRowClicked={(e: RowClickedEvent) => console.log('board row:', e.data)}
      />
    </div>
  )
}
