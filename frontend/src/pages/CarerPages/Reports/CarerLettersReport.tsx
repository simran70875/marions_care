import React, { useState } from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (Reverting to the original Search/Clear colors for consistency)
const PRIMARY_PURPLE = "#7b3b9b"; // Dark Purple for Search
const ACCENT_TEAL = "#4c9b9c"; // Teal for Clear

interface CarerLetterRow {
  id: number;
  Name: string;
  LetterType: string;
  DateSent: string;
  Status: string;
  Action: string; // Placeholder for a button or link
}

// Columns defined for a Carer Letters Report
const carerLettersColumns: GridColDef<CarerLetterRow>[] = [
  { field: "id", headerName: "ID", flex: 1, sortable: true },
  { field: "Name", headerName: "Name", flex: 1, sortable: true },
  {
    field: "LetterType",
    headerName: "Letter Type",
    flex: 1,
    sortable: true,
  },
  { field: "DateSent", headerName: "Date Sent", flex: 1, sortable: true },
  { field: "Status", headerName: "Status", flex: 1, sortable: true },
  {
    field: "Action",
    headerName: "Action",
    flex: 1,
    sortable: false,
    renderCell: () => (
      <Button
        size="small"
        variant="outlined"
        sx={{ minWidth: "auto", p: "2px 8px", fontSize: 10 }}
      >
        View
      </Button>
    ),
  },
];

const dummyRows: CarerLetterRow[] = [
  {
    id: 1,
    Name: "Noreen Butt",
    LetterType: "Initial Contract Offer",
    DateSent: "2025-10-01",
    Status: "Sent",
    Action: "",
  },
  {
    id: 2,
    Name: "Fatima Abamur",
    LetterType: "DBS Check Reminder",
    DateSent: "2025-10-15",
    Status: "Pending",
    Action: "",
  },
  {
    id: 3,
    Name: "Amina Abdalla",
    LetterType: "Training Schedule",
    DateSent: "2025-11-05",
    Status: "Viewed",
    Action: "",
  },
  {
    id: 4,
    Name: "Nimo Abdi",
    LetterType: "Welcome Pack",
    DateSent: "2025-11-20",
    Status: "Sent",
    Action: "",
  },
];

// Toolbar buttons for a standard report
const toolbarButtons = [
  { label: "Show 50 rows", variant: "outlined" },
  { label: "Copy", variant: "outlined" },
  { label: "Excel", variant: "outlined" },
  { label: "CSV", variant: "outlined" },
  { label: "Print", variant: "outlined" },
  { label: "Column visibility", variant: "outlined" },
];

// =================================================================
// 2. MAIN COMPONENT
// =================================================================

const CarerLettersReport: React.FC = () => {
  const [startDate, setStartDate] = useState("01-11-2025");
  const [endDate, setEndDate] = useState("03-12-2025");
  const [globalSearch, setGlobalSearch] = useState("");

  const handleSearchClick = () => {
    console.log("Search for Carer Letters Report:", { startDate, endDate });
  };

  const handleClearClick = () => {
    setStartDate("01-11-2025");
    setEndDate("03-12-2025");
  };

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header */}
      <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h6" className="text-lg font-medium text-gray-800">
          Carer Letters Report
        </Typography>
        <Typography variant="body2" className="text-sm text-gray-600">
          Report: Summary of all communications sent to Carers by Date Range.
        </Typography>
      </Box>

      {/* --- Top Search/Filter Controls (Date Range & Search/Clear) --- */}
      <Paper
        elevation={0}
        className="p-4 flex items-center gap-4 border-b border-gray-200"
      >
        {/* Date Range */}
        <TextField
          size="small"
          label=""
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ width: 120, bgcolor: "white" }}
        />
        <Typography>to</Typography>
        <TextField
          size="small"
          label=""
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ width: 120, bgcolor: "white" }}
        />

        {/* Spacer to push buttons to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search and Clear Buttons */}
        <Button
          variant="contained"
          onClick={handleSearchClick}
          className="normal-case text-white shadow-md"
          sx={{
            backgroundColor: PRIMARY_PURPLE,
            "&:hover": { backgroundColor: PRIMARY_PURPLE },
            minWidth: 100,
            height: 35,
          }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleClearClick}
          className="normal-case text-white shadow-md"
          sx={{
            backgroundColor: ACCENT_TEAL,
            "&:hover": { backgroundColor: ACCENT_TEAL },
            minWidth: 100,
            height: 35,
          }}
        >
          Clear
        </Button>
      </Paper>

      {/* --- Export/Action Toolbar --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Export Buttons */}
        <Box className="flex flex-wrap gap-2">
          {toolbarButtons.map((btn) => (
            <Button
              key={btn.label}
              size="small"
              variant={btn.variant as "outlined" | "contained"}
              className={`normal-case text-sm font-normal shadow-sm`}
              sx={{
                color: "#000",
                borderColor: "#D1D5DB",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
                height: 30,
              }}
            >
              {btn.label.replace("Export ", "")}
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
      <Box className="p-4">
        <DataGrid
          rows={dummyRows}
          columns={carerLettersColumns}
          disableRowSelectionOnClick
          pageSizeOptions={[50]}
          initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
          className="border border-gray-300 rounded-md"
          getRowHeight={() => 35} // Explicitly set row height
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

export default CarerLettersReport;
