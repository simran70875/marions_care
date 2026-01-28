import { Box,  IconButton, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Mail } from "lucide-react";

// --- Dummy Notes Data ---
const rows = [
  {
    id: 1,
    clientName: "Charles O'Connor",
    area: "Office Chorlt",
    created: "18 Oct 25 17:10",
    note: "Carer notes at home. I also rang to let you know I spoke with the reception - he said he was told to wait for...",
    createdBy: "Parvez",
  },
  {
    id: 2,
    clientName: "Sarah Short",
    area: "Office Admin",
    created: "17 Oct 25 20:02",
    note: "Did carer worker notes at home. I also rang to let you know I spoke with the reception - he said he was told to wait for...",
    createdBy: "Office Admin",
  },
  {
    id: 3,
    clientName: "Yvonne Marie Eaves",
    area: "Office Chorlt",
    created: "17 Oct 25 10:49",
    note: "Charles was not home.",
    createdBy: "Yvonne Maria Eaves",
  },
  {
    id: 4,
    clientName: "Bunmi Christiana Junaid",
    area: "Office Chorlt",
    created: "16 Oct 25 22:04",
    note: "Charles was very pleasant but I was told to leave him alone as he has been getting angry with me because he has not been sleeping.",
    createdBy: "Bunmi Christiana Junaid",
  },
  {
    id: 5,
    clientName: "Mercy Anuoluwapo",
    area: "Office Chorlt",
    created: "16 Oct 25 20:23",
    note: "Charles didn’t want to talk. Told him I was at the door, but he just yelled 'leave me alone'.",
    createdBy: "Mercy Anuoluwapo",
  },
];

// --- DataGrid Columns ---
const columns: GridColDef[] = [
  {
    field: "clientName",
    headerName: "Client Name",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "area",
    headerName: "Area",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "created",
    headerName: "Created",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "note",
    headerName: "Note",
    flex: 2,
    minWidth: 300,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    flex: 1,
    minWidth: 140,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    flex: 1,
    minWidth: 160,
   renderCell: () => (
        <IconButton color="primary">
          <Mail />
        </IconButton>
      ),
  },
];

// --- Top Controls (Filter & Export buttons) ---
const NotesControls = () => (
  <Box className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-50 border-t border-b border-gray-200">
    <Box className="flex items-center space-x-2 text-sm text-gray-700">
      <span className="font-medium">Selected Dates (DD-MM-YYYY)</span>
      <input
        type="text"
        defaultValue="15-09-2025"
        className="p-1 border rounded w-28"
      />
      <span>to</span>
      <input
        type="text"
        defaultValue="18-10-2025"
        className="p-1 border rounded w-28"
      />
    </Box>

    <Box className="flex flex-wrap gap-2">
      {["Copy", "Excel", "CSV", "PDF", "Print", "Column visibility"].map(
        (btn, i) => (
          <button
            key={i}
            className="px-3 py-1 text-xs font-medium bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            {btn}
          </button>
        )
      )}
    </Box>
  </Box>
);

// --- Main Page ---
export default function AllClientsNotes() {
  return (
    <Box className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <Box className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          All Clients Notes
        </h2>
      </Box>

      {/* Controls */}
      <NotesControls />

      {/* Search */}
      <Box className="flex justify-end items-center p-3">
        <TextField
          size="small"
          placeholder="Search..."
          className="w-48"
          variant="outlined"
        />
      </Box>

      {/* Table */}
      <Box className="p-3">
        <DataGrid
          rows={rows}
          columns={columns}
    
          
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: "bold",
              color: "#374151",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f3f4f6",
            },
            border: "1px solid #e5e7eb",
            fontSize: "0.875rem",
          }}
        />
      </Box>
    </Box>
  );
}
