import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the screenshot: Dark Purple)
const PRIMARY_PURPLE = "#7b3b9b"; // Dark Purple for the header action buttons

interface FutureStatusChangeRow {
  id: number;
  Name: string;
  CurrentStatus: string;
  OriginalStatus: string;
  SetToChangeOn: string;
  StatusChangeTo: string;
  ChangeUpdated: string;
  ReturnReviewDate: string;
  StatusChangesBackTo: string;
  Comments: string;
  ChangeType: string;
  EditReturnDate: string;
  CancelStatusChange: string;
}

const futureStatusChangeColumns: GridColDef<FutureStatusChangeRow>[] = [
  { field: "Name", headerName: "Name", width: 120, sortable: true },
  {
    field: "CurrentStatus",
    headerName: "Current Status",
    width: 120,
    sortable: true,
  },
  {
    field: "OriginalStatus",
    headerName: "Original Status",
    width: 120,
    sortable: true,
  },
  {
    field: "SetToChangeOn",
    headerName: "Set To Change On",
    width: 120,
    sortable: true,
  },
  {
    field: "StatusChangeTo",
    headerName: "Status Change To",
    width: 120,
    sortable: true,
  },
  {
    field: "ChangeUpdated",
    headerName: "Change Updated",
    width: 120,
    sortable: true,
  },
  {
    field: "ReturnReviewDate",
    headerName: "Return/Review Date",
    width: 140,
    sortable: true,
  },
  {
    field: "StatusChangesBackTo",
    headerName: "Status Changes Back To",
    width: 160,
    sortable: true,
  },
  { field: "Comments", headerName: "Comments", width: 120, sortable: true },
  {
    field: "ChangeType",
    headerName: "Change Type",
    width: 120,
    sortable: true,
  },
  {
    field: "EditReturnDate",
    headerName: "Edit Return Date",
    width: 120,
    sortable: true,
  },
  {
    field: "CancelStatusChange",
    headerName: "Cancel Status Change",
    width: 150,
    sortable: true,
  },
];

const dummyRows: FutureStatusChangeRow[] = [
  // No dummy data, as the screenshot shows "No data available in table"
];

// Toolbar buttons based on the Carers Future Status Changes screenshot
const toolbarButtons = [
  { label: "Rows", variant: "outlined" },
  { label: "Copy", variant: "outlined" },
  { label: "Excel", variant: "outlined" },
  { label: "CSV", variant: "outlined" },
  { label: "PDF", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Area Search", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarersFutureStatusChanges: React.FC = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  // Custom component to simulate the header with buttons on the right
  const HeaderControls = () => (
    <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300 flex justify-between items-center">
      <Typography variant="h6" className="text-lg font-medium text-gray-800">
        Carers Future Status Changes
      </Typography>
      <Box className="flex gap-2">
        <Button
          variant="contained"
          className="normal-case text-white shadow-md text-xs px-3 py-1"
          sx={{
            backgroundColor: PRIMARY_PURPLE,
            "&:hover": { backgroundColor: PRIMARY_PURPLE },
            minWidth: 120,
            padding: "4px 12px",
          }}
          onClick={() => console.log("View Completed clicked")}
        >
          View Completed
        </Button>
        <Button
          variant="contained"
          className="normal-case text-white shadow-md text-xs px-3 py-1"
          sx={{
            backgroundColor: PRIMARY_PURPLE,
            "&:hover": { backgroundColor: PRIMARY_PURPLE },
            minWidth: 180,
            padding: "4px 12px",
          }}
          onClick={() => console.log("View All Future Status Changes clicked")}
        >
          View All Future Status Changes
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header (now includes the purple action buttons) */}
      <HeaderControls />

      {/* --- Export/Action Toolbar --- */}
      {/* Note: The screenshot only shows a single row for toolbar/search, so the structure is simplified */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Action/Export Buttons */}
        <Box className="flex flex-wrap gap-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.label}
              size="small"
              variant={btn.variant as "outlined" | "contained"}
              className={`normal-case text-xs font-normal shadow-sm`}
              sx={{
                color: "#000",
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
                height: 30, // Make buttons smaller to match screenshot
                padding: "0 8px",
              }}
            >
              {btn.label}
            </Button>
          ))}
        </Box>

        {/* Right: Global Search */}
        <Box className="flex items-center gap-2">
          <Typography variant="body2" className="font-semibold text-gray-700">
            Search:
          </Typography>
          <TextField
            size="small"
            placeholder=""
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            sx={{ width: 200 }}
            InputProps={{
              style: { height: 32 },
            }}
            className="bg-white rounded-md border border-gray-300 shadow-sm"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box className="p-0">
        <DataGrid
          rows={dummyRows}
          columns={futureStatusChangeColumns}
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
          initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
          className="border border-gray-300"
          getRowHeight={() => 35}
          slots={{
            // Custom slot to render the inline search fields above the data rows
            footer: () => (
              <Box className="flex items-center border-t border-gray-200 justify-between">
                <Box className="p-2 text-sm text-gray-600">
                  Showing 0 to 0 of 0 entries
                </Box>
                <Box className="flex justify-end p-2 text-sm text-gray-600">
                  <Button size="small" disabled>
                    Previous
                  </Button>
                  <Button size="small" disabled>
                    Next
                  </Button>
                </Box>
              </Box>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default CarersFutureStatusChanges;
