import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, RowClickedEvent } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export type AgGridTableProps<TData extends object> = {
  rowData: TData[]
  columnDefs: ColDef<TData>[]
  onRowClicked?: (event: RowClickedEvent<TData>) => void
  height?: number
  loading?: boolean
}

export default function AgGridTable<TData extends object>({
  rowData,
  columnDefs,
  onRowClicked,
  height = 520,
  loading = false
}: AgGridTableProps<TData>) {
  return (
    <div className="ag-theme-alpine ag-wrapper" style={{ height, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
          flex: 1,
          minWidth: 120
        }}
        animateRows
        pagination
        paginationPageSize={20}
        suppressCellFocus
        onRowClicked={onRowClicked}
        overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading...</span>'}
        loadingOverlayComponentParams={{ loadingMessage: 'Loading...' }}
      />
      {/* AG Grid 자체 오버레이를 쓰고 싶으면 gridApi로 showLoadingOverlay를 연결하면 됩니다. */}
      {loading ? <div className="grid-loading-hint">로딩 중...</div> : null}
    </div>
  )
}
