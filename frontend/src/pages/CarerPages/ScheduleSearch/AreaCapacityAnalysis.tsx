import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Search } from "lucide-react";

// =================================================================
// 1. CONSTANTS AND TYPE DEFINITIONS
// =================================================================

// Color definitions (matching the second screenshot: Dark Purple and Teal)
const PRIMARY_PURPLE = "#7b3b9b"; // Dark Purple for the Search button
const ACCENT_TEAL = "#4c9b9c"; // Teal for the Clear/Capacity button

interface AreaCapacityRow {
  id: number;
  area: string;
  availableHrs: number;
  scheduledHrs: number;
  capacity: string;
}

const areaCapacityColumns: GridColDef<AreaCapacityRow>[] = [
  { field: "area", headerName: "Area", width: 180, sortable: true },
  // These headers align with the screenshot: 'Available Hrs', 'Scheduled Hrs', 'Capacity'
  { field: "availableHrs", headerName: "Available Hrs", width: 150, sortable: true },
  { field: "scheduledHrs", headerName: "Scheduled Hrs", width: 150, sortable: true },
  { field: "capacity", headerName: "Capacity", width: 150, sortable: true },
];

const dummyRows: AreaCapacityRow[] = [
  {
    id: 1,
    area: "Cheetham Hill",
    availableHrs: 0,
    scheduledHrs: 24,
    capacity: "0%",
  },
  {
    id: 2,
    area: "Didsbury",
    availableHrs: 0,
    scheduledHrs: 40.67,
    capacity: "0%",
  },
  {
    id: 3,
    area: "Longsight",
    availableHrs: 0,
    scheduledHrs: 201.92,
    capacity: "0%",
  },
  {
    id: 4,
    area: "Trafford",
    availableHrs: 0,
    scheduledHrs: 0,
    capacity: "0%",
  },
  {
    id: 5,
    area: "Wythenshawe",
    availableHrs: 41.5,
    scheduledHrs: 361,
    capacity: "869.88%",
  },
  {
    id: 6,
    area: "Chorlton",
    availableHrs: 48,
    scheduledHrs: 1757,
    capacity: "3660.42%",
  },
];

// Toolbar buttons for Area Capacity Analysis (removed 'Area Search')
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

const AreaCapacityAnalysis: React.FC = () => {
  const [startDate, setStartDate] = useState("03-12-2025");
  const [endDate, setEndDate] = useState("10-12-2025");

  const handleSearchClick = () => {
    console.log("Search for Area Capacity Analysis:", { startDate, endDate });
  };

  const handleClearClick = () => {
    setStartDate("03-12-2025");
    setEndDate("10-12-2025");
  };

  return (
    <Box className="bg-white min-h-screen">
      {/* Report Header */}
      <Box className="px-4 py-3 bg-gray-100 border-b border-gray-300">
        <Typography variant="h6" className="text-lg font-medium text-gray-800">
          Area Capacity Analysis
        </Typography>
        <Typography variant="body2" className="text-sm text-gray-600">
          Report: Available Hours Used(%) Per Area. Grouped By Available, Scheduled, Capacity
        </Typography>
      </Box>

      {/* --- Top Search/Filter Controls --- */}
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
          }}
        >
          Clear
        </Button>
        
        {/* Event Type Capacity Button (new component from screenshot) */}
        <Button
          variant="contained"
          className="normal-case text-white shadow-md"
          sx={{
            backgroundColor: ACCENT_TEAL,
            "&:hover": { backgroundColor: ACCENT_TEAL },
            minWidth: 100,
          }}
        >
          Event Type Capacity
        </Button>
      </Paper>

      {/* --- Export/Action Toolbar --- */}
      <Box className="p-3 flex justify-between items-center border-b border-gray-200 bg-gray-50">
        {/* Left: Export Buttons (adjusted for Area Capacity Analysis) */}
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
            sx={{ width: 200 }}
            InputProps={{
              endAdornment: <Search size={16} className="text-gray-400 mr-1" />,
            }}
            className="bg-white rounded-md border border-gray-300 shadow-sm"
          />
        </Box>
      </Box>

      {/* Data Table */}
      <Box className="p-4">
        <DataGrid
          rows={dummyRows}
          columns={areaCapacityColumns}
          autoHeight
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          pageSizeOptions={[50]}
          initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
          className="border border-gray-300 rounded-md"
          getRowHeight={() => 35} // Explicitly set row height
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
              minHeight: "35px !important",
              lineHeight: "35px !important",
              borderBottom: "1px solid #d1d5db",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "35px !important",
              borderBottom: "1px solid #e5e7eb",
            },
            "& .MuiDataGrid-cell": {
              padding: "0px 8px !important",
              lineHeight: "35px !important",
              maxHeight: "35px !important",
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              // Alternating row color logic
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "white",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#f9fafb", // Very light gray for even rows
              },
            },
          }}
        />
        {/* Footer info matching the screenshot */}
        <Typography variant="caption" className="text-gray-600 mt-2 block">
          Showing 1 to {dummyRows.length} of {dummyRows.length} entries
        </Typography>
      </Box>
    </Box>
  );
};

export default AreaCapacityAnalysis;