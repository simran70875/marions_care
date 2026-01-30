import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box } from "@mui/material";

// function CustomFooter(props: any) {
//   const { rowCount, paginationModel } = props;
//   const totalPages = Math.ceil(rowCount / paginationModel.pageSize);

//   return (
//     <GridFooterContainer>
//       <Box px={2} fontSize={13}>
//         Page {paginationModel.page + 1} of {totalPages}
//       </Box>
//       <GridPagination />
//     </GridFooterContainer>
//   );
// }

interface DataTableProps {
  rows: any[];
  columns: GridColDef[];
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  getRowId?: any;
  onRowClick?: any;
  getRowClassName?: any;
  rowCount?: number;
  paginationMode?: "client" | "server"; // ✅ add this
  loading?: boolean; // optional: already being used
  pageSizeOptions?: number[];
  rowSelectionModel?: any;
  onRowSelectionModelChange?: any;
}

export default function DataTable({
  rows,
  columns,
  paginationModel,
  onPaginationModelChange,
  getRowId,
  onRowClick,
  getRowClassName,
  rowCount,
  paginationMode = "server",
  loading = false,
  pageSizeOptions = [10, 20, 50, 100],
  rowSelectionModel,
  onRowSelectionModelChange,
}: DataTableProps) {
  return (
    <Box
      sx={{
        height: 700,
        overflowY: "auto",
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        backgroundColor: "white",
        p: 2,
      }}
      className="dark:border-white/5 dark:bg-white/3"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        getRowClassName={getRowClassName}
        onRowClick={onRowClick}
        pagination // ✅ include
        paginationMode={paginationMode} // ✅ include
        loading={loading} // ✅ include
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        getRowHeight={() => "auto"}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={onRowSelectionModelChange}
        pageSizeOptions={pageSizeOptions}
        className="text-sm [&_.MuiDataGrid-columnHeaders]:bg-gray-50 dark:[&_.MuiDataGrid-columnHeaders]:bg-white/3"
        // slots={{ footer: CustomFooter }}
        // slotProps={{
        //   footer: {
        //     rowCount: rowCount || 0,
        //     paginationModel,
        //   },
        // }}
        sx={{
          border: "none",
          backgroundColor: "transparent",
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: 500,
            fontSize: "12px",
            color: "#6B7280",
          },
          ".MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
            alignItems: "flex-start",
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.5,
            py: 1,
          },
        }}
      />
    </Box>
  );
}
